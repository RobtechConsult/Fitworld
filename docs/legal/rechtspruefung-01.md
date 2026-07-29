# Rechts- & Abmahnrisiko-Prüfung ForgeFit (Repo „Fitworld") — Bericht 01

**Erstellt von:** Justus (interner Justiziar, KI-gestützte Ersteinschätzung)
**Datum:** 2026-07-29
**Prüfstand (Commit):** `cb926be`
**Prüfumfang:** Repository `/home/user/Fitworld`, öffentlich deployt via GitHub Pages (`robtechconsult.github.io/Fitworld`) und öffentliches Git-Repo `RobtechConsult/Fitworld`.

> ⚠️ **Kein Rechtsrat i. S. d. RDG.** Dies ist eine interne, KI-gestützte Ersteinschätzung zur Priorisierung. Verbindliche/streitige Fragen gehören zu einem Fachanwalt (Urheber-/Medienrecht bzw. gewerblicher Rechtsschutz/IT-Recht). Siehe Disclaimer am Ende.

---

## 1. Kurzfazit

Das mit Abstand größte Risiko sind die **~55 Übungsfotos** in `public/exercise-images/`: Es handelt sich **nicht** um gemeinfreie Illustrationen, sondern um **echte Fotografien realer, identifizierbarer Personen** in einem Studio. Die in `CREDITS.md` behauptete Lizenzkette („The Unlicense" über die Free Exercise DB) ist **nicht belegt und in der Quelle selbst offen streitig** — sie deckt weder das Lichtbild-/Fotografenrecht noch das Recht am eigenen Bild der abgebildeten Personen zuverlässig ab. Diese Bilder werden aktuell weltweit öffentlich verbreitet (Repo + `dist/` + GitHub Pages). Zweitgrößter Block: **fehlendes Impressum und fehlende Datenschutzerklärung** einer öffentlich erreichbaren App. Drittens die öffentliche Aussage **„im Stil von AlphaProgression"** samt bewusster „AP-Look"-Nachbildung — AlphaProgression ist eine reale deutsche Firma (Alpha Progression GmbH); das berührt Marken- und Wettbewerbsrecht. Der eigene Name „ForgeFit"/„Fitworld" ist markenrechtlich **ungeprüft**. Positiv: Icons sind selbst gezeichnet, keine fremden Fonts/Bibliotheken extern nachgeladen, Übungstexte sind offensichtlich selbst formuliert.

---

## 2. Risiko-Register (nach Priorität)

### R-01 🔴 Übungsfotos: reale Personen + ungeklärte Lizenzkette (Urheber- & Bildrecht)

**Was & warum.** Die 55 JPGs unter `public/exercise-images/` sind **echte Studio-Fotografien identifizierbarer Personen** (verifiziert an `bench-press-0.jpg`: Mann auf Flachbank vor roter Wand, Gesicht/Statur erkennbar — klassisches Fitness-Datenbank-Foto, keine Strichzeichnung). Damit greifen **zwei voneinander unabhängige** Schutzrechte:
1. **Urheber-/Lichtbildrecht** des Fotografen bzw. der ursprünglichen Rechteinhaber (Fotostudio/Website). Auch einfache Fotos genießen Schutz.
2. **Recht am eigenen Bild** der abgebildeten Person(en) — Verbreitung/Zurschaustellung grundsätzlich nur mit deren Einwilligung.

Die Herkunft ist **undokumentiert**: Die Free Exercise DB (`yuhonas/free-exercise-db`) nennt in ihrer README **keine** Bildquelle und **keine** Einwilligungs-/Model-Release-Nachweise. In den Repo-Issues (#2, #12, #13) fragen mehrere Nutzer nach dem Lizenzstatus der Bilder — **ohne belastbare Antwort/Auflösung**. Die pauschale „Unlicense"-Angabe bezieht sich erkennbar auf den **Datensatz (JSON)**, nicht nachweislich auf die **Fotos**. Ein Dritter kann Bilder nicht wirksam „ins Public Domain stellen", an denen er selbst keine Rechte hat („nemo dat quod non habet"). Die App **verbreitet** diese Bilder aktiv weltweit (öffentliches Repo, `dist/exercise-images/`, GitHub Pages, PWA-Cache).

**Rechtsgrundlage.** UrhG (Lichtbildwerk § 2 Abs. 1 Nr. 5 / Lichtbild § 72; Vervielfältigung/öffentliche Zugänglichmachung §§ 16, 19a; Schadensersatz/Unterlassung §§ 97 ff.). Recht am eigenen Bild §§ 22, 23 KUG; parallel Art. 6 DSGVO (Verarbeitung personenbezogener Bilddaten ohne Rechtsgrundlage). *Konkrete Herkunft/Rechtekette ist anwaltlich bzw. durch Quellenrecherche final zu klären.*

**Wahrscheinlichkeit × Schaden.** Wahrscheinlichkeit **mittel–hoch** (Bild-Abmahnungen sind das häufigste Massenphänomen; Rechteinhaber/Fotoagenturen scannen aktiv), Schaden **hoch** (Unterlassung + Schadensersatz je Bild/lizenzanaloge Berechnung + Abmahnkosten; bei 55 Bildern skaliert das). **Top-Priorität.**

**Beleg.** `public/exercise-images/bench-press-0.jpg` (Foto realer Person, visuell verifiziert); `public/exercise-images/CREDITS.md:3-6`; `src/data/exerciseImages.ts:3-4`; Redistribution: `dist/exercise-images/` (56 Einträge); GitHub Pages via `.github/workflows/deploy.yml`. Quelle-Zweifel: free-exercise-db Issues [#2](https://github.com/yuhonas/free-exercise-db/issues/2), [#12](https://github.com/yuhonas/free-exercise-db/issues/12), [#13](https://github.com/yuhonas/free-exercise-db/issues/13).

**Abhilfe.**
- **Sofort:** Bilder aus der öffentlichen Verbreitung nehmen (aus `public/`, `dist/`, Deployment entfernen; App zeigt bereits Fallback ohne Bild — `ExerciseThumb` hat Fallback). Solange die Rechtekette nicht positiv belegt ist, gilt: nicht verbreiten.
- **Langfristig:** Bildquelle mit **eindeutiger, kommerziell nutzbarer Lizenz** wählen, bei der Fotografenrecht **und** Model-Release dokumentiert sind (z. B. lizenzierte Stockfotos mit Property/Model Release, oder eigene Aufnahmen mit schriftlichem Model-Release, oder klar CC-lizenzierte Strichzeichnungen/3D-Renderings ohne reale Personen). Attribution/Lizenztext dann auch **in der App** hinterlegen (nicht nur im Repo).

---

### R-02 🔴 Kein Impressum (Anbieterkennzeichnung) einer öffentlich erreichbaren App

**Was & warum.** Die App ist weltweit öffentlich erreichbar, hat aber **kein Impressum**. Geprüft: keine Impressums-Seite/-Route, kein Anbieterhinweis im UI (nur „ForgeFit · Phase 1 · local-first" in `More.tsx`). Für geschäftsmäßige Telemedien besteht Impressumspflicht; die App positioniert sich ausdrücklich als **Produkt** (Arbeitstitel, Schwester-App, „live gehen"). Fehlendes/fehlerhaftes Impressum ist ein klassischer, leicht auffindbarer Abmahngrund.

**Rechtsgrundlage.** § 5 DDG (Digitale-Dienste-Gesetz, seit 2024 Nachfolger von § 5 TMG) — Anbieterkennzeichnung. *Ob die App im konkreten Fall als rein privat/nicht geschäftsmäßig gilt, ist Auslegungsfrage → anwaltlich zu bewerten; im Zweifel Impressum setzen (geringer Aufwand, beseitigt das Risiko).*

**Wahrscheinlichkeit × Schaden.** Wahrscheinlichkeit **mittel** (abhängig von Sichtbarkeit/Reichweite), Schaden **niedrig–mittel** (Abmahnkosten, Unterlassung; leicht heilbar).

**Beleg.** Fehlend im gesamten `src/pages/`; `src/pages/More.tsx:31-33` (nur Footer-Text, keine Anbieterangabe).

**Abhilfe.** *Sofort:* Impressums-Seite/-Route mit vollständiger Anbieterkennzeichnung (Name, ladungsfähige Anschrift, Kontakt) ergänzen, aus „Mehr" verlinkt. *Langfristig:* bei Firmen-/GmbH-Struktur bzw. späterem Backend/Konten die Angaben entsprechend erweitern.

---

### R-03 🔴/🟠 Keine Datenschutzerklärung

**Was & warum.** Es gibt **keine Datenschutzerklärung** in der App. Entlastend: Daten liegen aktuell nur lokal (`localStorage`), es werden **keine** externen Fonts/Analytics/CDNs nachgeladen (verifiziert: keine externen URLs in `src/`, `--font-sans` referenziert nur den Namen „Inter" ohne Bundling, Icons sind Inline-SVG). Dennoch: (a) informationspflichtig ist man auch bei minimaler Verarbeitung, (b) die App setzt einen **Service Worker/PWA-Cache** (Zugriff auf Endgerät-Speicher), (c) das Risiko wächst sprunghaft, sobald das geplante Backend/Konten/Sync/Health-Anbindung kommt.

**Rechtsgrundlage.** Art. 12–14 DSGVO (Informationspflichten); § 25 TDDDG (Einwilligung für Zugriff auf Endeinrichtungen, seit 2024 Nachfolger von § 25 TTDSG) — *Anwendbarkeit auf reinen First-Party-`localStorage`/technisch erforderlichen SW-Cache anwaltlich zu prüfen.*

**Wahrscheinlichkeit × Schaden.** Aktuell Wahrscheinlichkeit **niedrig–mittel**, Schaden **niedrig** (lokaler Stand); **steigt auf hoch**, sobald personenbezogene Daten das Gerät verlassen. Vor „Live"/Backend zwingend.

**Beleg.** Fehlend in `src/pages/`; Datenlage bestätigt in `PROJECT_KNOWLEDGE.md:60-65`; PWA/SW in `vite.config.ts` (vite-plugin-pwa) und Runtime-Cache für `/exercise-images/`.

**Abhilfe.** *Sofort:* schlanke Datenschutzerklärung („keine Server-Übertragung, alles lokal, PWA-Cache") einbauen. *Langfristig:* vor Backend-Anbindung vollständige DSE inkl. Rechtsgrundlagen, Speicherdauer, ggf. Auftragsverarbeiter (Cloudflare/Supabase), Betroffenenrechte; ggf. Consent-Mechanik.

---

### R-04 🟠 „Im Stil von AlphaProgression" + bewusste „AP-Look"-Nachbildung (Marken- & Wettbewerbsrecht)

**Was & warum.** Öffentliche Projektdoku beschreibt ForgeFit wörtlich als App **„(im Stil von AlphaProgression)"** und dokumentiert gezielte Nachbildung des „AP-Looks"/„AP-Stils" (plan-zentrierte Startseite, Bilder-Streifen, Wochenkalender). **AlphaProgression = Alpha Progression GmbH**, reale deutsche Firma, ~1,9 Mio. Downloads. Abzugrenzen:
- **Erlaubt:** bloße Inspiration durch Funktions-/Bedienideen — Ideen und funktionale Konzepte sind nicht urheberrechtlich geschützt.
- **Riskant:** das **fremde Kennzeichen namentlich** in der eigenen Produktkommunikation zu führen und den Wiedererkennungswert/Ruf des Vorbilds für das eigene Angebot zu nutzen; zusätzlich eine erkennbar auf Herkunftsnähe angelegte Nachahmung der konkreten Gestaltung.

Kein Hinweis auf **Scraping** der AP-Datenbank/Inhalte gefunden — Seed-Übungen und Instruktionstexte sind kurz, generisch, deutsch, offensichtlich selbst formuliert (`src/data/exercises.ts`). Das ist entlastend; der Punkt ist bei künftigen Datenimporten aber wachzuhalten.

**Rechtsgrundlage.** MarkenG (§ 14 Verwechslungs-/Rufausbeutung bei eingetragener Marke; § 5/§ 15 geschäftliche Bezeichnung/Unternehmenskennzeichen). UWG § 4 Nr. 3 (unlautere Nachahmung mit Herkunftstäuschung/Rufausnutzung), § 4 Nr. 4 (gezielte Behinderung), § 6 (vergleichende Werbung). *Ob Alpha Progression eine eingetragene DE-/EU-Marke hält, wurde hier nicht abschließend im DPMA/EUIPO verifiziert → offener Punkt; Unternehmenskennzeichenschutz besteht faktisch bereits durch die Firma.*

**Wahrscheinlichkeit × Schaden.** Solange ForgeFit privat/klein ist: Wahrscheinlichkeit **niedrig**; mit öffentlicher Vermarktung als Konkurrenzprodukt **mittel**. Schaden **mittel** (Unterlassung der Aussage/Gestaltungsnähe, Abmahnkosten).

**Beleg.** `README.md:3` („im Stil von AlphaProgression"); `PROJECT_KNOWLEDGE.md:16`; `DEVELOPER_BRIEF.md:105-140` („AP-Stil", „AP-Look"); Code-Kommentar `src/pages/workouts/WorkoutEditor.tsx:190` („wie bei Alpha"). Firma: [alphaprogression.com](https://alphaprogression.com/en), [Google Play](https://play.google.com/store/apps/details?id=com.alphaprogression.alphaprogression).

**Abhilfe.** *Sofort:* die öffentliche Aussage **„im Stil von AlphaProgression" aus README/öffentlicher Doku entfernen** bzw. durch neutrale, nicht-vergleichende Eigenbeschreibung ersetzen („Trainingsplanung & Progression-Tracking"); den fremden Markennamen nicht in Produkt-/Store-Kommunikation führen. Interne Kommentare mit „Alpha" bereinigen (kosmetisch, da Repo öffentlich). *Langfristig:* eigenständige Gestaltungssprache sicherstellen (kein 1:1-„AP-Look"), keine AP-Inhalte/DB importieren; bei geplanter Vermarktung als Wettbewerber Marken-/UWG-Check.

---

### R-05 🟠 Eigener Name „ForgeFit"/„Fitworld" markenrechtlich ungeprüft

**Was & warum.** Zwei aktive Namen im Umlauf (App-Titel „ForgeFit" in `index.html`/`package.json`, Repo/Deploy-Pfad „Fitworld"). Beide sind **nicht auf ältere Marken Dritter geprüft**. „Fit"-lastige Namen sind im Sport-/App-Bereich stark belegt — Kollisionsrisiko real. Wer unter einem kollidierenden Zeichen auftritt, wird selbst **abgemahnt** (Unterlassung, ggf. Rebranding-Kosten nach Marktauftritt).

**Rechtsgrundlage.** MarkenG § 14 (Verletzung fremder Marke), § 15 (geschäftliche Bezeichnung). *Kollisionsprüfung erfordert DPMA/EUIPO-Recherche → anwaltlich/über Recherchedienst.*

**Wahrscheinlichkeit × Schaden.** Vor Marktauftritt Wahrscheinlichkeit **niedrig**, aber Schaden **potenziell hoch** (spätes Rebranding nach Markenaufbau ist teuer). Günstig, wenn **vor** Namensfinalisierung geklärt.

**Beleg.** `index.html:11` (`<title>ForgeFit`); `package.json:2` (`"name": "forgefit"`); Repo-/Deploy-Name „Fitworld" (`vite.config.ts` base `/Fitworld/`, `README.md:39-40`); offene Namensfrage `PROJECT_KNOWLEDGE.md:109`.

**Abhilfe.** *Sofort:* vor jeder Vermarktung Identitäts-/Ähnlichkeitsrecherche (DPMA DE, EUIPO, ggf. USPTO) für Wunschnamen in Klasse 9 (Software) / 41 (Fitness). *Langfristig:* freien Namen wählen und ggf. selbst als Marke anmelden.

---

### R-06 🟡 Repo-Lizenz-Widerspruch / kleinere Punkte

**Was & warum.** `package.json:license = "UNLICENSED"`, es existiert **keine `LICENSE`-Datei**, aber der Quellcode wird öffentlich verbreitet — ohne Lizenz haben Dritte keine Nutzungsrechte (das ist erlaubt, aber inkonsistent zur „Public"-Aufstellung; primär Klarheit/Compliance-Frage, kein Abmahnrisiko gegen ForgeFit). Font-Referenz „Inter" ist nur ein CSS-Name ohne mitgelieferte Schriftdatei → **keine** Font-Lizenzpflicht ausgelöst. Bibliotheken (React, react-router, recharts) sind MIT-lizenziert — unkritisch, sofern keine falschen Aussagen dazu gemacht werden.

**Rechtsgrundlage.** Vertrags-/Urheberrecht (Lizenzkonsistenz). Kein spezifischer Abmahntatbestand erkennbar.

**Wahrscheinlichkeit × Schaden.** Sehr niedrig.

**Beleg.** `package.json:14` (`"license": "UNLICENSED"`); keine `LICENSE`-Datei im Root; `src/index.css:28` (`--font-sans: 'Inter', …`).

**Abhilfe.** *Sofort:* keine dringende Maßnahme. *Langfristig:* bewusste Lizenzentscheidung fürs Repo (proprietär vs. offen) und ggf. `LICENSE` ergänzen; falls „Inter" tatsächlich verwendet werden soll, Schrift sauber (OFL) einbinden und Lizenztext beilegen.

---

## 3. Sofort-To-dos (priorisiert)

1. **Übungsfotos aus der öffentlichen Verbreitung nehmen** (aus `public/exercise-images/`, `dist/`, Deployment/GitHub Pages) bis die Rechtekette positiv belegt ist — App funktioniert mit vorhandenem Bild-Fallback weiter. **(R-01, höchste Priorität)**
2. **Bildquelle langfristig ersetzen** durch Material mit dokumentierter kommerzieller Lizenz **und** Model-Release (Stock mit Release, eigene Aufnahmen, oder personenfreie Illustrationen/Renderings); Lizenz-/Attributionstext in der App hinterlegen. **(R-01)**
3. **Impressum** (Anbieterkennzeichnung nach § 5 DDG) als Seite/Route ergänzen, aus „Mehr" verlinkt. **(R-02)**
4. **Datenschutzerklärung** ergänzen (aktuell schlank: „alles lokal, keine Server-Übertragung, PWA-Cache"); vor jedem Backend-/Konten-Schritt vollständig ausbauen. **(R-03)**
5. **Aussage „im Stil von AlphaProgression"** aus README und öffentlicher Doku entfernen/neutralisieren; fremden Markennamen nicht in Produkt-/Store-Kommunikation führen; „Alpha"-Kommentare im Code bereinigen. **(R-04)**
6. **Namensklärung „ForgeFit"/„Fitworld"**: Marken-Recherche (DPMA/EUIPO) **vor** Vermarktung und finaler Namenswahl. **(R-05)**

---

## 4. Offene Punkte / anwaltliche Nachrecherche

- **Herkunft & Rechtekette der Übungsfotos** final klären: Wer ist Fotograf/Rechteinhaber? Gibt es Model-Releases der abgebildeten Personen? Trägt die „Unlicense"-Kette überhaupt für die Fotos? (Quellenlage in free-exercise-db offen/streitig — Issues #2/#12/#13.) → **Fachanwalt Urheber-/Medienrecht.**
- **Registrierter Markenstatus von „Alpha Progression"** (DE-DPMA / EU-EUIPO / ggf. USPTO) — hier **nicht** abschließend recherchiert; Unternehmenskennzeichenschutz besteht faktisch bereits.
- **Impressumspflicht im konkreten Fall** (privat/nicht-geschäftsmäßig vs. geschäftsmäßig) — Auslegung; im Zweifel Impressum setzen.
- **§ 25 TDDDG-Anwendbarkeit** auf reinen First-Party-`localStorage` und technisch erforderlichen Service-Worker-Cache.
- **Kollisionsrecherche** für den finalen App-Namen (Klassen 9/41).
- **Auslandsrisiko (US):** Falls die Fotoquelle aus den USA stammt, zusätzlich US-Copyright/Right-of-Publicity — bei weltweiter Erreichbarkeit relevant; verstärkt To-do 1/2.

---

## 5. Disclaimer

Dieser Bericht ist eine **interne, KI-gestützte Ersteinschätzung zur Priorisierung** und **keine Rechtsberatung** im Sinne des Rechtsdienstleistungsgesetzes (RDG). Er erhebt keinen Anspruch auf Vollständigkeit; genannte Normen dienen der Orientierung. Es wurden **keine** Paragraphen, Urteile, Fristen oder Abmahnsummen erfunden; unsichere Punkte sind als „anwaltlich zu prüfen" bzw. „offener Punkt" gekennzeichnet. Für verbindliche Bewertungen und vor jeder Live-/Vermarktungsentscheidung ist ein **Fachanwalt für Urheber- und Medienrecht** bzw. für **gewerblichen Rechtsschutz/IT-Recht** hinzuzuziehen.
