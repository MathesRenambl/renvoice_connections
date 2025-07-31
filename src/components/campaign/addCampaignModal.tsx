import { ValidationError } from '@/lib/validateCsv';
import React, { DragEvent, useState } from 'react'

function AddCampaignModal({fileSelected}:{ fileSelected: (file: File) => void }) {
    const [frontendErrors, setFrontendErrors] = useState<ValidationError[]>([]);
  const [backendErrors, setBackendErrors] = useState<ValidationError[]>([]);
  const [status, setStatus] = useState("");
  const [dragActive, setDragActive] = useState(false);
   const [file, setFile] = useState<File | null>(null);

  const handleFile = (file: File) => {
      fileSelected(file);
      setFile(file)
      setFrontendErrors([]);
      setBackendErrors([]);
      setStatus("");
    };
  
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
  
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    };
  
    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        
        handleFile(e.target.files[0]);
      }
    };
  return (
    <div>
      <div className="p-6 max-w-2xl w-full shadow-md m-2 rounded-md">
      <h1 className="text-2xl font-bold mb-4">File Upload</h1>

      <div
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        className={`w-full h-40 border-4 border-dashed rounded-lg flex items-center  justify-center transition-colors duration-300 ${
          dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"
        }`}
      >
        <label htmlFor="upload" className="cursor-pointer text-gray-600 text-center">
          {file ? (
            <div>
              <p className="font-medium">File Selected:</p>
              <p>{file.name}</p>
            </div>
          ) : (
            <div>
              <p className="text-lg">Drag & Drop your .csv or .xlsx here</p>
              <p className="text-sm text-gray-500 mt-2">or click to select a file</p>
            </div>
          )}
        </label>
        <input
          id="upload"
          type="file"
          accept=".csv,.xlsx"
          className="hidden"
          onChange={handleInputChange}
        />
      </div>
      </div>
    </div>
  )
}

export default AddCampaignModal
