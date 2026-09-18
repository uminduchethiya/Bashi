import { motion } from 'framer-motion'

type Props = {
  onYesAnyway: () => void
}

export default function SoftNo({ onYesAnyway }: Props) {
  return (
    <motion.section
      className="screen"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="glass card">
        <h2 className="headline">Alright.</h2>
        <p className="sub">I asked. You answered. I can take it.</p>
        <p className="sub">If that wasn&apos;t your real answer, say it now.</p>
        <button type="button" className="btn btn-primary" onClick={onYesAnyway}>
          I meant YES
        </button>
      </div>
    </motion.section>
  )
}
