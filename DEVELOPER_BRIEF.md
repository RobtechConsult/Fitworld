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

## Briefing #002 — Workout-Tracking  ⏳ *als Nächstes*

**Ziel:** Der CEO kann eine Trainingseinheit tracken (Kern der App).

**Anforderungen (Vorschlag, CEO-Freigabe ausstehend):**
1. **Neue Einheit starten** (`/workouts`): Datum vorbelegt, optionaler Name.
2. **Übungen hinzufügen** aus der Übungs-DB (Such-/Filter-Picker; `exerciseId` referenzieren).
3. **Sätze loggen** je Übung: `reps`, `weightKg`, optional `rpe`, `completed`-Toggle.
   - Komfort: „Satz duplizieren", letzte Werte der Übung als Default (aus letztem Workout).
4. **Speichern** → `Workout` in `AppData.workouts` (siehe `types.ts`), persistiert via Store.
5. **Verlauf**: Liste vergangener Einheiten, Detailansicht.
6. **Progression-Basis**: pro Übung „Bestwerte" (max. Gewicht / geschätztes 1RM) sichtbar.

**Technische Leitplanken:**
- Nur `src/store/StoreContext.tsx` mutiert `AppData` (Persistenz ist dort verdrahtet).
- IDs via `newId()` aus `src/lib/storage.ts`.
- Volumen/Progression-Helfer in `src/lib/dataFormat.ts` (`workoutVolumeKg`) wiederverwenden.
- Keine echten personenbezogenen Daten/Secrets im Code (siehe PROJECT_KNOWLEDGE §6).
- Bei Datenmodell-Änderung: `FORGEFIT_SCHEMA_VERSION` erhöhen + Logbuch-Eintrag.

**Definition of Done:** Build grün · Einheit anlegen→loggen→speichern→wiederfinden funktioniert ·
Export enthält die neue Einheit in der Hub-Sicht · Screenshots.

---

## Konventionen (für alle Briefings)

- **Sprache UI:** Deutsch. **Code/Kommentare:** Deutsch/knapp, konsistent mit Bestand.
- **Styling:** vorhandene Utilities/Tokens nutzen (`card`, `btn-primary`, `input`, Muskel-Chips …),
  keine neue Design-Sprache erfinden.
- **Struktur:** Features unter `src/pages/<feature>/`, geteilte Logik in `src/lib/`.
- **Commits:** klein & sprechend. **Branch:** wie vom CEO vorgegeben.
- **Vor dem Push:** `npm run build` (enthält Typecheck) muss grün sein.
