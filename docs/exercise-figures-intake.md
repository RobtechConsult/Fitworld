# Bild-Übergabe: ChatGPT → Git → Claude Code (Javis)

Kein direkter Chat nötig. Das **Git-Repo ist die Brücke**: ChatGPT (oder du)
legt die fertigen PNGs ins Repo, Javis übernimmt automatisch den Rest.

```
ChatGPT ──erzeugt & pusht PNGs──► GitHub-Repo ◄── Javis: einbauen, prüfen, deployen
```

## 1. Was geliefert wird

- **Format:** transparentes **PNG**, quadratisch (ideal 1024×1024).
- **Ablageort:** `public/exercise-images/`
- **Namensschema:** `<übungs-key>-0.png` (Start), `<übungs-key>-1.png` (Ende).
  Keys & Zielmuskeln stehen in `docs/exercise-figures-spec.md`.
  Beispiel: `bench-press-0.png`, `bench-press-1.png`.
- **Stil:** exakt nach `docs/exercise-figures-spec.md` (Master-Prompt).

## 2. Zwei Wege, wie die Bilder ins Repo kommen

### Weg A — manuell (sofort, kein Setup)
1. Du generierst in ChatGPT mit dem Master-Prompt.
2. PNGs herunterladen, korrekt benennen.
3. Entweder mir hier schicken **oder** in `public/exercise-images/` auf einem
   Branch ablegen und pushen.

### Weg B — ChatGPT pusht selbst (mehr Setup, einmalig)
Dafür braucht ChatGPT Schreibzugriff auf GitHub — üblich über einen
**Custom GPT mit einer GitHub-Action** (die die GitHub-API `create/update file`
aufruft) oder ein kleines Glue-Skript. Ablauf:
1. Custom GPT erzeugt das Bild und committet es per GitHub-API auf einen Branch
   (z. B. `figures-intake`).
2. Ein Pull Request wird geöffnet.
3. Javis wird über die PR-Aktivität benachrichtigt und übernimmt Schritt 3.

> Hinweis: ChatGPT kann **nicht** von sich aus „in Git pushen" — dieser
> Schreibzugriff muss auf der OpenAI-Seite eingerichtet werden (Custom GPT +
> Action + GitHub-Token). Javis kann das nicht für die OpenAI-Seite tun.

## 3. Was Javis dann automatisch macht

Sobald PNGs im Repo/PR liegen:
1. **Art-Director-Review**: Stil, Transparenz, Perspektive, richtiger Zielmuskel.
2. Mapping in `src/data/exerciseImages.ts` eintragen (gleiche `seed:*`-Keys).
3. `CREDITS.md` mit echter Quelle/Tool/Lizenz aktualisieren.
4. Build + Playwright-Screenshot-Verify.
5. Commit, PR, Merge, Deploy-Verify.

## 4. Rechtliche Leitplanke (Justus)

- Bilder **frisch** aus dem Prompt — die alten Fotos **nicht** als Vorlage
  hochladen.
- Tool prüfen: kommerzielle Nutzung des Outputs + Output gehört dir.
- Erzeugung dokumentieren (Tool, Datum, Prompt) → landet in `CREDITS.md`.
