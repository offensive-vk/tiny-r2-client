import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState, useCallback } from "react";
import { uploadFile } from "../api/upload";
import FileDropZone from "../components/FileDropZone";
import UploadProgress from "../components/UploadProgress";

export default function Upload() {
  const { auth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSpeed, setUploadSpeed] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUpload = async () => {
    if (file && auth) {
      setIsUploading(true);
      setErrorMessage(null); // Clear previous error messages
      const startTime = Date.now();
      const updateSpeed = (loaded: number) => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const speed = (loaded / (1024 * 1024)) / elapsedTime;
        setUploadSpeed(`${speed.toFixed(2)} MB/s`);
      };

      try {
        await uploadFile(file, auth, (progress) => {
          setProgress(progress);
          updateSpeed(progress);
        });
      } catch (error: any) {
        setErrorMessage(error.message || 'Upload failed');
      } finally {
        setIsUploading(false);
      }
    } else {
      setErrorMessage('No file selected or not authenticated.');
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-black">
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-black dark:border-white"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      
      <h1 className="text-2xl mb-4 text-black dark:text-white">Upload Anything</h1>
      
      <FileDropZone 
        onFileChange={setFile}
        isDragging={isDragging}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      />

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        After selecting a file, click the 'Upload' button to start the upload.
      </p>
      
      {errorMessage && (
        <div className="text-red-500 mt-4">
          Error: {errorMessage}
        </div>
      )}
      
      <div className="flex gap-4 mt-4">
        <button 
          className="p-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleUpload}
          disabled={!file || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
        <button 
          className="p-2 bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 rounded transition duration-300 ease-in-out transform hover:scale-105"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <UploadProgress 
        progress={progress}
        uploadSpeed={uploadSpeed}
        isUploading={isUploading}
      />
    </div>
  );
}