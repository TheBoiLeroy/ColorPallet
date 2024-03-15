import { useState,useEffect } from 'react'
import SelfieUploadForm from './components/SelfieUploadForm'
import ColorPicker from './components/ColorPicker'
import { Box } from '@material-ui/core'
import Container from '@mui/material/Container';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Container maxWidth="md"> {/* Limits the maximum width and adds responsive padding */}
      <Box 
        display="flex" // Enables flexbox layout
        justifyContent="center" // Centers items horizontally in the container
        alignItems="center" // Centers items vertically in the container
        minHeight="100vh" // Ensures the container takes at least the full viewport height
        flexDirection="column" // Stacks items vertically
      >
        <ColorPicker />
        {/* Uncomment if you wish to include other components like SelfieUploadForm */}
        {/* <SelfieUploadForm /> */}
      </Box>
    </Container>
  )
}

export default App
