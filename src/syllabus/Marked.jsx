// text with the flagged details highlighted in yellow

// the flagged text can have characters that mean something in a regex (like a dot or a parenthesis), so escape them first
// MDN regular expressions guide, escaping section: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function Marked({ text, flags }) {
  const hits = flags.filter((f) => text.includes(f.text))
  if (!hits.length) return text
  // splitting on a regex with a capture group keeps the matched parts in the array
  const re = new RegExp('(' + hits.map((h) => escapeRe(h.text)).join('|') + ')', 'g')
  return text.split(re).map((part, i) => {
    const f = hits.find((h) => h.text === part)
    return f ? <mark key={i} title={f.note} style={{ background: '#fff176', padding: '0 2px' }}>{part}</mark> : part
  })
}
