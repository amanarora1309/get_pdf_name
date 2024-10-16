import React, { useState } from "react";
import { saveAs } from "file-saver";
import './App.css';

function App() {
  const [pdfFiles, setPdfFiles] = useState([]);

  // Handle file input change
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setPdfFiles(files);
  };

  // Process PDF files sequentially
  const processPdfFiles = async () => {
    for (const file of pdfFiles) {
      const renamedFile = renamePdfFile(file);
      await downloadPdfFile(renamedFile);
    }
  };

  // Rename PDF file by replacing commas with underscores
  const renamePdfFile = (file) => {
    const newName = file.name.replace(/,/g, "_"); // Replace commas with underscores
    return new File([file], newName, { type: file.type });
  };

  // Download renamed PDF file
  const downloadPdfFile = (file) => {
    return new Promise((resolve) => {
      saveAs(file);
      setTimeout(resolve, 500); // Small delay to ensure browser handles each download
    });
  };
  return (
    <>
      <div className="container">
        <h2>Upload PDF Files</h2>
        <input
          type="file"
          multiple
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button onClick={processPdfFiles} disabled={pdfFiles.length === 0}>
          Process and Download PDFs
        </button>
        <ul>
          {pdfFiles.length > 0 &&
            pdfFiles.map((file, index) => (
              <li key={index}>
                {file.name} → {file.name.replace(/,/g, "_")}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
