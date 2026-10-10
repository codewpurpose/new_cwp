import type { AuthoredQuestion } from "@/lib/quizzes/types";

/**
 * Hand-written quick checks for the computer-vision track, keyed by chapter slug.
 * A chapter listed here uses these questions instead of the auto-drafted
 * quiz in src/lib/quiz.ts. Each question tests something the chapter
 * actually teaches; `answer` is the zero-based index of the correct option.
 */
export const QUIZZES: Record<string, readonly AuthoredQuestion[]> = {
  "what-is-computer-vision": [
    {
      q: "You need to know exactly which pixels in a photo belong to the dog. Which of the three jobs is that?",
      options: ["Segmentation", "Classification", "Detection", "Edge detection"],
      answer: 0,
    },
    {
      q: "A photo contains two dogs and you need a separate box around each one. Which job is that?",
      options: ["Classification", "Detection", "Segmentation", "Grayscale conversion"],
      answer: 1,
    },
    {
      q: "Why did hand-written rules like \"two dark ovals above a line\" fail to find faces?",
      options: [
        "Computers of the time could not store enough pixels",
        "Faces have too few distinctive features to describe",
        "Lighting, angle, occlusion and scale change the pixels without changing the scene",
        "Rules about shapes cannot be written in program code",
      ],
      answer: 2,
    },
    {
      q: "A 4032 × 3024 colour photo stores three numbers per pixel. Roughly how many numbers is that?",
      options: ["About 12 million", "About 7,000", "About 3 million", "About 36 million"],
      answer: 3,
    },
  ],

  "images-as-numbers": [
    {
      q: "What does a single pixel in a grayscale image store?",
      options: [
        "One integer from 0 to 255",
        "Three integers, one per colour",
        "A label naming what it shows",
        "Its distance to the neighbouring pixels",
      ],
      answer: 0,
    },
    {
      q: "How many numbers make up a 28 × 28 grayscale image?",
      options: ["56", "784", "2,352", "28"],
      answer: 1,
    },
    {
      q: "You double an image's width and its height. What happens to the number of pixels?",
      options: ["It doubles", "It stays the same", "It becomes four times as many", "It becomes eight times as many"],
      answer: 2,
    },
    {
      q: "You zoom far into a photo until it turns into flat squares. What has happened?",
      options: [
        "The file has been corrupted by zooming",
        "The camera's sensor failed at that spot",
        "The viewer is hiding a finer layer of detail",
        "You have reached the resolution it was captured at",
      ],
      answer: 3,
    },
  ],

  "colour-and-channels": [
    {
      q: "Using grayscale = 0.299R + 0.587G + 0.114B, roughly what grey does pure green (0, 255, 0) become?",
      options: ["About 150", "About 85", "About 255", "About 29"],
      answer: 0,
    },
    {
      q: "You load a photo with cv2.imread, show it with Matplotlib, and the blue sky looks orange. What fixes it?",
      options: [
        "Divide every pixel value by 255 before plotting",
        "Convert it with cv2.cvtColor(img, cv2.COLOR_BGR2RGB) first",
        "Convert the photo to grayscale before plotting",
        "Resize the photo to a square before plotting",
      ],
      answer: 1,
    },
    {
      q: "Which extra channel records how transparent each pixel is?",
      options: ["Depth", "Infrared", "Alpha", "Blue"],
      answer: 2,
    },
    {
      q: "Why does green get the largest weight in the usual grayscale formula?",
      options: [
        "Green values are usually the largest numbers in a photo",
        "Green is stored first in most image files",
        "Green carries detail that red and blue lack",
        "Human brightness perception is most sensitive to green light",
      ],
      answer: 3,
    },
  ],

  convolution: [
    {
      q: "A 3 × 3 kernel visits every position where it fits fully inside an 8 × 8 image. What size is the output?",
      options: ["6 × 6", "8 × 8", "5 × 5", "3 × 3"],
      answer: 0,
    },
    {
      q: "A blur kernel with nine values of 1/9 sits over a patch of eight 0s with a 90 in the centre. What is the output?",
      options: ["90", "10", "0", "45"],
      answer: 1,
    },
    {
      q: "A sharpen kernel has 5 in the centre, −1 on its four direct neighbours and 0 in the corners. What does it output on a flat patch of 50s?",
      options: ["0", "250", "50", "200"],
      answer: 2,
    },
    {
      q: "What actually differs between a blur filter and a sharpen filter?",
      options: [
        "How many positions the kernel visits",
        "Whether the products are summed or multiplied",
        "How far the kernel moves between positions",
        "Only the numbers inside the kernel",
      ],
      answer: 3,
    },
  ],

  "edge-detection": [
    {
      q: "Which pair of neighbouring pixel values most likely sits on an edge?",
      options: ["30 and 210", "118 and 121", "200 and 205", "64 and 70"],
      answer: 0,
    },
    {
      q: "You lower the edge threshold. What happens to the edge map?",
      options: [
        "Fewer edges appear, and faint real ones vanish",
        "More edges appear, including noise and texture",
        "The same edges appear, just drawn thicker",
        "Nothing, because the threshold only affects colour",
      ],
      answer: 1,
    },
    {
      q: "What is the gradient magnitude across the inside of a flat, evenly painted wall?",
      options: [
        "At its maximum",
        "Equal to the pixel value",
        "Close to zero",
        "Undefined",
      ],
      answer: 2,
    },
    {
      q: "Which of these can an edge map NOT tell you?",
      options: [
        "Where brightness changes quickly",
        "How steep each brightness change is",
        "Which way brightness is rising",
        "What object sits on either side of a line",
      ],
      answer: 3,
    },
  ],

  "feature-detectors": [
    {
      q: "Why is a patch of clear blue sky a poor point to try to find again in a second photo?",
      options: [
        "It looks the same wherever you shift the window, so it cannot be located",
        "Its pixels are too bright to measure reliably",
        "Sky always changes colour between two photos",
        "It contains too many edges to describe",
      ],
      answer: 0,
    },
    {
      q: "You slide a small window along a straight edge, parallel to it. What does the window see?",
      options: [
        "A sharp change, just as it would at a corner",
        "Almost no change, so its position along the edge is ambiguous",
        "A change in every direction at once",
        "Nothing at all, because edges have no gradient",
      ],
      answer: 1,
    },
    {
      q: "What is a descriptor?",
      options: [
        "The keypoint's exact pixel coordinates",
        "The label of the object the keypoint belongs to",
        "A numeric fingerprint of the patch, built to survive rotation and lighting",
        "A raw copy of the pixels around the keypoint",
      ],
      answer: 2,
    },
    {
      q: "How are two photos matched once keypoints have descriptors?",
      options: [
        "Compare the pixels at the same coordinates",
        "Pair up keypoints with the same brightness",
        "Match the longest edges in each photo first",
        "Pair each keypoint with the one whose descriptor is closest",
      ],
      answer: 3,
    },
  ],

  "image-preprocessing": [
    {
      q: "You stretch a 400 × 200 photo straight to 224 × 224. What goes wrong?",
      options: [
        "Shapes distort, so a round clock becomes an oval",
        "The colours shift towards blue",
        "Pixel values climb above 255",
        "Nothing, because stretching keeps proportions",
      ],
      answer: 0,
    },
    {
      q: "You normalise by dividing each pixel by 255. What does a pixel value of 204 become?",
      options: ["0.2", "0.8", "204", "1.25"],
      answer: 1,
    },
    {
      q: "Four independent on/off augmentations are applied to one photo. How many different versions can you get, counting the original?",
      options: ["4", "5", "16", "8"],
      answer: 2,
    },
    {
      q: "Which augmentation would be a mistake for a handwritten-digit classifier?",
      options: [
        "Shifting each digit a few pixels sideways",
        "Slightly brightening or darkening each image",
        "Rotating each digit by a few degrees",
        "Rotating each digit a full 180 degrees",
      ],
      answer: 3,
    },
  ],

  "image-classification": [
    {
      q: "A photo shows three dogs and a cat, and the classifier says \"dog\". By its own contract, is that correct?",
      options: [
        "Yes, it only promises one label for the whole image",
        "No, it should have said \"three dogs\"",
        "No, it should have mentioned the cat",
        "Only if it also returns where the dogs are",
      ],
      answer: 0,
    },
    {
      q: "A husky-versus-wolf model labels a husky standing in snow as a wolf. What most likely happened?",
      options: [
        "Huskies and wolves produce identical pixel values",
        "Most of its training wolves were photographed in snow, so it learned snow",
        "Its confidence threshold was set too low",
        "The photo was too small for the model to classify",
      ],
      answer: 1,
    },
    {
      q: "A classifier scores 76% top-1 and 93% top-5. What does the 93% mean?",
      options: [
        "Its single best guess is right 93% of the time",
        "It is 93% confident on average",
        "The true label is among its five best guesses 93% of the time",
        "It is right on 93% of the five hardest classes",
      ],
      answer: 2,
    },
    {
      q: "A model reports 99% confidence on a photo. What does that number tell you?",
      options: [
        "It will be right on 99% of similar photos",
        "Its training labels were 99% accurate",
        "The photo matches a training photo exactly",
        "How sure the model is, not whether it is right",
      ],
      answer: 3,
    },
  ],

  "pixels-to-predictions": [
    {
      q: "Top-left weight is 2 and top-right weight is −1. A 2 × 2 square of bright cells (value 1 each) scores 8 in the top-left. Shifted one cell right, two of its cells fall in the top-right. What is the new score?",
      options: ["2", "8", "6", "4"],
      answer: 0,
    },
    {
      q: "Why does the per-pixel-weight model fail when an identical shape moves?",
      options: [
        "The shape gets dimmer when it moves",
        "Each position has its own weight, so a moved shape is a new pattern",
        "The threshold changes depending on position",
        "The model was never trained on any shapes",
      ],
      answer: 1,
    },
    {
      q: "What does a convolution kernel change about this model?",
      options: [
        "It gives every pixel two weights instead of one",
        "It removes the threshold entirely",
        "It reuses one small set of weights at every position",
        "It adds more layers of independent weights",
      ],
      answer: 2,
    },
    {
      q: "How many weights does a per-pixel model need for a 6 × 6 image, compared with one 3 × 3 kernel?",
      options: ["6 versus 3", "36 versus 36", "9 versus 36", "36 versus 9"],
      answer: 3,
    },
  ],

  "convolutional-neural-networks": [
    {
      q: "What do the first-layer kernels of a trained image network typically detect?",
      options: [
        "Edges at several angles, and colour contrasts",
        "Whole objects such as faces and cars",
        "Object parts such as wheels and eyes",
        "Random noise that never settles",
      ],
      answer: 0,
    },
    {
      q: "Four 3 × 3 layers are stacked with no pooling or striding. How big is the receptive field of the fourth layer?",
      options: ["12 × 12", "9 × 9", "7 × 7", "3 × 3"],
      answer: 1,
    },
    {
      q: "A layer of 64 kernels receives the 32 output grids from the layer before. What does each kernel look at?",
      options: [
        "Only one of the 32 grids",
        "Only the original photo's pixels",
        "All 32 grids at once",
        "Two of the 32 grids, chosen at random",
      ],
      answer: 2,
    },
    {
      q: "What is the main cost of adding depth?",
      options: [
        "The receptive field gets smaller",
        "The network can no longer detect edges",
        "Kernels can no longer share their weights",
        "More parameters and computation, and far more data to train from scratch",
      ],
      answer: 3,
    },
  ],

  "transfer-learning": [
    {
      q: "You have 400 labelled photos of a product defect. What is the sensible starting point?",
      options: [
        "Take a pretrained network, freeze its body, and train a new head",
        "Train a deep convolutional network from scratch on the 400 photos",
        "Fit one independent weight per pixel and threshold the score",
        "Wait until you have a million photos before starting",
      ],
      answer: 0,
    },
    {
      q: "In transfer learning, what is \"the head\"?",
      options: [
        "The first layer, which detects edges",
        "The final layer, which maps features onto your labels",
        "The large dataset the network was first trained on",
        "The middle layers, which detect textures and parts",
      ],
      answer: 1,
    },
    {
      q: "Where does a network pretrained on everyday photos transfer least well?",
      options: [
        "Photos of kitchen utensils",
        "Photos of different dog breeds",
        "Chest X-rays and satellite images",
        "Photos of cars on city streets",
      ],
      answer: 2,
    },
    {
      q: "Why do the early layers of a pretrained network transfer to new tasks so well?",
      options: [
        "They memorised the original 1,000 labels",
        "They are retrained from scratch on your photos",
        "They hold most of the network's parameters",
        "Edges and textures are useful in almost any photo",
      ],
      answer: 3,
    },
  ],

  "object-detection": [
    {
      q: "What does a detector return for each object it finds?",
      options: [
        "A box, a class label and a confidence score",
        "One label for the whole photo",
        "A label for every pixel in the photo",
        "A single confidence score with no box",
      ],
      answer: 0,
    },
    {
      q: "A photo contains three cars and two pedestrians. How many (box, label, confidence) tuples should a good detector return?",
      options: ["1", "5", "2", "3"],
      answer: 1,
    },
    {
      q: "Why not simply run a classifier on every possible rectangle in the image?",
      options: [
        "Classifiers cannot read cropped images",
        "Every box must be a perfect square",
        "There are millions of rectangles, far too many to check",
        "It would only ever find one object",
      ],
      answer: 2,
    },
    {
      q: "Which statement about the two families of detector is right?",
      options: [
        "Two-stage detectors are always faster",
        "Single-stage detectors propose regions first",
        "Two-stage detectors skip classification",
        "Single-stage detectors predict in one pass and are usually faster",
      ],
      answer: 3,
    },
  ],

  "bounding-boxes-and-iou": [
    {
      q: "The true box is 100 × 100. The predicted box is the same size, shifted 50 pixels to the right. What is the IoU?",
      options: ["About 0.33", "0.5", "0.25", "About 0.67"],
      answer: 0,
    },
    {
      q: "Boxes of 12,000 and 10,000 square pixels overlap by 8,000. What is the area of their union?",
      options: ["22,000", "14,000", "30,000", "20,000"],
      answer: 1,
    },
    {
      q: "What is the IoU of two boxes that do not touch at all?",
      options: ["0.5", "1.0", "0", "Undefined"],
      answer: 2,
    },
    {
      q: "A detection with IoU 0.6 counts as correct at a threshold of 0.5. What happens at a threshold of 0.75?",
      options: [
        "It stays correct, because the box has not moved",
        "It gets partial credit of 0.8",
        "Its IoU rises to meet the new threshold",
        "It becomes a miss, although the box has not moved",
      ],
      answer: 3,
    },
  ],

  "non-max-suppression": [
    {
      q: "What is the first thing non-max suppression does?",
      options: [
        "Keeps the box with the highest confidence",
        "Discards the box with the lowest confidence",
        "Averages all the boxes into one",
        "Sorts the boxes by their size",
      ],
      answer: 0,
    },
    {
      q: "Box A has been kept. Box B overlaps it with IoU 0.8, and the threshold is 0.5. What happens to B?",
      options: [
        "It is kept as a second object",
        "It is discarded as a duplicate",
        "It is merged into A by averaging",
        "It is set aside and checked again at the end",
      ],
      answer: 1,
    },
    {
      q: "Two people stand shoulder to shoulder, and only one of them ends up with a box. What is the likely cause?",
      options: [
        "The NMS threshold is set too high",
        "The confidence scores are too high",
        "The NMS threshold is set too low",
        "IoU was computed against the wrong box",
      ],
      answer: 2,
    },
    {
      q: "The NMS threshold is set to 0.95. What goes wrong?",
      options: [
        "Separate nearby objects get merged into one",
        "The highest-confidence box gets discarded",
        "Every box in the image is suppressed",
        "Duplicate boxes survive around the same object",
      ],
      answer: 3,
    },
  ],

  "image-segmentation": [
    {
      q: "How many labels does segmentation produce for a 640 × 480 photo?",
      options: ["307,200", "4", "1,120", "640"],
      answer: 0,
    },
    {
      q: "You need to count the cars in a car park, each with its own outline. Which kind of segmentation do you need?",
      options: ["Semantic segmentation", "Instance segmentation", "Image classification", "Edge detection"],
      answer: 1,
    },
    {
      q: "Two dogs stand side by side. What does semantic segmentation produce?",
      options: [
        "A separate mask for each dog",
        "A mask for the larger dog only",
        "One shared \"dog\" label, with no idea there are two",
        "A box around each dog",
      ],
      answer: 2,
    },
    {
      q: "What is the main extra cost of segmentation compared with boxes?",
      options: [
        "Masks cannot be graded at all",
        "It only works on square images",
        "It cannot use colour photos",
        "Tracing every outline takes far longer to label",
      ],
      answer: 3,
    },
  ],

  "confusion-matrix-for-vision": [
    {
      q: "Rows are the truth and columns are the prediction. The cell at row \"wolf\", column \"coyote\" holds 19. What does that mean?",
      options: [
        "19 wolf photos were predicted as coyote",
        "19 coyote photos were predicted as wolf",
        "19 wolf photos were classified correctly",
        "19% of all the predictions were wrong",
      ],
      answer: 0,
    },
    {
      q: "A test set has 250 photos and the matrix shows 54 errors in total. What is the accuracy?",
      options: ["21.6%", "78.4%", "80%", "54%"],
      answer: 1,
    },
    {
      q: "Wolf/coyote mix-ups cause 40 of those 54 errors. If you fixed that pair completely, what would accuracy become?",
      options: ["82.4%", "100%", "94.4%", "88.0%"],
      answer: 2,
    },
    {
      q: "A cats, dogs and birds test set scores 98%. What does that prove?",
      options: [
        "The model will also separate wolves from coyotes",
        "The model has learned to see in general",
        "The model will score 98% in deployment",
        "Little, because the test had no easily confused pairs",
      ],
      answer: 3,
    },
  ],

  "mean-average-precision": [
    {
      q: "Why does plain accuracy not work for a detector?",
      options: [
        "The number of predictions per image varies and has no fixed match to the objects",
        "Detectors never output a class label",
        "Accuracy can only be computed on grayscale images",
        "Every detection is either fully right or fully wrong",
      ],
      answer: 0,
    },
    {
      q: "Sorted by confidence, four detections are correct, correct, wrong, correct. The scene has 5 real objects. With all four flagged, what are precision and recall?",
      options: [
        "Precision 0.6, recall 0.75",
        "Precision 0.75, recall 0.6",
        "Precision 0.75, recall 0.75",
        "Precision 1.0, recall 0.6",
      ],
      answer: 1,
    },
    {
      q: "One report gives mAP@0.5 = 62 and another gives mAP@0.5:0.95 = 41. What can you say?",
      options: [
        "The first detector is clearly better",
        "One of the two reports must contain an error",
        "They could describe the same detector, graded at different IoU bars",
        "The second detector found fewer classes",
      ],
      answer: 2,
    },
    {
      q: "In mean average precision, what is the \"mean\" taken across?",
      options: [
        "The confidence scores of every box",
        "The images in the test set",
        "The pixels inside each box",
        "The average precision of each object class",
      ],
      answer: 3,
    },
  ],

  "dataset-bias": [
    {
      q: "A subgroup makes up 4% of the test set. At most, how much can its errors move overall accuracy?",
      options: ["4 percentage points", "96 percentage points", "40 percentage points", "0.4 percentage points"],
      answer: 0,
    },
    {
      q: "What is the most reliable way to catch a model failing on one group of people?",
      options: [
        "Train a larger model on the same data",
        "Report accuracy broken out by subgroup",
        "Report the overall accuracy more often",
        "Remove small subgroups from the test set",
      ],
      answer: 1,
    },
    {
      q: "What did the 2018 Gender Shades study find in commercial facial-analysis systems?",
      options: [
        "Error rates were the same for every group tested",
        "Errors were highest for lighter-skinned men",
        "Errors were far higher for darker-skinned women than lighter-skinned men",
        "Errors only appeared on low-resolution photos",
      ],
      answer: 2,
    },
    {
      q: "A group is missing from the test set entirely. What does a subgroup breakdown tell you about it?",
      options: [
        "That the model works well for that group",
        "That the model fails for that group",
        "Its accuracy, estimated from similar groups",
        "Nothing, so its absence should be stated explicitly",
      ],
      answer: 3,
    },
  ],

  "overfitting-in-vision": [
    {
      q: "A network scores 99% on its training photos and 71% on validation photos. What is the diagnosis?",
      options: [
        "Overfitting: it has memorised the training photos",
        "Underfitting: it is too small for the task",
        "A healthy model with a noisy validation set",
        "Data leakage from the validation set",
      ],
      answer: 0,
    },
    {
      q: "In the augmentation interactive, which strength should you choose?",
      options: [
        "Strength 0, where training accuracy is highest",
        "Strength 6, where validation accuracy peaks",
        "Strength 10, the strongest available",
        "Whichever strength gives the highest training accuracy",
      ],
      answer: 1,
    },
    {
      q: "Why does augmentation make memorisation harder?",
      options: [
        "It shrinks the number of parameters in the network",
        "It removes the hardest photos from training",
        "The network never sees exactly the same pixels twice",
        "It copies validation photos into the training set",
      ],
      answer: 2,
    },
    {
      q: "Past the sweet spot, training and validation accuracy fall together. Why?",
      options: [
        "The network has started overfitting again",
        "The validation set has become too small",
        "The learning rate has become too large",
        "The images are distorted so much that the real signal is lost",
      ],
      answer: 3,
    },
  ],

  "face-detection-and-privacy": [
    {
      q: "A shop camera counts how many faces pass by but never identifies anyone. Which is it doing?",
      options: [
        "Face detection",
        "Face recognition",
        "Face verification against a watchlist",
        "Instance segmentation of identities",
      ],
      answer: 0,
    },
    {
      q: "What does face recognition add on top of face detection?",
      options: [
        "Drawing a box around each face",
        "Matching the face against a database of known identities",
        "Counting how many faces are in the frame",
        "Blurring faces for privacy",
      ],
      answer: 1,
    },
    {
      q: "Unlocking your phone and scanning a crowd can run similar code. What is the key ethical difference?",
      options: [
        "The phone uses detection, the crowd camera does not",
        "The crowd camera is always more accurate",
        "Consent: you enrolled yourself in the phone's database of one",
        "There is no meaningful difference",
      ],
      answer: 2,
    },
    {
      q: "How does the EU AI Act treat real-time remote biometric identification in public spaces for law enforcement?",
      options: [
        "It is allowed with no special rules",
        "It is allowed only for private companies",
        "It is required on all public cameras",
        "It is prohibited, apart from narrow listed exceptions",
      ],
      answer: 3,
    },
  ],

  "vision-in-self-driving-cars": [
    {
      q: "A car travels at 30 metres per second and its vision pipeline takes 200 ms to decide. How far does it travel before the decision exists?",
      options: ["6 metres", "60 metres", "0.6 metres", "15 metres"],
      answer: 0,
    },
    {
      q: "Which sensor keeps measuring distance and closing speed reliably in fog and darkness?",
      options: ["Camera", "Radar", "A second camera", "GPS"],
      answer: 1,
    },
    {
      q: "The camera's depth estimate and the radar's distance disagree. What policy does the lesson describe?",
      options: [
        "Average the two readings",
        "Trust the camera, because it sees more detail",
        "Trust radar's direct distance over the camera's estimate",
        "Ignore both and brake every time",
      ],
      answer: 2,
    },
    {
      q: "Which of these is still a real failure case for deployed systems?",
      options: [
        "Reading a standard stop sign in daylight",
        "Measuring the distance to a car ahead in clear weather",
        "Following clearly painted lane lines on a dry road",
        "An overturned trailer unlike anything in the training data",
      ],
      answer: 3,
    },
  ],

  "from-prototype-to-production": [
    {
      q: "At 30 frames per second, how long does a model have for each frame?",
      options: ["About 33 ms", "About 3.3 ms", "About 300 ms", "About 16.7 ms"],
      answer: 0,
    },
    {
      q: "Confidence scores on one camera drift lower over several weeks, with no crash or error. What does that suggest?",
      options: [
        "The model has been retrained by mistake",
        "Its input has probably shifted, from the lens, lighting or hardware",
        "The model is getting more accurate over time",
        "Nothing, because confidence never changes meaningfully",
      ],
      answer: 1,
    },
    {
      q: "With no labels on live traffic, what is usually the closest thing to ground truth?",
      options: [
        "The model's own confidence scores",
        "The original test-set accuracy",
        "Corrections reported by users",
        "The average brightness of each frame",
      ],
      answer: 2,
    },
    {
      q: "A model takes 200 ms per frame on a 30 fps feed. What happens?",
      options: [
        "It runs a little slower but sees every frame",
        "It speeds up once the feed warms up",
        "It is fine, because offline accuracy is what counts",
        "It falls behind, unless it skips most of the frames",
      ],
      answer: 3,
    },
  ],
};
