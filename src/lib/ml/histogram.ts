/** Histogram binning with the last bin closed on the right, so nothing is dropped. */

export interface Bin {
  start: number;
  end: number;
  count: number;
}

export function binEdges(min: number, max: number, binCount: number): number[] {
  const width = (max - min) / binCount;
  return Array.from({ length: binCount + 1 }, (_, i) => min + width * i);
}

interface BinOptions {
  min: number;
  max: number;
  binCount: number;
}

/** Bins are [start, end) except the last, which is [start, end]. */
function indexFor(value: number, { min, max, binCount }: BinOptions): number | null {
  if (value < min || value > max) return null;
  if (value === max) return binCount - 1;
  const width = (max - min) / binCount;
  return Math.min(binCount - 1, Math.floor((value - min) / width));
}

export function histogram(values: readonly number[], options: BinOptions): Bin[] {
  const edges = binEdges(options.min, options.max, options.binCount);
  const bins: Bin[] = Array.from({ length: options.binCount }, (_, i) => ({
    start: edges[i],
    end: edges[i + 1],
    count: 0,
  }));

  for (const value of values) {
    const index = indexFor(value, options);
    if (index !== null) bins[index].count += 1;
  }

  return bins;
}

export interface GroupedBin<K extends string> {
  start: number;
  end: number;
  counts: Record<K, number>;
}

/** One pass over the items, unlike binning each group separately. */
export function groupedHistogram<K extends string>(
  items: readonly { value: number; group: K }[],
  options: BinOptions & { groups: readonly K[] },
): GroupedBin<K>[] {
  const edges = binEdges(options.min, options.max, options.binCount);
  const bins: GroupedBin<K>[] = Array.from({ length: options.binCount }, (_, i) => ({
    start: edges[i],
    end: edges[i + 1],
    counts: Object.fromEntries(options.groups.map((g) => [g, 0])) as Record<K, number>,
  }));

  for (const item of items) {
    const index = indexFor(item.value, options);
    if (index !== null) bins[index].counts[item.group] += 1;
  }

  return bins;
}
