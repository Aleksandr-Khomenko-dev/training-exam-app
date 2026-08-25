// Randomizes the display order of a question's options and remaps the correct-answer
// indices to match, so the correct choice is never predictably in the same slot.
export function shuffleOptions(q) {
  const order = q.options.map((_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  const options = order.map((origIdx) => q.options[origIdx])
  const correct = q.correct.map((origIdx) => order.indexOf(origIdx)).sort((a, b) => a - b)
  return { ...q, options, correct }
}
