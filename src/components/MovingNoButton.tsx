import { useRef, useState } from 'react'

const MESSAGES = [
  'Not that one.',
  'Try again.',
  'Wrong button.',
  'That is not happening.',
  'Nice try.',
]

const MAX_ATTEMPTS = 5

type Props = {
  attempts: number
  onAttempt: (message: string) => void
  onGiveUp: () => void
}

export default function MovingNoButton({ attempts, onAttempt, onGiveUp }: Props) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const lastMove = useRef(0)
  const settled = attempts >= MAX_ATTEMPTS

  const dodge = () => {
    if (settled) return
    const now = Date.now()
    if (now - lastMove.current < 260) return
    lastMove.current = now

    const edge = Math.floor(Math.random() * 4)
    let top = 14 + Math.random() * 62
    let left = 8 + Math.random() * 70
    if (edge === 0) top = 10 + Math.random() * 10
    if (edge === 1) top = 78 + Math.random() * 10
    if (edge === 2) left = 4 + Math.random() * 10
    if (edge === 3) left = 78 + Math.random() * 12

    setPos({ top, left })
    onAttempt(MESSAGES[attempts % MESSAGES.length])
  }

  if (settled) {
    return (
      <button type="button" className="btn btn-ghost" onClick={onGiveUp}>
        No
      </button>
    )
  }

  return (
    <button
      type="button"
      className={`btn btn-ghost ${pos ? 'btn-no-float' : ''}`}
      style={
        pos
          ? {
              position: 'fixed',
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              zIndex: 80,
            }
          : undefined
      }
      onMouseEnter={dodge}
      onPointerDown={(event) => {
        event.preventDefault()
        dodge()
      }}
    >
      NO
    </button>
  )
}
