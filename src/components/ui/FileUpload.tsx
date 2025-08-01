import { useState, useRef } from 'react';
import { Upload, File, Image, X, Loader2, Check } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';

const FileUpload = ({ 
  id,
  label,
  description,
  accept = "image/jpeg,image/png,image/jpg,application/pdf",
  maxSize = 5 * 1024 * 1024, // 5MB default
  onFileSelect,
  onUploadComplete,
  onError,
  className = ""
}) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef(null);

  const validateFile = (selectedFile) => {
    // Get valid types from accept prop
    const validTypes = accept.split(',').map(type => type.trim());
    
    // Check file type
    if (!validTypes.includes(selectedFile.type)) {
      const typeNames = validTypes.map(type => {
        if (type === 'application/pdf') return 'PDF';
        if (type.startsWith('image/')) return type.split('/')[1].toUpperCase();
        return type;
      }).join(', ');
      return `Invalid file type. Please upload: ${typeNames}`;
    }
    
    // Check file size
    if (selectedFile.size > maxSize) {
      return `File is too large. Maximum size is ${formatFileSize(maxSize)}.`;
    }
    
    return null;
  };

  const processFile = (selectedFile) => {
    const validationError = validateFile(selectedFile);
    
    if (validationError) {
      setError(validationError);
      onError?.(validationError);
      return;
    }
    
    const fileData = {
      file: selectedFile,
      preview: selectedFile.type.startsWith('image/') ? URL.createObjectURL(selectedFile) : null,
      type: selectedFile.type,
      name: selectedFile.name,
      size: formatFileSize(selectedFile.size)
    };
    
    setFile(fileData);
    setError(null);
    setSuccess(false);
    
    // Notify parent component
    onFileSelect?.(fileData);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    if (file && file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    
    setFile(null);
    setSuccess(false);
    setError(null);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
    
    setUploading(true);
    setProgress(0);
    
    setUploading(false);
    setSuccess(true);
    onUploadComplete?.(file);
    // // Simulate file upload progress
    // const interval = setInterval(() => {
    //   setProgress(prev => {
    //     if (prev >= 100) {
    //       clearInterval(interval);
    //       setTimeout(() => {
    //       }, 500);
    //       return prev;
    //     }
    //     return prev + 5;
    //   });
    // }, 100);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return <Image className="w-6 h-6 text-blue-500" />;
    } else if (fileType === 'application/pdf') {
      return <File className="w-6 h-6 text-red-500" />;
    } else {
      return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <div>
          <Label htmlFor={id} className="text-base font-medium">{label}</Label>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
      )}
      
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={accept}
        />
        
        {!file ? (
          <div className="flex flex-col items-center justify-center gap-2 py-3">
            <Upload className="w-8 h-8 text-gray-400" />
            <p className="text-sm text-gray-500">Drag & drop file here or click to browse</p>
            <p className="text-xs text-gray-400">Max size: {formatFileSize(maxSize)}</p>
          </div>
        ) : success ? (
          <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-700 truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-green-600">Upload successful</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="text-gray-500 hover:text-red-500"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
            <div className="flex items-center gap-2">
              {file.preview ? (
                <img 
                  src={file.preview} 
                  alt={file.name} 
                  className="w-6 h-6 object-cover rounded" 
                />
              ) : (
                getFileIcon(file.type)
              )}
              <div className="overflow-hidden text-left">
                <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-gray-500">{file.size}</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="text-gray-500 hover:text-red-500"
              disabled={uploading}
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      
      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}
      
      {file && !success && (
        <div>
          {uploading && (
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full h-1" />
            </div>
          )}
          
          <Button 
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2"
            size="sm"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload File
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;