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

## Briefing #003 — Körper-Metriken  ✅ *umgesetzt*

**Ziel:** Körpergewicht/KFA/Umfänge erfassen → füllt die **Hub-Sicht** (`weight[]`) direkt.

**Umgesetzt:**
1. `/body`: Eintrag anlegen (Datum, `weightKg`, `bodyFatPct`, aufklappbare Umfänge in cm, Notiz);
   Komma-Eingabe erlaubt; mindestens ein Wert nötig.
2. Statuskarten: aktuelles Gewicht mit **Trend** (Δ zum vorherigen Eintrag, grün/gelb) + KFA.
3. Verlauf als Liste (Chips für Gewicht/KFA/Umfänge, Notiz), Einträge löschbar.
4. Speicherung über Store (`addBodyMetric`/`deleteBodyMetric`); letzter Gewichtswert aufs Dashboard.
5. Umfang-Definitionen in `src/data/measurements.ts` (stabile Keys).

**Definition of Done:** Build grün · Eintrag anlegen→speichern→Verlauf/Trend/Dashboard/Export (`hub.weight`)
getestet (E2E) · Screenshots. ✔️

---

## Briefing #004 — Fortschritts-Graphen  ✅ *umgesetzt*

**Ziel:** Swipebare, „fancy" Graphen (Recharts) über Zeit — dark.

**Umgesetzt:**
1. `/progress`: swipebares Karussell mit 4 Charts — Körpergewicht (Area), Trainingsvolumen
   je Einheit (Bar), geschätztes 1-RM einer wählbaren Übung (Line), Körperfett (Area). Punkt-Indikator.
2. Zeitraum-Umschalter (4 Wochen / 3 Monate / 1 Jahr / alle).
3. Übungs-Auswahl (Dropdown) für den 1-RM-Graphen, sortiert nach Häufigkeit.
4. Recharts, dark-theme-Farben aus Design-Tokens; **lazy geladen** (Code-Splitting) → Start bleibt schlank.
5. Chart-Daten-Helfer in `src/lib/metrics.ts` (`weightSeries`, `volumeSeries`, `oneRMSeries`, …).
6. Leere Zustände je Chart + globaler Empty-State ohne Daten.

**Zurückgestellt:** Ziel-Linien (z. B. Zielgewicht) — braucht Ziel-Feld in `types.ts`/`Settings`
(→ `schemaVersion` erhöhen). Als eigenes Mini-Briefing später.

**Definition of Done:** Build grün · Graphen mit echten Daten getestet (E2E, 8-Wochen-Beispiel) · Screenshots. ✔️

---

## Briefing #005 — Trainingspläne  ⏳ *als Nächstes empfohlen (letztes Phase-1-Modul)*

**Ziel:** Splits/Routinen zusammenstellen und ein Workout direkt aus einem Plan-Tag starten.

**Anforderungen (Vorschlag, CEO-Freigabe ausstehend):**
1. `/plans`: Plan anlegen (Name, Beschreibung), Tage hinzufügen (z. B. Push/Pull/Legs).
2. Je Tag Übungen aus der DB wählen (`ExercisePicker` wiederverwenden) mit Ziel-Sätzen/Wdh-Bereich.
3. Plan-Detail; „Workout aus diesem Tag starten" → öffnet `WorkoutEditor` mit vorbefüllten Übungen.
4. Speicherung über Store (`Plan`/`PlanDay` in `types.ts` existieren bereits; CRUD ergänzen).

**Definition of Done:** Build grün · Plan anlegen→Tag→Übungen→Workout starten funktioniert · Screenshots.

---

## Konventionen (für alle Briefings)

- **Sprache UI:** Deutsch. **Code/Kommentare:** Deutsch/knapp, konsistent mit Bestand.
- **Styling:** vorhandene Utilities/Tokens nutzen (`card`, `btn-primary`, `input`, Muskel-Chips …),
  keine neue Design-Sprache erfinden.
- **Struktur:** Features unter `src/pages/<feature>/`, geteilte Logik in `src/lib/`.
- **Commits:** klein & sprechend. **Branch:** wie vom CEO vorgegeben.
- **Vor dem Push:** `npm run build` (enthält Typecheck) muss grün sein.
