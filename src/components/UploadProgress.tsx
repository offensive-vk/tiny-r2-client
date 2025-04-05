import React from 'react';

interface UploadProgressProps {
    progress: number;
    uploadSpeed: string;
    isUploading: boolean;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ progress, uploadSpeed, isUploading }) => {
    if (!isUploading) return null;

    return (
        <div className="w-full max-w-md mt-4">
            <h2 className="text-lg text-black dark:text-white">Uploading...</h2>
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
    );
};

export default UploadProgress;