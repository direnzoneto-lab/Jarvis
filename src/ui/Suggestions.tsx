import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../store'
import { tr } from '../config'

/**
 * Rotating example commands, shown only while idle.
 *
 * A voice interface has no menus — nothing tells you what it can do. This is
 * the affordance. It disappears the moment JARVIS is doing anything, so it
 * never competes with the answer.
 *
 * Each line is phrased the way you'd actually say it, not as a feature name.
 */
const EXAMPLES = tr([
  'what happened in AI this week',
  'generate an image of the Mark Seven suit',
  'take a screenshot of my phone',
  "what's on my calendar tomorrow",
  'search for the best coffee near me',
  'read me the top story on Hacker News',
  'open my GitHub notifications',
  "summarise what's in my inbox",
  'find me a loading animation',
  "what's the weather looking like",
], [
  'o que aconteceu em IA esta semana',
  'gere uma imagem da armadura Mark Sete',
  'tire um print do meu celular',
  'o que tem na minha agenda amanhã',
  'procure o melhor café perto de mim',
  'leia a principal notícia do Hacker News',
  'abra minhas notificações do GitHub',
  'resuma o que chegou no meu e-mail',
  'encontre uma animação de carregamento',
  'como está a previsão do tempo',
])

const ROTATE_MS = 4200

export function Suggestions() {
  const phase = useStore((s) => s.phase)
  const turns = useStore((s) => s.turns)
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % EXAMPLES.length), ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  // Only while genuinely idle, and only until the first exchange — once the
  // user knows how it works, the prompt is just clutter.
  if (phase !== 'dormant' || turns.length > 0) return null

  return (
    <div className="suggest">
      <span className="suggest-lead">{tr('try', 'tente')}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className="suggest-text"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
        >
          “{tr('hey jarvis', 'ei jarvis')}, {EXAMPLES[i]}”
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
