import type { LearnChapter, LearnPart } from "@/lib/learn-types";

export { LEARN_COMPUTER_VISION_HREF } from "@/lib/links";

/**
 * The Computer Vision track: twenty-two lessons, in order. Parts 1 and 2 get an
 * image down to numbers a model can use; parts 3 and 4 teach it to name what is
 * there and find where; part 5 makes the resulting numbers honest; part 6 is
 * what changes when the model has to run in the world instead of a notebook.
 *
 * Written natively as LearnChapters, the same shape the ML track uses, so this
 * track gets the same sidebar, table of contents, and prev/next pager.
 *
 * `headings` must match the ids the body component renders — scripts/validate-
 * learn-nav.mjs fails the build if they drift.
 */

export const COMPUTER_VISION_PARTS: readonly LearnPart[] = [
  {
    id: "seeing-as-numbers",
    number: 1,
    title: "Seeing as Numbers",
    summary:
      "What a computer actually receives when you hand it a photo, and the operation — sliding a small grid across every pixel — that almost everything else in this track builds on.",
  },
  {
    id: "getting-a-clean-signal",
    number: 2,
    title: "Getting a Clean Signal",
    summary:
      "Edges, corners, and the preprocessing that turns an inconsistent pile of photos into something a model can actually learn from.",
  },
  {
    id: "teaching-a-model-to-recognise",
    number: 3,
    title: "Teaching a Model to Recognise",
    summary:
      "From a weight on every pixel to a network that learns edges, then parts, then whole objects — and why you rarely train one from nothing.",
  },
  {
    id: "finding-things-in-a-scene",
    number: 4,
    title: "Finding Things in a Scene",
    summary:
      "Naming what is in a photo is the easy version. This part finds where, how many, and where one object's pixels end and another's begin.",
  },
  {
    id: "making-it-honest",
    number: 5,
    title: "Making the Numbers Honest",
    summary:
      "Every way a vision model's score flatters it, from a confusion matrix that hides which classes fail to a benchmark that keeps rising while the dataset it was trained on quietly biases it.",
  },
  {
    id: "vision-in-the-world",
    number: 6,
    title: "Vision in the World",
    summary:
      "What changes when a model has to run on a phone, in a car, or on a face, instead of in a notebook with all the time it wants.",
  },
];

export const COMPUTER_VISION_CHAPTERS: readonly LearnChapter[] = [
  {
    slug: "what-is-computer-vision",
    partId: "seeing-as-numbers",
    order: 1,
    title: "What Is Computer Vision?",
    description:
      "A photograph looks obvious to you and is, to a computer, a wall of numbers with no idea what a face is. See the three different jobs hiding inside the phrase \"computer vision\", and why none of them were ever solved by writing rules.",
    level: "beginner",
    minutes: 10,
    prerequisites: [],
    tags: ["Foundations"],
    headings: [
      { id: "what-a-computer-actually-receives", text: "What a computer actually receives", level: 2 },
      { id: "three-jobs-hiding-in-one-name", text: "Three jobs hiding in one name", level: 2 },
      { id: "why-rules-never-worked-for-pixels", text: "Why rules never worked for pixels", level: 2 },
      { id: "where-this-track-is-headed", text: "Where this track is headed", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "images-as-numbers",
    partId: "seeing-as-numbers",
    order: 2,
    title: "Images as Numbers",
    description:
      "Zoom into any photo far enough and the picture disappears into a grid of numbers with nothing else hiding inside it. Click through a tiny image pixel by pixel and watch a face turn back into the grid it always was.",
    level: "beginner",
    minutes: 11,
    prerequisites: ["what-is-computer-vision"],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "a-grid-with-nowhere-to-hide", text: "A grid with nowhere to hide", level: 2 },
      { id: "what-one-pixel-actually-stores", text: "What one pixel actually stores", level: 2 },
      { id: "resolution-is-a-budget", text: "Resolution is a budget", level: 2 },
      { id: "zooming-in-until-the-picture-breaks", text: "Zooming in until the picture breaks", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "colour-and-channels",
    partId: "seeing-as-numbers",
    order: 3,
    title: "Colour and Channels",
    description:
      "Colour is not one number per pixel, it is three, stacked on top of each other and constantly disagreeing. Split a photo into its red, green, and blue channels and find out which one was quietly doing almost all of the work.",
    level: "beginner",
    minutes: 10,
    prerequisites: ["images-as-numbers"],
    tags: ["Foundations"],
    headings: [
      { id: "one-pixel-three-numbers", text: "One pixel, three numbers", level: 2 },
      { id: "why-grayscale-is-a-choice-not-a-loss", text: "Why grayscale is a choice, not a loss", level: 2 },
      { id: "channels-that-are-not-colour", text: "Channels that are not colour at all", level: 2 },
      { id: "the-order-of-channels-is-not-universal", text: "The order of channels is not universal", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "convolution",
    partId: "seeing-as-numbers",
    order: 4,
    title: "Convolution and Filters",
    description:
      "One small grid of numbers, slid across every position in an image, is the operation underneath blur, sharpen, and every edge a neural network has ever found. Drag a 3×3 kernel across a photo and watch what each stop produces.",
    level: "beginner",
    minutes: 12,
    prerequisites: ["colour-and-channels"],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "a-tiny-grid-that-does-all-the-work", text: "A tiny grid that does all the work", level: 2 },
      { id: "sliding-it-across-every-position", text: "Sliding it across every position", level: 2 },
      { id: "the-same-operation-blurs-and-sharpens", text: "The same operation blurs and sharpens", level: 2 },
      { id: "what-a-kernel-cannot-do-alone", text: "What a kernel cannot do alone", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "edge-detection",
    partId: "getting-a-clean-signal",
    order: 5,
    title: "Edge Detection",
    description:
      "An edge is not a line the camera drew, it is a place where brightness changes fast, and \"fast\" is a number you get to choose. Drag the threshold on a real photo and watch a coherent outline dissolve into noise, or vanish into nothing.",
    level: "beginner",
    minutes: 12,
    prerequisites: ["convolution"],
    tags: ["Preprocessing", "Interactive"],
    headings: [
      { id: "brightness-that-changes-fast", text: "Brightness that changes fast", level: 2 },
      { id: "turning-a-slope-into-a-line", text: "Turning a slope into a line", level: 2 },
      { id: "the-threshold-is-a-judgement-call", text: "The threshold is a judgement call", level: 2 },
      { id: "what-edges-cannot-tell-you", text: "What edges cannot tell you", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "feature-detectors",
    partId: "getting-a-clean-signal",
    order: 6,
    title: "Corners and Keypoints",
    description:
      "A corner survives a rotation, a crop, and a change of lighting in ways a raw pixel value never will, which is why decades of computer vision were built on finding them instead. See what makes one point in an image worth finding again in another.",
    level: "beginner",
    minutes: 11,
    prerequisites: ["edge-detection"],
    tags: ["Preprocessing"],
    headings: [
      { id: "a-point-worth-finding-again", text: "A point worth finding again", level: 2 },
      { id: "why-corners-beat-flat-patches", text: "Why corners beat flat patches", level: 2 },
      { id: "describing-a-point-so-it-survives", text: "Describing a point so it survives a rotation", level: 2 },
      { id: "matching-two-photos-by-their-points", text: "Matching two photos by their points", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "image-preprocessing",
    partId: "getting-a-clean-signal",
    order: 7,
    title: "Resizing, Normalising, Augmenting",
    description:
      "A model trained on perfectly centred, evenly lit photos will fail the first time a real photo arrives sideways. Rotate, crop, and relight one training image and see how many new examples a single photo can honestly become.",
    level: "beginner",
    minutes: 11,
    prerequisites: ["images-as-numbers"],
    tags: ["Preprocessing", "Interactive"],
    headings: [
      { id: "the-model-only-sees-what-you-feed-it", text: "The model only sees what you feed it", level: 2 },
      { id: "resizing-without-lying-about-the-content", text: "Resizing without lying about the content", level: 2 },
      { id: "normalising-onto-the-same-scale", text: "Normalising onto the same scale", level: 2 },
      { id: "augmentation-manufactures-variety-you-do-not-have", text: "Augmentation manufactures variety you do not have", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "image-classification",
    partId: "teaching-a-model-to-recognise",
    order: 8,
    title: "Image Classification",
    description:
      "Naming what is in a photo sounds like the whole problem, and is actually the easy version of it: one label, for the entire image, and nothing about where. See why that constraint is a feature, not a shortcut.",
    level: "beginner",
    minutes: 11,
    prerequisites: ["image-preprocessing"],
    tags: ["Classification"],
    headings: [
      { id: "one-label-for-the-whole-photo", text: "One label for the whole photo", level: 2 },
      { id: "why-this-is-the-easy-version", text: "Why this is the easy version of seeing", level: 2 },
      { id: "what-a-confident-wrong-answer-looks-like", text: "What a confident wrong answer looks like", level: 2 },
      { id: "top-1-and-top-5-are-different-promises", text: "Top-1 and top-5 are different promises", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "pixels-to-predictions",
    partId: "teaching-a-model-to-recognise",
    order: 9,
    title: "From Pixels to a Prediction",
    description:
      "The simplest possible image classifier is a weight for every single pixel, added up into one score, and it is worse than it sounds. Drag the weights yourself and watch how little a model that ignores position can actually learn.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["image-classification", "convolution"],
    tags: ["Classification", "Interactive"],
    headings: [
      { id: "a-weight-for-every-pixel", text: "A weight for every pixel", level: 2 },
      { id: "adding-them-up-into-one-score", text: "Adding them up into one score", level: 2 },
      { id: "why-position-defeats-this-model", text: "Why position defeats this model", level: 2 },
      { id: "what-convolution-fixes-about-it", text: "What convolution fixes about it", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "convolutional-neural-networks",
    partId: "teaching-a-model-to-recognise",
    order: 10,
    title: "Convolutional Neural Networks",
    description:
      "Stack the sliding kernel from chapter four dozens of layers deep and something new happens: early layers learn edges, and later ones learn eyes, wheels, and faces, without anybody telling them to. Step through the layers of a small network and see what each one has learned to notice.",
    level: "intermediate",
    minutes: 13,
    prerequisites: ["convolution", "pixels-to-predictions"],
    tags: ["Classification", "Interactive"],
    headings: [
      { id: "stacking-the-kernel-you-already-know", text: "Stacking the kernel you already know", level: 2 },
      { id: "early-layers-learn-edges", text: "Early layers learn edges, without being told to", level: 2 },
      { id: "later-layers-learn-parts", text: "Later layers learn parts, then whole objects", level: 2 },
      { id: "what-depth-actually-buys-you", text: "What depth actually buys you", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "transfer-learning",
    partId: "teaching-a-model-to-recognise",
    order: 11,
    title: "Transfer Learning",
    description:
      "Training a network like chapter ten's from nothing takes millions of photos you almost certainly do not have. Take one somebody else already trained on a different problem, keep everything but its last layer, and see how little new data it takes to repurpose it.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["convolutional-neural-networks"],
    tags: ["Classification"],
    headings: [
      { id: "the-cost-of-starting-from-nothing", text: "The cost of starting from nothing", level: 2 },
      { id: "what-a-pretrained-network-already-knows", text: "What a pretrained network already knows", level: 2 },
      { id: "keeping-the-body-replacing-the-head", text: "Keeping the body, replacing the head", level: 2 },
      { id: "when-transfer-learning-does-not-help", text: "When transfer learning does not help", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "object-detection",
    partId: "finding-things-in-a-scene",
    order: 12,
    title: "Object Detection",
    description:
      "Classification tells you a photo contains a dog. Detection tells you where, how many, and draws a box around each one — a harder problem, and the rest of this part exists to solve it.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["convolutional-neural-networks"],
    tags: ["Detection"],
    headings: [
      { id: "from-what-to-where", text: "From what, to where", level: 2 },
      { id: "a-box-and-a-label-per-object", text: "A box and a label, per object", level: 2 },
      { id: "why-one-forward-pass-is-not-enough", text: "Why one forward pass is not enough", level: 2 },
      { id: "two-families-of-solution", text: "Two families of solution", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "bounding-boxes-and-iou",
    partId: "finding-things-in-a-scene",
    order: 13,
    title: "Bounding Boxes and IoU",
    description:
      "A predicted box that is \"close\" to the right one needs a number, not a shrug, and that number is Intersection over Union. Drag two boxes apart and watch a plausible-looking overlap score fall below 0.5.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["object-detection"],
    tags: ["Detection", "Interactive"],
    headings: [
      { id: "two-boxes-and-a-disagreement", text: "Two boxes and a disagreement", level: 2 },
      { id: "the-overlap-divided-by-the-union", text: "The overlap, divided by the union", level: 2 },
      { id: "what-counts-as-a-correct-detection", text: "What counts as a correct detection", level: 2 },
      { id: "why-one-half-is-a-choice-not-a-law", text: "Why 0.5 is a choice, not a law", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "non-max-suppression",
    partId: "finding-things-in-a-scene",
    order: 14,
    title: "Non-Max Suppression",
    description:
      "A detector rarely proposes one box per object, it proposes a dozen, all clustered around the same dog. Raise and lower a suppression threshold and watch eleven overlapping boxes collapse into one, or refuse to.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["bounding-boxes-and-iou"],
    tags: ["Detection", "Interactive"],
    headings: [
      { id: "a-dozen-boxes-for-one-dog", text: "A dozen boxes for one dog", level: 2 },
      { id: "keeping-the-most-confident-one", text: "Keeping the most confident one", level: 2 },
      { id: "suppressing-its-neighbours", text: "Suppressing its neighbours", level: 2 },
      { id: "what-a-badly-chosen-threshold-costs", text: "What a badly chosen threshold costs", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "image-segmentation",
    partId: "finding-things-in-a-scene",
    order: 15,
    title: "Image Segmentation",
    description:
      "A box around a dog still includes fifteen pixels of fence behind it. Segmentation labels every pixel individually, and the moment two dogs overlap, decides whether it still knows they are different dogs.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["object-detection"],
    tags: ["Detection"],
    headings: [
      { id: "a-box-still-includes-the-background", text: "A box still includes the background", level: 2 },
      { id: "a-label-for-every-pixel", text: "A label for every pixel", level: 2 },
      { id: "semantic-versus-instance", text: "Semantic versus instance, and why the difference matters", level: 2 },
      { id: "what-you-pay-for-that-precision", text: "What you pay for that precision", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "confusion-matrix-for-vision",
    partId: "making-it-honest",
    order: 16,
    title: "Confusion Matrix, One Class at a Time",
    description:
      "One accuracy number across a hundred classes hides which ones the model actually confuses with each other. Open the full matrix and find the one pair of classes responsible for most of the errors.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["image-classification"],
    tags: ["Evaluation", "Interactive"],
    headings: [
      { id: "accuracy-hides-which-classes-fail", text: "Accuracy hides which classes fail", level: 2 },
      { id: "the-matrix-behind-the-single-number", text: "The matrix behind the single number", level: 2 },
      { id: "finding-the-pair-that-drives-the-error", text: "Finding the pair that drives the error", level: 2 },
      { id: "what-a-clean-diagonal-does-not-prove", text: "What a clean diagonal does not prove", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "mean-average-precision",
    partId: "making-it-honest",
    order: 17,
    title: "Mean Average Precision",
    description:
      "Detection has no single \"accuracy\", because a prediction can be right about the class and wrong about the box, by varying amounts. Slide the confidence threshold across a set of detections and watch precision and recall trade against each other the way they did for a plain classifier.",
    level: "intermediate",
    minutes: 13,
    prerequisites: ["bounding-boxes-and-iou", "non-max-suppression"],
    tags: ["Evaluation", "Interactive"],
    headings: [
      { id: "why-accuracy-does-not-transfer-to-detection", text: "Why accuracy does not transfer to detection", level: 2 },
      { id: "precision-and-recall-again-with-boxes", text: "Precision and recall again, now with boxes", level: 2 },
      { id: "averaging-across-every-threshold", text: "Averaging across every threshold", level: 2 },
      { id: "what-map-still-will-not-tell-you", text: "What mAP still will not tell you", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "dataset-bias",
    partId: "making-it-honest",
    order: 18,
    title: "Dataset Bias",
    description:
      "A model trained mostly on photos taken in daylight, indoors, of one demographic, has not learned to see — it has learned that dataset. See how a benchmark can keep rising while the system quietly gets worse for everyone the dataset under-represented.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["confusion-matrix-for-vision"],
    tags: ["Evaluation"],
    headings: [
      { id: "the-model-learns-the-dataset-not-the-world", text: "The model learns the dataset, not the world", level: 2 },
      { id: "where-the-skew-actually-comes-from", text: "Where the skew actually comes from", level: 2 },
      { id: "a-rising-benchmark-can-still-hide-it", text: "A rising benchmark can still hide it", level: 2 },
      { id: "auditing-performance-by-subgroup", text: "Auditing performance by subgroup, not just overall", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "overfitting-in-vision",
    partId: "making-it-honest",
    order: 19,
    title: "Overfitting and Augmentation",
    description:
      "A network with millions of parameters can memorise ten thousand training photos outright, pixel quirks and all. Turn augmentation up and down and watch the gap between training and validation accuracy close, or refuse to.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["image-preprocessing", "transfer-learning"],
    tags: ["Evaluation", "Interactive"],
    headings: [
      { id: "millions-of-parameters-thousands-of-photos", text: "Millions of parameters, thousands of photos", level: 2 },
      { id: "what-memorising-a-photo-looks-like", text: "What memorising a photo looks like", level: 2 },
      { id: "augmentation-as-a-defence-not-a-decoration", text: "Augmentation as a defence, not a decoration", level: 2 },
      { id: "when-more-augmentation-stops-helping", text: "When more augmentation stops helping", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "face-detection-and-privacy",
    partId: "vision-in-the-world",
    order: 20,
    title: "Face Detection and Privacy",
    description:
      "The same pipeline that unlocks your phone can identify a stranger in a crowd from a single frame, and the two uses are not equally consented to. See where face detection ends and face recognition begins, and why that line is the whole ethical argument.",
    level: "advanced",
    minutes: 11,
    prerequisites: ["dataset-bias"],
    tags: ["Applications"],
    headings: [
      { id: "detection-finds-a-face-recognition-names-it", text: "Detection finds a face, recognition names it", level: 2 },
      { id: "the-line-between-them-is-consent", text: "The line between them is consent", level: 2 },
      { id: "error-rates-that-are-not-even-across-faces", text: "Error rates that are not even across faces", level: 2 },
      { id: "rules-that-exist-because-of-this", text: "Rules that exist because of this", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "vision-in-self-driving-cars",
    partId: "vision-in-the-world",
    order: 21,
    title: "Vision in Self-Driving Cars",
    description:
      "A self-driving car cannot ask a model to be 99% sure before braking; it has to act inside a fraction of a second on whatever the camera and the other sensors currently agree on. See why no camera is ever trusted alone, and what happens when the sensors disagree.",
    level: "advanced",
    minutes: 12,
    prerequisites: ["object-detection"],
    tags: ["Applications"],
    headings: [
      { id: "a-decision-with-no-time-to-double-check", text: "A decision with no time to double-check", level: 2 },
      { id: "why-no-camera-works-alone", text: "Why no camera works alone", level: 2 },
      { id: "when-the-sensors-disagree", text: "When the sensors disagree", level: 2 },
      { id: "the-cases-that-still-break-it", text: "The cases that still break it", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "from-prototype-to-production",
    partId: "vision-in-the-world",
    order: 22,
    title: "From Prototype to Production",
    description:
      "A model that scores 94% in a notebook is not a product; a camera feed, a latency budget, and a phone that is three years old are. Age a vision model against a slowly drifting camera and a shrinking latency budget and see where a demo actually breaks.",
    level: "advanced",
    minutes: 12,
    prerequisites: ["mean-average-precision", "overfitting-in-vision"],
    tags: ["Practice"],
    headings: [
      { id: "the-notebook-number-was-never-the-product", text: "The notebook number was never the product", level: 2 },
      { id: "the-camera-you-ship-to-is-not-the-camera-you-trained-on", text: "The camera you ship to is not the camera you trained on", level: 2 },
      { id: "the-latency-budget-you-do-not-get-to-ignore", text: "The latency budget you do not get to ignore", level: 2 },
      { id: "monitoring-a-model-nobody-is-relabelling", text: "Monitoring a model nobody is relabelling", level: 2 },
    ],
    status: "published",
  },
];

export type { LearnChapter as ComputerVisionLesson } from "@/lib/learn-types";
