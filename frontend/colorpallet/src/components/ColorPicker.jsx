import React, { useState } from 'react';
import { EyeDropper } from 'react-eyedrop';
import SelfieUploadForm from './SelfieUploadForm';

const ColorPicker = () => {
  const [colors, setColors] = useState({
    rgb: '',
    hex: ''
  });
  
  // Function to handle color picking
const handleColor=({rgb,hex})=>{
    setColors({
        rgb: rgb,
        hex: hex
      });
      console.log(colors.rgb);
}
  return (
    <div>
      <EyeDropper
        once
        pickRadius={1} // Define the radius of the eyedropper tool
        onPickColor={handleColor} // Function to handle the color after picking
        onChange={handleColor}
        customComponent={({ onClick }) => (
          <button onClick={onClick}>Pick Color</button> // This button triggers the color picking process
        )}/>
      <div>
        Picked Color: <span style={{color: colors.hex}}>{colors.rgb}</span> (HEX: {colors.hex})
      </div>
        <SelfieUploadForm/>
      {/* You can place your image inside this component */}
      {/* Make sure the image is not cross-origin, or CORS issues may prevent color picking */}
      {/* implement a pulling of the image from the back end or have the user upload there image here */}
    </div>
  );
}

export default ColorPicker;
