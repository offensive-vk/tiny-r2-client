import React from 'react';

interface FileDropZoneProps {
    onFileChange: (file: File | null) => void;
    isDragging: boolean;
    onDrop: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFileChange, isDragging, onDrop, onDragOver, onDragLeave }) => {
    const [fileName, setFileName] = React.useState<string | null>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            onFileChange(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleDropInternal = (e: React.DragEvent) => {
        onDrop(e);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            onFileChange(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                isDragging ? 'border-blue-500 bg-blue-50 dark:border-blue-700 dark:bg-blue-900' : 'border-gray-300 dark:border-gray-700'
            }`}
            onDrop={handleDropInternal}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
        >
            <input
                type="file"
                className="hidden"
                id="file-upload"
                onChange={handleFileSelect}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
                {fileName ? (
                    <p className="text-gray-700 dark:text-gray-300">Selected file: {fileName}</p>
                ) : (
                    <p className="text-gray-700 dark:text-gray-300">
                        Drag and drop a file here, or click to select a file.
                    </p>
                )}
            </label>
        </div>
    );
};

export default FileDropZone;