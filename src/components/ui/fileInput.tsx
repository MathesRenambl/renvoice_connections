// import React from 'react';
// import { Upload, File, X } from 'lucide-react';
// import { cn } from '@/lib/utils';

// interface CustomFileInputProps {
//   onFileSelect?: (files: FileList | null) => void;
//   showPreview?: boolean;
//   maxFiles?: number;
//   maxSize?: number; // in bytes
//   allowedTypes?: string[];
//   files?: File[];
//   setFiles?: React.Dispatch<React.SetStateAction<File[]>>;
//   onError?: (error: string) => void;
//   name?: string; 
// }

// type FileInputProps = React.InputHTMLAttributes<HTMLInputElement> & CustomFileInputProps;

// export function FileInput({ 
//   className, 
//   onFileSelect,
//   showPreview = true,
//   maxFiles = 1,
//   maxSize = 10 * 1024 * 1024, // 10MB default
//   allowedTypes = ['.pdf', '.docx', '.xlsx', '.txt', '.csv'],
//   onError,
//   files,
//   setFiles,
//   name="fileInput",
//   ...props 
// }: FileInputProps) {
//   const [dragActive, setDragActive] = React.useState(false);
//   // const [files, setFiles] = React.useState<File[]>([]);
//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const validateFiles = (fileList: FileList): File[] => {
//     const validFiles: File[] = [];
//     const errors: string[] = [];

//     Array.from(fileList).forEach((file) => {
//       // Check file size
//       if (file.size > maxSize) {
//         errors.push(`${file.name} exceeds the maximum size of ${(maxSize / 1024 / 1024).toFixed(0)}MB`);
//         return;
//       }

//       // Check file type
//       const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
//       const mimeTypeAllowed = allowedTypes.some(type => 
//         type.includes('/') ? file.type === type : fileExtension === type
//       );
      
//       if (!mimeTypeAllowed) {
//         errors.push(`${file.name} is not a supported file type`);
//         return;
//       }

//       validFiles.push(file);
//     });

//     if (errors.length > 0) {
//       onError?.(errors.join(', '));
//     }

//     return validFiles.slice(0, maxFiles);
//   };

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const validFiles = validateFiles(e.dataTransfer.files);
//       if (validFiles.length > 0) {
//         setFiles(validFiles);
        
//         // Create a new FileList-like object for the callback
//         const dt = new DataTransfer();
//         validFiles.forEach(file => dt.items.add(file));
//         onFileSelect?.(dt.files);
//       }
//     }
//   };

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     e.preventDefault();
// //     if (e.target.files && e.target.files[0]) {
// //       const validFiles = validateFiles(e.target.files);
// //       if (validFiles.length > 0) {
// //         setFiles(validFiles);
        
// //         // Create a new FileList-like object for the callback
// //         const dt = new DataTransfer();
// //         validFiles.forEach(file => dt.items.add(file));
// //         onFileSelect?.(dt.files);
// //       }
// //     }
// //   };


// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   e.preventDefault();
//   const selectedFiles = e.target.files;
//   if (!selectedFiles || selectedFiles.length === 0) {
//     setFiles([]);
//     onFileSelect?.(null);
//     return;
//   }

//   const validFiles = validateFiles(selectedFiles);
//   if (validFiles.length > 0) {
//     setFiles(validFiles);

//     const dt = new DataTransfer();
//     validFiles.forEach(file => dt.items.add(file));
//     onFileSelect?.(dt.files);
//   } else {
//     setFiles([]);
//     onFileSelect?.(null);
//   }
// };

//   const removeFile = (index: number) => {
//     const newFiles = files.filter((_, i) => i !== index);
//     setFiles(newFiles);
//     if (inputRef.current) {
//       inputRef.current.value = '';
//     }
//     onFileSelect?.(null);
//   };

//  const openFileDialog = () => {
//   if (inputRef.current) {
//     setTimeout(() => {
//       inputRef.current!.value = '';
//     }, 0); // clears value just after click is initiated

//     inputRef.current.click();
//   }
// };



//   return (
//     <div className="w-full space-y-4">
//       {/* Main File Input Area */}
//       {files.length===0&&<div
//         className={cn(
//           "relative border-2 border-dashed rounded-lg transition-all duration-200 ease-in-out cursor-pointer",
//           dragActive 
//             ? "border-primary bg-primary/5 scale-[1.02]" 
//             : "border-border hover:border-primary/50 hover:bg-accent/50",
//           "bg-background",
//           className
//         )}
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//         // onClick={openFileDialog}
//       >
//         <input
//           ref={inputRef}
//           type="file"
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//           onChange={handleChange}
//           multiple={maxFiles > 1}
//           accept={allowedTypes.join(',')}
//           {...props}
//         />
        
//         <div className="flex flex-col items-center justify-center px-6 py-8 text-center">
//           <div className={cn(
//             "mb-4 p-3 rounded-full transition-colors",
//             dragActive ? "bg-primary text-primary-foreground" : "bg-muted"
//           )}>
//             <Upload className={cn(
//               "h-6 w-6 transition-transform",
//               dragActive && "scale-110"
//             )} />
//           </div>
          
//           <div className="space-y-2">
//             <p className="text-sm text-muted-foreground mb-2">
//               {dragActive ? "Drop your file here" : "Drag and drop your file here, or click to browse"}
//             </p>
//             <p className="text-xs text-muted-foreground">
//               Supports PDF, DOCX, XLSX, TXT, CSV (max 10MB)
//             </p>
//           </div>
//         </div>
//       </div>}

//       {/* File Preview */}
//       {showPreview && files.length > 0 && (
//         <div className="space-y-2">
//           {/* <p className="text-sm font-medium">Selected files:</p> */}
//           <div className="space-y-2">
//             {files.map((file, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between p-3 bg-muted rounded-lg border"
//               >
//                 <div className="flex items-center space-x-3 min-w-0 flex-1">
//                   <div className="flex-shrink-0">
//                     <File className="h-4 w-4 text-muted-foreground" />
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <p className="text-sm font-medium truncate">{file.name}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {(file.size / 1024 / 1024).toFixed(2)} MB
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     removeFile(index);
//                   }}
//                   className="flex-shrink-0 p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Alternative simple styled input (closer to your original)
// export function SimpleFileInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
//   return (
//     <div className="relative">
//       <input
//         type="file"
//         className={cn(
//           "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
//           "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
//           "placeholder:text-muted-foreground",
//           "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
//           "disabled:cursor-not-allowed disabled:opacity-50",
//           className
//         )}
//         {...props}
//       />
//     </div>
//   );
// }


import React from 'react';
import { Upload, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NamedFile {
  name: string;
  file: File;
}

interface CustomFileInputProps {
  onFileSelect?: (files: FileList | null,arg0?:any) => void;
  showPreview?: boolean;
  maxFiles?: number;
  maxSize?: number;
  allowedTypes?: string[];
  files?: NamedFile[];
  setFiles?: React.Dispatch<React.SetStateAction<NamedFile[]>>;
  onError?: (error: string) => void;
  name?: string;
}

type FileInputProps = React.InputHTMLAttributes<HTMLInputElement> & CustomFileInputProps;

export function FileInput({
  className,
  onFileSelect,
  showPreview = true,
  maxFiles = 1,
  maxSize = 10 * 1024 * 1024,
  allowedTypes = ['.pdf', '.docx', '.xlsx', '.txt', '.csv','.png', '.jpg', '.jpeg'],
  onError,
  files = [],
  setFiles,
  name = 'fileInput',
  ...props
}: FileInputProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const validateFiles = (fileList: FileList): File[] => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(fileList).forEach((file) => {
      if (file.size > maxSize) {
        errors.push(`${file.name} exceeds the max size of ${(maxSize / 1024 / 1024).toFixed(0)}MB`);
        return;
      }

      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      const isAllowed = allowedTypes.some((type) =>
        type.includes('/') ? file.type === type : ext === type
      );

      if (!isAllowed) {
        errors.push(`${file.name} is not a supported file type`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) onError?.(errors.join(', '));

    return validFiles.slice(0, maxFiles);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      setFiles?.(prev => prev.filter(f => f.name !== name));
      onFileSelect?.(null);
      return;
    }

    const validFiles = validateFiles(selectedFiles);
    if (validFiles.length > 0) {
      setFiles?.(prev => [...prev.filter(f => f.name !== name), ...validFiles.map(file => ({ name, file }))]);
      const dt = new DataTransfer();
      validFiles.forEach(file => dt.items.add(file));
      onFileSelect?.(dt.files);
    } else {
      setFiles?.(prev => prev.filter(f => f.name !== name));
      onFileSelect?.(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const validFiles = validateFiles(e.dataTransfer.files);
      if (validFiles.length > 0) {
        setFiles?.(prev => [...prev.filter(f => f.name !== name), ...validFiles.map(file => ({ name, file }))]);
        const dt = new DataTransfer();
        validFiles.forEach(file => dt.items.add(file));
        onFileSelect?.(dt.files);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles?.(prev => prev.filter((_, i) => i !== index));
    if (inputRef.current) inputRef.current.value = '';
    onFileSelect?.(null,index);
  };

  const currentFile = files.find(f => f.name === name);

  return (
    <div className="w-full space-y-4">
      {!currentFile && (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg transition-all duration-200 ease-in-out cursor-pointer",
            dragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/50 hover:bg-accent/50",
            "bg-background",
            className
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            multiple={maxFiles > 1}
            accept={allowedTypes.join(',')}
            {...props}
          />
          <div className="flex flex-col items-center justify-center px-6 py-8 text-center">
            <div className={cn("mb-4 p-3 rounded-full transition-colors", dragActive ? "bg-primary text-primary-foreground" : "bg-muted")}>
              <Upload className={cn("h-6 w-6 transition-transform", dragActive && "scale-110")} />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-2">
                {dragActive ? "Drop your file here" : "Drag and drop your file here, or click to browse"}
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, DOCX, XLSX, TXT, CSV (max 10MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {showPreview && files.length > 0 && (
        <div className="space-y-2">
          {files.map((f, index) => (
            f.name === name && (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg border"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="flex-shrink-0">
                    <File className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{f.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(f.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="flex-shrink-0 p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
