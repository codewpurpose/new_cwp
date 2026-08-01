/** Shared shapes for the ML lesson data modules. */

export interface Point {
  x: number;
  y: number;
}

export interface LabelledPoint<L extends string> extends Point {
  label: L;
}

export type Range = readonly [number, number];
