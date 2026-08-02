/**
 * Seeded data and a precomputed tiny neural network for the neural-networks
 * lesson.
 *
 * The dataset is two rings, one inside the other — a shape no straight line
 * can separate, no matter where you draw it. For every hidden-unit count from
 * 0 to MAX_HIDDEN_UNITS this module trains a single-hidden-layer network
 * (2 inputs, H ReLU units, 1 sigmoid output) by plain full-batch gradient
 * descent, then freezes the result as a coarse decision grid plus the
 * train/validation accuracy at that width.
 *
 * Training happens here, once, at module scope — not in the browser on every
 * slider tick. That keeps the widget a pure array read, and keeps the numbers
 * quoted in the lesson prose true on every render, server or client.
 */

import { mulberry32, normalish, shuffled } from "@/lib/ml/random";

export interface NetworkPoint {
  x: number;
  y: number;
  label: 0 | 1;
}

/* --------------------------------------------------------------------------
 * The dataset: an inner ring (class 0) and an outer ring (class 1).
 * ---------------------------------------------------------------------- */

const PER_CLASS = 90;
const INNER_RADIUS = 0.6;
const OUTER_RADIUS = 1.65;
const RADIUS_SPREAD = 0.26;

function generateRings(): NetworkPoint[] {
  const random = mulberry32(20260721);
  const points: NetworkPoint[] = [];

  for (let i = 0; i < PER_CLASS; i += 1) {
    const angle = (i / PER_CLASS) * Math.PI * 2 + random() * 0.3;
    const radius = normalish(random, INNER_RADIUS, RADIUS_SPREAD);
    points.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle), label: 0 });
  }
  for (let i = 0; i < PER_CLASS; i += 1) {
    const angle = (i / PER_CLASS) * Math.PI * 2 + random() * 0.3;
    const radius = normalish(random, OUTER_RADIUS, RADIUS_SPREAD);
    points.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle), label: 1 });
  }
  return points;
}

const ALL_POINTS = generateRings();

// A held-out validation slice, exactly the discipline train-test-split spent
// a whole lesson on: shuffle once, from a seed, then cut.
const VAL_COUNT = 60;
const ORDER = shuffled(
  ALL_POINTS.map((_, index) => index),
  mulberry32(20260722),
);

export const VAL_POINTS: readonly NetworkPoint[] = ORDER.slice(0, VAL_COUNT).map(
  (index) => ALL_POINTS[index],
);
export const TRAIN_POINTS: readonly NetworkPoint[] = ORDER.slice(VAL_COUNT).map(
  (index) => ALL_POINTS[index],
);

/* --------------------------------------------------------------------------
 * A tiny network: 2 inputs, H ReLU hidden units, 1 sigmoid output. Trained by
 * plain full-batch gradient descent — the same walk-downhill routine as the
 * previous chapter, just with more slopes to walk down at once.
 * ---------------------------------------------------------------------- */

const TRAINING_SEED = 11;
const EPOCHS = 1200;
const LEARNING_RATE = 0.8;
/** A whisper of weight decay for numerical stability, not a lesson topic. */
const WEIGHT_DECAY = 0.0005;
const INIT_SCALE = 0.7;

function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

interface LinearParams {
  weights: [number, number];
  bias: number;
}

/** Zero hidden units: a plain weighted sum and a bias. The line from chapter 3. */
function trainLinear(): LinearParams {
  const random = mulberry32(TRAINING_SEED);
  const weights: [number, number] = [
    (random() - 0.5) * INIT_SCALE,
    (random() - 0.5) * INIT_SCALE,
  ];
  let bias = 0;
  const n = TRAIN_POINTS.length;

  for (let epoch = 0; epoch < EPOCHS; epoch += 1) {
    let gradWeightX = 0;
    let gradWeightY = 0;
    let gradBias = 0;

    for (const point of TRAIN_POINTS) {
      const z = weights[0] * point.x + weights[1] * point.y + bias;
      const error = sigmoid(z) - point.label;
      gradWeightX += error * point.x;
      gradWeightY += error * point.y;
      gradBias += error;
    }

    weights[0] -= LEARNING_RATE * (gradWeightX / n + WEIGHT_DECAY * weights[0]);
    weights[1] -= LEARNING_RATE * (gradWeightY / n + WEIGHT_DECAY * weights[1]);
    bias -= (LEARNING_RATE * gradBias) / n;
  }

  return { weights, bias };
}

function predictLinear(params: LinearParams, point: { x: number; y: number }): number {
  return sigmoid(params.weights[0] * point.x + params.weights[1] * point.y + params.bias);
}

interface HiddenParams {
  /** H x 2: one [weightX, weightY] pair per hidden unit. */
  inputWeights: number[][];
  inputBias: number[];
  outputWeights: number[];
  outputBias: number;
}

/** One or more hidden units, each a line-plus-bend, combined by the output layer. */
function trainHidden(hiddenUnits: number): HiddenParams {
  const random = mulberry32(TRAINING_SEED);
  const inputWeights: number[][] = Array.from({ length: hiddenUnits }, () => [
    (random() - 0.5) * 2 * INIT_SCALE,
    (random() - 0.5) * 2 * INIT_SCALE,
  ]);
  const inputBias: number[] = Array.from({ length: hiddenUnits }, () => 0);
  const outputWeights: number[] = Array.from(
    { length: hiddenUnits },
    () => (random() - 0.5) * 2 * INIT_SCALE,
  );
  let outputBias = 0;
  const n = TRAIN_POINTS.length;

  for (let epoch = 0; epoch < EPOCHS; epoch += 1) {
    const gradInputWeights: number[][] = Array.from({ length: hiddenUnits }, () => [0, 0]);
    const gradInputBias: number[] = Array.from({ length: hiddenUnits }, () => 0);
    const gradOutputWeights: number[] = Array.from({ length: hiddenUnits }, () => 0);
    let gradOutputBias = 0;

    for (const point of TRAIN_POINTS) {
      // Forward pass: weighted sum, then ReLU — negatives become zero.
      const preActivation = inputWeights.map(
        (w, h) => w[0] * point.x + w[1] * point.y + inputBias[h],
      );
      const activation = preActivation.map((v) => Math.max(0, v));
      const outputPre =
        activation.reduce((sum, a, h) => sum + a * outputWeights[h], 0) + outputBias;
      const error = sigmoid(outputPre) - point.label;

      for (let h = 0; h < hiddenUnits; h += 1) {
        gradOutputWeights[h] += error * activation[h];
      }
      gradOutputBias += error;

      for (let h = 0; h < hiddenUnits; h += 1) {
        const gradActivation = error * outputWeights[h];
        // The ReLU gradient: zero wherever the unit was clamped to zero.
        const gradPreActivation = preActivation[h] > 0 ? gradActivation : 0;
        gradInputWeights[h][0] += gradPreActivation * point.x;
        gradInputWeights[h][1] += gradPreActivation * point.y;
        gradInputBias[h] += gradPreActivation;
      }
    }

    for (let h = 0; h < hiddenUnits; h += 1) {
      inputWeights[h][0] -=
        LEARNING_RATE * (gradInputWeights[h][0] / n + WEIGHT_DECAY * inputWeights[h][0]);
      inputWeights[h][1] -=
        LEARNING_RATE * (gradInputWeights[h][1] / n + WEIGHT_DECAY * inputWeights[h][1]);
      inputBias[h] -= (LEARNING_RATE * gradInputBias[h]) / n;
      outputWeights[h] -=
        LEARNING_RATE * (gradOutputWeights[h] / n + WEIGHT_DECAY * outputWeights[h]);
    }
    outputBias -= (LEARNING_RATE * gradOutputBias) / n;
  }

  return { inputWeights, inputBias, outputWeights, outputBias };
}

function predictHidden(params: HiddenParams, point: { x: number; y: number }): number {
  const activation = params.inputWeights.map((w, h) =>
    Math.max(0, w[0] * point.x + w[1] * point.y + params.inputBias[h]),
  );
  const outputPre =
    activation.reduce((sum, a, h) => sum + a * params.outputWeights[h], 0) + params.outputBias;
  return sigmoid(outputPre);
}

function accuracy(
  points: readonly NetworkPoint[],
  predict: (point: { x: number; y: number }) => number,
): number {
  let correct = 0;
  for (const point of points) {
    const predicted = predict(point) >= 0.5 ? 1 : 0;
    if (predicted === point.label) correct += 1;
  }
  return correct / points.length;
}

/* --------------------------------------------------------------------------
 * A coarse decision grid per hidden-unit count, so the widget only ever reads
 * a stored array — no training, no randomness, in the browser.
 * ---------------------------------------------------------------------- */

export const PLOT_MIN = -2.3;
export const PLOT_MAX = 2.3;
export const GRID_COLS = 40;
export const GRID_ROWS = 40;

function computeGrid(predict: (point: { x: number; y: number }) => number): readonly (0 | 1)[] {
  const cells: (0 | 1)[] = [];
  for (let row = 0; row < GRID_ROWS; row += 1) {
    const y = PLOT_MAX - ((row + 0.5) / GRID_ROWS) * (PLOT_MAX - PLOT_MIN);
    for (let col = 0; col < GRID_COLS; col += 1) {
      const x = PLOT_MIN + ((col + 0.5) / GRID_COLS) * (PLOT_MAX - PLOT_MIN);
      cells.push(predict({ x, y }) >= 0.5 ? 1 : 0);
    }
  }
  return cells;
}

export interface NetworkStep {
  hiddenUnits: number;
  trainAccuracy: number;
  valAccuracy: number;
  /** Row-major, GRID_ROWS * GRID_COLS long. The predicted class per cell. */
  grid: readonly (0 | 1)[];
}

function stepFor(hiddenUnits: number): NetworkStep {
  if (hiddenUnits === 0) {
    const params = trainLinear();
    const linearPredict = (point: { x: number; y: number }) => predictLinear(params, point);
    return {
      hiddenUnits,
      trainAccuracy: accuracy(TRAIN_POINTS, linearPredict),
      valAccuracy: accuracy(VAL_POINTS, linearPredict),
      grid: computeGrid(linearPredict),
    };
  }

  const params = trainHidden(hiddenUnits);
  const hiddenPredict = (point: { x: number; y: number }) => predictHidden(params, point);
  return {
    hiddenUnits,
    trainAccuracy: accuracy(TRAIN_POINTS, hiddenPredict),
    valAccuracy: accuracy(VAL_POINTS, hiddenPredict),
    grid: computeGrid(hiddenPredict),
  };
}

export const MAX_HIDDEN_UNITS = 8;

export const NETWORK_STEPS: readonly NetworkStep[] = Array.from(
  { length: MAX_HIDDEN_UNITS + 1 },
  (_, hiddenUnits) => stepFor(hiddenUnits),
);

/** The hidden-unit count with the best validation accuracy, for a preset. */
export const BEST_VAL_HIDDEN_UNITS: number = NETWORK_STEPS.reduce(
  (best, step) => (step.valAccuracy > NETWORK_STEPS[best].valAccuracy ? step.hiddenUnits : best),
  0,
);
