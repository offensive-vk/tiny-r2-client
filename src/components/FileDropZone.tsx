import React from 'react';

interface FileDropZoneProps {
    onFileChange: (file: File) => void;
    isDragging: boolean;
    onDrop: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFileChange, isDragging, onDrop, onDragOver, onDragLeave }) => {
    return (
        <div
            className={`w-full max-w-md p-8 border-2 rounded-lg ${isDragging ? 'border-green-500 bg-green-50 dark:bg-green-900' : 'border-gray-300'}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
        >
            <p className="text-center mb-4 text-black dark:text-white">
                Drag and drop your file here or click to select
            </p>
            <input
                type="file"
                onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                        onFileChange(files[0]);
                    }
                }}
                className="text-black dark:text-white bg-white dark:bg-black border border-black dark:border-white rounded p-2"
            />
        </div>
    );
};

export default FileDropZone;