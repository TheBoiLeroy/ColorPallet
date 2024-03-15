import React, { useEffect, useState } from 'react';
import { EyeDropper } from 'react-eyedrop';
import SelfieUploadForm from './SelfieUploadForm';
import HexColorForm from './HexColorForm';
import { Button, makeStyles } from '@material-ui/core';
import { Box,Typography, Container } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  uploadButton: {
    margin: theme.spacing(2),
  }
}))

const ColorPicker = () => {
   
    const colorDisplayStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        marginTop: '20px',
      };
      
      const colorBoxStyle = (color) => ({
        width: '50px',
        height: '50px',
        backgroundColor: color,
        display: 'inline-block',
        border: '1px solid #000',
        borderRadius: '5px',
      });
      const ColorsDisplay = () => {
        return (
          <div style={colorDisplayStyle}>
            <div>
              <h3>Eye Color</h3>
              <div style={colorBoxStyle(eyeColor.hexEyes)}></div>
            </div>
            <div>
              <h3>Skin Color</h3>
              <div style={colorBoxStyle(skinColor.hexSkinColor)}></div>
            </div>
            <div>
              <h3>Hair Color</h3>
              <div style={colorBoxStyle(hairColor.hexHairColor)}></div>
            </div>
          </div>
        );
      };
    //first select image 
    //then select eye Color 
    //then slect skin color 
    //then select hair color

    //chatGPT prompt "hey my skin tone is {$hexSkinColor} my eyes are {$hexEyes} and my hair is {$hexHairColor}.
    // Which skin tone color palette am I? In terms of sprint, winter, summer, fall. "
    const [step, setStep] = useState(1);
    const [eyeColor,setEyeColor]=useState({hexEyes:''});
    const [skinColor,setSkinColor]=useState({hexSkinColor:''});
    const [hairColor,setHairColor]=useState({hexHairColor:''});
    const classes = useStyles();
    const handleEyeColor=({hex})=>{
        setEyeColor({
            hexEyes: hex,
        });
        setStep(3);
    }
    const handleSkinColor=({hex})=>{
        setSkinColor({
            hexSkinColor: hex,
        });
        setStep(4);
    }
    const handleHairColor=({hex})=>{
        setHairColor({
            hexHairColor: hex,
        });
        setStep(5);
    }
    // Function to handle color picking
    const handleColor=({rgb,hex})=>{
        if(step===2){
            handleEyeColor({hex})
        }
        if(step===3){
            handleSkinColor({hex})
        }
        if(step===4){
            handleHairColor({hex})
        }
    }
    const handleImageSelected = () => {
        setStep(2); // Move to the next step after the image is selected
      };
  return (
    <Container>
      {step === 2 && (
        <Box textAlign="center" my={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Step 2
          </Typography>
          <EyeDropper
            once
            pickRadius={1}
            onPickColor={handleColor}
            onChange={handleColor}
            customComponent={({ onClick }) => (
              <Button onClick={onClick} variant="contained" color="primary" className={classes.uploadButton}>EYE Color</Button>
            )}
          />
        </Box>
      )}

      {step === 3 && (
        <Box textAlign="center" my={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Step 3
          </Typography>
          <EyeDropper
            once
            pickRadius={1}
            onPickColor={handleColor}
            onChange={handleColor}
            customComponent={({ onClick }) => (
              <Button onClick={onClick} variant="contained" color="primary" className={classes.uploadButton}>SKIN Color</Button>
            )}
          />
        </Box>
      )}

      {step === 4 && (
        <Box textAlign="center" my={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Step 4
          </Typography>
          <EyeDropper
            once
            pickRadius={1}
            onPickColor={handleColor}
            onChange={handleColor}
            customComponent={({ onClick }) => (
              <Button onClick={onClick} variant="contained" color="primary" className={classes.uploadButton}>HAIR Color</Button>
            )}
          />
        </Box>
      )}

      {step > 4 && (
        <Box my={2}>
          <ColorsDisplay />
          <HexColorForm colors={[eyeColor.hexEyes, skinColor.hexSkinColor, hairColor.hexHairColor]} />
        </Box>
      )}

      <SelfieUploadForm onImageSelected={handleImageSelected} />
    </Container>
  );
}

export default ColorPicker;
