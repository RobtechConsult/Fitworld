# PROJECT_KNOWLEDGE.md — ForgeFit *(Arbeitstitel)*

> **Single Source of Truth.** Dieses Dokument ist die zentrale Wahrheit für Vision,
> Rollen, Entscheidungen und offene Fragen. Es wird **laufend** von Javis gepflegt.
> Bei Widerspruch zwischen Code/Chat und diesem Dokument gilt: hier klären, dann anpassen.

---

## 1. Mission (ein Satz)

Eine eigene, schöne Trainings-App, in der der CEO sein Training plant & trackt — deren Daten
nahtlos in das **Status-Hub-Cockpit** übergehen.

## 2. Warum es die App gibt

- Unabhängigkeit von Drittanbieter-Apps (AlphaProgression, YAZIO …) → **volle Datenhoheit**.
- Schwester-App **Status Hub** ist das persönliche Lebens-Cockpit (Training, Beziehung,
  Finanzen …), gebaut als PWA (React + TS + Vite + Tailwind), dark & modern, local-first.
- ForgeFit liefert die Trainings- & Körperdaten, die später **automatisch** in den Hub fließen.

## 3. Team & Arbeitsweise

| Rolle | Wer | Aufgabe |
|------|-----|---------|
| 👔 **CEO** | der Nutzer | Vision, Richtung, Entscheidungen, Freigaben |
| 📋 **Javis** | die KI (Projektleiter) | Konzept, Planung, Briefings, Projektwissen, Live-Schaltung nach Abstimmung |
| 💻 **Forge** | Entwickler | setzt um nach `DEVELOPER_BRIEF.md` |

**Arbeitsweise:** kleine Schritte · sauber committen & pushen · nach Abstimmung automatisch live ·
Ergebnisse per Screenshot zeigen · ehrlich bei Grenzen/Machbarkeit bleiben.

## 4. Scope

### Phase 1 — diese App ✅ *(Kern komplett)*
- ✅ **Übungs-Datenbank** — Übungen mit Muskelgruppen, Gerät, Ausführung; eigene Übungen anlegbar.
- ✅ **Workout-Tracking** — Einheit anlegen, Übungen wählen, Sätze/Wdh/Gewicht loggen, abschließen; Verlauf & Volumen; Progression-Hinweis (letzte Werte + geschätztes 1-RM).
- ✅ **Trainingspläne** — Splits mit Tagen & Ziel-Sätzen/Wdh zusammenstellen; Workout direkt aus einem Plan-Tag starten (Editor vorbefüllt).
- ✅ **Körper-Metriken** — Gewicht, KFA & optionale Umfänge; Verlauf + Trend; speist `hub.weight`.
- ✅ **Fortschritts-Graphen** — swipebare Charts (Gewicht, Volumen, 1-RM, KFA) mit Zeitraum-Filter, dark & „fancy" (Recharts, lazy geladen). Ziel-Linien noch offen.
- ✅ **Hub-Brücke (Fundament)** — gemeinsames JSON-Format + Export/Import.

### Phase 2 — später (NICHT jetzt)
- kcal-/Ernährungs-Tracking als YAZIO-Ersatz (Lebensmittel, Tagesbilanz).

### Später vorgemerkt (aus README-Ursprung)
- **Social/Vergleich** („Fitnessapp bei der man sich gegenseitig vergleicht"). Bewusst **zurück-
  gestellt** (CEO-Entscheidung E-01). Erfordert Backend + Nutzerkonten + mehr Datenschutz-Aufwand.

## 5. Technik-Entscheidungen (vom Status Hub übernommen)

- **Stack:** React + TypeScript + Vite + Tailwind (v4), als **PWA** (installierbar iPhone + Laptop).
- **Look:** dark, modern, „fancy", viele Graphen. Modularer Aufbau, austauschbare Datenquellen.
- **Local-first:** Eingaben lokal in `localStorage` (MVP).
- **Backend-ready:** so gebaut, dass später Cloudflare Workers + D1 (alt.: Supabase) andockt —
  für Nutzerkonten, Cloud-Sync und die App-übergreifende Datenbrücke.
- **App Stores:** Capacitor (React-Code → echte iOS/Android-App, ~90 % Code bleibt), später
  Apple-Health-Anbindung.
- **Auto-Deploy:** GitHub Actions → GitHub Pages (`base = /Fitworld/`).

## 6. Datenschutz / Sicherheit *(Repo evtl. öffentlich)*

- **KEINE** echten Geheimnisse/Zugangsdaten und **keine** echten personenbezogenen Daten im Code/Repo.
- Nur generische Beispieldaten; echte Werte lokal bzw. später serverseitig.
- Passwörter/Secrets nur über Umgebungsvariablen/Server — **nie** im Frontend.
- Aktueller Stand: alle Nutzerdaten liegen ausschließlich lokal (localStorage), nichts verlässt das Gerät.

## 7. Hub-Brücke — Datenvertrag (Contract)

Definiert in `src/lib/dataFormat.ts`, versioniert über `FORGEFIT_SCHEMA_VERSION`.

Export-Umschlag `ForgeFitExport`:
```
{ app: "forgefit", schemaVersion: 1, exportedAt, data: <vollständiges Backup>, hub: <schlanke Sicht> }
```
Der **`hub`-Teil** ist der stabile Vertrag, den der Status Hub direkt konsumiert:
- `weight[]` → Körpergewicht/KFA-Zeitreihe (`{ date, weightKg?, bodyFatPct? }`)
- `workouts[]` → Zusammenfassung je Einheit (`{ date, exerciseCount, totalSets, totalVolumeKg, … }`)

> ⚠️ **Regel:** Änderungen am Datenmodell (`src/lib/types.ts`) oder am Hub-Vertrag **immer**
> mit erhöhter `schemaVersion` und Notiz im Entscheidungs-Logbuch.

## 8. Architektur-Überblick

```
src/
  lib/        types.ts (Domänenmodell) · storage.ts (localStorage) · dataFormat.ts (Hub-Brücke)
  data/       exercises.ts (Seed-Übungen) · muscleGroups.ts (Labels/Filter)
  store/      StoreContext.tsx (zentraler State, localStorage-persistiert)
  components/ layout/ (AppShell, BottomNav) · Sheet · ComingSoon · icons
  pages/      Dashboard · exercises/ · Workouts · Progress · Body · Plans · More · DataPage
```
- Navigation: `HashRouter` (robuste Deep-Links auf GitHub Pages ohne Server-Rewrites).
- State: ein `AppData`-Objekt unter `localStorage["forgefit:appdata:v1"]`, reaktiv via Context.

## 9. Entscheidungs-Logbuch

| ID | Datum | Entscheidung | Begründung |
|----|-------|--------------|------------|
| E-01 | 2026-07-25 | **Phase 1 = private Trainings-App** (Social/Vergleich zurückgestellt) | saubere Architektur & Datenschutz, schnellster Nutzen; Social braucht Backend |
| E-02 | 2026-07-25 | **Reihenfolge:** Übungs-DB → Tracking → Pläne | Übungs-DB ist Fundament, auf dem Tracking & Pläne aufbauen |
| E-03 | 2026-07-25 | **Hub-Brücke früh:** gemeinsames JSON-Format + schlanker Export/Import ab Start | verhindert späteres Umbauen des Datenmodells |
| E-04 | 2026-07-25 | **Stack/PWA/Deploy** wie Status Hub (React+TS+Vite+Tailwind v4, GitHub Pages) | Konsistenz, Code-/Wissenstransfer, spätere gemeinsame Basis |
| E-05 | 2026-07-25 | **Arbeitstitel „ForgeFit"** als Platzhalter | finaler Name kommt vom CEO (+ Javis/Status Hub) später |
| E-06 | 2026-07-25 | **1-RM-Schätzung via Epley-Formel** (`weight × (1 + reps/30)`) | einfacher, etablierter Standard; austauschbar in `src/lib/metrics.ts` |
| E-07 | 2026-07-25 | **Graphen mit Recharts, lazy geladen**; Ziel-Linien vorerst zurückgestellt | Recharts ist groß → Code-Splitting hält den Start schlank; Ziele bräuchten Schema-Änderung |

## 10. Offene Fragen an den CEO

- ❓ **Finaler App-Name?** (aktuell Platzhalter „ForgeFit"; Repo heißt „Fitworld").
- ❓ **Einheiten:** metrisch (kg/cm) reicht, oder imperial (lbs) später nötig?
- ❓ **Workout-Tracking-Detailtiefe:** RPE, Pausenzeiten-Timer, Supersätze — jetzt oder später?
- ❓ **Status-Hub-Repo:** Zugriff/Struktur, damit Javis den Import auf der Hub-Seite mitdenkt?

## 11. Nächste Schritte (Roadmap kurz)

1. ✅ **Workout-Tracking**: Einheit starten, Übungen wählen, Sätze/Wdh/Gewicht loggen, speichern, Verlauf.
2. ✅ **Körper-Metriken**: Gewicht/KFA/Umfänge erfassen → speist Hub-Sicht (`hub.weight`).
3. ✅ **Fortschritts-Graphen** (Recharts): Volumen/Kraft/Gewicht/KFA über Zeit, Zeitraum-Filter.
4. ✅ **Trainingspläne**: Splits bauen, Workout aus Plan-Tag starten.

**→ Phase-1-Kern abgeschlossen.** Nächste sinnvolle Schritte:
5. **Live gehen** (CEO): Repo → Settings → Pages → Source „GitHub Actions"; finaler App-Name.
6. **Feinschliff**: Ziel-Linien in Graphen (Schema-Bump), Einheiten-Umschaltung (kg/lbs).
7. **Backend-Anbindung** (später): CF Workers + D1, echte Hub-Datenbrücke (automatischer Sync).

---
*Zuletzt gepflegt: 2026-07-25 von Javis.*
