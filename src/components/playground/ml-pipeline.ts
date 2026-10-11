/**
 * The ML builder's model: which blocks exist, their settings, how a pipeline
 * of them turns into readable Python, and which orders make sense.
 *
 * Pure data and functions, no React, so the generated code and the order
 * rules can be read (and reasoned about) in one place. Everything generated
 * here uses scikit-learn's built-in datasets only, which ship inside the
 * scikit-learn package Pyodide loads, so nothing is fetched from the internet
 * at run time.
 */

export type BlockType = "load" | "split" | "scale" | "model" | "train" | "evaluate" | "plot";

export type DatasetId = "iris" | "wine" | "breast_cancer" | "digits";
export type ModelKind = "knn" | "tree" | "logistic" | "forest";

export interface BlockSettings {
  load: { dataset: DatasetId };
  split: { testSize: number; stratify: boolean };
  scale: { method: "standard" | "minmax" };
  model: { kind: ModelKind; k: number; maxDepth: number; c: number; trees: number };
  train: { showTrainScore: boolean };
  evaluate: { report: boolean };
  plot: { chart: "confusion" | "scatter" };
}

export type Block = {
  [T in BlockType]: { uid: string; type: T; settings: BlockSettings[T] };
}[BlockType];

export interface BlockInfo<T extends BlockType = BlockType> {
  type: T;
  title: string;
  /** One plain-English sentence: why this step exists. */
  why: string;
  defaults: BlockSettings[T];
}

export const BLOCK_INFO: { [T in BlockType]: BlockInfo<T> } = {
  load: {
    type: "load",
    title: "Load dataset",
    why: "A model can only learn from examples, so first we fetch a table of measurements and the right answer for each row.",
    defaults: { dataset: "iris" },
  },
  split: {
    type: "split",
    title: "Split train/test",
    why: "We hide some examples from the model so we can later check it on data it has never seen, like a surprise quiz.",
    defaults: { testSize: 0.25, stratify: true },
  },
  scale: {
    type: "scale",
    title: "Scale features",
    why: "Putting every measurement on a similar scale stops big numbers from drowning out small ones.",
    defaults: { method: "standard" },
  },
  model: {
    type: "model",
    title: "Choose model",
    why: "Different models learn in different ways, so we pick one and set how simple or flexible it may be.",
    defaults: { kind: "knn", k: 5, maxDepth: 3, c: 1, trees: 100 },
  },
  train: {
    type: "train",
    title: "Train",
    why: "Training lets the model look at the training examples and their answers to find patterns.",
    defaults: { showTrainScore: false },
  },
  evaluate: {
    type: "evaluate",
    title: "Evaluate",
    why: "Testing on the hidden examples tells us how well the model will do on new data, not just data it memorised.",
    defaults: { report: false },
  },
  plot: {
    type: "plot",
    title: "Plot",
    why: "A picture shows where the model gets confused much faster than a table of numbers.",
    defaults: { chart: "confusion" },
  },
};

export const BLOCK_ORDER: readonly BlockType[] = ["load", "split", "scale", "model", "train", "evaluate", "plot"];

export const DATASETS: Record<DatasetId, { label: string; loader: string; blurb: string }> = {
  iris: { label: "Iris flowers", loader: "load_iris", blurb: "3 kinds of iris from petal and sepal sizes" },
  wine: { label: "Wine", loader: "load_wine", blurb: "3 wine cultivars from chemical measurements" },
  breast_cancer: {
    label: "Breast cancer",
    loader: "load_breast_cancer",
    blurb: "malignant or benign, from cell measurements",
  },
  digits: { label: "Handwritten digits", loader: "load_digits", blurb: "0 to 9 from 8×8 pixel images" },
};

export const MODELS: Record<ModelKind, { label: string; short: string }> = {
  knn: { label: "k-nearest neighbours", short: "Votes using the k most similar training examples." },
  tree: { label: "Decision tree", short: "Asks a chain of yes/no questions about the features." },
  logistic: { label: "Logistic regression", short: "Weighs each feature and adds them up into a score." },
  forest: { label: "Random forest", short: "Many decision trees vote together." },
};

export const TEST_SIZES = [0.2, 0.25, 0.3, 0.4] as const;
export const C_VALUES = [0.01, 0.1, 1, 10] as const;
export const TREE_COUNTS = [10, 50, 100, 200] as const;

let counter = 0;
export function newUid(type: BlockType) {
  counter += 1;
  return `${type}-${Date.now().toString(36)}-${counter}`;
}

export function makeBlock(type: BlockType): Block {
  return { uid: newUid(type), type, settings: { ...BLOCK_INFO[type].defaults } } as Block;
}

/** The pipeline a student sees first: runnable as-is, with Scale and Plot
 *  left in the palette for them to discover. */
export function starterPipeline(): Block[] {
  return (["load", "split", "model", "train", "evaluate"] as const).map(makeBlock);
}

/* ------------------------------------------------------------------ */
/* Code generation                                                     */
/* ------------------------------------------------------------------ */

export interface CodeSection {
  /** null for the header, which belongs to no block. */
  uid: string | null;
  /** 1-based, inclusive. */
  startLine: number;
  endLine: number;
}

export interface GeneratedCode {
  code: string;
  sections: CodeSection[];
}

function modelLines(s: BlockSettings["model"]): string[] {
  switch (s.kind) {
    case "knn":
      return [
        "from sklearn.neighbors import KNeighborsClassifier",
        "",
        `# n_neighbors: how many nearby examples get a vote.`,
        `model = KNeighborsClassifier(n_neighbors=${s.k})`,
      ];
    case "tree":
      return [
        "from sklearn.tree import DecisionTreeClassifier",
        "",
        "# max_depth: how many questions in a row the tree may ask.",
        `model = DecisionTreeClassifier(max_depth=${s.maxDepth}, random_state=42)`,
      ];
    case "logistic":
      return [
        "from sklearn.linear_model import LogisticRegression",
        "",
        "# C: smaller values keep the model simpler; max_iter gives it time to settle.",
        `model = LogisticRegression(C=${s.c}, max_iter=5000)`,
      ];
    case "forest":
      return [
        "from sklearn.ensemble import RandomForestClassifier",
        "",
        "# n_estimators: how many trees vote; max_depth limits each tree.",
        `model = RandomForestClassifier(n_estimators=${s.trees}, max_depth=${s.maxDepth}, random_state=42)`,
      ];
  }
}

function blockLines(block: Block, blocks: Block[]): string[] {
  switch (block.type) {
    case "load": {
      const d = DATASETS[block.settings.dataset];
      return [
        `from sklearn.datasets import ${d.loader}`,
        "",
        `data = ${d.loader}()`,
        "X = data.data      # the measurements, one row per example",
        "y = data.target    # the right answer for each row",
        'print(f"Loaded {X.shape[0]} examples, each with {X.shape[1]} features.")',
        'print("Classes:", ", ".join(str(name) for name in data.target_names))',
      ];
    }
    case "split": {
      const { testSize, stratify } = block.settings;
      return [
        "from sklearn.model_selection import train_test_split",
        "",
        `# test_size=${testSize} keeps ${Math.round(testSize * 100)}% of the examples hidden for testing.`,
        "X_train, X_test, y_train, y_test = train_test_split(",
        `    X, y, test_size=${testSize}, random_state=42${stratify ? ", stratify=y" : ""}`,
        ")",
        'print(f"Training on {len(X_train)} examples, testing on {len(X_test)}.")',
      ];
    }
    case "scale": {
      const standard = block.settings.method === "standard";
      const name = standard ? "StandardScaler" : "MinMaxScaler";
      return [
        `from sklearn.preprocessing import ${name}`,
        "",
        standard
          ? "# Each feature becomes: (value - average) / spread."
          : "# Each feature is squeezed into the range 0 to 1.",
        `scaler = ${name}()`,
        "X_train = scaler.fit_transform(X_train)  # learn the scale from training data only",
        "X_test = scaler.transform(X_test)        # reuse it on the test data",
      ];
    }
    case "model":
      return modelLines(block.settings);
    case "train": {
      const lines = ["model.fit(X_train, y_train)", 'print("Training finished.")'];
      if (block.settings.showTrainScore) {
        lines.push(
          "",
          "# A much higher score here than on the test set means the model memorised.",
          'print(f"Accuracy on the training examples: {model.score(X_train, y_train):.1%}")',
        );
      }
      return lines;
    }
    case "evaluate": {
      const lines = [
        "from sklearn.metrics import accuracy_score, confusion_matrix",
        "",
        "y_pred = model.predict(X_test)",
        "accuracy = accuracy_score(y_test, y_pred)",
        'print(f"Accuracy on the {len(y_test)} hidden test examples: {accuracy:.1%}")',
        "print()",
        'print("Confusion matrix (rows = true class, columns = predicted class):")',
        "print(confusion_matrix(y_test, y_pred))",
      ];
      if (block.settings.report) {
        lines.splice(0, 1, "from sklearn.metrics import accuracy_score, classification_report, confusion_matrix");
        lines.push(
          "print()",
          "print(classification_report(y_test, y_pred, target_names=[str(n) for n in data.target_names]))",
        );
      }
      return lines;
    }
    case "plot": {
      const hasEvaluate = blocks.some((b) => b.type === "evaluate");
      const predict = hasEvaluate ? [] : ["y_pred = model.predict(X_test)", ""];
      if (block.settings.chart === "confusion") {
        return [
          "import matplotlib.pyplot as plt",
          "from sklearn.metrics import ConfusionMatrixDisplay",
          "",
          ...predict,
          "# Dark squares on the diagonal are right answers; anything else is a mix-up.",
          "fig, ax = plt.subplots(figsize=(5.5, 4.5))",
          "ConfusionMatrixDisplay.from_predictions(",
          "    y_test, y_pred, display_labels=data.target_names, cmap=\"Greens\", ax=ax, colorbar=False",
          ")",
          'ax.set_title("Where the model gets confused")',
          "plt.tight_layout()",
          "plt.show()",
        ];
      }
      return [
        "import matplotlib.pyplot as plt",
        "",
        ...predict,
        "# Each dot is a test example, placed by its first two features and coloured",
        "# by the model's guess. Rings mark the examples it got wrong.",
        "wrong = y_pred != y_test",
        "fig, ax = plt.subplots(figsize=(6, 4.5))",
        'ax.scatter(X_test[:, 0], X_test[:, 1], c=y_pred, cmap="viridis", s=30)',
        "ax.scatter(X_test[wrong, 0], X_test[wrong, 1], s=120, facecolors=\"none\", edgecolors=\"#c0392b\", linewidths=1.5)",
        "ax.set_xlabel(str(data.feature_names[0]))",
        "ax.set_ylabel(str(data.feature_names[1]))",
        'ax.set_title("Test examples, coloured by prediction")',
        "plt.tight_layout()",
        "plt.show()",
      ];
    }
  }
}

function rule(title: string) {
  const text = `# ── ${title} `;
  return text + "─".repeat(Math.max(4, 60 - text.length));
}

/** A long sentence as several `# ` lines, so the code pane rarely needs to
 *  scroll sideways. */
function wrapComment(text: string, width = 72): string[] {
  const out: string[] = [];
  let line = "#";
  for (const word of text.split(" ")) {
    if (line.length + word.length + 1 > width && line !== "#") {
      out.push(line);
      line = "#";
    }
    line += ` ${word}`;
  }
  out.push(line);
  return out;
}

/** Readable Python for a pipeline, plus which lines each block produced. */
export function generateCode(blocks: Block[]): GeneratedCode {
  const lines: string[] = [];
  const sections: CodeSection[] = [];

  const header = [
    "# Built with the CodeWithPurpose ML builder.",
    "# Each block in your pipeline is one commented section below.",
  ];
  lines.push(...header);
  sections.push({ uid: null, startLine: 1, endLine: header.length });

  if (blocks.length === 0) {
    lines.push("", "# Your pipeline is empty. Drag a Load dataset block in to start.");
    return { code: lines.join("\n") + "\n", sections };
  }

  blocks.forEach((block, index) => {
    lines.push("");
    const start = lines.length + 1;
    const info = BLOCK_INFO[block.type];
    lines.push(rule(`${index + 1}. ${info.title}`));
    lines.push(...wrapComment(`Why: ${info.why}`));
    lines.push(...blockLines(block, blocks));
    sections.push({ uid: block.uid, startLine: start, endLine: lines.length });
  });

  return { code: lines.join("\n") + "\n", sections };
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

export interface PipelineIssue {
  level: "error" | "tip";
  /** The block the message is about, if any, so the UI can mark it. */
  uid: string | null;
  message: string;
}

export function validate(blocks: Block[]): PipelineIssue[] {
  const issues: PipelineIssue[] = [];
  const position = (type: BlockType) => blocks.findIndex((b) => b.type === type);
  const find = <T extends BlockType>(type: T) =>
    (blocks.find((b) => b.type === type) as Extract<Block, { type: T }> | undefined) ?? null;
  const before = (a: BlockType, b: BlockType) => {
    const ia = position(a);
    const ib = position(b);
    return ia !== -1 && ib !== -1 && ia < ib;
  };

  if (blocks.length === 0) {
    issues.push({ level: "error", uid: null, message: "Drag a Load dataset block into the pipeline to begin." });
    return issues;
  }

  const load = find("load");
  if (!load) {
    issues.push({ level: "error", uid: null, message: "Every pipeline needs data. Add a Load dataset block at the top." });
  } else if (position("load") !== 0) {
    issues.push({ level: "error", uid: load.uid, message: "Load dataset should come first: the other steps need its data." });
  }

  const split = find("split");
  if (split && load && !before("load", "split")) {
    issues.push({ level: "error", uid: split.uid, message: "Split train/test needs data to split, so move it below Load dataset." });
  }

  const scale = find("scale");
  if (scale) {
    if (!split) {
      issues.push({ level: "error", uid: scale.uid, message: "Scale features works on the training and test sets, so add Split train/test first." });
    } else if (!before("split", "scale")) {
      issues.push({ level: "error", uid: scale.uid, message: "Move Scale features below Split train/test, so the scaler only learns from the training data." });
    }
  }

  const model = find("model");
  const train = find("train");
  if (train) {
    if (!model) {
      issues.push({ level: "error", uid: train.uid, message: "Train needs a model to train. Add a Choose model block above it." });
    } else if (!before("model", "train")) {
      issues.push({ level: "error", uid: train.uid, message: "Choose model has to come before Train: pick the model, then train it." });
    }
    if (!split) {
      issues.push({ level: "error", uid: train.uid, message: "Train uses the training set, so add Split train/test above it." });
    } else if (!before("split", "train")) {
      issues.push({ level: "error", uid: train.uid, message: "Move Split train/test above Train, so the model trains on the training set only." });
    }
    if (scale && !before("scale", "train")) {
      issues.push({ level: "error", uid: scale.uid, message: "Scale features before Train, so the model learns from the scaled numbers." });
    }
  } else if (model) {
    issues.push({ level: "tip", uid: model.uid, message: "Add a Train block after Choose model so the model can learn." });
  }

  const evaluate = find("evaluate");
  if (evaluate && (!train || !before("train", "evaluate"))) {
    issues.push({ level: "error", uid: evaluate.uid, message: "Evaluate checks a trained model, so put it after Train." });
  }

  const plot = find("plot");
  if (plot && (!train || !before("train", "plot"))) {
    issues.push({ level: "error", uid: plot.uid, message: "Plot draws the trained model's guesses, so put it after Train." });
  } else if (plot && evaluate && !before("evaluate", "plot")) {
    issues.push({ level: "error", uid: plot.uid, message: "Put Plot after Evaluate, so it can reuse the predictions Evaluate made." });
  }

  if (load && split && !train && !model) {
    issues.push({ level: "tip", uid: null, message: "Next, add Choose model and Train." });
  }
  if (train && !evaluate && !plot) {
    issues.push({ level: "tip", uid: train.uid, message: "Add Evaluate to see how well the model does on the hidden test examples." });
  }

  if (model && !scale && (model.settings.kind === "knn" || model.settings.kind === "logistic")) {
    issues.push({
      level: "tip",
      uid: model.uid,
      message:
        model.settings.kind === "knn"
          ? "k-nearest neighbours measures distances, so Scale features often helps it. Try adding it and compare."
          : "Logistic regression usually trains faster and better on scaled features. Try adding Scale features.",
    });
  }

  if (plot && plot.settings.chart === "scatter" && load?.settings.dataset === "digits") {
    issues.push({
      level: "tip",
      uid: plot.uid,
      message: "Digits has 64 pixel features, so a scatter of the first two shows very little. The confusion matrix chart says more.",
    });
  }

  return issues;
}

/* ------------------------------------------------------------------ */
/* Storage                                                             */
/* ------------------------------------------------------------------ */

const KNOWN = new Set<string>(BLOCK_ORDER);

/** Rebuild a pipeline from storage, dropping anything malformed. Settings are
 *  merged over the defaults, so a block saved before a setting existed still
 *  gets a value for it. */
export function parsePipeline(raw: unknown): Block[] | null {
  if (!Array.isArray(raw)) return null;
  const seen = new Set<string>();
  const blocks: Block[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const { type, settings } = item as { type?: unknown; settings?: unknown };
    if (typeof type !== "string" || !KNOWN.has(type) || seen.has(type)) continue;
    seen.add(type);
    const t = type as BlockType;
    const merged = { ...BLOCK_INFO[t].defaults, ...(settings && typeof settings === "object" ? settings : {}) };
    blocks.push({ uid: newUid(t), type: t, settings: merged } as Block);
  }
  return blocks;
}
