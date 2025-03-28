import React from 'react';
import CloudUpload from "./../assets/cloud_upload (1).png"

const FileUploader = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed #ccc',
        padding: '40px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
        width: '61vw',
        margin: '20px auto', 
        height:"300px"
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      
        <div>
            <img src={CloudUpload} alt = "cloud upload" />
        </div>
    

      <p>
        Select a file or drag and drop here (Podcast Media or Transcription Text)
      </p>
      <p>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>

      <input
        type="file"
        id="file-input"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">
        <button
          style={{
            backgroundColor: 'white',
            color: '#9370DB',
            border: '2px solid #9370DB',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Select File
        </button>
      </label>
    </div>
  );
};

export default FileUploader;