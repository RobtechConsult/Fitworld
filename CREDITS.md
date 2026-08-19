# Image generation record

## ForgeFit exercise figures — intake 2026-07-31

- **Asset:** `public/exercise-images/bench-press-0.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), followed by local chroma-key alpha extraction.
- **Date:** 2026-07-31
- **Source inputs:** None. This asset was generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt:** `Anatomical muscle figure (écorché), skin removed showing only the muscular system, performing a flat barbell bench press, starting position: lying supine on a minimal neutral flat bench with an unbranded plain barbell held just above the chest, elbows bent. Clean medical illustration style, soft lighting, muted anatomical red muscle tones, the chest / pectorals subtly emphasized (slightly brighter, soft violet glow #7c5cff). Three-quarter view from the front-side, full figure centered. No skin, no face, no hair, no real person, no text, no logos, no branding.`
- **Transparency processing:** Generated on a flat `#00ff00` chroma-key backdrop; removed locally with the repository-independent OpenAI image-generation helper. Final output validated as 1024 × 1024 RGBA PNG with transparent corners.

## ForgeFit exercise figures — intake 2026-08-19

- **Assets:** `public/exercise-images/barbell-curl-0.png`, `public/exercise-images/barbell-curl-1.png`, `public/exercise-images/back-squat-0.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), followed by local chroma-key alpha extraction and 1024 × 1024 downscaling.
- **Date:** 2026-08-19
- **Source inputs:** None. All three assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Clean medical illustration of a stylized full-body anatomical muscle mannequin, an abstract non-human educational model with no skin and no facial features, executing {exercise}, {position}. Muted anatomical red muscle tones, soft diffuse lighting. Highlight only the {target muscle} subtly brighter with a soft violet glow #7c5cff. Front-side three-quarter view, centered, same compact framing and elegant health-app style as an exercise illustration set. Scene/backdrop: perfectly flat #00ff00 chroma-key background, no floor, no shadows, no texture. Constraints: no skin, no face, no hair, no real person, no text, no logo, no watermark, no branding, no equipment branding, no green in subject; 1024x1024.`
- **Prompt substitutions:** `barbell curl / starting position / biceps`; `barbell curl / contracted ending position / biceps`; `barbell back squat / starting position / quadriceps and glutes`.
- **Transparency processing:** Final output of each asset was validated as a 1024 × 1024 RGBA PNG with transparent corners.
