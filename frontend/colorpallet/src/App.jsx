import { useState,useEffect } from 'react'
import SelfieUploadForm from './components/SelfieUploadForm'
import ColorPicker from './components/ColorPicker'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <ColorPicker/>
        {/* <SelfieUploadForm/> */}
      </div>
    </>
  )
}

export default App
