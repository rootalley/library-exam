import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Vite + React</h1>
      {/* quick check that vite and react are working */}
      <button onClick={() => setCount(count + 1)}>count is {count}</button>
    </div>
  )
}
