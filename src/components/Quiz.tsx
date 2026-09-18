import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { QUIZ_QUESTIONS, type QuizAnswer } from '../data/quiz'

type Props = {
  onDone: (answers: QuizAnswer[]) => void
}

export default function Quiz({ onDone }: Props) {
  const [index, setIndex] = useState(0)
  const [hint, setHint] = useState('')
  const [typed, setTyped] = useState('')
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const question = QUIZ_QUESTIONS[index]
  const stepNumber = index + 1
  const total = QUIZ_QUESTIONS.length

  const saveAndNext = (herAnswer: string) => {
    const value = herAnswer.trim()
    if (!value) {
      setHint('Choose or type an answer first.')
      return
    }
    const nextAnswers = [
      ...answers,
      {
        prompt: question.prompt,
        code: question.code,
        herAnswer: value,
        correctAnswer: question.answer,
      },
    ]
    setAnswers(nextAnswers)
    setHint('')
    setTyped('')
    if (index + 1 >= total) {
      onDone(nextAnswers)
      return
    }
    setIndex((current) => current + 1)
  }

  const onTypedSubmit = (event: FormEvent) => {
    event.preventDefault()
    saveAndNext(typed)
  }

  return (
    <motion.section
      className="screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
    >
      <div className="glass card card-wide">
        <p className="eyebrow">
          think {stepNumber} / {total}
        </p>
        <h2 className="headline">{question.prompt}</h2>
        <pre className="code-snippet">
          <code>{question.code}</code>
        </pre>
        {hint ? (
          <p className="no-toast">{hint}</p>
        ) : (
          <p className="sub">There is no wrong door. Pick what you think.</p>
        )}

        {question.type === 'choice' && question.options ? (
          <div className="quiz-options">
            {question.options.map((option) => (
              <button
                key={option}
                type="button"
                className="btn btn-ghost quiz-option"
                onClick={() => saveAndNext(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={onTypedSubmit}>
            <input
              className="quiz-input"
              value={typed}
              onChange={(event) => {
                setTyped(event.target.value)
                if (hint) setHint('')
              }}
              placeholder="Type your answer"
              required
            />
            <button type="submit" className="btn btn-primary" disabled={!typed.trim()}>
              Next
            </button>
          </form>
        )}
      </div>
    </motion.section>
  )
}
