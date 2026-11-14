/** Hero backdrop: a hospital floor drawn as linework, with one delivery route that draws itself. */
const ROOMS = [
  [20, 20, 200, 130], [240, 20, 150, 130], [410, 20, 230, 90], [660, 20, 140, 130], [820, 20, 160, 180],
  [20, 170, 140, 170], [180, 210, 190, 110], [460, 150, 170, 100], [660, 190, 140, 120], [820, 220, 160, 130],
  [20, 360, 200, 120], [240, 400, 130, 160], [410, 300, 150, 260], [580, 360, 210, 200], [820, 370, 160, 190],
];

const ROUTE = "M120 560 L120 345 L395 345 L395 170 L650 170 L650 345 L810 345 L810 210";

const STOPS = [
  { x: 120, y: 560, label: "PHARMACY" },
  { x: 395, y: 170, label: "LIFT B" },
  { x: 810, y: 210, label: "WARD 4C" },
];

export default function HeroScan() {
  return (
    <svg className="scan" viewBox="0 0 1000 580" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="scan-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" className="scan__grid" />
        </pattern>
      </defs>
      <rect width="1000" height="580" fill="url(#scan-grid)" />
      <g className="scan__rooms">
        {ROOMS.map(([x, y, w, h]) => <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="4" />)}
      </g>
      <path className="scan__route-base" d={ROUTE} />
      <path className="scan__route" d={ROUTE} pathLength="1" />
      {STOPS.map(({ x, y, label }, i) => (
        <g key={label}>
          <circle className={`scan__stop ${i === STOPS.length - 1 ? "scan__stop--end" : ""}`} cx={x} cy={y} r="6" />
          <text className="scan__label" x={x + 12} y={y - 12}>{label}</text>
        </g>
      ))}
    </svg>
  );
}
