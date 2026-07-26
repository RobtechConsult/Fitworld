# ForgeFit *(Arbeitstitel — Repo: Fitworld)*

Eine eigene, schöne **Trainings-App** (im Stil von AlphaProgression): Training planen & tracken,
Körper-Metriken erfassen, Fortschritt sehen — **local-first**, mit voller Datenhoheit. Die Daten
fließen später nahtlos in das Schwester-Cockpit **Status Hub**.

> **Hinweis zur Vision:** Der ursprüngliche „Social/Vergleich"-Ansatz ist bewusst **zurückgestellt**
> (Entscheidung E-01). Phase 1 ist eine private, datenhoheitliche Trainings-App. Details in
> [`PROJECT_KNOWLEDGE.md`](./PROJECT_KNOWLEDGE.md).

## Status — Phase 1 ✅ (Kern komplett)

- ✅ PWA-Grundgerüst (dark & „fancy"), Dashboard + Navigation
- ✅ Übungsdatenbank (Suche, Filter, eigene Übungen)
- ✅ Workout-Tracking (Sätze/Wdh/Gewicht, Verlauf, Volumen, 1-RM)
- ✅ Körper-Metriken (Gewicht, KFA, Umfänge, Trend)
- ✅ Fortschritts-Graphen (swipebar: Gewicht, Volumen, 1-RM, KFA)
- ✅ Trainingspläne (Splits mit Tagen, Workout aus Plan-Tag starten)
- ✅ Hub-Brücke: gemeinsames JSON-Format + Export/Import

## Tech-Stack

React 19 · TypeScript · Vite 6 · Tailwind v4 · PWA (`vite-plugin-pwa`) · React Router (HashRouter).
Local-first (`localStorage`), backend-ready (Cloudflare Workers + D1 / Supabase), Capacitor-fähig.

## Entwicklung

```bash
npm install
npm run dev        # Dev-Server
npm run build      # Typecheck + Produktions-Build (dist/)
npm run preview    # Build lokal ansehen
npm run icons      # PWA-Icons neu generieren
```

## Deploy

Push auf `main` → GitHub Action baut & veröffentlicht auf **GitHub Pages**
(`base = /Fitworld/`). Einmalig in den Repo-Einstellungen *Pages → Source: GitHub Actions* aktivieren.

## Dokumente

- [`PROJECT_KNOWLEDGE.md`](./PROJECT_KNOWLEDGE.md) — Single Source of Truth (Vision, Rollen, Entscheidungen).
- [`DEVELOPER_BRIEF.md`](./DEVELOPER_BRIEF.md) — Briefings für die Umsetzung.

## Datenschutz

Keine echten Secrets/personenbezogenen Daten im Repo — nur generische Beispieldaten. Nutzerdaten
liegen ausschließlich lokal im Browser.
