# DEVELOPER_BRIEF.md — für Forge 💻

> Präzise Briefings von Javis an Forge. Immer gegen `PROJECT_KNOWLEDGE.md` prüfen.
> Grundhaltung: kleine, saubere Schritte · committen & pushen · ehrlich bei Grenzen.

---

## Briefing #001 — Phase-1-Gerüst + Übungsdatenbank  ✅ *umgesetzt*

**Ziel:** Deploybares PWA-Grundgerüst im Status-Hub-Stil, erstes echtes Feature = Übungs-DB,
Fundament der Hub-Brücke.

**Umgesetzt:**
- PWA-Scaffold: React 19 + TS + Vite 6 + Tailwind v4, `vite-plugin-pwa`, installierbar.
- Dark/„fancy" Theme (Design-Tokens in `src/index.css`), Bottom-Navigation, Dashboard.
- **Übungsdatenbank:** Suche, Muskelgruppen-Filter, Detail-Ansicht, **eigene Übungen anlegen/löschen**.
- Datenmodell (`src/lib/types.ts`) für Übungen, Workouts, Pläne, Körper-Metriken.
- **Hub-Brücke-Fundament:** `src/lib/dataFormat.ts` (versionierter Export + schlanke Hub-Sicht),
  Daten-Seite mit Export/Import/Reset.
- Auto-Deploy nach GitHub Pages (`.github/workflows/deploy.yml`, Trigger: push auf `main`).

**Definition of Done:** `npm run build` grün · App lokal per `npm run preview` bedienbar · Screenshots geliefert. ✔️

---

## Briefing #002 — Workout-Tracking  ✅ *umgesetzt*

**Ziel:** Der CEO kann eine Trainingseinheit tracken (Kern der App).

**Umgesetzt:**
1. **Neue Einheit** (`/workouts`): Datum vorbelegt, optionaler Name, Notizen.
2. **Übungen hinzufügen** via Such-/Filter-Picker (`ExercisePicker`, referenziert `exerciseId`).
3. **Sätze loggen** je Übung: `reps`, `weightKg`, `completed`-Toggle (grün markiert); Satz hinzufügen
   übernimmt die letzten Werte; letzte Übungswerte werden beim Hinzufügen vorbelegt (Progression).
4. **Speichern** → `Workout` in `AppData.workouts` via `addWorkout()` (Store, localStorage).
5. **Verlauf**: Liste vergangener Einheiten mit Volumen; Detailansicht mit Satz-Zusammenfassung; löschen.
6. **Metriken** (`src/lib/metrics.ts`): `epley1RM`, `exerciseStats` (max. Gewicht, bestes 1-RM, letzte Werte),
   `summarizeEntry`. Anzeige „Letztes Mal … · 1RM≈… kg" im Editor.

**Umgesetzte Leitplanken:** State nur über Store · IDs via `newId()` · `workoutVolumeKg` aus
`dataFormat.ts` wiederverwendet · keine personenbezogenen Daten im Code · Schema unverändert (v1).

**Definition of Done:** Build grün · Einheit anlegen→loggen→speichern→wiederfinden getestet (E2E) ·
Export enthält die Einheit in der Hub-Sicht · Screenshots geliefert. ✔️

---

## Briefing #003 — Körper-Metriken  ⏳ *als Nächstes empfohlen*

**Ziel:** Körpergewicht/KFA/Umfänge erfassen → füllt die **Hub-Sicht** (`weight[]`) direkt.

**Anforderungen (Vorschlag, CEO-Freigabe ausstehend):**
1. `/body`: Eintrag anlegen (Datum, `weightKg`, `bodyFatPct`, optionale Umfänge in cm, Notiz).
2. Verlauf als Liste; letzter Wert aufs Dashboard.
3. Mini-Trend (später zusammen mit Fortschritts-Graphen, Recharts).
4. Speicherung analog Workouts über den Store (`BodyMetric` in `types.ts` existiert bereits).

**Definition of Done:** Build grün · Eintrag anlegen→speichern→im Export unter `hub.weight` sichtbar · Screenshots.

---

## Konventionen (für alle Briefings)

- **Sprache UI:** Deutsch. **Code/Kommentare:** Deutsch/knapp, konsistent mit Bestand.
- **Styling:** vorhandene Utilities/Tokens nutzen (`card`, `btn-primary`, `input`, Muskel-Chips …),
  keine neue Design-Sprache erfinden.
- **Struktur:** Features unter `src/pages/<feature>/`, geteilte Logik in `src/lib/`.
- **Commits:** klein & sprechend. **Branch:** wie vom CEO vorgegeben.
- **Vor dem Push:** `npm run build` (enthält Typecheck) muss grün sein.
