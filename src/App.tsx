import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Welcome from './components/Welcome'
import Question from './components/Question'
import Celebration from './components/Celebration'
import Quiz from './components/Quiz'
import DateOptions from './components/DateOptions'
import MessageStep from './components/MessageStep'
import FinalScreen from './components/FinalScreen'
import SoftNo from './components/SoftNo'
import FloatingHearts from './components/FloatingHearts'
import FloatingFlowers from './components/FloatingFlowers'
import ConfettiBurst from './components/ConfettiBurst'
import MusicPlayer from './components/MusicPlayer'
import { DATE_OPTIONS, type DateOption } from './data/dateOptions'
import type { QuizAnswer } from './data/quiz'
import './App.css'

export type Step = 'welcome' | 'q1' | 'q2' | 'q3' | 'yes' | 'quiz' | 'dates' | 'message' | 'final' | 'softNo'

function pickDate(id: string): DateOption {
  if (id === 'surprise') {
    const pool = DATE_OPTIONS.filter((option) => option.id !== 'surprise')
    const chosen = pool[Math.floor(Math.random() * pool.length)]
    return { ...chosen, surprise: true }
  }
  return DATE_OPTIONS.find((option) => option.id === id) ?? DATE_OPTIONS[0]
}

export default function App() {
  const [step, setStep] = useState<Step>('welcome')
  const [noAttempts, setNoAttempts] = useState(0)
  const [noMessage, setNoMessage] = useState('')
  const [selectedDate, setSelectedDate] = useState<DateOption | null>(null)
  const [herMessage, setHerMessage] = useState('')
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([])
  const [musicOn, setMusicOn] = useState(false)

  const openSurprise = () => {
    setMusicOn(true)
    setStep('q1')
  }

  const sayYes = () => setStep('yes')

  return (
    <div className="app">
      <div className="stars" aria-hidden="true" />
      <FloatingHearts />
      <FloatingFlowers />
      <ConfettiBurst active={step === 'yes' || step === 'final'} />
      <MusicPlayer playing={musicOn} />

      <button
        type="button"
        className="music-toggle"
        onClick={() => setMusicOn((on) => !on)}
        aria-label={musicOn ? 'Mute music' : 'Play music'}
      >
        {musicOn ? '🎵' : '🔇'}
      </button>

      <AnimatePresence mode="wait">
        {step === 'welcome' && <Welcome key="welcome" onOpen={openSurprise} />}
        {step === 'q1' && (
          <Question key="q1" screen={1} onContinue={() => setStep('q2')} />
        )}
        {step === 'q2' && (
          <Question key="q2" screen={2} onContinue={() => setStep('q3')} />
        )}
        {step === 'q3' && (
          <Question
            key="q3"
            screen={3}
            noAttempts={noAttempts}
            noMessage={noMessage}
            onYes={sayYes}
            onNoAttempt={(message) => {
              setNoMessage(message)
              setNoAttempts((count) => count + 1)
            }}
            onGiveUp={() => setStep('softNo')}
          />
        )}
        {step === 'yes' && <Celebration key="yes" onChooseDate={() => setStep('quiz')} />}
        {step === 'quiz' && (
          <Quiz
            key="quiz"
            onDone={(answers) => {
              setQuizAnswers(answers)
              setStep('dates')
            }}
          />
        )}
        {step === 'dates' && (
          <DateOptions
            key="dates"
            onSelect={(id) => {
              setSelectedDate(pickDate(id))
              setStep('message')
            }}
          />
        )}
        {step === 'message' && selectedDate && (
          <MessageStep
            key="message"
            date={selectedDate}
            quizAnswers={quizAnswers}
            onSent={(text) => {
              setHerMessage(text)
              setStep('final')
            }}
          />
        )}
        {step === 'final' && selectedDate && (
          <FinalScreen key="final" date={selectedDate} message={herMessage} />
        )}
        {step === 'softNo' && <SoftNo key="softNo" onYesAnyway={sayYes} />}
      </AnimatePresence>
    </div>
  )
}
