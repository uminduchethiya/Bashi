import { useEffect, useRef } from 'react'

type Props = {
  playing: boolean
}

export default function MusicPlayer({ playing }: Props) {
  const ctxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const stopNotes = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }

    if (!playing) {
      stopNotes()
      const ctx = ctxRef.current
      const gain = gainRef.current
      if (ctx && gain) {
        gain.gain.cancelScheduledValues(ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4)
      }
      return
    }

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const existing = ctxRef.current
    const ctx =
      existing && existing.state !== 'closed' ? existing : new AudioCtx()
    ctxRef.current = ctx
    void ctx.resume()

    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
    master.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.8)
    gainRef.current = master

    const delay = ctx.createDelay()
    delay.delayTime.value = 0.32
    const feedback = ctx.createGain()
    feedback.gain.value = 0.22
    delay.connect(feedback)
    feedback.connect(delay)
    delay.connect(master)

    const melody = [523.25, 659.25, 783.99, 880, 783.99, 659.25, 587.33, 523.25, 392, 523.25]
    let i = 0

    const playNote = () => {
      const osc = ctx.createOscillator()
      const env = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = melody[i % melody.length]
      env.gain.setValueAtTime(0.0001, ctx.currentTime)
      env.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 0.04)
      env.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9)
      osc.connect(env)
      env.connect(master)
      env.connect(delay)
      osc.start()
      osc.stop(ctx.currentTime + 0.95)
      i += 1
      timerRef.current = window.setTimeout(playNote, i % 10 === 0 ? 980 : 430)
    }

    playNote()

    return () => {
      stopNotes()
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25)
    }
  }, [playing])

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      void ctxRef.current?.close()
    }
  }, [])

  return null
}
