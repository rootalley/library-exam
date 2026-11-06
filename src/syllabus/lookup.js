// pretend ISBN, ISSN and DOI lookup. The works below are invented, a real version would ask a catalog service.
// An identifier is recognized by its shape first, then matched against this short list.
const WORKS = {
  'isbn:9781234567897': { source: 'ISBN', kind: 'Book', title: 'Designing Interfaces for Real People', authors: 'A. Example and B. Sample', detail: '3rd ed. Sample Press, 2023.', id: 'ISBN 978-1-23456-789-7' },
  'isbn:9780987654328': { source: 'ISBN', kind: 'Book', title: 'The Usable Syllabus', authors: 'C. Placeholder', detail: 'Example University Press, 2019.', id: 'ISBN 978-0-98765-432-8' },
  'isbn:9781555551230': { source: 'ISBN', kind: 'Book', title: 'Testing Interfaces with Real Users: A Field Guide', authors: 'D. Placeholder and E. Example', detail: '2nd ed. Example University Press, 2022.', id: 'ISBN 978-1-55555-123-0' },
  'issn:12345678': { source: 'ISSN', kind: 'Journal', title: 'Journal of Interface Studies', authors: '', detail: 'Sample Press.', id: 'ISSN 1234-5678' },
  'doi:10.1000/xyz123': { source: 'DOI', kind: 'Article', title: 'Evaluating Prototypes with Small Samples', authors: 'J. Example and K. Sample', detail: 'Journal of Interface Studies, 12(3), 2021.', id: 'https://doi.org/10.1000/xyz123' },
  'doi:10.1000/abc456': { source: 'DOI', kind: 'Article', title: 'Reading Between the Gridlines: Accessibility in Course Pages', authors: 'L. Placeholder', detail: 'Journal of Interface Studies, 9(1), 2019.', id: 'https://doi.org/10.1000/abc456' },
}

// returns { source, key } when the whole input looks like an ISBN, ISSN or DOI, otherwise null
export function detect(input) {
  const t = (input || '').trim()
  if (!t) return null

  // DOI: the 10.xxxx/ start is the pattern from the Crossref post on matching DOIs with regular expressions
  // https://www.crossref.org/blog/dois-and-matching-regular-expressions/
  const doi = t.match(/^(?:doi:\s*|https?:\/\/(?:dx\.)?doi\.org\/)?(10\.\d{4,9}\/\S+)$/i)
  if (doi) return { source: 'DOI', key: `doi:${doi[1].toLowerCase()}` }

  // ISBN or ISSN: digits with optional dashes or spaces, and an optional isbn or issn label in front
  const m = t.match(/^(isbn(?:-1[03])?|issn)?[:\s]*([0-9][0-9\s-]*[0-9Xx])$/i)
  if (!m) return null
  const code = m[2].replace(/[\s-]/g, '').toUpperCase()
  const label = (m[1] || '').toLowerCase()
  // 8 digits is an ISSN, 10 or 13 is an ISBN
  if (label.startsWith('issn') || (!label && code.length === 8)) return code.length === 8 ? { source: 'ISSN', key: `issn:${code}` } : null
  if (code.length === 13 || code.length === 10) return { source: 'ISBN', key: `isbn:${code}` }
  return null
}

export const find = (det) => WORKS[det.key] || null

// plain text can match too, when it contains the title of a known work
export function findByText(input) {
  const t = (input || '').toLowerCase()
  return Object.values(WORKS).find((w) => t.includes(w.title.toLowerCase())) || null
}
