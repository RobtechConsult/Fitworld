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

## ForgeFit exercise figures — intake 2026-08-20 (triceps pushdown)

- **Assets:** `public/exercise-images/triceps-pushdown-0.png`, `public/exercise-images/triceps-pushdown-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Clean minimal medical illustration of a stylized full-body anatomical muscle mannequin, an abstract non-human educational model made only of visible musculature with a featureless head, executing {position} of a standing cable triceps pushdown at a compact neutral unbranded cable station. Soft diffuse lighting, muted anatomical red tones. Highlight the triceps muscles subtly brighter with a soft violet #7c5cff glow. Light front-side three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor, no shadow. Constraints: no skin, face, hair, real person, text, watermark, logo, branding, or equipment branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / elbows bent close to the sides and straight bar at lower-chest height`; `contracted ending / elbows fully extended and straight bar beside the upper thighs`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (lat pulldown)

- **Assets:** `public/exercise-images/lat-pulldown-0.png`, `public/exercise-images/lat-pulldown-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Clean minimal medical illustration of a stylized full-body abstract anatomical muscle mannequin, a non-human educational model made only of visible red musculature with a smooth featureless head, seated at a compact neutral unbranded vertical cable-pull station in {position}. Soft diffuse lighting, muted anatomical red tones. Highlight the latissimus dorsi muscles subtly brighter with a soft violet #7c5cff glow. Light side-front three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor, no shadow. Constraints: no skin, face, hair, real person, text, watermark, logo, branding, or equipment branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `start / hands grip the overhead straight bar with arms fully raised and elbows straight`; `contracted ending / bar level with the collarbone, elbows flexed beside the ribs`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (barbell row)

- **Assets:** `public/exercise-images/barbell-row-0.png`, `public/exercise-images/barbell-row-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Clean minimal medical illustration of a stylized full-body abstract anatomical muscle mannequin, a non-human educational model made only of visible red musculature with a smooth featureless head, demonstrating {position} of a standing barbell row with an unbranded straight weighted bar. Soft diffuse lighting, muted anatomical red tones. Highlight the latissimus dorsi and middle-back muscles subtly brighter with a soft violet #7c5cff glow. Light side-front three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor, no shadow. Constraints: no skin, face, hair, real person, text, watermark, logo, branding, or equipment branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / shallow forward incline, flat back, arms long under the shoulders`; `contracted ending / bar adjacent to the lower ribcage and upper arms drawn back along the torso`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (dumbbell curl)

- **Assets:** `public/exercise-images/db-curl-0.png`, `public/exercise-images/db-curl-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Clean minimal medical illustration of a stylized full-body abstract anatomical muscle mannequin, a non-human educational model made only of visible red musculature with a smooth featureless head, demonstrating {position} of a standing dumbbell curl with simple neutral unbranded dumbbells. Soft diffuse lighting, muted anatomical red tones. Highlight the biceps muscles subtly brighter with a soft violet #7c5cff glow. Light front-side three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor, no shadow. Constraints: no skin, face, hair, real person, text, watermark, logo, branding, or equipment branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / arms extended comfortably at the sides`; `contracted ending / upper arms vertical beside the torso, forearms upright and weights in front of the shoulders`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (push-up)

- **Assets:** `public/exercise-images/pushup-0.png`, `public/exercise-images/pushup-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Minimal clinical exercise diagram showing a full-body abstract anatomical muscle mannequin with a smooth featureless head and visible red musculature only, demonstrating {position} of a horizontal upper-body support drill. Soft diffuse lighting, muted anatomical red tones. Highlight the pectoral and triceps muscle groups subtly brighter with a soft violet #7c5cff glow. Light side-front three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor, no shadow. Constraints: educational non-human anatomy model only; no skin, face, hair, real person, text, watermark, logo, or branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / straight arms, hands below shoulders, body as a rigid horizontal line`; `contracted ending / elbows approximately at a right angle with torso lower while body stays straight`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — cardio style correction 2026-08-20

- **Replaced assets:** `public/exercise-images/treadmill-0.png`, `public/exercise-images/rowing-machine-0.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both replacements were generated fresh; no prior exercise images, photos, or third-party image inputs were used.
- **Prompt pattern:** `Minimal matte medical illustration, NOT a glossy 3D render. A full-body abstract anatomical muscle mannequin, non-human and made only of visible red musculature with a smooth featureless head, performing {cardio keyframe} on a compact neutral unbranded {machine}. Render with subdued matte anatomical reds, restrained diffuse shading, and an elegant printed anatomy-plate feel. No muscle highlight, violet color, glow, aura, rim light, bloom, shiny or plastic material rendering. Scene/backdrop: fully transparent background; no floor or cast shadow. Light front-side three-quarter view, full figure centered with compact consistent zoom. Constraints: no skin, face, hair, real person, text, watermark, logo, or branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `calm walking keyframe / treadmill`; `seated cardio keyframe with handle forward, taut cable and flexed knees / indoor rower`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (incline dumbbell press)

- **Assets:** `public/exercise-images/incline-db-press-0.png`, `public/exercise-images/incline-db-press-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Clean minimal medical illustration of a stylized full-body abstract anatomical muscle mannequin, a non-human educational model made only of visible red musculature with a smooth featureless head, demonstrating {position} of an inclined dumbbell press against a compact neutral unbranded 45-degree exercise backrest. Soft diffuse lighting, muted anatomical red tones. Highlight the upper pectoral chest muscles subtly brighter with a soft violet glow #7c5cff. Light side-front three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor, no shadow. Constraints: no skin, face, hair, real person, text, watermark, logo, branding, or equipment branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / elbows flexed and dumbbells at upper-chest level`; `contracted ending / dumbbells above the upper chest, forearms vertical, elbows nearly straight`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (leg press)

- **Assets:** `public/exercise-images/leg-press-0.png`, `public/exercise-images/leg-press-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Minimal clinical exercise diagram showing a full-body abstract anatomical muscle mannequin with a smooth featureless head and visible red musculature only, seated upright in a compact neutral unbranded angled lower-body resistance machine. Depict {position}. Soft diffuse lighting, muted anatomical red tones. Highlight the quadriceps muscles subtly brighter with a delicate violet #7c5cff glow. Light side-front three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor, no shadow. Constraints: educational non-human anatomy model only; no skin, face, hair, real person, text, watermark, logo, or branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / feet on raised footplate with knees flexed comfortably`; `contracted ending / feet remain on footplate while lower limbs extend forward with a slight safe knee bend`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (deadlift)

- **Assets:** `public/exercise-images/deadlift-0.png`, `public/exercise-images/deadlift-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Minimal clinical exercise diagram showing a full-body abstract anatomical muscle mannequin with a smooth featureless head and visible red musculature only, demonstrating {position} of a neutral straight-bar lifting exercise with a simple unbranded weighted straight bar. Soft diffuse lighting, muted anatomical red tones. Highlight the posterior chain muscles subtly brighter with a delicate violet #7c5cff glow. Light side-front three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor, no shadow. Constraints: educational non-human anatomy model only; no skin, face, hair, real person, text, watermark, logo, or branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / upright posture with bar in front of the thighs`; `ending / athletic squat-hinge stance, long neutral spine, and bar near the lower shins`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (plank)

- **Assets:** `public/exercise-images/plank-0.png`, `public/exercise-images/plank-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Elegant scientific anatomy plate of a full-body ecorché museum study figure, an explicitly non-human educational sculpture made solely from muted red muscle fibers with a featureless oval head, demonstrating {static plank keyframe}. Soft diffuse medical lighting with no glossy rendering; abdominal wall only slightly brighter with a delicate violet #7c5cff emphasis. Light side-front three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor or cast shadow. Constraints: no skin, person, facial features, hair, text, watermark, logo, or branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `start / high-plank hold, level body line, hands below shoulders and toes behind`; `sustained ending / same high-plank isometric hold in a stable maintained position`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-20 (cable crunch)

- **Assets:** `public/exercise-images/cable-crunch-0.png`, `public/exercise-images/cable-crunch-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-20
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos or third-party image inputs were used.
- **Prompt pattern:** `Elegant scientific anatomy plate of a full-body ecorché museum study figure, an explicitly non-human educational sculpture made solely from muted red muscle fibers with a featureless oval head, seated at a compact neutral unbranded cable abdominal machine in {position}. Soft diffuse medical lighting with no glossy rendering; abdominal wall only slightly brighter with a delicate violet #7c5cff emphasis. Light front-side three-quarter view, full figure centered with compact consistent zoom. Scene/backdrop: fully transparent background; no floor or cast shadow. Constraints: no skin, person, facial features, hair, text, watermark, logo, or branding. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / torso tall with rope attachment above shoulders`; `contracted ending / controlled forward spinal curve with rope attachment beside the head`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-21 (calf raise)

- **Assets:** `public/exercise-images/calf-raise-0.png`, `public/exercise-images/calf-raise-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-21
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos, images, or third-party inputs were used.
- **Prompt pattern:** `Minimal clinical anatomy plate showing only a relevant lower-leg écorché study: a non-human museum teaching model from just below the knees to the feet, made entirely from muted anatomical red muscle fibers, tendons, and bones, with no torso or pelvis. The model is performing a standing calf raise on a compact neutral unbranded step. {keyframe}. Subtly brighten only the gastrocnemius and soleus muscles with a delicate violet #7c5cff emphasis. Fully transparent background, no floor, no shadow. Clean matte medical illustration, soft diffuse lighting, no glossy 3D render. Precise lower-leg crop, centered, consistent gentle three-quarter front-side view. Constraints: no skin, face, hair, real person, text, logos, branding, or watermark. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / both ankle joints neutral and heel bones resting low while toes are supported at the edge`; `ending / both ankle joints extended, heel bones lifted high, and forefeet/toes supported on the step edge`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners.

## ForgeFit exercise figures — intake 2026-08-21 (chest fly)

- **Assets:** `public/exercise-images/chest-fly-0.png`, `public/exercise-images/chest-fly-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-21
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos, images, or third-party inputs were used.
- **Prompt pattern:** `Elegant scientific anatomy plate of an upper-body écorché museum teaching model, non-human and made only of muted red muscle fibers, bones, and tendons, with a smooth featureless oval head. The model is seated upright at a compact neutral unbranded pec-deck resistance machine. {keyframe}. Subtly brighten only the pectoral chest muscles with a delicate violet #7c5cff emphasis. Fully transparent background, no floor, no shadow. Clean matte medical illustration, soft diffuse lighting, no glossy 3D render, diagrams, or callouts. Upper-body relevant crop, centered, gentle front-side three-quarter view. Constraints: no skin, face, hair, real person, text, logos, branding, or watermark. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / elbows slightly bent and padded forearm supports open wide at the sides`; `ending / padded forearm supports meet directly in front of the chest, elbows gently bent, torso upright`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners; the ending asset's imperceptible low-alpha corner pixels were cleared during local alpha validation.

## ForgeFit exercise figures — intake 2026-08-21 (leg extension)

- **Assets:** `public/exercise-images/leg-extension-0.png`, `public/exercise-images/leg-extension-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-21
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos, images, or third-party inputs were used.
- **Prompt pattern:** `Minimal clinical anatomy plate showing a relevant lower-body écorché study, an explicitly non-human museum teaching model made only of muted red muscle fibers, bones, and tendons. The model is seated at a compact neutral unbranded knee-extension rehabilitation machine. {keyframe}. Subtly brighten only the quadriceps muscles with a delicate violet #7c5cff emphasis. Fully transparent background, no floor, no shadow. Clean matte medical illustration, soft diffuse lighting, no glossy 3D render, diagrams, or callouts. Relevant lower-body crop centered, gentle front-side three-quarter view. Constraints: no skin, face, hair, real person, text, logos, branding, or watermark. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / knees bent and padded roller resting just above the lower shins`; `ending / shins forward almost horizontal, padded roller contacting the front of each lower shin, knee joints retaining a small safety angle`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners; imperceptible low-alpha background pixels were cleared during local alpha validation.

## ForgeFit exercise figures — intake 2026-08-21 (leg curl)

- **Assets:** `public/exercise-images/leg-curl-0.png`, `public/exercise-images/leg-curl-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-21
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos, images, or third-party inputs were used.
- **Prompt pattern:** `Clean biomechanical anatomy teaching plate showing two artificial lower-limb écorché specimens, from upper thigh to foot only, constructed entirely from muted anatomical-red muscle fibers, white tendons, and bone. The specimens rest in a compact neutral unbranded knee-flexion apparatus. {keyframe}. Only the hamstring muscle fibers are subtly brighter with a restrained violet #7c5cff accent. Isolated fully transparent alpha canvas; no room, floor, or shadow. Matte clinical medical illustration with soft diffuse light, no glossy 3D styling, labels, or callouts. Centered lower-limb study crop, gentle three-quarter front-side view. Constraints: anatomy specimens only; no skin, face, hair, person, text, logos, branding, or watermark. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / knee joints nearly open, lower legs directed forward, and horizontal cylindrical pad contacting the back of the lower shins`; `ending / specimens in prone knee-flexion apparatus with knee joints deeply bent, lower legs rotated upward, and cylindrical pad contacting the back of the lower shins near ankles`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners; imperceptible low-alpha background pixels were cleared during local alpha validation.

## ForgeFit exercise figures — intake 2026-08-21 (hip thrust)

- **Assets:** `public/exercise-images/hip-thrust-0.png`, `public/exercise-images/hip-thrust-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-21
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos, images, or third-party inputs were used.
- **Prompt pattern:** `Static clinical biomechanics plate showing an artificial écorché lower-trunk and upper-leg anatomy specimen only, made entirely of muted red muscle fibers, white tendons, and bone, resting against a compact neutral unbranded exercise bench. {keyframe} of a hip-extension drill. Only gluteal muscle fibers have a restrained violet #7c5cff accent. Fully transparent alpha canvas, no environment, floor, or shadow. Matte medical illustration with soft diffuse lighting, no glossy 3D styling, labels, or callouts. Centered lower-trunk and upper-leg study crop, gentle side-front three-quarter view. Constraints: artificial anatomy specimen only; no skin, face, hair, person, text, logos, branding, or watermark. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / shoulder-blade region on bench edge, knees bent, feet planted on neutral support, pelvic frame below knee level`; `ending / shoulder-blade region on bench edge, knees bent, feet planted, pelvis raised so torso and thighs form one level straight horizontal line`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners; imperceptible low-alpha background pixels were cleared during local alpha validation.

## ForgeFit exercise figures — intake 2026-08-21 (hanging leg raise)

- **Assets:** `public/exercise-images/hanging-leg-raise-0.png`, `public/exercise-images/hanging-leg-raise-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-21
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos, images, or third-party inputs were used.
- **Prompt pattern:** `Static medical motion-study plate of an artificial full-body écorché teaching mannequin, built only from muted anatomical-red muscle fibers, tendons, and bone, with a featureless oval head, positioned in a compact neutral unbranded vertical knee-lift support frame. {keyframe}. Only the abdominal wall and hip-flexor fibers carry a restrained violet #7c5cff accent. Fully transparent alpha canvas, no environment, floor, or shadow. Matte printed medical-plate illustration with soft diffuse light, no glossy 3D material, labels, or callouts. Centered full teaching mannequin, compact consistent zoom, gentle front-side three-quarter view. Constraints: artificial educational mannequin only; no skin, face, hair, person, text, logos, branding, or watermark. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / trunk vertical, lower limbs vertical beneath pelvic frame, knees gently relaxed`; `ending / trunk vertical and still, knee joints bent, thigh bones lifted roughly horizontal in front of pelvic frame`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners; imperceptible low-alpha background pixels were cleared during local alpha validation.

## ForgeFit exercise figures — intake 2026-08-21 (dips)

- **Assets:** `public/exercise-images/dips-0.png`, `public/exercise-images/dips-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-21
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos, images, or third-party inputs were used.
- **Prompt pattern:** `Static medical motion-study plate of an artificial full-body écorché teaching mannequin, built only from muted anatomical-red muscle fibers, tendons, and bone, with a featureless oval head, supported by two compact neutral unbranded parallel hand rails. {keyframe}. Only triceps and lower pectoral fibers carry a restrained violet #7c5cff accent. Fully transparent alpha canvas, no environment, floor, or shadow. Matte printed medical-plate illustration with soft diffuse light, no glossy 3D material, labels, or callouts. Centered full teaching mannequin, compact consistent zoom, gentle front-side three-quarter view. Constraints: artificial educational mannequin only; no skin, face, hair, person, text, logos, branding, or watermark. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `starting / elbows open, shoulders depressed, torso vertical, lower limbs aligned below rails`; `ending / elbows bent approximately to a right angle, shoulders lowered, torso vertical, lower limbs aligned below rails`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners; imperceptible low-alpha background pixels were cleared during local alpha validation.

## ForgeFit exercise figures — intake 2026-08-21 (Romanian deadlift)

- **Assets:** `public/exercise-images/romanian-deadlift-0.png`, `public/exercise-images/romanian-deadlift-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-21
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos, images, or third-party inputs were used.
- **Prompt pattern:** `Matte technical anatomy plate depicting a non-human articulated biomechanical training automaton. Its chassis visibly consists only of muted-red muscle cables, pale tendons, and bone-like structural elements, with a blank oval cranial shell. {motion frame} of a bar-guidance drill using an unbranded straight bar. A faint #7c5cff technical accent is limited to posterior-thigh and spinal-support fibers. Isolated transparent alpha canvas, no environment, floor, or shadow. Elegant printed engineering-and-medical illustration, soft diffuse light, matte surfaces, no glossy rendering, labels, or callouts. Complete automaton centered, compact consistent zoom, side-front three-quarter view. Constraints: explicitly artificial machine anatomy model; no person, skin, face, hair, text, logos, branding, or watermark. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `frame A / upper assembly vertical, spinal rail straight, knee modules softly bent, arms guiding bar in front of upper-thigh structure`; `frame B / upper assembly angled forward around 45 degrees, spinal rail straight, knee modules slightly bent, arms guiding bar beside lower-leg structure`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners; imperceptible low-alpha background pixels were cleared during local alpha validation.

## ForgeFit exercise figures — cardio ending frames 2026-08-21

- **Assets:** `public/exercise-images/rowing-machine-1.png`, `public/exercise-images/treadmill-1.png`
- **Tool:** OpenAI built-in image generation (`gpt-image-2`), with native PNG alpha transparency and local 1024 × 1024 downscaling.
- **Date:** 2026-08-21
- **Source inputs:** None. Both assets were generated fresh; no prior exercise photos, images, or third-party inputs were used.
- **Prompt pattern:** `Minimal matte medical anatomy plate of a full-body abstract écorché training mannequin, an explicitly non-human educational model made only from muted anatomical-red muscle fibers, tendons, and bone, using a compact neutral unbranded {machine}. {ending keyframe}. No muscle highlight, violet accent, outline, glow, aura, rim light, or bloom. Fully transparent alpha canvas, no floor or shadow. Restrained printed anatomy-plate illustration, soft diffuse lighting, matte materials, no glossy 3D look. Centered full figure, compact consistent zoom, gentle front-side three-quarter view. Constraints: no skin, face, hair, real person, text, logos, branding, or watermark. 1024 × 1024 PNG with alpha transparency.`
- **Prompt substitutions:** `indoor rowing machine / knees nearly extended, torso softly leaned back, handle close to lower rib cage, cable taut`; `treadmill / ordinary walking-cycle configuration with one foot contacting belt and the other lower limb moving forward`.
- **Transparency processing:** Both final outputs were validated as 1024 × 1024 RGBA PNGs with transparent corners; imperceptible low-alpha background pixels were cleared during local alpha validation.
