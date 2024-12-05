import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileDropzoneProps {
  onFilesAccepted: (files: File[]) => void;
}

export function FileDropzone({ onFilesAccepted }: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/json': ['.ipynb']
    },
    onDrop: onFilesAccepted
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? 'Drop the notebooks here...'
          : 'Drag and drop your Python notebooks here, or click to select files'}
      </p>
      <p className="text-xs text-gray-500 mt-1">Only .ipynb files are accepted</p>
    </div>
  );
}