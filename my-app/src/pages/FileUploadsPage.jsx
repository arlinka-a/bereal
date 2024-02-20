import React from "react";
import axios from "axios";

function FileUploadsPage() {

  const handleFileSubmit = async (event) => {
    event.preventDefault();
    const file = event.target.file.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/questions/generate-question`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Questions:', response.data.questions); // Process the questions as needed
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
      <div>
      <h1>Upload a File to Generate Questions</h1>
      <form onSubmit={handleFileSubmit}>
        <input type="file" name="file" />
        <button type="submit">Upload and Generate Questions</button>
      </form>
    </div>
  );
}

export default FileUploadsPage;