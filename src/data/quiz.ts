export type QuizAnswer = {
  prompt: string
  code: string
  herAnswer: string
  correctAnswer: string
}

export type QuizQuestion = {
  prompt: string
  code: string
  type: 'choice' | 'text'
  options?: string[]
  answer: string
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    prompt: 'Read the if. If you say yes, what happens?',
    code: `if (youSayYes) {
  goOnADate()
} else {
  stayHome()
}`,
    type: 'choice',
    options: ['We go on a date', 'We stay home', 'Nothing happens'],
    answer: 'We go on a date',
  },
  {
    prompt: 'When does this become a date?',
    code: `if (love == true && answer == "yes") {
  status = "it's a date"
}`,
    type: 'choice',
    options: [
      'Only if love is true AND the answer is yes',
      'If only love is true',
      'Always',
    ],
    answer: 'Only if love is true AND the answer is yes',
  },
  {
    prompt: 'What does this print?',
    code: `chance = 1
if (chance == 1) {
  print("now")
}`,
    type: 'choice',
    options: ['now', 'later', 'error'],
    answer: 'now',
  },
  {
    prompt: 'If name is Bashi, what gets printed? Type it.',
    code: `if (name == "Bashi") {
  print("I love you")
}`,
    type: 'text',
    answer: 'I love you',
  },
  {
    prompt: 'Which answer does NOT let us go?',
    code: `if (answer != "no") {
  go()
}`,
    type: 'choice',
    options: ['yes', 'maybe', 'no'],
    answer: 'no',
  },
]
