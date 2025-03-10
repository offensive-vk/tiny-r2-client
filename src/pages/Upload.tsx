import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { uploadFile } from "../api/upload";

export default function Upload() {
  const { auth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleUpload = async () => {
    if (file && auth) {
      await uploadFile(file, auth, setProgress);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-black">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full border border-black dark:border-white"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      
      <h1 className="text-2xl mb-4 text-black dark:text-white">Upload File</h1>
      <input 
        type="file" 
        onChange={handleFileChange}
        className="text-black dark:text-white bg-white dark:bg-black border border-black dark:border-white rounded p-2" 
      />
      <button 
        className="mt-4 p-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded"
        onClick={handleUpload}
      >
        Upload
      </button>
      <button 
        className="mt-4 p-2 bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <progress 
        value={progress} 
        max="100" 
        className="w-full mt-2 [&::-webkit-progress-bar]:bg-gray-200 dark:[&::-webkit-progress-bar]:bg-gray-700 [&::-webkit-progress-value]:bg-black dark:[&::-webkit-progress-value]:bg-white"
      />
    </div>
  );
}