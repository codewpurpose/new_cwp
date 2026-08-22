/**
 * Card art for the Computer Vision track.
 *
 * Each cover is a miniature of that lesson's own idea, drawn from the design
 * tokens rather than shipped as an image — same approach as the ML track's
 * MlLessonCover, so the two feel like one family of courses.
 */

interface CoverProps {
  slug: string;
}

const W = 160;
const H = 90;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="aspect-[16/9] w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={W} height={H} fill="var(--learn-chart-plot)" />
      {children}
    </svg>
  );
}

function grid(cols: number, rows: number, x0: number, y0: number, cell: number) {
  return Array.from({ length: cols * rows }, (_, i) => ({
    x: x0 + (i % cols) * cell,
    y: y0 + Math.floor(i / cols) * cell,
  }));
}

function WhatIsComputerVisionCover() {
  /* Three small frames, one job in each: a label, a box, a mask. */
  const jobs = [22, 74, 126];
  return (
    <Frame>
      {jobs.map((x) => (
        <rect
          key={x}
          x={x}
          y={26}
          width={30}
          height={38}
          rx={3}
          fill="var(--learn-chart-highlight)"
          stroke="var(--learn-chart-axis)"
          strokeWidth={1}
        />
      ))}
      <text x={37} y={49} textAnchor="middle" fontSize={7} fill="var(--learn-series-1)">cat</text>
      <rect x={68} y={36} width={18} height={18} fill="none" stroke="var(--learn-series-2)" strokeWidth={1.4} />
      <circle cx={141} cy={45} r={9} fill="var(--learn-series-3)" opacity={0.55} />
    </Frame>
  );
}

function ImagesAsNumbersCover() {
  const cells = grid(6, 4, 22, 15, 20);
  return (
    <Frame>
      {cells.map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width={18}
          height={18}
          fill={i % 5 === 0 ? "var(--learn-chart-highlight)" : "var(--learn-chart-plot)"}
          stroke="var(--learn-chart-grid)"
          strokeWidth={0.8}
        />
      ))}
      <text x={31} y={28} textAnchor="middle" fontSize={7} fill="var(--learn-series-1)">204</text>
      <text x={71} y={68} textAnchor="middle" fontSize={7} fill="var(--learn-series-1)">17</text>
    </Frame>
  );
}

function ColourAndChannelsCover() {
  return (
    <Frame>
      <rect x={38} y={20} width={44} height={44} fill="var(--learn-series-2)" opacity={0.55} />
      <rect x={58} y={30} width={44} height={44} fill="var(--learn-series-1)" opacity={0.55} />
      <rect x={78} y={40} width={44} height={44} fill="var(--learn-series-3)" opacity={0.55} />
    </Frame>
  );
}

function ConvolutionCover() {
  const cells = grid(7, 4, 14, 13, 18);
  return (
    <Frame>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={16} height={16} fill="var(--learn-chart-plot)" stroke="var(--learn-chart-grid)" strokeWidth={0.7} />
      ))}
      <rect x={50} y={31} width={52} height={52 / 3} fill="none" />
      <rect x={50} y={31} width={54} height={54} fill="var(--learn-chart-highlight)" stroke="var(--learn-series-1)" strokeWidth={1.6} />
      <path d="M104 58h20" stroke="var(--learn-chart-axis)" strokeWidth={1.2} markerEnd="url(#cv-arrow)" />
      <defs>
        <marker id="cv-arrow" markerWidth={6} markerHeight={6} refX={4} refY={3} orient="auto">
          <path d="M0 0l6 3-6 3z" fill="var(--learn-chart-axis)" />
        </marker>
      </defs>
      <rect x={128} y={49} width={18} height={18} fill="var(--learn-series-1)" opacity={0.6} />
    </Frame>
  );
}

function EdgeDetectionCover() {
  return (
    <Frame>
      <path
        d="M30 68C30 40 46 24 78 24s48 16 48 44"
        fill="none"
        stroke="var(--learn-chart-muted-mark)"
        strokeWidth={1}
      />
      <path
        d="M30 68C30 40 46 24 78 24s48 16 48 44"
        fill="none"
        stroke="var(--learn-series-2)"
        strokeWidth={2.4}
        strokeDasharray="10 46"
      />
    </Frame>
  );
}

function FeatureDetectorsCover() {
  const pts = [
    { x: 40, y: 26 },
    { x: 118, y: 30 },
    { x: 52, y: 66 },
    { x: 104, y: 62 },
    { x: 80, y: 44 },
  ];
  return (
    <Frame>
      <path d="M40 26l78 4-14 36-52-4z" fill="var(--learn-chart-highlight)" stroke="var(--learn-chart-grid-strong)" strokeWidth={1} />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="none" stroke="var(--learn-series-1)" strokeWidth={1.4} />
      ))}
    </Frame>
  );
}

function ImagePreprocessingCover() {
  return (
    <Frame>
      <rect x={30} y={22} width={40} height={40} rx={3} fill="var(--learn-chart-highlight)" stroke="var(--learn-chart-axis)" strokeWidth={1} />
      <path d="M84 42a20 20 0 1 1 4 12" fill="none" stroke="var(--learn-series-3)" strokeWidth={1.6} markerEnd="url(#cv-rot)" />
      <defs>
        <marker id="cv-rot" markerWidth={6} markerHeight={6} refX={3} refY={3} orient="auto">
          <path d="M0 0l6 3-6 3z" fill="var(--learn-series-3)" />
        </marker>
      </defs>
      <rect x={100} y={30} width={34} height={34} rx={3} fill="var(--learn-chart-highlight)" stroke="var(--learn-series-1)" strokeWidth={1.4} transform="rotate(8 117 47)" />
    </Frame>
  );
}

function ImageClassificationCover() {
  return (
    <Frame>
      <rect x={40} y={16} width={62} height={54} rx={3} fill="var(--learn-chart-highlight)" stroke="var(--learn-chart-axis)" strokeWidth={1} />
      <circle cx={71} cy={40} r={12} fill="var(--learn-chart-muted-mark)" />
      <rect x={46} y={78} width={40} height={12} rx={6} fill="var(--learn-series-1)" />
      <text x={66} y={87} textAnchor="middle" fontSize={7} fill="var(--learn-chart-plot)">dog · 0.94</text>
    </Frame>
  );
}

function PixelsToPredictionsCover() {
  const cells = grid(4, 4, 18, 18, 14);
  return (
    <Frame>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={12} height={12} fill={i % 3 === 0 ? "var(--learn-series-2)" : "var(--learn-chart-muted-mark)"} opacity={0.6} />
      ))}
      <path d="M80 42h30" stroke="var(--learn-chart-axis)" strokeWidth={1.2} markerEnd="url(#cv-sum)" />
      <defs>
        <marker id="cv-sum" markerWidth={6} markerHeight={6} refX={4} refY={3} orient="auto">
          <path d="M0 0l6 3-6 3z" fill="var(--learn-chart-axis)" />
        </marker>
      </defs>
      <circle cx={128} cy={42} r={14} fill="none" stroke="var(--learn-series-1)" strokeWidth={1.6} />
      <text x={128} y={45} textAnchor="middle" fontSize={9} fill="var(--learn-series-1)">Σ</text>
    </Frame>
  );
}

function ConvolutionalNeuralNetworksCover() {
  const layers = [
    { x: 20, w: 34 },
    { x: 62, w: 26 },
    { x: 96, w: 18 },
    { x: 122, w: 11 },
  ];
  return (
    <Frame>
      {layers.map((l, i) => (
        <rect key={i} x={l.x} y={45 - l.w / 2} width={10} height={l.w} fill="var(--learn-series-1)" opacity={0.35 + i * 0.15} />
      ))}
    </Frame>
  );
}

function TransferLearningCover() {
  return (
    <Frame>
      <rect x={22} y={22} width={70} height={46} rx={4} fill="var(--learn-chart-muted-mark)" opacity={0.4} />
      <path d="M50 40v-6a7 7 0 1 1 14 0v6" fill="none" stroke="var(--learn-chart-axis)" strokeWidth={1.6} />
      <rect x={46} y={40} width={22} height={16} rx={2} fill="var(--learn-chart-plot)" stroke="var(--learn-chart-axis)" strokeWidth={1.2} />
      <path d="M98 45h18" stroke="var(--learn-chart-axis)" strokeWidth={1.2} markerEnd="url(#cv-tl)" />
      <defs>
        <marker id="cv-tl" markerWidth={6} markerHeight={6} refX={4} refY={3} orient="auto">
          <path d="M0 0l6 3-6 3z" fill="var(--learn-chart-axis)" />
        </marker>
      </defs>
      <rect x={122} y={26} width={26} height={38} rx={3} fill="var(--learn-chart-highlight)" stroke="var(--learn-series-1)" strokeWidth={1.4} />
    </Frame>
  );
}

function ObjectDetectionCover() {
  return (
    <Frame>
      <circle cx={52} cy={44} r={16} fill="var(--learn-chart-muted-mark)" opacity={0.5} />
      <rect x={92} y={30} width={30} height={28} fill="var(--learn-chart-muted-mark)" opacity={0.5} />
      <rect x={34} y={26} width={36} height={36} fill="none" stroke="var(--learn-series-1)" strokeWidth={1.6} />
      <rect x={86} y={24} width={42} height={40} fill="none" stroke="var(--learn-series-2)" strokeWidth={1.6} />
    </Frame>
  );
}

function BoundingBoxesAndIouCover() {
  return (
    <Frame>
      <rect x={34} y={24} width={60} height={42} fill="none" stroke="var(--learn-series-1)" strokeWidth={1.6} />
      <rect x={62} y={40} width={60} height={42} fill="var(--learn-chart-highlight)" stroke="var(--learn-series-2)" strokeWidth={1.6} />
    </Frame>
  );
}

function NonMaxSuppressionCover() {
  const boxes = [
    { x: 34, y: 24, o: 0.25 },
    { x: 40, y: 28, o: 0.25 },
    { x: 46, y: 32, o: 0.25 },
    { x: 38, y: 22, o: 1 },
  ];
  return (
    <Frame>
      {boxes.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={54} height={40} fill="none" stroke="var(--learn-series-1)" strokeWidth={i === boxes.length - 1 ? 2 : 1} opacity={b.o} />
      ))}
    </Frame>
  );
}

function ImageSegmentationCover() {
  return (
    <Frame>
      <path
        d="M40 66c-6-20 4-38 26-40s34 10 34 28-10 26-30 26-24-8-30-14Z"
        fill="var(--learn-series-1)"
        opacity={0.45}
        stroke="var(--learn-series-1)"
        strokeWidth={1.2}
      />
    </Frame>
  );
}

function ConfusionMatrixForVisionCover() {
  const cells = grid(4, 4, 34, 15, 16);
  return (
    <Frame>
      {cells.map((c, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        const diag = row === col;
        return (
          <rect
            key={i}
            x={c.x}
            y={c.y}
            width={14}
            height={14}
            fill={diag ? "var(--learn-series-1)" : "var(--learn-chart-muted-mark)"}
            opacity={diag ? 0.75 : 0.25 + col * 0.05}
          />
        );
      })}
    </Frame>
  );
}

function MeanAveragePrecisionCover() {
  return (
    <Frame>
      <path
        d="M28 26c20 2 34 10 44 20s26 16 42 18"
        fill="none"
        stroke="var(--learn-series-1)"
        strokeWidth={2}
      />
      <path
        d="M28 66h100M28 20v52"
        stroke="var(--learn-chart-axis)"
        strokeWidth={1}
      />
    </Frame>
  );
}

function DatasetBiasCover() {
  const bars = [10, 44, 8, 6, 30];
  return (
    <Frame>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={26 + i * 22}
          y={66 - h}
          width={14}
          height={h}
          fill={i === 1 ? "var(--learn-series-1)" : "var(--learn-series-2)"}
          opacity={i === 1 ? 0.85 : 0.4}
        />
      ))}
    </Frame>
  );
}

function OverfittingInVisionCover() {
  return (
    <Frame>
      <path d="M26 62c26-30 62-38 108-30" fill="none" stroke="var(--learn-chart-train)" strokeWidth={2} />
      <path d="M26 58c26 4 60 4 108 8" fill="none" stroke="var(--learn-chart-test)" strokeWidth={2} strokeDasharray="5 4" />
    </Frame>
  );
}

function FaceDetectionAndPrivacyCover() {
  return (
    <Frame>
      <circle cx={80} cy={44} r={22} fill="var(--learn-chart-muted-mark)" opacity={0.45} />
      <rect x={54} y={20} width={52} height={48} fill="none" stroke="var(--learn-series-1)" strokeWidth={1.6} />
      <path d="M96 60l14 12M96 72l14-12" stroke="var(--learn-series-2)" strokeWidth={1.6} strokeLinecap="round" />
    </Frame>
  );
}

function VisionInSelfDrivingCarsCover() {
  return (
    <Frame>
      <rect x={40} y={44} width={64} height={20} rx={6} fill="var(--learn-chart-axis)" opacity={0.8} />
      <rect x={54} y={30} width={36} height={16} rx={5} fill="var(--learn-chart-axis)" opacity={0.8} />
      <circle cx={54} cy={66} r={7} fill="var(--learn-chart-plot)" stroke="var(--learn-chart-axis)" strokeWidth={1.4} />
      <circle cx={92} cy={66} r={7} fill="var(--learn-chart-plot)" stroke="var(--learn-chart-axis)" strokeWidth={1.4} />
      <path d="M104 42l24-6M104 50l26 2M104 58l24 8" stroke="var(--learn-series-1)" strokeWidth={1.2} strokeDasharray="3 4" />
    </Frame>
  );
}

function FromPrototypeToProductionCover() {
  return (
    <Frame>
      <rect x={24} y={26} width={46} height={34} rx={3} fill="var(--learn-chart-highlight)" stroke="var(--learn-chart-axis)" strokeWidth={1.2} />
      <path d="M34 38h26M34 46h18" stroke="var(--learn-chart-axis)" strokeWidth={1.2} />
      <path d="M76 44h24" stroke="var(--learn-chart-axis)" strokeWidth={1.2} markerEnd="url(#cv-ship)" />
      <defs>
        <marker id="cv-ship" markerWidth={6} markerHeight={6} refX={4} refY={3} orient="auto">
          <path d="M0 0l6 3-6 3z" fill="var(--learn-chart-axis)" />
        </marker>
      </defs>
      <rect x={106} y={20} width={26} height={46} rx={5} fill="var(--learn-chart-plot)" stroke="var(--learn-series-1)" strokeWidth={1.6} />
      <rect x={112} y={26} width={14} height={26} fill="var(--learn-chart-highlight)" />
    </Frame>
  );
}

const COVERS: Record<string, () => React.ReactElement> = {
  "what-is-computer-vision": WhatIsComputerVisionCover,
  "images-as-numbers": ImagesAsNumbersCover,
  "colour-and-channels": ColourAndChannelsCover,
  convolution: ConvolutionCover,
  "edge-detection": EdgeDetectionCover,
  "feature-detectors": FeatureDetectorsCover,
  "image-preprocessing": ImagePreprocessingCover,
  "image-classification": ImageClassificationCover,
  "pixels-to-predictions": PixelsToPredictionsCover,
  "convolutional-neural-networks": ConvolutionalNeuralNetworksCover,
  "transfer-learning": TransferLearningCover,
  "object-detection": ObjectDetectionCover,
  "bounding-boxes-and-iou": BoundingBoxesAndIouCover,
  "non-max-suppression": NonMaxSuppressionCover,
  "image-segmentation": ImageSegmentationCover,
  "confusion-matrix-for-vision": ConfusionMatrixForVisionCover,
  "mean-average-precision": MeanAveragePrecisionCover,
  "dataset-bias": DatasetBiasCover,
  "overfitting-in-vision": OverfittingInVisionCover,
  "face-detection-and-privacy": FaceDetectionAndPrivacyCover,
  "vision-in-self-driving-cars": VisionInSelfDrivingCarsCover,
  "from-prototype-to-production": FromPrototypeToProductionCover,
};

export function ComputerVisionLessonCover({ slug }: CoverProps) {
  const Cover = COVERS[slug] ?? WhatIsComputerVisionCover;
  return <Cover />;
}
