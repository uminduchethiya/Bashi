import { motion } from 'framer-motion'
import { DATE_OPTIONS } from '../data/dateOptions'

type Props = {
  onSelect: (id: string) => void
}

export default function DateOptions({ onSelect }: Props) {
  return (
    <motion.section
      className="screen"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="glass card card-wide">
        <p className="eyebrow">the plan</p>
        <h2 className="headline">Where are we going?</h2>
        <p className="sub">Pick one. I&apos;ll make it happen.</p>
        <div className="date-grid">
          {DATE_OPTIONS.map((option, index) => (
            <motion.button
              key={option.id}
              type="button"
              className="date-card"
              onClick={() => onSelect(option.id)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="date-emoji">{option.emoji}</span>
              <strong>{option.title}</strong>
              <p>{option.description}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
