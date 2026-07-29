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

## UX-Verbesserungen (CEO-Feedback)

Ziel: übersichtlichere Bedienung (plan-zentrierte Startseite, Übungswechsel im Training,
Übungsbilder). CEO-Entscheidung: Bilder-Quelle wird auf sauber lizenziertes Material
umgestellt (Lizenzkette in Prüfung — siehe `docs/legal/`); Umsetzung „der Reihe nach"
mit Screenshot-Freigabe je Schritt.

### Briefing #006 — Übungswechsel im Training  ✅ *umgesetzt*
- `WorkoutEditor` komplett umgebaut: **eine Übung pro Screen** statt langer Liste.
- Antippbare **Übungs-Leiste** (Pills mit Nummer/✓-Status), **Weiter/Zurück**-Buttons,
  **Wisch-Gesten** (links/rechts), Fortschritt „Übung X/Y" + Punkt-Indikator.
- Meta (Datum/Name) und Notiz **einklappbar**, damit die aktive Übung im Fokus steht.
- Vorbefüllung aus Plan-Tag & Progression-Hinweise bleiben erhalten.

### Briefing #007 — Plan-zentrierte Startseite  ⏳ *als Nächstes*
- Pläne als **eigener Tab** (statt unter „Mehr"); aktiver Plan mit **Tagen als Zeilen**,
  je Tag „Tag starten". Später: Wochen-Kalender/Häkchen.

### Briefing #008 — Übungsbilder (Free Exercise DB)  ✅ *umgesetzt*
- 28 Übungen auf eine externe Bild-Quelle gemappt; je Übung Start/End-Bild **lokal gebündelt**
  (`public/exercise-images/`, 55 Bilder, ~3,5 MB). ⚠️ Lizenzkette in Prüfung, Quelle wird
  ersetzt — siehe `docs/legal/rechtspruefung-01.md` (R-01).
- Mapping in `src/data/exerciseImages.ts`; `ExerciseThumb`-Komponente mit Fallback.
- Bilder in: Übungsliste, Übungs-Detail (Start/Ende groß), Übungs-Picker, Trainings-Screen,
  Startseiten-Plan-Zeilen.
- Service-Worker **Runtime-Cache** (CacheFirst) für `/exercise-images/` → offline nach erstem Ansehen.

### Briefing #009 — UX-Politur (mehrere Iterationen)  ✅ *umgesetzt & live*
- **Bilder-Streifen** im Training statt Text-Pills (aktive Übung hervorgehoben).
- **Wochenkalender** auf der Startseite (`WeekStrip`): Trainingstage als grüne Punkte, heute markiert.
- **Pausen-Timer** (`RestTimer`): startet beim Abschließen eines Satzes, zählt hoch, schwebender Pill.
- **Live-1RM-Spalte** je Satz in der Trainings-Tabelle (Epley, `epley1RM`).

### Briefing #010 — Voller Monatskalender  ✅ *umgesetzt & live*
- `/calendar`: Monatsansicht (Mo–So), Trainingstage grün, Körper-Einträge grau, heute markiert;
  Monat vor/zurück, Summary „X Workouts · Y/Woche".
- Aus der Wochenleiste (`WeekStrip`) per Monats-Label erreichbar (`onOpenCalendar`).
- Tag antippen → Detail-Sheet mit Einheiten (Übungen, Volumen) + **„Training wiederholen"**
  (`startWorkoutFrom` → vorbefüllter Editor). Wiederholen auch im Trainings-Verlauf.

### Briefing #011 — Einheiten kg/lbs  ✅ *umgesetzt & live*
- Einstellungen-Seite (`/settings`, unter „Mehr") mit kg/lbs-Umschalter (`settings.unit`).
- Umrechnungs-Helfer `src/lib/units.ts` (intern immer kg; Anzeige/Eingabe umgerechnet).
- Durchgezogen: Trainings-Editor (Eingabe/Spalte/1RM), Verlauf & Kalender (Volumen/Summary),
  Körper-Metriken (Karte/Trend/Verlauf/Formular), Dashboard, Fortschritts-Graphen.

### Briefing #012 — Ziel-Linien in Graphen + Kalender schließen  ✅ *umgesetzt & live*
- Einstellungen: Zielgewicht & Ziel-KFA (`settings.goalWeightKg`/`goalBodyFatPct`, additiv, kein Schema-Bump).
- Fortschritt: gestrichelte `ReferenceLine` im Gewichts- & KFA-Graph; Y-Achse erweitert den Zielwert einzuschließen.
- Kalender: Schließen-X (oben rechts) → zurück zur Startseite.

### Briefing #013 — Übungs-Historie & Progression  ✅ *umgesetzt & live*
- **Vorbefüllung** der letzten Werte beim Training (bestand schon via `seedEntry`) + „Letztes Mal"-Referenz.
- **Progressionsvorschlag** je Übung (`progressionSuggestion`) mit „Übernehmen"-Button im Editor.
- **Übungs-Historie** (`ExerciseHistory`): Bestwerte, 1-RM-Sparkline (`Sparkline`, ohne Recharts),
  vergangene Sätze (#/Wdh/kg/1RM). Erreichbar als Sheet im Training (verliert Draft nicht) und als
  Seite `/exercise/:id` (aus der Übungs-DB, „Verlauf & Statistik").
- `metrics.ts`: `exerciseSessionHistory`, `progressionSuggestion`.

### Briefing #014 — Gewichts-Picker mit Scheiben-Visualisierung  ✅ *umgesetzt & live*
- Tippen aufs Gewichtsfeld öffnet `WeightPicker` (Sheet): großer Wert, −/+ Stepper (Schrittweite),
  manuelle Eingabe, **Scheiben-Grafik** (farbcodiert, je Seite) + „Übernehmen".
- `src/lib/plates.ts`: Scheiben-Zerlegung (kg/lbs-Sets), Farben, Default-Stange/Schritt.
- Pro-Übung-Optionen (Schritt, Stange, Scheiben an/aus): `settings.exerciseConfig` + `setExerciseConfig` (additiv).
- Respektiert kg/lbs.

### Später
- Backend + echte Hub-Brücke.
- Optional: pro-Übung Min/Max-Bereich, „auf alle Langhantel-Übungen anwenden"-Scope (AP).
- Optional: Animationen (lizenzierte Quelle) statt/ergänzend zu Fotos.
- Optional (AP): Warmup-Satz-Markierung, konfigurierbarer Timer-Countdown.

---

## Konventionen (für alle Briefings)

- **Sprache UI:** Deutsch. **Code/Kommentare:** Deutsch/knapp, konsistent mit Bestand.
- **Styling:** vorhandene Utilities/Tokens nutzen (`card`, `btn-primary`, `input`, Muskel-Chips …),
  keine neue Design-Sprache erfinden.
- **Struktur:** Features unter `src/pages/<feature>/`, geteilte Logik in `src/lib/`.
- **Commits:** klein & sprechend. **Branch:** wie vom CEO vorgegeben.
- **Vor dem Push:** `npm run build` (enthält Typecheck) muss grün sein.
