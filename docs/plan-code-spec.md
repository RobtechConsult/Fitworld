# Plan-Code — Spezifikation (für jeden Coaching-Chat)

Ziel: Trainings zwischen einem Assistenten („Coach") und der ForgeFit-App
austauschen — **ohne Backend, ohne App-Zugriff**. Der Nutzer ist die Brücke:
Status-Code aus der App kopieren → in den Chat; Plan-Code zurück → in die App
(„Mehr → Plan-Code").

Ein Coach braucht nur **dieses Dokument**: das Format + die Übungs-IDs.

## Format

- **`FF1.<base64url>`** — kompakt kodiert: Base64URL der UTF-8-JSON-Nutzlast.
  (Base64URL = normales Base64, dann `+`→`-`, `/`→`_`, `=`-Padding entfernt.)
- **`FF2.<base64url>`** — passwortverschlüsselt (AES-GCM). Für den Austausch
  zwischen Chat und App **`FF1.` verwenden** (FF2. braucht identische Krypto-Params).
- **Gewichte immer in kg.**

### Nutzlast „Trainingsplan" (Coach → App)
```json
{ "v":1, "t":"wo", "n":"Ganzkörper A · Woche 2",
  "e":[ {"x":"seed:back-squat","ss":3,"r":8,"w":45},
        {"x":"seed:bench-press","ss":3,"r":8,"w":40} ] }
```
`ss` = Sätze, `r` = Ziel-Wiederholungen, `w` = Gewicht kg, `x` = Übungs-ID.

### Nutzlast „Status" (App → Coach)
```json
{ "v":1, "t":"exp", "u":"metric",
  "wk":[ {"d":"2026-10-27","n":"Ganzkörper A",
          "e":[ {"x":"seed:back-squat","s":[[8,40],[8,40],[8,40]]} ]} ],
  "bw":[ ["2026-10-25", 82] ] }
```
`wk` = Einheiten (neueste zuerst), `s` = Sätze als `[Wdh, kg]`, `bw` = Körpergewicht `[Datum, kg]`.

## Kodieren / Dekodieren

**Node.js**
```js
const enc = (o) => 'FF1.' + Buffer.from(JSON.stringify(o),'utf8')
  .toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')
const dec = (c) => JSON.parse(Buffer.from(
  c.replace('FF1.','').replace(/-/g,'+').replace(/_/g,'/'),'base64').toString('utf8'))
```

**Python**
```python
import json, base64
def enc(o):
    b = base64.urlsafe_b64encode(json.dumps(o, ensure_ascii=False).encode()).decode()
    return 'FF1.' + b.rstrip('=')
def dec(c):
    b = c.replace('FF1.',''); b += '=' * (-len(b) % 4)
    return json.loads(base64.urlsafe_b64decode(b).decode())
```

> Hinweis: Zuverlässiges Base64 braucht **Code-Ausführung**. Ein Chat ohne
> Code-Tool kann die JSON entwerfen, sollte den Base64-Schritt aber einem
> code-fähigen Helfer überlassen.

## Progressions-Regel (Doppelprogression)

Zielwiederholungen auf allen Sätzen sauber erreicht → Gewicht erhöhen
(Oberkörper +2,5 kg, Unterkörper +2,5–5 kg), Wdh am Bereichsanfang neu starten.
Sonst gleiches Gewicht, 1 Wdh mehr anstreben. Details:
`docs/rea-learnings-roadmap.md`.

## Übungs-IDs (ID immer mit Präfix `seed:` verwenden)

Brust: `bench-press` Bankdrücken (LH) · `db-bench-press` Bankdrücken (KH) ·
`incline-bench-press` Schrägbank (LH) · `incline-db-press` Schrägbank (KH) ·
`chest-fly` Fliegende · `machine-chest-press` Brustpresse · `pushup` Liegestütze
Rücken: `deadlift` Kreuzheben · `pullup` Klimmzüge · `barbell-row` LH-Rudern ·
`lat-pulldown` Latzug · `seated-row` Kabelrudern · `db-row` Einarmrudern ·
`t-bar-row` T-Bar · `back-extension` Hyperextension · `shrugs` Shrugs
Schultern: `overhead-press` Schulterdrücken · `lateral-raise` Seitheben ·
`face-pull` Face Pull · `arnold-press` Arnold-Press · `front-raise` Frontheben ·
`rear-delt-fly` Reverse Butterfly · `upright-row` Aufrechtes Rudern
Arme: `barbell-curl` Curls (LH) · `db-curl` Curls (KH) · `hammer-curl` Hammercurls ·
`preacher-curl` Preacher · `triceps-pushdown` Trizepsdrücken · `dips` Dips ·
`skullcrusher` Stirndrücken · `overhead-triceps-extension` Trizeps über Kopf ·
`close-grip-bench` Enges Bankdrücken · `wrist-curl` Handgelenk-Curls
Beine: `back-squat` Kniebeuge · `front-squat` Frontkniebeuge · `goblet-squat` Goblet ·
`bulgarian-split-squat` Bulgarian Split Squat · `hack-squat` Hack-Squat ·
`leg-press` Beinpresse · `leg-extension` Beinstrecker · `leg-curl` Beinbeuger ·
`romanian-deadlift` RDL · `sumo-deadlift` Sumo-KH · `good-morning` Good Morning ·
`hip-thrust` Hip Thrust · `glute-kickback` Glute Kickback · `hip-abduction` Abduktoren ·
`lunge` Ausfallschritte · `step-up` Step-Ups · `calf-raise` Wadenheben ·
`seated-calf-raise` Wadenheben sitzend
Core: `plank` Plank · `side-plank` Seitstütz · `crunch` Crunches ·
`cable-crunch` Kabel-Crunch · `hanging-leg-raise` Hängendes Beinheben ·
`lying-leg-raise` Beinheben liegend · `russian-twist` Russian Twist ·
`ab-wheel` Ab Wheel · `mountain-climber` Mountain Climbers · `cable-woodchop` Woodchop
Funktionell/Cardio: `kettlebell-swing` KB-Swing · `farmers-walk` Farmer's Walk ·
`burpee` Burpees · `rowing-machine` Rudergerät · `treadmill` Laufband ·
`bike` Fahrrad · `elliptical` Crosstrainer · `stairmaster` Stepper · `jump-rope` Seilspringen
