export type DateOption = {
  id: string
  emoji: string
  title: string
  description: string
  surprise?: boolean
}

export const DATE_OPTIONS: DateOption[] = [
  {
    id: 'coffee',
    emoji: '☕',
    title: 'Coffee Date',
    description: 'Coffee. Conversation. Just us.',
  },
  {
    id: 'food',
    emoji: '🍕',
    title: 'Food Date',
    description: 'Good food. We sit down and eat.',
  },
  {
    id: 'sunset',
    emoji: '🌅',
    title: 'Sunset Date',
    description: 'A quiet place. A proper view.',
  },
  {
    id: 'movie',
    emoji: '🎬',
    title: 'Movie Date',
    description: 'A movie. Snacks. I stay awake.',
  },
  {
    id: 'surprise',
    emoji: '🎲',
    title: 'Surprise Me',
    description: 'Leave it to me. I’ll plan it.',
  },
]
