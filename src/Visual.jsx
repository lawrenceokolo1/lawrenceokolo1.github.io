/** Card art: a real screenshot when we have one, otherwise a small SVG motif for the project. */
const MOTIFS = {
  // Agents fanning into one robot: three platform nodes wired to a core.
  agents: (
    <g>
      {[[90, 70, "CLAUDE"], [90, 150, "GEMINI"], [90, 230, "OPENCLAW"]].map(([x, y, t]) => (
        <g key={t}>
          <path d={`M${x + 70} ${y} C 230 ${y}, 230 150, 300 150`} className="m-line" />
          <rect x={x - 60} y={y - 18} width="130" height="36" rx="18" className="m-chip" />
          <text x={x + 5} y={y + 5} className="m-text" textAnchor="middle">{t}</text>
        </g>
      ))}
      <circle cx="340" cy="150" r="42" className="m-core" />
      <text x="340" y="155" className="m-text m-text--dark" textAnchor="middle">ROS 2</text>
    </g>
  ),
  // Embedding space: a query point with its nearest neighbours highlighted.
  vectors: (
    <g>
      {Array.from({ length: 46 }, (_, i) => {
        const x = 40 + ((i * 73) % 340);
        const y = 30 + ((i * 47) % 240);
        const near = Math.hypot(x - 230, y - 140) < 70;
        return <circle key={i} cx={x} cy={y} r={near ? 6 : 4} className={near ? "m-dot m-dot--hit" : "m-dot"} />;
      })}
      <circle cx="230" cy="140" r="70" className="m-ring" />
      <circle cx="230" cy="140" r="9" className="m-core" />
    </g>
  ),
  // Contour lines with a loss patch, like a dNBR severity map.
  terrain: (
    <g>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} className="m-line" d={`M0 ${70 + i * 34} C 90 ${40 + i * 34}, 160 ${110 + i * 30}, 240 ${70 + i * 34} S 380 ${50 + i * 36}, 420 ${80 + i * 34}`} />
      ))}
      <path className="m-patch" d="M210 120 C 250 96, 300 110, 310 140 C 322 176, 270 200, 236 188 C 200 176, 186 140, 210 120 Z" />
    </g>
  ),
  // A plain-language question and a structured answer, drawn as text lines.
  chat: (
    <g>
      <rect x="150" y="40" width="230" height="44" rx="22" className="m-bubble-q" />
      <text x="265" y="67" className="m-text m-text--light" textAnchor="middle">NEXT SAILING TO MATANE?</text>
      <rect x="40" y="110" width="270" height="140" rx="22" className="m-chip" />
      <circle cx="74" cy="144" r="14" className="m-core" />
      {[[100, 140, 170], [100, 160, 120], [64, 192, 220], [64, 212, 180], [64, 232, 140]].map(([x, y, w]) => (
        <rect key={y} x={x} y={y - 5} width={w} height="9" rx="4.5" className="m-bar" />
      ))}
    </g>
  ),
  // Vital-sign trace.
  pulse: (
    <g>
      <path className="m-line m-line--bold" d="M0 160 H120 L140 120 L160 200 L185 70 L210 230 L232 150 L252 160 H420" />
      <circle cx="185" cy="70" r="7" className="m-core" />
    </g>
  ),
};

export default function Visual({ visual, title }) {
  if (visual.startsWith("/")) {
    return <img src={visual} alt={`${title} screenshot`} loading="lazy" decoding="async" />;
  }
  return (
    <svg viewBox="0 0 420 300" role="img" aria-label={`${title} illustration`}>
      {MOTIFS[visual]}
    </svg>
  );
}
