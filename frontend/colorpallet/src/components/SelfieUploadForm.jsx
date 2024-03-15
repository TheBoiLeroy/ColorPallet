import React, { useState } from 'react';
import { Button, Card, CardMedia, makeStyles } from '@material-ui/core';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    display: 'none',
  },
  previewCard: {
    marginTop: theme.spacing(2),
    width: '100%', // Adjust based on your needs
  },
  previewMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9 Aspect Ratio
  },
  uploadButton: {
    margin: theme.spacing(2),
  },
}));
const SelfieUploadForm = ({ onImageSelected }) =>{
    const [results, setResults] = useState('');
    const [preview, setPreview] = useState(null);
    const classes = useStyles();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
            onImageSelected()
          };
          reader.readAsDataURL(file);
        } else {
          setPreview(null);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const fileInput = document.querySelector('input[type="file"]');
        formData.append('image', fileInput.files[0]);

        // Make sure a file was selected
        if (fileInput.files.length > 0) {
            // Prepare data to be sent to the server
            formData.append('selfie', fileInput.files[0]);
            try {
                // Replace URL with your actual upload endpoint
                const response = await fetch('http://127.0.0.1:8000/api/upload/', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json(); // Assuming the server responds with JSON
                setResults(JSON.stringify(data)); // Update the state with the response
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
    <div>
      <form id="upload-form" className={classes.form} onSubmit={handleSubmit}>
        <input
          accept="image/*"
          className={classes.input}
          id="selfie"
          type="file"
          onChange={handleImageChange}
        />
        {!preview&&
            <>
                <h2>Step One</h2>
                <label htmlFor="selfie">
                <Button variant="contained" color="primary" component="span" className={classes.uploadButton}>
                    Upload Image
                </Button>
                </label>
            </>
        }
      </form>
      <Container maxWidth="sm">
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="60vh" // Adjust based on your needs
          sx={{width: '100%'}} // Ensures the Box fills its Container
        >
          {preview && (
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />
          )}
        </Box>
      </Container>

    </div>
    );
}

export default SelfieUploadForm;
