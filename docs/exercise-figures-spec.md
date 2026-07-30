# Übungs-Muskelfiguren — Style-Spec & Generierungs-Prompt

Ziel: personenfreie, anatomische **Muskelfiguren** (Écorché — Haut entfernt, nur
Muskulatur), freigestellt (transparenter Hintergrund), minimalistisch, passend
zum dunklen ForgeFit-Look. Sie ersetzen die entfernten Fotos (Risiko R-01).

## ⚖️ Rechtliche Leitplanken (verbindlich — von Justus)

1. **Frisch generieren, NICHT die alten Fotos umrechnen.** Die bisherigen Fotos
   niemals als Input/Vorlage („image-to-image") in ein Tool laden — schon der
   Upload wäre eine ungenehmigte Vervielfältigung (§ 16 UrhG). Pose nur **lose**
   an der Übungsbewegung orientieren (die Bewegung selbst ist eine freie, nicht
   schützbare Idee).
2. **Tool-Check vor Nutzung:** kommerzielle Nutzung des Outputs erlaubt? Rechte am
   Output werden dir eingeräumt? Keine „Input-Gewährleistungsfalle"? „No-training"-
   Option bevorzugen. (Details: `docs/legal/` / Justus fragen.)
3. **Erzeugung dokumentieren:** Tool, Datum, Prompt/Settings je Bild bzw. je Batch —
   als Nachweis eigenständiger Schöpfung. Ergebnis in `CREDITS.md` festhalten.
4. **Keine fremden Marken/Logos** im Bild (z. B. auf Geräten/Hanteln).

## Bild-Spezifikation

| Eigenschaft | Vorgabe |
|---|---|
| Format | **PNG mit Transparenz** (freigestellt, kein Hintergrund) |
| Kantenlänge | quadratisch, **1024 × 1024 px** (App skaliert runter) |
| Motiv | eine anatomische Muskelfigur, Ganzkörper oder relevanter Ausschnitt |
| Hintergrund | **vollständig transparent** (kein Studio, kein Boden, kein Schatten-Boden) |
| Perspektive | über alle Bilder **konsistent** (leichte 3/4-Ansicht), gleicher Bild-Zoom |
| Stil | klinisch-sauber, edel, „medical illustration", weich beleuchtet |
| Farbwelt | Muskulatur in gedämpften anatomischen Rottönen; **trainierter Zielmuskel dezent hervorgehoben** (heller/gesättigter oder mit sanftem Glow in Brand-Violett `#7c5cff`) |
| Geräte/Hantel | nur angedeutet, neutral, ohne Marken; oder ganz weglassen |
| Verboten | Haut, Gesichter, Haare, reale Personen, Text, Logos, Wasserzeichen, Hintergrund |

## Namensschema

Pro Übung zwei Bilder (Start/Ende), Ausnahme Cardio (nur eins):

```
<übungs-key>-0.png   → Startposition
<übungs-key>-1.png   → Endposition
```

Ablage in `public/exercise-images/`. Danach im Mapping
`src/data/exerciseImages.ts` (mit denselben `seed:*`-Keys) eintragen — Javis
übernimmt den Einbau.

## Master-Prompt (wiederverwendbar, Englisch)

> Anatomical muscle figure (écorché), skin removed showing only the muscular
> system, performing **{ÜBUNG}**, **{POSITION}** position. Clean medical
> illustration style, soft studio lighting, muted anatomical red muscle tones,
> the **{ZIELMUSKEL}** subtly emphasized (slightly brighter with a soft violet
> glow #7c5cff). Three-quarter view, full figure centered. **Fully transparent
> background, no background, no floor, no shadow on ground.** Minimalist, elegant,
> health-focused. No skin, no face, no hair, no real person, no text, no logos,
> no equipment branding.

**Negative prompt:** `skin, face, hair, realistic human, photo, background,
studio, floor, ground shadow, text, watermark, logo, brand, nsfw`

Platzhalter je Zeile aus der Tabelle unten einsetzen. `{POSITION}` = `starting`
(für `-0`) bzw. `ending` / `contracted` (für `-1`).

## Übungsliste (28 Übungen, Zielmuskel-Hervorhebung)

| Key | Übung | {ZIELMUSKEL} für Prompt | Bilder |
|---|---|---|---|
| seed:bench-press | Bankdrücken (LH) | chest / pectorals | 0,1 |
| seed:incline-db-press | Schrägbankdrücken (KH) | upper chest | 0,1 |
| seed:chest-fly | Fliegende | chest / pectorals | 0,1 |
| seed:pushup | Liegestütze | chest, triceps | 0,1 |
| seed:deadlift | Kreuzheben | back, hamstrings, glutes | 0,1 |
| seed:pullup | Klimmzüge | lats | 0,1 |
| seed:barbell-row | Langhantelrudern | back, lats | 0,1 |
| seed:lat-pulldown | Latzug | lats | 0,1 |
| seed:seated-row | Rudern am Kabel | back | 0,1 |
| seed:overhead-press | Schulterdrücken (LH) | shoulders / deltoids | 0,1 |
| seed:lateral-raise | Seitheben | side deltoids | 0,1 |
| seed:face-pull | Face Pull | rear deltoids, traps | 0,1 |
| seed:barbell-curl | Bizeps-Curls (LH) | biceps | 0,1 |
| seed:db-curl | Bizeps-Curls (KH) | biceps | 0,1 |
| seed:triceps-pushdown | Trizeps-Drücken | triceps | 0,1 |
| seed:dips | Dips | triceps, lower chest | 0,1 |
| seed:back-squat | Kniebeuge (LH) | quads, glutes | 0,1 |
| seed:leg-press | Beinpresse | quads, glutes | 0,1 |
| seed:romanian-deadlift | Rumän. Kreuzheben | hamstrings, glutes | 0,1 |
| seed:leg-curl | Beinbeuger | hamstrings | 0,1 |
| seed:leg-extension | Beinstrecker | quadriceps | 0,1 |
| seed:calf-raise | Wadenheben | calves | 0,1 |
| seed:hip-thrust | Hip Thrust | glutes | 0,1 |
| seed:plank | Plank | abs / core | 0,1 |
| seed:hanging-leg-raise | Hängendes Beinheben | abs | 0,1 |
| seed:cable-crunch | Crunch am Kabel | abs | 0,1 |
| seed:rowing-machine | Rudergerät | full body (cardio) | 0 |
| seed:treadmill | Laufband | full body (cardio) | 0 |

## Vorgehen

1. **Test zuerst:** 2–3 Übungen generieren (Vorschlag: `bench-press`,
   `back-squat`, `barbell-curl`) → Look im Team freigeben.
2. Nach Freigabe: restliche Übungen im selben Stil/Setting generieren.
3. Bilder (transparente PNGs, korrekt benannt) an Javis → Einbau in
   `exerciseImages.ts`, `CREDITS.md` aktualisieren, Build + Screenshot-Verify,
   Deploy.
