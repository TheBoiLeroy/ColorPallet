import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Container,Box } from '@mui/material';
function HexColorForm({ colors }) {
  // Initialize state for each color with values from props
  const [eyeColor, setColor1] = useState(colors[0]);
  const [skinColor, setColor2] = useState(colors[1]);
  const [hairColor, setColor3] = useState(colors[2]);
  const [processedColors, setProcessedColors] = useState(null); // Add this line

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { eyeColor, skinColor, hairColor };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/hexcolors/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setProcessedColors(result); // This will store the response data in state
      console.log(processedColors.content);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '75vh', // Ensures the content is vertically centered in the viewport
        }}
      >
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Colors
        </Button>
        
        {processedColors && (
          <Box mt={2} textAlign="center"> {/* Adds top margin and centers text */}
            <Typography variant="h5" component="h3" gutterBottom>
              AI Response:
            </Typography>
            <Typography variant="body1">
              {processedColors.chatResponse}
            </Typography>
            <Box 
              sx={{
                display: 'flex', // Creates a flex container
                justifyContent: 'center', // Horizontally centers the child content
                alignItems: 'center', // Vertically centers the child content (if needed)
                mt: 2, // Adds top margin
                overflow: 'hidden' // Prevents overflow, optional based on your needs
              }}>
              <img 
                src="https://miro.medium.com/v2/resize:fit:560/0*Mh4DvJHKSQPAlLcR.jpg" 
                alt="Descriptive Alt Text" 
                style={{ maxWidth: '100%', height: 'auto' }} // Ensures the image is responsive
              />
            </Box>
          </Box>    
        )}
      </Box>
    </Container>
  );
}

export default HexColorForm;
