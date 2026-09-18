import { useMemo } from 'react'

const FLOWERS = ['🌸', '🌺', '🌷', '💮', '🌹', '🌼']

export default function FloatingFlowers() {
  const flowers = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 9.5) % 84)}%`,
        delay: `${(i * 1.1) % 11}s`,
        duration: `${14 + (i % 5)}s`,
        size: `${16 + (i % 4) * 5}px`,
        emoji: FLOWERS[i % FLOWERS.length],
      })),
    [],
  )

  return (
    <div className="float-layer float-layer--slow" aria-hidden="true">
      {flowers.map((flower) => (
        <span
          key={flower.id}
          className="float-item float-item--sway"
          style={{
            left: flower.left,
            animationDelay: flower.delay,
            animationDuration: flower.duration,
            fontSize: flower.size,
          }}
        >
          {flower.emoji}
        </span>
      ))}
    </div>
  )
}
