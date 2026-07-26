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

## Briefing #005 — Trainingspläne  ✅ *umgesetzt (Phase-1-Kern komplett)*

**Ziel:** Splits/Routinen zusammenstellen und ein Workout direkt aus einem Plan-Tag starten.

**Umgesetzt:**
1. `/plans`: Plan anlegen (Name, Beschreibung), Liste mit Tage-/Übungszahl.
2. Plan-Detail: Tage hinzufügen/entfernen; je Tag Übungen via `ExercisePicker` mit
   editierbaren Ziel-Sätzen/Wdh-Bereich (kompakte Zahlenfelder).
3. „Workout aus diesem Tag starten" → setzt `startWorkoutFrom(...)` im Store und navigiert zu
   `/workouts`; der `WorkoutEditor` öffnet **vorbefüllt** (Name „Plan · Tag", Übungen geseedet).
4. Store: `addPlan`/`updatePlan`/`deletePlan` + transienter `pendingStart` (nicht persistiert).

**Definition of Done:** Build grün · Plan anlegen→Tag→Übungen→Workout starten getestet (E2E) · Screenshots. ✔️

---

## Phase 1 abgeschlossen ✅ · Live auf GitHub Pages

---

## AlphaProgression-inspirierte Verbesserungen (CEO-Feedback)

Referenz: AP macht es übersichtlicher (plan-zentrierte Startseite, Übungswechsel im Training,
Übungsbilder). CEO-Entscheidung: Bilder via **Free Exercise DB** (Public Domain); Umsetzung
„der Reihe nach" mit Screenshot-Freigabe je Schritt.

### Briefing #006 — Übungswechsel im Training  ✅ *umgesetzt*
- `WorkoutEditor` komplett umgebaut: **eine Übung pro Screen** statt langer Liste.
- Antippbare **Übungs-Leiste** (Pills mit Nummer/✓-Status), **Weiter/Zurück**-Buttons,
  **Wisch-Gesten** (links/rechts), Fortschritt „Übung X/Y" + Punkt-Indikator.
- Meta (Datum/Name) und Notiz **einklappbar**, damit die aktive Übung im Fokus steht.
- Vorbefüllung aus Plan-Tag & Progression-Hinweise bleiben erhalten.

### Briefing #007 — Plan-zentrierte Startseite  ⏳ *als Nächstes*
- Pläne als **eigener Tab** (statt unter „Mehr"); aktiver Plan mit **Tagen als Zeilen** (AP-Stil),
  je Tag „Tag starten". Später: Wochen-Kalender/Häkchen wie AP.

### Briefing #008 — Übungsbilder (Free Exercise DB)  ✅ *umgesetzt*
- 28 Übungen auf Free-Exercise-DB gemappt; je Übung Start/End-Foto **lokal gebündelt**
  (`public/exercise-images/`, 55 Bilder, ~3,5 MB) — Public Domain, Lizenzhinweis in `CREDITS.md`.
- Mapping in `src/data/exerciseImages.ts`; `ExerciseThumb`-Komponente mit Fallback.
- Bilder in: Übungsliste, Übungs-Detail (Start/Ende groß), Übungs-Picker, Trainings-Screen,
  Startseiten-Plan-Zeilen (AP-Look).
- Service-Worker **Runtime-Cache** (CacheFirst) für `/exercise-images/` → offline nach erstem Ansehen.

### Briefing #009 — AP-Politur (mehrere Iterationen)  ✅ *umgesetzt & live*
- **Bilder-Streifen** im Training statt Text-Pills (aktive Übung hervorgehoben).
- **Wochenkalender** auf der Startseite (`WeekStrip`): Trainingstage als grüne Punkte, heute markiert.
- **Pausen-Timer** (`RestTimer`): startet beim Abschließen eines Satzes, zählt hoch, schwebender Pill.
- **Live-1RM-Spalte** je Satz in der Trainings-Tabelle (Epley, `epley1RM`).

### Später
- Ziel-Linien in Graphen (Schema-Bump) · Einheiten kg/lbs · Backend + echte Hub-Brücke.
- Optional: Animationen (lizenzierte Quelle) statt/ergänzend zu Fotos.
- Optional (AP): Warmup-Satz-Markierung, konfigurierbarer Timer-Countdown.

### Später
- Ziel-Linien in Graphen (Schema-Bump) · Einheiten kg/lbs · Backend + echte Hub-Brücke.

---

## Konventionen (für alle Briefings)

- **Sprache UI:** Deutsch. **Code/Kommentare:** Deutsch/knapp, konsistent mit Bestand.
- **Styling:** vorhandene Utilities/Tokens nutzen (`card`, `btn-primary`, `input`, Muskel-Chips …),
  keine neue Design-Sprache erfinden.
- **Struktur:** Features unter `src/pages/<feature>/`, geteilte Logik in `src/lib/`.
- **Commits:** klein & sprechend. **Branch:** wie vom CEO vorgegeben.
- **Vor dem Push:** `npm run build` (enthält Typecheck) muss grün sein.
