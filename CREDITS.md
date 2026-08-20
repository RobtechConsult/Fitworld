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

## ForgeFit exercise figures — intake 2026-08-20

- **Assets:** `public/exercise-images/back-squat-1.png`, `public/exercise-images/bench-press-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `A clean, minimal medical illustration of an abstract non-human anatomical muscle mannequin—an educational figure made only of visible musculature, with a featureless head. Demonstrate {exercise}, {position}. Soft lighting, muted anatomical red muscle tones; {target muscles} subtly brighter with a soft violet #7c5cff glow. Consistent light three-quarter front-side view, full figure centered and same compact zoom as a series. Scene/backdrop: fully transparent background; no background, floor, ground plane, or shadow. Constraints: no skin, face, hair, real person, text, watermark, logo, branding, or equipment branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `back squat / lowered, contracted position with knees bent and hips lowered; plain unbranded barbell across upper back / quadriceps and glutes`; `flat barbell bench press / completed top position with elbows nearly straight and bar vertically above chest; plain unbranded bench and barbell / pectoral chest muscles`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (pull-up)

- **Assets:** `public/exercise-images/pullup-0.png`, `public/exercise-images/pullup-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Clean minimal medical illustration of a stylized full-body anatomical muscle mannequin, an abstract non-human educational model made only of visible red musculature with a featureless head, executing {position} of a pull-up on a simple neutral unbranded horizontal bar. Soft diffuse lighting, muted anatomical red tones. Highlight only the latissimus dorsi muscles subtly brighter with a soft violet #7c5cff glow. Light front-side three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor, no shadow. Constraints: no skin, face, hair, real person, text, watermark, logo, branding, or equipment branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / arms fully extended`; `contracted ending / elbows bent and upper torso raised toward the bar`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (shoulders)

- **Assets:** `public/exercise-images/overhead-press-0.png`, `public/exercise-images/overhead-press-1.png`, `public/exercise-images/lateral-raise-0.png`, `public/exercise-images/lateral-raise-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. All four assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Clean minimal medical illustration of a stylized full-body anatomical muscle mannequin, an abstract non-human educational model made only of visible red musculature with a featureless head, executing {exercise}, {position}. Soft diffuse lighting, muted anatomical red tones. Highlight only the {target muscle} subtly brighter with a soft violet #7c5cff glow. Front-side three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor, no shadow. Constraints: no skin, face, hair, real person, text, watermark, logo, branding, or equipment branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `standing barbell overhead press / bar at upper-chest start / shoulder deltoids`; `standing barbell overhead press / bar held overhead at contracted end / shoulder deltoids`; `standing dumbbell lateral raise / arms at sides start / side deltoids`; `standing dumbbell lateral raise / arms extended out to horizontal end / side deltoids`.
- **Transparency processing:** All final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (cardio)

- **Assets:** `public/exercise-images/treadmill-0.png`, `public/exercise-images/rowing-machine-0.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Clean minimal medical illustration of a stylized full-body anatomical muscle mannequin, an abstract non-human educational model made only of visible red musculature with a featureless head, {exercise movement} on a compact neutral unbranded {machine}. Soft diffuse lighting, muted anatomical red tones. Full-body musculature subtly brighter with a soft violet #7c5cff glow. Light front-side three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor, no shadow. Constraints: no skin, face, hair, real person, text, watermark, logo, branding, or equipment branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `controlled mid-stride walking / treadmill`; `seated drive phase / rowing machine`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (seated cable row)

- **Assets:** `public/exercise-images/seated-row-0.png`, `public/exercise-images/seated-row-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Clean minimal medical illustration of a stylized full-body anatomical muscle mannequin, an abstract non-human educational model made only of visible musculature with a featureless head, executing {position} of a seated cable row on a compact neutral unbranded cable rowing station. Soft diffuse lighting, muted anatomical red tones. Highlight the latissimus dorsi and middle back muscles subtly brighter with a soft violet #7c5cff glow. Light front-side three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor, no shadow. Constraints: no skin, face, hair, real person, text, watermark, logo, branding, or equipment branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / arms fully extended holding a straight handle`; `contracted ending / elbows bent behind the torso and handle drawn toward the lower ribs`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (face pull)

- **Assets:** `public/exercise-images/face-pull-0.png`, `public/exercise-images/face-pull-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Clean minimal medical illustration of a stylized full-body anatomical muscle mannequin, an abstract non-human educational model made only of visible musculature with a featureless head, executing {position} of a standing cable face pull at a compact neutral unbranded cable station. Soft diffuse lighting, muted anatomical red tones. Highlight the rear deltoids and upper back muscles subtly brighter with a soft violet #7c5cff glow. Light front-side three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor, no shadow. Constraints: no skin, face, hair, real person, text, watermark, logo, branding, or equipment branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / arms extended forward holding a rope attachment at upper-chest height`; `contracted ending / elbows flared and rope drawn beside the upper face`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.
