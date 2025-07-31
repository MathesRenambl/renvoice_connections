// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import { File, Loader2, Upload } from "lucide-react";
// import Modal from "./modal";

// interface FileUploadConfirmProps {
//   open: boolean;
//   onClose: () => void;
//   file: File;
//   onFileUpload: (file: File) => Promise<void>; // API function that handles everything in parent
//   onCancel?: (arg0:any) => void; // Optional cancel callback
//   name?: string; // Optional name for the file input, default to 'fileInput'
// }

// const FileUploadConfirm = ({ 
//   open, 
//   onClose, 
//   file,
//   onFileUpload,
//     onCancel = () => {}, // Default to empty function if not provided
//     name='fileInput', // Default name for the file input
// }: FileUploadConfirmProps) => {

//     console.log("FileUploadConfirm rendered with file:", file);
//   const [isLoading, setIsLoading] = React.useState(false);

//   const handleClose = () => {
//     if (!isLoading) {
//       onClose();
//     }
//   };

//   const cancel=() => {
//     setIsLoading(false);
//     onCancel(name);
//     onClose();
//   }

//   const handleUpload = async () => {
//     setIsLoading(true);
//     try {
//       await onFileUpload(file);
//       onClose();
//     } catch (error) {
//       console.error('Upload failed:', error);
//       // You can add error handling here (toast notification, etc.)
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getFileExtension = (filename: string) => {
//     return filename?.split('.').pop()?.toUpperCase() || '';
//   };

//   const getFileIcon = (filename: string) => {
//     if(!filename) return <File className="h-8 w-8 text-slate-600" />;
//     const extension = filename.split('.').pop()?.toLowerCase();
//     // You can customize icons based on file type
//     return <File className="h-8 w-8 text-slate-600" />;
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       title="Confirm File Upload"
//       description="Are you sure you want to upload this file?"
//     >
//       {isLoading ? (
//         // Loading State
//         <div className="flex flex-col items-center justify-center py-8">
//           <Loader2 className="h-8 w-8 animate-spin text-slate-600 mb-4" />
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Uploading File</h3>
//           <p className="text-sm text-gray-500 text-center">
//             Please wait while we upload your file...
//           </p>
//         </div>
//       ) : (
//         <>
//           {/* File Preview */}
//           <div className="mb-6">
//             <div className="p-4 bg-gray-50 rounded-lg border">
//               <div className="flex items-start space-x-4">
//                 <div className="flex-shrink-0">
//                   {getFileIcon(file?.name)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
//                     {file?.name}
//                   </h3>
//                   <div className="flex items-center space-x-4 text-xs text-gray-500">
//                     <span>Size: {formatFileSize(file.size)}</span>
//                     <span>Format: {getFileExtension(file?.name)}</span>
//                   </div>
//                   <p className="text-xs text-gray-400 mt-1">
//                     Type: {file?.type || 'Unknown'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-3">
//             <Button
//               variant="outline"
//               onClick={cancel}
//               className="flex-1"
//               disabled={isLoading}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleUpload}
//               disabled={isLoading}
//               className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
//             >
//               <Upload className="h-4 w-4 mr-2" />
//               Upload
//             </Button>
//           </div>
//         </>
//       )}
//     </Modal>
//   );
// };

// export default FileUploadConfirm;



import * as React from "react";
import { Button } from "@/components/ui/button";
import { File, Loader2, Upload } from "lucide-react";
import Modal from "./modal";

interface FileUploadConfirmProps {
  open: boolean;
  onClose: () => void;
  file: File;
  onFileUpload: (file: File) => Promise<void>; // API function that handles everything in parent
  onCancel?: (arg0:any) => void; // Optional cancel callback
  name?: string; // Optional name for the file input, default to 'fileInput'
}

const FileUploadConfirm = ({ 
  open, 
  onClose, 
  file,
  onFileUpload,
    onCancel = () => {}, // Default to empty function if not provided
    name='fileInput', // Default name for the file input
}: FileUploadConfirmProps) => {

    console.log("FileUploadConfirm rendered with file:", file);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const cancel=() => {
    setIsLoading(false);
    onCancel(name);
    onClose();
  }

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      await onFileUpload(file);
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
      // You can add error handling here (toast notification, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileExtension = (filename: string) => {
    return filename?.split('.').pop()?.toUpperCase() || '';
  };

  const getFileIcon = (filename: string) => {
    if(!filename) return <File className="h-8 w-8 text-slate-600" />;
    const extension = filename.split('.').pop()?.toLowerCase();
    // You can customize icons based on file type
    return <File className="h-8 w-8 text-slate-600" />;
  };

  // Function to truncate filename if longer than 10 characters
  const truncateFileName = (filename: string, maxLength: number = 10) => {
    if (!filename) return '';
    if (filename.length <= maxLength) return filename;
    return filename.substring(0, maxLength) + '...';
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Confirm File Upload"
      description="Are you sure you want to upload this file?"
    >
      {isLoading ? (
        // Loading State with responsive min-width
        <div className="flex flex-col items-center justify-center py-8 min-w-[250px] sm:min-w-[300px] md:min-w-[350px] lg:min-w-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-slate-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Uploading File</h3>
          <p className="text-sm text-gray-500 text-center px-4">
            Please wait while we upload your file...
          </p>
          {/* Progress indication */}
          <div className="w-full max-w-xs mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-slate-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-w-[250px] sm:min-w-[300px] md:min-w-[350px] lg:min-w-[400px]">
          {/* File Preview */}
          <div className="mb-6">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getFileIcon(file?.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 mb-1" title={file?.name}>
                    {truncateFileName(file?.name)}
                  </h3>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Size: {formatFileSize(file.size)}</span>
                    <span>Format: {getFileExtension(file?.name)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Type: {file?.type || 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={cancel}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={isLoading}
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default FileUploadConfirm;