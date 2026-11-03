// the three ways to start a syllabus, just boxes for now
export function Start() {
  const box = { width: '16rem', boxSizing: 'border-box', border: '1px solid #c7cdd1', padding: 24 }

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      {/* upload a file goes here */}
      <div style={box}>box 1</div>
      {/* copy previous syllabus goes here */}
      <div style={box}>box 2</div>
      {/* start fresh goes here */}
      <div style={box}>box 3</div>
    </div>
  )
}
