import { motion } from 'framer-motion'
import type { DateOption } from '../data/dateOptions'

type Props = {
  date: DateOption
  message: string
}

export default function FinalScreen({ date, message }: Props) {
  return (
    <motion.section
      className="screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="glass card card-wide">
        <p className="script-title">
          <span className="gradient-text">It&apos;s a Date</span>
        </p>
        <p className="picked">
          {date.surprise ? (
            <>
              I&apos;ll pick: <strong>{date.emoji} {date.title}</strong>
            </>
          ) : (
            <>
              Plan: <strong>{date.emoji} {date.title}</strong>
            </>
          )}
        </p>
        <p className="sub">{date.description}</p>
        {message ? (
          <p className="her-message">“{message}”</p>
        ) : null}
        <p className="lead closing">It&apos;s settled now.</p>
        <p className="love-line">I love you, Bashi.</p>
      </div>
    </motion.section>
  )
}
