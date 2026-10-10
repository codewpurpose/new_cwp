import type { AuthoredQuestion } from "@/lib/quizzes/types";

/**
 * Hand-written quick checks for the ml track, keyed by chapter slug.
 * A chapter listed here uses these questions instead of the auto-drafted
 * quiz in src/lib/quiz.ts. Each question tests something the chapter
 * actually teaches; `answer` is the zero-based index of the correct option.
 */
export const QUIZZES: Record<string, readonly AuthoredQuestion[]> = {
  "what-is-ml": [
    {
      q: "You need a function that decides whether someone is old enough to vote. What does this lesson recommend?",
      options: [
        "Write the rule directly in code, because it can be stated exactly",
        "Train a classifier on past voter records so it learns the rule",
        "Collect labelled examples first, then decide whether rules are needed",
        "Use a learned model, with a hand-written rule as a fallback",
      ],
      answer: 0,
    },
    {
      q: "In the rule-stacking interactive, why can hand-written if-statements never match the learned line?",
      options: [
        "The rules are chosen at random, so they rarely pick useful thresholds",
        "Each rule draws a rectangle, and rectangles can only approximate a diagonal",
        "If-statements can only look at one message at a time",
        "The learned line was given extra features the rules never saw",
      ],
      answer: 1,
    },
    {
      q: "What happens to the accuracy each new hand-written rule buys you?",
      options: [
        "Every rule adds about the same amount",
        "Later rules add more, because they build on earlier ones",
        "Each rule buys less than the last, until extra rules buy nothing",
        "Accuracy drops after the third rule, because rules start to conflict",
      ],
      answer: 2,
    },
    {
      q: "Which of these is a real cost of switching from written rules to machine learning?",
      options: [
        "The model always runs slower than equivalent hand-written code",
        "The model must be retrained before every single prediction",
        "The model can only handle problems with exactly two features",
        "You need many labelled examples, and the result is hard to read",
      ],
      answer: 3,
    },
  ],

  "features-and-labels": [
    {
      q: "A model predicts a house's sale price from its floor area and its number of bedrooms. Which is the label?",
      options: [
        "The sale price",
        "The floor area",
        "The number of bedrooms",
        "The model's own prediction",
      ],
      answer: 0,
    },
    {
      q: "In the bread example, why does a blend of baking time and oven temperature beat either one alone?",
      options: [
        "Temperature is measured less precisely, so it needs a partner",
        "A loaf can cook through long and cool, or briefly and hot",
        "Blending two features halves the error of any model",
        "The model cannot read raw minutes, only combined values",
      ],
      answer: 1,
    },
    {
      q: "What is feature engineering?",
      options: [
        "Choosing which algorithm to train on your data",
        "Hand-correcting labels that the model got wrong",
        "Inventing new measurements out of the ones you already have",
        "Deleting rows that do not fit the expected pattern",
      ],
      answer: 2,
    },
    {
      q: "Two bakers judge \"cooked through\" differently while labelling loaves. What does the lesson say happens?",
      options: [
        "The model averages their opinions into a more accurate label",
        "The model ignores the noisy labels once it has enough data",
        "The problem shows up in the features, not in the predictions",
        "The model learns their disagreement, and better modelling cannot fix it",
      ],
      answer: 3,
    },
  ],

  "how-models-learn": [
    {
      q: "A fuel model's one number is 8 L/100 km. What does it predict for a 150 km trip?",
      options: ["12 litres", "8 litres", "18.75 litres", "1.2 litres"],
      answer: 0,
    },
    {
      q: "Why are misses usually squared before they are added up?",
      options: [
        "So the total is always a whole number, which is easier to search",
        "So misses cannot cancel out, and one big miss outweighs several small ones",
        "So small misses count for more than big ones, smoothing out noise",
        "So the total error stays in the same units as the prediction",
      ],
      answer: 1,
    },
    {
      q: "The best setting's line passes through only two of the thirty-six trips. What does that tell you?",
      options: [
        "The model is underfitting and needs a second number",
        "The data contains mistakes that should be removed first",
        "Best fit means least total error, not touching the most points",
        "The slider was not moved far enough to reach the true value",
      ],
      answer: 2,
    },
    {
      q: "Why can a machine find the best setting without knowing anything about cars?",
      options: [
        "It looks up typical fuel use for each make of car",
        "It copies the setting from the most recent trip",
        "It keeps whichever setting touches the most dots",
        "The total error is a smooth bowl, so it only needs to know which way is downhill",
      ],
      answer: 3,
    },
  ],

  "classification-vs-regression": [
    {
      q: "Which of these is a regression problem?",
      options: [
        "Predicting how much a customer will spend next month",
        "Predicting whether a customer will cancel their plan",
        "Predicting which of ten digits a photo shows",
        "Predicting whether an email is spam or not",
      ],
      answer: 0,
    },
    {
      q: "The same delivery-time model is rounded into 2 categories, then into 20. What happens to the two scores?",
      options: [
        "Accuracy rises, and the average miss in minutes also improves",
        "Accuracy falls, while the average miss in minutes improves",
        "Accuracy and the average miss both stay exactly the same",
        "Accuracy falls, and the average miss in minutes gets worse too",
      ],
      answer: 1,
    },
    {
      q: "Model A scores 90% on a two-category problem. Model B scores 30% on a twenty-category problem. What can you conclude?",
      options: [
        "Model A is three times better than model B",
        "Model B is broken and needs to be retrained",
        "Nothing yet, because accuracy depends on how many categories there are",
        "Model A is better, because only it beats 50%",
      ],
      answer: 2,
    },
    {
      q: "A depot manager needs to know how many drivers to schedule tomorrow. Which shape of answer fits best?",
      options: [
        "Two categories, busy or quiet, split at the median",
        "Ten evenly spaced bands of expected order volume",
        "A yes or no on whether extra drivers are needed",
        "A number, because they are planning against a quantity",
      ],
      answer: 3,
    },
  ],

  "train-test-split": [
    {
      q: "Why does a model's score on its own training data tell you so little?",
      options: [
        "It can memorise those examples and score well without learning the pattern",
        "Training data is always noisier than the data in the test set",
        "The training score is calculated with a different formula",
        "Models always score lower on training data than on new data",
      ],
      answer: 0,
    },
    {
      q: "You check the test score, tweak the model, and check again, many times over. What is the problem?",
      options: [
        "Nothing, because looking more often makes the test score more reliable",
        "You are slowly tuning to the test set, so it stops being an honest grade",
        "The test set gets a little smaller every time you score it",
        "The model forgets some of its training data between checks",
      ],
      answer: 1,
    },
    {
      q: "Your test set is tiny, say 5% of the data. What happens to the score you report?",
      options: [
        "It is always higher than the model's true score",
        "It is always lower than the model's true score",
        "It swings a lot depending on which rows landed in the test set",
        "It becomes identical to the training score",
      ],
      answer: 2,
    },
    {
      q: "What does holding back a larger share of the data mainly buy you?",
      options: [
        "A model that trains noticeably faster",
        "Higher accuracy on new data",
        "A training score you can quote safely",
        "A more trustworthy estimate of the score",
      ],
      answer: 3,
    },
  ],

  overfitting: [
    {
      q: "Training error is tiny and test error is large. What is happening?",
      options: [
        "Overfitting: the model memorised the training examples, noise and all",
        "Underfitting: the model is too simple to capture the pattern",
        "The model found the true pattern, and the test set is unusually noisy",
        "The test set is too large for the model to be graded fairly",
      ],
      answer: 0,
    },
    {
      q: "Training error keeps falling as you add bends. If you pick the model by training error alone, what do you get?",
      options: [
        "The model with the best test error",
        "The most complicated model available, every time",
        "The simplest model, a flat line",
        "The model with three bends, the sweet spot",
      ],
      answer: 1,
    },
    {
      q: "Which signal tells you to stop adding complexity?",
      options: [
        "Training error stops falling quickly",
        "The fitted curve starts to look smooth",
        "Held-back error bottoms out and starts to climb",
        "The curve passes through more training points",
      ],
      answer: 2,
    },
    {
      q: "A model with zero bends predicts the class average for everyone, and both errors are high. Which description fits?",
      options: [
        "Overfitting, hidden from the training numbers",
        "Data leakage from the test set",
        "A good fit to unusually noisy data",
        "Underfitting, which the training numbers show honestly",
      ],
      answer: 3,
    },
  ],

  "precision-recall": [
    {
      q: "A fraud model flags 50 transactions and 40 of them really are fraud. There were 80 frauds in total. What are precision and recall?",
      options: [
        "Precision 0.8, recall 0.5",
        "Precision 0.5, recall 0.8",
        "Precision 0.8, recall 0.8",
        "Precision 0.4, recall 0.5",
      ],
      answer: 0,
    },
    {
      q: "A model always answers \"not fraud\" on data where 3 transactions in 1,000 are fraud. What is its recall?",
      options: [
        "0.997, the same as its accuracy",
        "0, because it catches none of the fraud",
        "0.003, the same as the fraud rate",
        "1.0, because it never raises a false alarm",
      ],
      answer: 1,
    },
    {
      q: "A flag-everything model has precision 0.32 and recall 1.0. Roughly what is its F1 score?",
      options: ["About 0.66", "About 0.32", "About 0.48", "Exactly 1.0"],
      answer: 2,
    },
    {
      q: "Which scenario from the lesson should optimise for recall?",
      options: [
        "Filtering spam, where a lost job offer is a disaster",
        "Ranking search results, where only the top few matter",
        "Any problem where the two classes are evenly balanced",
        "Screening for cancer, where a miss costs far more than a false alarm",
      ],
      answer: 3,
    },
  ],

  "k-nearest-neighbours": [
    {
      q: "How does k-Nearest Neighbours make a prediction?",
      options: [
        "It stores the training data and lets the k closest examples vote",
        "It fits a line through the data and reads the answer off it",
        "It builds a flowchart of questions from the training data",
        "It averages the answers of many small decision trees",
      ],
      answer: 0,
    },
    {
      q: "What happens when k = 1?",
      options: [
        "Every query returns the majority class, so it underfits",
        "Every training point gets its own territory, so it reproduces noise and overfits",
        "The model ignores distance and picks a neighbour at random",
        "Votes can tie, so the model refuses to give an answer",
      ],
      answer: 1,
    },
    {
      q: "Revision hours run 0 to 12 and previous scores run 20 to 100. What goes wrong with raw straight-line distance?",
      options: [
        "The hours column dominates, because its numbers are smaller",
        "Both columns count equally, which is what you want",
        "The score column's wider range dominates every distance",
        "Distance cannot be computed when the ranges differ",
      ],
      answer: 2,
    },
    {
      q: "Why use an odd value of k when there are two classes?",
      options: [
        "So the model trains faster",
        "So the boundary is a straight line",
        "So the features do not need scaling",
        "So the vote can never tie",
      ],
      answer: 3,
    },
  ],

  "decision-trees": [
    {
      q: "A group of flats is exactly half \"lets quickly\" and half \"does not\". What is its Gini impurity?",
      options: ["0.5", "0", "1.0", "0.25"],
      answer: 0,
    },
    {
      q: "Why does the tree's first split use rent at £697?",
      options: [
        "Rent is the first column in the dataset",
        "That cut removes more weighted impurity than any other feature and cut point",
        "It splits the flats into two groups of exactly equal size",
        "Somebody chose it because it is close to a round £700",
      ],
      answer: 1,
    },
    {
      q: "Why is every boundary a tree draws a vertical or horizontal line?",
      options: [
        "The chart can only draw straight lines",
        "Gini impurity only works on straight boundaries",
        "Each question asks about one feature at a time",
        "Trees rescale every feature before splitting",
      ],
      answer: 2,
    },
    {
      q: "At depth 4 the tree scores 100% on training flats, while held-back accuracy has fallen from 82% to 68%. What should you do?",
      options: [
        "Grow deeper, since training accuracy is already perfect",
        "Remove the held-back flats that the tree gets wrong",
        "Keep depth 4 and switch to a different impurity measure",
        "Limit the depth to where held-back accuracy peaked",
      ],
      answer: 3,
    },
  ],

  "random-forests": [
    {
      q: "Each tree in a random forest trains on a bootstrap sample. What does that mean?",
      options: [
        "Rows drawn with replacement to the same size, so some repeat and some are left out",
        "A random half of the rows, with no row appearing twice",
        "Every row, shuffled into a different random order",
        "Only the rows that the previous tree got wrong",
      ],
      answer: 0,
    },
    {
      q: "Why does a forest let each split consider only a random subset of the features?",
      options: [
        "So each tree trains faster on fewer columns",
        "So one dominant feature does not sit at the root of every tree",
        "So the forest can cope with missing values",
        "So each tree grows deep enough to memorise its sample",
      ],
      answer: 1,
    },
    {
      q: "In the interactive, a forest of two trees scored worse than a single tree. Why?",
      options: [
        "The second tree was accidentally trained on the test set",
        "Adding any tree always lowers accuracy at first",
        "With two voters a tie is possible, and the tie-break is not evidence",
        "Two trees overfit more than one tree does",
      ],
      answer: 2,
    },
    {
      q: "What do you give up when you move from one tree to a forest?",
      options: [
        "The ability to draw a diagonal boundary",
        "Any way to say which features mattered overall",
        "Accuracy on the held-back data",
        "A readable flowchart that explains each prediction",
      ],
      answer: 3,
    },
  ],

  "cross-validation": [
    {
      q: "In 5-fold cross-validation, how is each row used?",
      options: [
        "Tested once and trained on four times",
        "Tested four times and trained on once",
        "Tested five times and trained on five times",
        "Tested once and trained on five times",
      ],
      answer: 0,
    },
    {
      q: "Five folds score 3.44, 4.67, 3.89, 3.90 and 5.67. What does the lesson say you should report?",
      options: [
        "Only the lowest fold score",
        "The average and the spread across the folds",
        "Only the average, 4.31",
        "Only the worst fold score, to be safe",
      ],
      answer: 1,
    },
    {
      q: "Your data is daily sales over two years. How should you build the folds?",
      options: [
        "Shuffle the rows randomly before dealing them into folds",
        "Put all the Mondays in one fold, all the Tuesdays in the next",
        "Use folds that respect time, always testing on later periods",
        "Use leave-one-out, so every single day gets tested once",
      ],
      answer: 2,
    },
    {
      q: "When is cross-validation least worth its extra cost?",
      options: [
        "When data is scarce and every row matters",
        "When you need to choose a setting such as k or depth",
        "When the model is cheap and quick to train",
        "When the dataset is so large that one split is already stable",
      ],
      answer: 3,
    },
  ],

  "data-leakage": [
    {
      q: "A loan-default model includes a collectionsCalls column and scores 95%. What is wrong?",
      options: [
        "The column is recorded after default, so it would not exist at prediction time",
        "The column has too many missing values to be trusted",
        "The column needs to be scaled before training",
        "Nothing, because a highly predictive column is what you want",
      ],
      answer: 0,
    },
    {
      q: "Each patient contributes many rows, and you split the table row by row. What leak does that create?",
      options: [
        "Future dates end up in the training set",
        "The same patient appears on both sides of the split",
        "The label column leaks into the features",
        "The scaler is fitted on the test rows",
      ],
      answer: 1,
    },
    {
      q: "Which question catches target leakage best?",
      options: [
        "Is this column strongly correlated with the label?",
        "Does this column have any missing values?",
        "Would this value exist at the moment the prediction is needed?",
        "Is this column measured in consistent units?",
      ],
      answer: 2,
    },
    {
      q: "Why does the lesson call leakage more dangerous than overfitting?",
      options: [
        "It makes test scores look bad, so nobody notices it",
        "It crashes the pipeline before training finishes",
        "It only ever affects very small datasets",
        "It makes test scores look good, so the model gets shipped",
      ],
      answer: 3,
    },
  ],

  "class-imbalance": [
    {
      q: "75 of 4,000 transactions are fraud. A model that flags nothing scores what accuracy?",
      options: ["About 98.1%", "About 1.9%", "About 50%", "About 92.5%"],
      answer: 0,
    },
    {
      q: "For a linear model, what do undersampling, oversampling and class weighting all really change?",
      options: [
        "Which features the model treats as important",
        "Where the model starts saying yes, by shifting its intercept",
        "How much information the fraud examples contain",
        "The boundary's shape, from straight to curved",
      ],
      answer: 1,
    },
    {
      q: "What cheaper move reproduced the rebalanced result with no retraining?",
      options: [
        "Raising the cut-off above 0.5",
        "Removing the fraud rows from the test set",
        "Lowering the probability cut-off on the original model",
        "Training on the test set as well",
      ],
      answer: 2,
    },
    {
      q: "Should you rebalance the test set as well as the training set?",
      options: [
        "Yes, otherwise precision cannot be computed",
        "Yes, the test set must match the training set",
        "Only if you used undersampling on training",
        "No, it must keep the rare class's real-world rate",
      ],
      answer: 3,
    },
  ],

  baselines: [
    {
      q: "60% of students in a dataset passed. What does the \"say the commoner answer\" baseline score?",
      options: ["60%", "52%", "50%", "40%"],
      answer: 0,
    },
    {
      q: "On the same data, you predict \"pass\" at random 60% of the time. What accuracy should you expect?",
      options: ["60%", "52%", "50%", "48%"],
      answer: 1,
    },
    {
      q: "A depth-4 tree scores 76% and a one-rule stump scores 87.3%. What should you do?",
      options: [
        "Ship the tree, because it is a real model",
        "Add depth until the tree beats the stump",
        "Ship the stump unless a model clearly beats it",
        "Report the tree's 76%, since chance is 50%",
      ],
      answer: 2,
    },
    {
      q: "Why build the baseline before any real model?",
      options: [
        "It usually turns out to be the best model",
        "It sets the learning rate for later models",
        "It removes the noisy columns from the data",
        "It tests loading, splitting and scoring while nothing else can be blamed",
      ],
      answer: 3,
    },
  ],

  clustering: [
    {
      q: "Which two moves does k-means repeat until nothing changes?",
      options: [
        "Assign each point to its nearest centre, then move each centre to its points' mean",
        "Split on the best feature, then repeat the split on each side",
        "Add the farthest point as a new centre, then drop the outliers",
        "Merge the two closest groups, then recompute every distance",
      ],
      answer: 0,
    },
    {
      q: "Why can't you choose k by picking whichever value gives the lowest inertia?",
      options: [
        "Inertia is random and changes on every run",
        "Inertia keeps falling as k grows, reaching zero with one centre per point",
        "Inertia rises as k grows, so k = 1 always wins",
        "Inertia only measures the size of the largest cluster",
      ],
      answer: 1,
    },
    {
      q: "You run k-means with k = 3 on points scattered completely at random. What happens?",
      options: [
        "It reports that no clusters exist",
        "It never converges and keeps running",
        "It returns three clusters as confidently as it would on real groups",
        "It returns a single cluster containing every point",
      ],
      answer: 2,
    },
    {
      q: "Two k = 3 runs on the same data finish at inertias of about 88,639 and 255,560. What explains the difference?",
      options: [
        "One run used more of the data",
        "One run used a different distance measure",
        "The second run stopped one round too early",
        "The centres started in different places",
      ],
      answer: 3,
    },
  ],

  "dimensionality-reduction": [
    {
      q: "What is the first principal component?",
      options: [
        "The direction along which the data spreads out the most",
        "The original column with the largest values",
        "The direction that best separates the labels",
        "The plain average of all the columns",
      ],
      answer: 0,
    },
    {
      q: "The first component keeps 86% of the variance, but keeping geometry alone keeps 58%. Why does the rotation win?",
      options: [
        "It removes the noisiest students from the cloud",
        "It blends both columns, so it captures their shared spread",
        "It rescales geometry to match the range of algebra",
        "It keeps both original columns unchanged",
      ],
      answer: 1,
    },
    {
      q: "The flagged students separate best along the direction PCA rated lowest. What does this show?",
      options: [
        "PCA was fitted on the wrong part of the data",
        "The flag must have been recorded incorrectly",
        "PCA never looks at the label, so it can discard the direction that predicts it",
        "PCA always keeps the most predictive direction first",
      ],
      answer: 2,
    },
    {
      q: "Where should you fit the PCA rotation?",
      options: [
        "On the full dataset, before splitting",
        "Separately on the training and test sets",
        "On the test set, so it matches new data",
        "On the training set only, then apply it to the test set",
      ],
      answer: 3,
    },
  ],

  "anomaly-detection": [
    {
      q: "Why does training an ordinary classifier on nine fraud examples fail?",
      options: [
        "Nine points are far too few to describe what fraud looks like in general",
        "Classifiers refuse to run unless the classes are balanced",
        "Fraud examples are not allowed to be used as labels",
        "Nine examples only overfit when the features are scaled",
      ],
      answer: 0,
    },
    {
      q: "What does anomaly detection learn instead?",
      options: [
        "The boundary between fraud and normal transactions",
        "The shape of normal behaviour, flagging what sits far from it",
        "A list of known fraud patterns to match against",
        "The average fraudulent transaction",
      ],
      answer: 1,
    },
    {
      q: "At one cut-off the detector catches 7 of 9 frauds and raises 64 false alarms. Roughly how many alerts are opened per real fraud found?",
      options: ["About 1", "About 7", "About 10", "About 64"],
      answer: 2,
    },
    {
      q: "False alarms have climbed steadily for weeks. What is the likely cause, and the right response?",
      options: [
        "Fraud is rising, so loosen the cut-off to cut the alerts",
        "The model is overfitting, so collect more fraud examples",
        "Nothing is wrong, because false alarms always rise over time",
        "Normal has drifted, so refit it on a recent window and recheck the cut-off",
      ],
      answer: 3,
    },
  ],

  "feature-scaling": [
    {
      q: "A column runs from 20 to 120. After min-max scaling, what does a value of 70 become?",
      options: ["0.5", "0.7", "0.58", "50"],
      answer: 0,
    },
    {
      q: "A column has mean 50 and standard deviation 10. What does 80 become after standardisation?",
      options: ["0.8", "3.0", "30", "1.6"],
      answer: 1,
    },
    {
      q: "Which of these models gives the same predictions whether or not you rescale a feature?",
      options: ["k-nearest neighbours", "k-means", "A decision tree", "PCA"],
      answer: 2,
    },
    {
      q: "Which order avoids leaking test information through the scaler?",
      options: [
        "Fit the scaler on all rows, then split",
        "Fit separate scalers on the training and test rows",
        "Scale the test set with its own mean and spread",
        "Split first, fit on the training rows, then transform both",
      ],
      answer: 3,
    },
  ],

  "gradient-descent": [
    {
      q: "A parameter is 5, its gradient is 4, and the learning rate is 0.1. What is the parameter after one update?",
      options: ["4.6", "5.4", "4.0", "1.0"],
      answer: 0,
    },
    {
      q: "At one rate, each step jumps past the target and lands further away than the last. What is happening?",
      options: [
        "The rate is too small, so the search is crawling",
        "The rate is too large, so the search is diverging",
        "The search has found a different valley",
        "The gradient has the wrong sign",
      ],
      answer: 1,
    },
    {
      q: "Why isn't accuracy the number that gradient descent minimises directly?",
      options: [
        "It is too slow to compute on large datasets",
        "It only works for regression problems",
        "It changes in whole steps, so it has no useful slope",
        "It always has more than one minimum",
      ],
      answer: 2,
    },
    {
      q: "Gradient descent settles at a low point and stops moving. What does that guarantee?",
      options: [
        "That it is the lowest point anywhere",
        "That the model will not overfit",
        "That the learning rate was the best one",
        "Only that it is the bottom of the valley it walked into",
      ],
      answer: 3,
    },
  ],

  regularisation: [
    {
      q: "What does a regularised fit minimise?",
      options: [
        "Training error plus λ times a penalty on coefficient size",
        "Training error alone, but measured on fewer rows",
        "Test error, measured after every training step",
        "The number of features, by deleting columns at random",
      ],
      answer: 0,
    },
    {
      q: "Which penalty is willing to set a weak coefficient to exactly zero?",
      options: [
        "L2 (ridge)",
        "L1 (lasso)",
        "Neither, both only shrink coefficients",
        "Both, equally often",
      ],
      answer: 1,
    },
    {
      q: "With λ near zero, validation error is $668 while training error is $159. What is this?",
      options: [
        "Underfitting, from too much penalty",
        "Leakage from the validation set",
        "Overfitting, because nothing charges for coefficient size",
        "The best possible value of λ",
      ],
      answer: 2,
    },
    {
      q: "How should you choose λ?",
      options: [
        "Pick whichever value gives the best test score",
        "Pick whichever value gives the lowest training error",
        "Always use λ = 1, the standard default",
        "Compare candidates on a validation set or with cross-validation",
      ],
      answer: 3,
    },
  ],

  "neural-networks": [
    {
      q: "Two linear layers are stacked with no activation between them. What can the result compute?",
      options: [
        "Nothing more than a single weighted sum plus a bias",
        "A curved boundary with one bend in it",
        "Twice as many patterns as one layer",
        "The same as a two-level decision tree",
      ],
      answer: 0,
    },
    {
      q: "What does ReLU output for inputs of −3 and 2?",
      options: ["−3 and 2", "0 and 2", "0 and 0", "3 and 2"],
      answer: 1,
    },
    {
      q: "What does the universal approximation theorem NOT tell you?",
      options: [
        "That a wide enough hidden layer can approximate continuous functions",
        "That suitable weights exist for a single hidden layer",
        "Whether gradient descent will find those weights, or how much data it needs",
        "That one hidden layer can be enough in principle",
      ],
      answer: 2,
    },
    {
      q: "On ordinary rows-and-columns data, what does the lesson say routinely beats a neural network?",
      options: [
        "A deeper neural network",
        "k-nearest neighbours with k = 1",
        "A single unpruned decision tree",
        "A well-tuned gradient-boosted tree",
      ],
      answer: 3,
    },
  ],

  "from-notebook-to-production": [
    {
      q: "After a price rise, new customers look different, but how price predicts churn has not changed. Which kind of drift is this?",
      options: ["Input drift", "Concept drift", "Training/serving skew", "Target leakage"],
      answer: 0,
    },
    {
      q: "Missing values are filled with zero in training but left as null in the live service. What is this called?",
      options: ["Concept drift", "Training/serving skew", "Input drift", "Class imbalance"],
      answer: 1,
    },
    {
      q: "Labels arrive months after each prediction. What should you monitor in the meantime?",
      options: [
        "Live accuracy, recomputed every hour",
        "Training loss on the original data",
        "Input and prediction distributions, flag rate, latency and errors",
        "Nothing, until the labels arrive",
      ],
      answer: 2,
    },
    {
      q: "A retrained candidate beats the live model by one point. What should happen next?",
      options: [
        "Replace the live model straight away",
        "Retrain again until it wins by more",
        "Deploy it and delete the old model",
        "Check it against the baseline too, then roll out behind a shadow or canary",
      ],
      answer: 3,
    },
  ],
};
