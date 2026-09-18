import { useEffect, useState } from 'react'

type Props = {
  text: string
  className?: string
  speed?: number
  showCaret?: boolean
}

export default function Typewriter({
  text,
  className,
  speed = 34,
  showCaret = true,
}: Props) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    setShown('')
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) window.clearInterval(id)
    }, speed)
    return () => window.clearInterval(id)
  }, [text, speed])

  return (
    <span className={className}>
      {shown}
      {showCaret && shown.length < text.length ? <span className="caret">|</span> : null}
    </span>
  )
}
