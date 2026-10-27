# REA — Learnings (AlphaProgression & Co.) + Roadmap

*Reverse-Engineering-Analyse auf Konzeptebene. Ziel: lernen, was gute
Trainings-Apps stark macht, und es **eigenständig** umsetzen.*

## Rechtlicher Rahmen (verbindlich — Justus)

- **Frei nutzbar:** Funktions- und Trainingskonzepte (Ideen sind nicht schützbar).
  Die meisten „AP-Features" sind etablierte Trainingswissenschaft.
- **NICHT übernehmen:** konkrete UI/Layouts 1:1, Wortlaute, Icons, fremde
  Übungs-/Datenbank-Inhalte; **kein Scraping/Dekompilieren** fremder Apps.
- **Unser Weg:** Konzept verstehen → eigene Gestaltung, eigene Daten, eigener Code.

## Was starke Trainings-Apps gut machen → unser Status → Priorität

| Konzept | Nutzen für uns | Status | Prio |
|---|---|---|---|
| **Autoregulierte Progression** (Ziel-Wdh-Bereich pro Übung; erreicht man das obere Ende sauber → Gewicht rauf, Doppelprogression; optional RIR/RPE) | Kern für „Tagesplan vorbereiten" | nur einfacher Vorschlag vorhanden | **hoch** |
| **Tagesplan-/„Heute"-Engine** (welcher Plan-Tag ist dran + Zielwerte je Übung) | genau das Tagesziel des CEOs | fehlt | **hoch** |
| **1RM-Schätzung & -Verlauf** (Epley) | Fortschritt messen | ✓ vorhanden | — |
| **Aufwärmsatz-Rechner** (%-Stufen bis zum Arbeitsgewicht) | Komfort im Training | fehlt | mittel |
| **Wochen-Volumen je Muskel** (Sätze/Woche, Landmarks MEV/MAV/MRV als Orientierung) | Übertraining/Unterforderung sehen | fehlt | mittel |
| **Deload-/Ermüdungs-Hinweis** (Stagnation erkannt → leichte Woche) | Verletzungs-/Plateau-Schutz | fehlt | mittel |
| **Übungs-Alternativen/Swap** (gleiche Muskelgruppe) | Flexibilität bei besetztem Gerät | fehlt | niedrig–mittel |
| **Periodisierung/Mesozyklen** (Blöcke mit steigendem Volumen + Deload) | langfristige Planung | fehlt | später |
| **Plate-Rechner / Pausentimer / Übungsbilder** | Training-UX | ✓ vorhanden | — |

## Tagesplan-Engine „Heute" (Fundament, local-first)

Die App bestimmt selbst den **fälligen Trainingstag** (Rotation durch die Tage des
aktiven Plans anhand des zuletzt trainierten Tages) und füllt jede Übung mit
**progressionsbasierten Zielwerten** (Doppelprogression aus der Historie). Ein Tipp
auf „Training starten" öffnet den vorbefüllten Editor. → „Plan für heute ist fertig,
du trainierst ihn ab." Braucht **kein** Backend.

## Hub-Anbindung — zwei Ausbaustufen

- **A — In-App-Engine (jetzt):** Die App rechnet den Tagesplan lokal. Sofort baubar.
- **B — Echte Hub-Kopplung (Ausbau):** Daten fließen in den **Status Hub**; ein
  Backend/Sync macht sie außerhalb des Geräts verfügbar, sodass der Agent
  („Javis") den Tagesplan serverseitig/tagesaktuell vorbereiten und anpassen kann.
  Voraussetzung: Zugriff aufs **Status-Hub-Repo** + Backend-Entscheidung
  (z. B. Cloudflare Workers+D1 oder Supabase) — bewusst noch offen (CEO-Entscheid).

**Empfehlung:** A als Fundament jetzt bauen; B als nächsten Schritt scopen.
