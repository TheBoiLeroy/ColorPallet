import React, { useState } from 'react';

function SelfieUploadForm() {
    const [results, setResults] = useState('');

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
            <form id="upload-form" onSubmit={handleSubmit}>
                <input type="file" id="selfie" name="selfie" accept="image/*" />
                <button type="submit">Analyze Selfie</button>
            </form>
            <div id="results">{results}</div>
        </div>
    );
}

export default SelfieUploadForm;
