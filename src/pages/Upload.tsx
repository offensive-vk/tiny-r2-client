import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState, useCallback } from "react";
import { uploadFile } from "../api/upload";

export default function Upload() {
  const { auth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSpeed, setUploadSpeed] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async () => {
    if (file && auth) {
      setIsUploading(true);
      const startTime = Date.now();
      const updateSpeed = (loaded: number) => {
        const elapsedTime = (Date.now() - startTime) / 1000; // seconds
        const speed = (loaded / (1024 * 1024)) / elapsedTime; // MB/s
        setUploadSpeed(`${speed.toFixed(2)} MB/s`);
      };

      try {
        await uploadFile(file, auth, (progress) => {
          setProgress(progress);
          updateSpeed(progress);
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
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
      
      <div 
        className={`w-full max-w-md p-8 border-2 rounded-lg ${
          isDragging ? 'border-green-500 bg-green-50 dark:bg-green-900' : 'border-gray-300'
        } flex flex-col items-center justify-center`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p className="text-center mb-4 text-black dark:text-white">
          Drag and drop your file here or click to select
        </p>
        <input 
          type="file" 
          onChange={handleFileChange}
          className="text-black dark:text-white bg-white dark:bg-black border border-black dark:border-white rounded p-2" 
        />
        {file && (
          <p className="mt-2 text-sm text-black dark:text-white">
            Selected: {file.name}
          </p>
        )}
      </div>

      <button 
        className="mt-4 p-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded"
        onClick={handleUpload}
        disabled={!file || isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      <br />
      <button 
          className="p-2 bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 rounded"
          onClick={logout}
        >
          Logout
        </button>
      {isUploading && (
        <div className="w-full max-w-md mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-black dark:text-white">{progress}%</span>
            <span className="text-sm text-black dark:text-white">{uploadSpeed}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}