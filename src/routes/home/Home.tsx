import { Button } from '@mui/material'
import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Vite + React</h1>
      <div className="card">
          <Button
            onClick={() => setCount((count) => count + 1)}
            variant="contained">
            count is {count}
          </Button>
      </div>
    </div>
  )
}