/**
 * Plan-Code: ein Training als kopier-/einfügbarer Code — ganz ohne Backend.
 *
 * - Standard („FF1."): kompakt kodiert (Base64URL der JSON-Nutzlast).
 * - Optional („FF2."): mit Passwort verschlüsselt (AES-GCM, PBKDF2-SHA-256).
 *
 * Nutzlast ist bewusst klein gehalten: je Übung id + Sätze/Wdh/Gewicht (kg).
 */

export interface CodeExercise {
  /** Übungs-ID (z. B. 'seed:bench-press'). */
  x: string
  /** Anzahl Sätze. */
  ss: number
  /** Ziel-Wiederholungen je Satz. */
  r: number
  /** Gewicht in kg. */
  w: number
}

/** Ein vorbereitetes Training (Javis → App). */
export interface WorkoutCode {
  v: 1
  t: 'wo'
  /** Anzeigename, z. B. 'PPL · Push A'. */
  n?: string
  e: CodeExercise[]
}

/** Ein tatsächlich geleisteter Satz: [Wiederholungen, Gewicht kg]. */
export type CodeSet = [number, number]

export interface StatusWorkout {
  /** ISO-Datum. */
  d: string
  n?: string
  e: Array<{ x: string; s: CodeSet[] }>
}

/** Trainings-Status (App → Javis): Historie zum Auswerten / Hub-Eintrag. */
export interface StatusCode {
  v: 1
  t: 'exp'
  /** Einheit zur Anzeige ('metric' | 'imperial'); Werte bleiben in kg. */
  u?: 'metric' | 'imperial'
  /** jüngste Einheiten (neueste zuerst). */
  wk: StatusWorkout[]
  /** Körpergewichts-Verlauf [Datum, kg]. */
  bw?: Array<[string, number]>
}

export type CodePayload = WorkoutCode | StatusCode

import type { BodyMetric, Workout } from './types'

const PLAIN_PREFIX = 'FF1.'
const ENC_PREFIX = 'FF2.'

// ---- Base64URL (UTF-8-sicher) ---------------------------------------------

function bytesToB64Url(bytes: Uint8Array): string {
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function b64UrlToBytes(b64: string): Uint8Array {
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4))
  const bin = atob(b64.replace(/-/g, '+').replace(/_/g, '/') + pad)
  return Uint8Array.from(bin, (c) => c.charCodeAt(0))
}

function strToBytes(s: string): Uint8Array {
  return new TextEncoder().encode(s)
}
function bytesToStr(b: Uint8Array): string {
  return new TextDecoder().decode(b)
}

/** Kopiert einen (Teil-)Uint8Array in einen reinen ArrayBuffer (Web-Crypto-tauglich). */
function buf(u: Uint8Array): ArrayBuffer {
  return u.slice().buffer
}

// ---- Validierung -----------------------------------------------------------

export function isValidPayload(p: unknown): p is CodePayload {
  if (!p || typeof p !== 'object') return false
  const o = p as Record<string, unknown>
  if (o.v !== 1) return false
  if (o.t === 'wo') {
    if (!Array.isArray(o.e)) return false
    return o.e.every((e) => {
      const x = e as Record<string, unknown>
      return (
        typeof x.x === 'string' &&
        typeof x.ss === 'number' &&
        typeof x.r === 'number' &&
        typeof x.w === 'number'
      )
    })
  }
  if (o.t === 'exp') {
    if (!Array.isArray(o.wk)) return false
    return o.wk.every((w) => {
      const x = w as Record<string, unknown>
      return typeof x.d === 'string' && Array.isArray(x.e)
    })
  }
  return false
}

// ---- Kodierung (Standard) --------------------------------------------------

export function encodePlanCode(payload: CodePayload): string {
  return PLAIN_PREFIX + bytesToB64Url(strToBytes(JSON.stringify(payload)))
}

// ---- Verschlüsselung (optional) -------------------------------------------

async function deriveKey(pass: string, salt: Uint8Array): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey('raw', buf(strToBytes(pass)), 'PBKDF2', false, [
    'deriveKey',
  ])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: buf(salt), iterations: 100000, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  )
}

export async function encryptPlanCode(payload: CodePayload, pass: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(pass, salt)
  const ct = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: buf(iv) },
      key,
      buf(strToBytes(JSON.stringify(payload))),
    ),
  )
  const out = new Uint8Array(salt.length + iv.length + ct.length)
  out.set(salt, 0)
  out.set(iv, salt.length)
  out.set(ct, salt.length + iv.length)
  return ENC_PREFIX + bytesToB64Url(out)
}

// ---- Dekodierung (beide Formate) ------------------------------------------

export class PlanCodeError extends Error {}

export async function decodePlanCode(codeRaw: string, pass?: string): Promise<CodePayload> {
  const code = codeRaw.trim().replace(/\s+/g, '')
  if (code.startsWith(PLAIN_PREFIX)) {
    let json: string
    try {
      json = bytesToStr(b64UrlToBytes(code.slice(PLAIN_PREFIX.length)))
    } catch {
      throw new PlanCodeError('Code ist beschädigt oder unvollständig.')
    }
    const obj = safeParse(json)
    if (!isValidPayload(obj)) throw new PlanCodeError('Code enthält kein gültiges Training.')
    return obj
  }
  if (code.startsWith(ENC_PREFIX)) {
    if (!pass) throw new PlanCodeError('Dieser Code ist verschlüsselt – bitte Passwort eingeben.')
    let raw: Uint8Array
    try {
      raw = b64UrlToBytes(code.slice(ENC_PREFIX.length))
    } catch {
      throw new PlanCodeError('Code ist beschädigt oder unvollständig.')
    }
    const salt = raw.slice(0, 16)
    const iv = raw.slice(16, 28)
    const ct = raw.slice(28)
    try {
      const key = await deriveKey(pass, salt)
      const pt = new Uint8Array(
        await crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf(iv) }, key, buf(ct)),
      )
      const obj = safeParse(bytesToStr(pt))
      if (!isValidPayload(obj)) throw new PlanCodeError('Code enthält kein gültiges Training.')
      return obj
    } catch (e) {
      if (e instanceof PlanCodeError) throw e
      throw new PlanCodeError('Falsches Passwort oder beschädigter Code.')
    }
  }
  throw new PlanCodeError('Unbekanntes Code-Format (erwartet „FF1." oder „FF2.").')
}

function safeParse(s: string): unknown {
  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}

// ---- Builder: Trainings-Status aus den App-Daten (App → Javis) -------------

export function statusCodeFromData(
  workouts: Workout[],
  bodyMetrics: BodyMetric[],
  unit: 'metric' | 'imperial' = 'metric',
  limit = 12,
): StatusCode {
  const wk: StatusWorkout[] = [...workouts]
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit)
    .map((w) => ({
      d: w.date,
      n: w.name,
      e: w.entries
        .map((en) => ({
          x: en.exerciseId,
          s: en.sets
            .filter((s) => s.completed || s.reps > 0 || s.weightKg > 0)
            .map((s) => [s.reps, s.weightKg] as CodeSet),
        }))
        .filter((e) => e.s.length > 0),
    }))
    .filter((w) => w.e.length > 0)

  const bw = [...bodyMetrics]
    .filter((m) => m.weightKg != null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 20)
    .map((m) => [m.date, m.weightKg as number] as [string, number])

  return { v: 1, t: 'exp', u: unit, wk, ...(bw.length ? { bw } : {}) }
}
