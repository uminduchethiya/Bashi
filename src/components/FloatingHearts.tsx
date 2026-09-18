import { useMemo } from 'react'

const EMOJIS = ['💖', '💗', '💕', '❤️', '🌸', '✨']

export default function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${(i * 6.3 + (i % 3) * 4) % 100}%`,
        delay: `${(i * 0.7) % 9}s`,
        duration: `${10 + (i % 6)}s`,
        size: `${14 + (i % 5) * 4}px`,
        emoji: EMOJIS[i % EMOJIS.length],
      })),
    [],
  )

  return (
    <div className="float-layer" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="float-item"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
}
