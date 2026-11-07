// the Immersive Reader for the syllabus page. Canvas has a real one, this copies the parts the prototype shows
import { useEffect, useMemo, useRef, useState } from 'react'
import { View, Flex, Text, Button, IconButton, Modal } from '@instructure/ui'
import { IconImmersiveReaderLine, IconArrowOpenStartLine, IconPlayLine, IconPauseLine, IconLineReaderLine } from '@instructure/ui-icons'
import { course } from '../data.js'
import { CONTACT_ROWS, filled } from './Contact.jsx'
import { describe } from './lookup.js'

// reading color themes
const THEMES = {
  light: { name: 'White', bg: '#ffffff', fg: '#1b1b1b' },
  cream: { name: 'Cream', bg: '#f6ecd6', fg: '#2b2b2b' },
  dark: { name: 'Dark', bg: '#1e1e1e', fg: '#f2f2f2' },
}

// the page as a flat list of headings and paragraphs in page order, that's what the reader shows
function paragraphs(blocks) {
  const out = []
  const add = (type, text) => text && out.push({ type, text })
  blocks.forEach((b) => {
    add('h', b.title)
    if (b.kind === 'text') add('p', b.text)
    if (b.kind === 'contact') {
      ;['name', 'title', 'department'].forEach((k) => filled(b.fields[k]) && add('p', b.fields[k]))
      CONTACT_ROWS.forEach(([k, label]) => filled(b.fields[k]) && add('p', `${label}: ${b.fields[k]}`))
    }
    if (b.kind === 'list') b.items.filter((x) => x.input.trim()).forEach((x) => add('p', `\u2022 ${describe(x)}`))
    if (b.kind === 'objectives') { add('p', b.lead); b.items.filter((x) => x.trim()).forEach((x) => add('p', `\u2022 ${x}`)) }
    if (b.kind === 'grading') { b.rows.filter((r) => r.category || r.weight).forEach((r) => add('p', `${r.category}: ${r.weight}%.`)); add('p', b.policy) }
    if (b.kind === 'policies') course.statements.filter((s) => b.statementIds.includes(s.id)).forEach((s) => { add('h3', s.title); add('p', s.text) })
    if (b.kind === 'coursesummary') b.rows.forEach((a) => add('p', `${a.name}, due ${a.date} at ${a.time}.`))
  })
  return out
}

// cuts a paragraph into sentences, each one keeps the space after it
// it splits after . ! or ? followed by a space, so an email like casey.rivera@example.edu stays whole
// the abbreviation list keeps "Prof. Casey" from splitting after Prof.
const ABBR = /\b(Prof|Dr|Mr|Ms|Mrs|St|vs)$/i
function sentencesOf(text) {
  const out = []
  let last = 0
  const re = /[.!?]+\s+/g
  let m
  while ((m = re.exec(text))) {
    if (ABBR.test(text.slice(last, m.index))) continue
    out.push(text.slice(last, m.index + m[0].length))
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

// reads a query string param, ?nospeech=1 turns the voice off so the highlight can be checked quietly
const q = (k) => new URLSearchParams(window.location.search).get(k)

function Reader({ blocks, onClose }) {
  const paras = useMemo(() => paragraphs(blocks), [blocks])
  // every sentence gets a number across the whole page, the read aloud highlight uses it
  const flat = useMemo(() => {
    let n = 0
    return paras.map((p) => ({ ...p, sentences: sentencesOf(p.text).map((t) => ({ t, i: n++ })) }))
  }, [paras])
  const sentenceList = useMemo(() => flat.flatMap((p) => p.sentences.map((s) => s.t)), [flat])

  const [size, setSize] = useState(24)
  const [wide, setWide] = useState(false)
  const [theme, setTheme] = useState('light')
  // line focus dims everything except a band that follows the mouse, y is the mouse position inside the text
  const [focus, setFocus] = useState(q('focus') === '1')
  const [y, setY] = useState(260)
  const wrap = useRef(null)
  const t = THEMES[theme]
  const band = size * 3.2
  // a toggle button looks pressed while its setting is on
  const btn = (on) => ({ color: on ? 'primary' : 'secondary', 'aria-pressed': on })

  // ?read=1 starts reading on load and ?focus=1 turns line focus on, for demos and screenshots
  const [reading, setReading] = useState(q('read') === '1')
  // idx is the sentence being read, -1 when nothing is
  const [idx, setIdx] = useState(q('read') === '1' ? 0 : -1)

  // reads one sentence at a time and moves the highlight along
  // speechSynthesis.speak and the utterance end event: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
  // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/end_event
  // with no voices in the browser a timer moves the highlight instead, so it still works
  useEffect(() => {
    if (!reading) return undefined
    if (idx >= sentenceList.length) { setReading(false); setIdx(-1); return undefined }
    const text = sentenceList[idx].trim()
    let done = false
    const next = () => { if (!done) { done = true; setIdx((i) => i + 1) } }
    // rough reading time, a third of a second a word
    const est = Math.max(900, text.split(/\s+/).length * 330)
    const synth = window.speechSynthesis
    let safety
    if (synth && typeof SpeechSynthesisUtterance !== 'undefined' && q('nospeech') !== '1') {
      const u = new SpeechSynthesisUtterance(text)
      u.onend = next
      u.onerror = (e) => { if (e.error !== 'interrupted' && e.error !== 'canceled') next() }
      synth.speak(u)
      // some browsers never fire end, so move on after twice the estimate
      safety = setTimeout(next, est * 2 + 2000)
    } else {
      safety = setTimeout(next, est)
    }
    return () => { done = true; clearTimeout(safety); if (synth) synth.cancel() }
  }, [reading, idx, sentenceList])

  // keeps the sentence being read in the middle of the screen
  // Element.scrollIntoView with block center and smooth: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  useEffect(() => {
    if (reading && idx >= 0) {
      const el = document.getElementById(`ir-s-${idx}`)
      if (el && el.scrollIntoView) el.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [idx, reading])

  // closing the reader stops the voice
  useEffect(() => () => { if (window.speechSynthesis) window.speechSynthesis.cancel() }, [])

  const toggleRead = () => {
    if (reading) setReading(false)
    else { if (idx < 0) setIdx(0); setReading(true) }
  }

  return (
    <Modal open size="fullscreen" label="Immersive Reader" onDismiss={onClose} shouldCloseOnDocumentClick={false}>
      <Modal.Header>
        <Flex gap="small" wrap="wrap" alignItems="center">
          <Flex.Item><IconButton screenReaderLabel="Exit Immersive Reader" renderIcon={IconArrowOpenStartLine} onClick={onClose} /></Flex.Item>
          <Flex.Item margin="0 medium 0 0"><Text weight="bold" size="large">Immersive Reader</Text></Flex.Item>
          <Flex.Item><Button renderIcon={reading ? IconPauseLine : IconPlayLine} color="primary" onClick={toggleRead}>{reading ? 'Pause' : 'Read aloud'}</Button></Flex.Item>
          <Flex.Item margin="0 0 0 medium"><Text size="small">Text size</Text></Flex.Item>
          <Flex.Item><Button size="small" onClick={() => setSize((n) => Math.max(16, n - 2))} aria-label="Smaller text">A&minus;</Button></Flex.Item>
          <Flex.Item><Button size="small" onClick={() => setSize((n) => Math.min(44, n + 2))} aria-label="Larger text">A+</Button></Flex.Item>
          <Flex.Item><Button size="small" {...btn(wide)} onClick={() => setWide(!wide)}>Wider spacing</Button></Flex.Item>
          {Object.entries(THEMES).map(([k, th]) => (
            <Flex.Item key={k}><Button size="small" {...btn(theme === k)} onClick={() => setTheme(k)}>{th.name}</Button></Flex.Item>
          ))}
          <Flex.Item><Button size="small" renderIcon={IconLineReaderLine} {...btn(focus)} onClick={() => setFocus(!focus)}>Line focus</Button></Flex.Item>
        </Flex>
      </Modal.Header>
      <Modal.Body padding="none">
        <div style={{ height: 'calc(100vh - 150px)', overflowY: 'auto', background: t.bg, color: t.fg }}>
          <div ref={wrap} style={{ position: 'relative', maxWidth: '46rem', margin: '0 auto', padding: '32px 24px 64px', fontSize: size, lineHeight: wide ? 1.9 : 1.5, letterSpacing: wide ? '0.08em' : 'normal', wordSpacing: wide ? '0.25em' : 'normal' }}
            onMouseMove={(e) => { if (focus && wrap.current) setY(e.clientY - wrap.current.getBoundingClientRect().top) }}>
            {flat.map((p, pi) => {
              const style = p.type === 'h' ? { fontSize: '1.35em', fontWeight: 700, margin: '1.4em 0 0.3em' } : p.type === 'h3' ? { fontWeight: 700, margin: '0.8em 0 0.2em' } : { margin: '0 0 0.7em' }
              return (
                <div key={pi} style={style}>
                  {p.sentences.map((s) => <span key={s.i} id={`ir-s-${s.i}`} style={{ background: s.i === idx ? '#ffe066' : 'transparent', color: s.i === idx ? '#1b1b1b' : 'inherit', borderRadius: 3 }}>{s.t}</span>)}
                </div>
              )
            })}
            <View as="div" margin="large 0 0"><Text size="small" color="secondary">Prototype: this emulation reads aloud with a moving highlight and offers text size, spacing, themes, and line focus. The real Immersive Reader also has grammar tools, a picture dictionary, and translation.</Text></View>
            {focus && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: Math.max(0, y - band / 2), background: 'rgba(0,0,0,0.62)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, top: y + band / 2, bottom: 0, background: 'rgba(0,0,0,0.62)', pointerEvents: 'none' }} />
              </>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

// the button that opens the reader, it goes next to the export buttons
export function ImmersiveReaderButton({ blocks, margin }) {
  // ?reader=1 opens the reader on load, for demos and screenshots
  const [open, setOpen] = useState(() => new URLSearchParams(window.location.search).get('reader') === '1')

  return (
    <>
      <Button renderIcon={IconImmersiveReaderLine} margin={margin} onClick={() => setOpen(true)}>Immersive Reader</Button>
      {open && <Reader blocks={blocks} onClose={() => setOpen(false)} />}
    </>
  )
}
