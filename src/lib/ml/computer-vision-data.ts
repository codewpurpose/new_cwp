/**
 * Seeded data for the "How a Computer Sees" lesson.
 *
 * The image is a small grayscale grid built once at module scope from a fixed
 * seed, so the server and the browser render the byte-identical picture — no
 * hydration mismatch is possible. Everything downstream (the convolution) is
 * pure arithmetic over that grid, so it too is deterministic.
 *
 * No Math.random, no Date: see @/lib/ml/random for why that matters here.
 */

import { mulberry32 } from "@/lib/ml/random";

/** The picture is a GRID x GRID square of brightness values in [0, 1]. */
export const GRID = 14;

/**
 * A hand-built little scene: a bright disc, a softer bar, and a diagonal
 * streak on a gently graded background, with a whisper of noise on top. The
 * shapes give hard edges for an edge filter to find; the noise gives a blur
 * something to smooth. `IMAGE[y][x]` is row-major, brightness 0 (ink) to 1
 * (paper).
 */
function buildImage(): number[][] {
  const random = mulberry32(20260822);
  const rows: number[][] = [];

  for (let y = 0; y < GRID; y += 1) {
    const row: number[] = [];
    for (let x = 0; x < GRID; x += 1) {
      // A subtle top-to-bottom gradient so no region is perfectly flat.
      let value = 0.18 + 0.14 * (y / (GRID - 1));

      // Bright disc, upper-left of centre.
      const dx = x - 4.4;
      const dy = y - 5.2;
      if (Math.sqrt(dx * dx + dy * dy) < 3.1) value = 0.86;

      // A mid-tone bar on the right.
      if (x >= 9 && x <= 12 && y >= 2 && y <= 7) value = 0.55;

      // A bright anti-diagonal streak across the lower half.
      if (Math.abs(x - (GRID - 1 - y)) <= 1 && y > 6) value = 0.9;

      // One noise draw per pixel — fixed call order keeps the picture stable.
      value += (random() - 0.5) * 0.1;

      row.push(Math.max(0, Math.min(1, value)));
    }
    rows.push(row);
  }

  return rows;
}

export const IMAGE: readonly (readonly number[])[] = buildImage();

/**
 * How a kernel's raw output becomes a brightness to draw.
 *  - "direct"    clamps the weighted sum straight into [0, 1].
 *  - "magnitude" takes its absolute value first, so a zero-sum edge filter
 *    turns flat regions to black and any change of brightness to light.
 */
export type KernelMode = "direct" | "magnitude";

export interface Kernel {
  id: string;
  label: string;
  /** 3x3, row-major. */
  weights: readonly number[];
  mode: KernelMode;
  /** One sentence, house voice: what this filter does and why. */
  note: string;
}

const BLUR = 1 / 9;

export const KERNELS: readonly Kernel[] = [
  {
    id: "identity",
    label: "None",
    weights: [0, 0, 0, 0, 1, 0, 0, 0, 0],
    mode: "direct",
    note: "The do-nothing filter. It copies the centre pixel and ignores its neighbours, so the output is the input.",
  },
  {
    id: "blur",
    label: "Blur",
    weights: [BLUR, BLUR, BLUR, BLUR, BLUR, BLUR, BLUR, BLUR, BLUR],
    mode: "direct",
    note: "Every pixel becomes the average of its nine. Noise averages away, but so does real detail — softness costs sharpness.",
  },
  {
    id: "sharpen",
    label: "Sharpen",
    weights: [0, -1, 0, -1, 5, -1, 0, -1, 0],
    mode: "direct",
    note: "The opposite bargain: push the centre up and its neighbours down, and every edge gets crisper — along with every speck of noise.",
  },
  {
    id: "edges",
    label: "Edges",
    weights: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
    mode: "magnitude",
    note: "The nine weights sum to zero, so a flat patch cancels to black. Only where brightness changes does anything survive — the filter finds edges and nothing else.",
  },
  {
    id: "emboss",
    label: "Emboss",
    weights: [-2, -1, 0, -1, 1, 1, 0, 1, 2],
    mode: "direct",
    note: "A lopsided edge filter. Because the weights lean top-left to bottom-right, edges facing that way light up and the picture looks lit from one corner.",
  },
];

function clampIndex(value: number, size: number): number {
  if (value < 0) return 0;
  if (value >= size) return size - 1;
  return value;
}

/** The weighted sum of the 3x3 neighbourhood around (x, y), edges replicated. */
function convolveAt(x: number, y: number, weights: readonly number[]): number {
  let sum = 0;
  for (let ky = -1; ky <= 1; ky += 1) {
    for (let kx = -1; kx <= 1; kx += 1) {
      const sy = clampIndex(y + ky, GRID);
      const sx = clampIndex(x + kx, GRID);
      sum += IMAGE[sy][sx] * weights[(ky + 1) * 3 + (kx + 1)];
    }
  }
  return sum;
}

/**
 * Apply a kernel to the whole image at a given strength, and return the
 * brightness grid to draw. `strength` blends the filtered pixel against the
 * original, so 0 is the untouched image and 1 is the filter at full effect —
 * that is the value the slider drives.
 */
export function filteredImage(kernelId: string, strength: number): number[][] {
  const kernel = KERNELS.find((k) => k.id === kernelId) ?? KERNELS[0];
  const out: number[][] = [];

  for (let y = 0; y < GRID; y += 1) {
    const row: number[] = [];
    for (let x = 0; x < GRID; x += 1) {
      const raw = convolveAt(x, y, kernel.weights);
      const processed = kernel.mode === "magnitude" ? Math.abs(raw) : raw;
      const blended = IMAGE[y][x] * (1 - strength) + processed * strength;
      row.push(Math.max(0, Math.min(1, blended)));
    }
    out.push(row);
  }

  return out;
}
