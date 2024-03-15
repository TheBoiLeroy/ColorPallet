import { useState,useEffect } from 'react'
import SelfieUploadForm from './components/SelfieUploadForm'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <SelfieUploadForm/>
      </div>
    </>
  )
}

export default App
