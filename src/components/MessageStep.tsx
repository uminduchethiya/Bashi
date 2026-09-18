import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import type { DateOption } from '../data/dateOptions'
import type { QuizAnswer } from '../data/quiz'

type Props = {
  date: DateOption
  quizAnswers: QuizAnswer[]
  onSent: (message: string) => void
}

export default function MessageStep({ date, quizAnswers, onSent }: Props) {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const canSubmit = message.trim().length > 0 && !sending

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = message.trim()
    if (!text) {
      setError('Message is required. Write something first.')
      return
    }

    setSending(true)
    setError('')
    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          date: `${date.emoji} ${date.title}`,
          answers: quizAnswers,
        }),
      })
      const data = (await response.json()) as { ok?: boolean; error?: string }
      if (!response.ok || !data.ok) {
        setError(data.error || 'Could not send the message.')
        return
      }
      onSent(text)
    } catch {
      setError('Could not send the message. Try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.section
      className="screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
    >
      <form className="glass card card-wide" onSubmit={onSubmit} noValidate>
        <p className="eyebrow">one more step</p>
        <h2 className="headline">Send me a message.</h2>
        <p className="sub">Required. Say what you need to say.</p>
        <label className="field-label" htmlFor="bashi-message">
          Your message
        </label>
        <textarea
          id="bashi-message"
          className="message-box"
          name="message"
          required
          minLength={1}
          rows={5}
          value={message}
          placeholder="Write it here..."
          onChange={(event) => {
            setMessage(event.target.value)
            if (error) setError('')
          }}
        />
        {error ? <p className="form-error">{error}</p> : null}
        <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
          {sending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </motion.section>
  )
}
