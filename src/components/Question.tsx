import { motion } from 'framer-motion'
import MovingNoButton from './MovingNoButton'
import Typewriter from './Typewriter'

type Props = {
  screen: 1 | 2 | 3
  noAttempts?: number
  noMessage?: string
  onContinue?: () => void
  onYes?: () => void
  onNoAttempt?: (message: string) => void
  onGiveUp?: () => void
}

export default function Question({
  screen,
  noAttempts = 0,
  noMessage = '',
  onContinue,
  onYes,
  onNoAttempt,
  onGiveUp,
}: Props) {
  return (
    <motion.section
      className="screen"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45 }}
    >
      <div className="glass card">
        <div className="dots" aria-hidden="true">
          <span className={screen >= 1 ? 'on' : ''} />
          <span className={screen >= 2 ? 'on' : ''} />
          <span className={screen >= 3 ? 'on' : ''} />
        </div>

        {screen === 1 && (
          <>
            <h2 className="headline">
              <Typewriter text="I know what I want." />
            </h2>
            <button type="button" className="btn btn-primary" onClick={onContinue}>
              Continue
            </button>
          </>
        )}

        {screen === 2 && (
          <>
            <h2 className="headline">So I&apos;m asking you directly.</h2>
            <p className="sub">No overthinking. Just a clear question.</p>
            <button type="button" className="btn btn-primary" onClick={onContinue}>
              Next
            </button>
          </>
        )}

        {screen === 3 && (
          <>
            <h2 className="headline love-question">
              Bashi, would you go on a date with me?
            </h2>
            <p className="last-try">This is my last attempt.</p>
            {noMessage ? (
              <p className="no-toast">{noMessage}</p>
            ) : (
              <p className="sub">Give me a real answer.</p>
            )}
            <div className="choice-row">
              <button type="button" className="btn btn-yes" onClick={onYes}>
                YES
              </button>
              <MovingNoButton
                attempts={noAttempts}
                onAttempt={onNoAttempt ?? (() => undefined)}
                onGiveUp={onGiveUp ?? (() => undefined)}
              />
            </div>
            <p className="love-line">I love you, Bashi.</p>
          </>
        )}
      </div>
    </motion.section>
  )
}
