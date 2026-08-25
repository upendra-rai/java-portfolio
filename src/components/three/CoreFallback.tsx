export function CoreFallback() {
  const nodes = [
    { angle: -0.5, label: 'API' },
    { angle: 0.65, label: 'DB' },
    { angle: 1.85, label: 'CACHE' },
    { angle: 3.6, label: 'SEC' },
    { angle: 4.6, label: 'OPS' },
  ]
  const r = 120
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <svg viewBox="-160 -160 320 320" className="h-[70vmin] w-[70vmin] max-h-[520px] max-w-[520px]">
        <circle cx="0" cy="0" r={r} fill="none" stroke="rgba(245,247,250,0.14)" strokeWidth="0.75" />
        <circle cx="0" cy="0" r={r * 0.78} fill="none" stroke="rgba(245,247,250,0.08)" strokeWidth="0.75" />
        <circle cx="0" cy="0" r="34" fill="none" stroke="#FF6B2C" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="14" fill="none" stroke="#F5F7FA" strokeWidth="0.9" opacity="0.8" />
        <circle cx="0" cy="0" r="4" fill="#FF6B2C" />
        {nodes.map(({ angle, label }) => {
          const x = Math.cos(angle) * r
          const y = Math.sin(angle) * r
          return (
            <g key={label}>
              <line x1="0" y1="0" x2={x} y2={y} stroke="rgba(245,247,250,0.12)" strokeWidth="0.6" />
              <rect x={x - 11} y={y - 7} width="22" height="14" rx="3" fill="#101319" stroke="rgba(255,107,44,0.5)" strokeWidth="0.8" />
              <text x={x} y={y + 3} textAnchor="middle" fontSize="7" fontFamily="monospace" letterSpacing="1" fill="#8B93A1">
                {label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
