import { motion } from 'framer-motion'
import Typewriter from './Typewriter'

type Props = {
  onOpen: () => void
}

export default function Welcome({ onOpen }: Props) {
  return (
    <motion.section
      className="screen"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass card">
        <p className="eyebrow">for you</p>
        <h1 className="script-title">
          <span className="gradient-text">Hey Bashi</span>
        </h1>
        <p className="lead">
          <Typewriter text="I have something to ask you." />
        </p>
        <p className="sub">Straight up. No games.</p>
        <button type="button" className="btn btn-primary" onClick={onOpen}>
          Open this 💌
        </button>
      </div>
    </motion.section>
  )
}
