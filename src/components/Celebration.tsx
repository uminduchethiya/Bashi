import { motion } from 'framer-motion'

type Props = {
  onChooseDate: () => void
}

export default function Celebration({ onChooseDate }: Props) {
  return (
    <motion.section
      className="screen"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <div className="glass card card-wide">
        <p className="eyebrow">locked in</p>
        <h1 className="mega">You said yes.</h1>
        <p className="lead">Good. That was the only answer I wanted.</p>
        <p className="sub">A few if-conditions. Think, then answer. Every answer comes to me.</p>
        <button type="button" className="btn btn-primary" onClick={onChooseDate}>
          Start
        </button>
      </div>
    </motion.section>
  )
}
