// src/components/FileUpload.jsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setData(JSON.stringify(jsonData, null, 2));

      axios.post('https://ws.katalabs.mx/api/upload', jsonData, { withCredentials: false })
      .then(( response ) => {
        console.log(response.data, `API response`);
      });

    };

    reader.readAsArrayBuffer(file);

  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {data && (
        <pre>{data}</pre>
      )}
    </div>
  );
};

export default FileUpload;