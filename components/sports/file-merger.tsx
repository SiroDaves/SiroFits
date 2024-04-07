// components/FileMerger.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import { wrap } from 'comlink';
import { MergeWorker } from '@/utils/merge-worker';

export default function FileMerger() {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [worker, setWorker] = useState<Worker | null>(null);

  // Initialize worker
  useEffect(() => {
    const worker = new Worker(new URL('@/workers/merge.worker', import.meta.url));
    setWorker(worker);
    return () => worker.terminate();
  }, []);

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const handleMerge = useCallback(async (files: File[]) => {
    if (!worker || files.length < 2) return;

    setIsMerging(true);
    try {
      const Merge = wrap<MergeWorker>(worker);
      const merge = await new Merge(files);
      const blob = await merge.blob();
      
      setFileNames(files.map(f => f.name));
      const newObjectUrl = URL.createObjectURL(blob);
      setObjectUrl(newObjectUrl);
      setFileName(`${files[0].name.split('.')[0]}-activity-merge.gpx`);
    } catch (error) {
      console.error('Merge failed:', error);
    } finally {
      setIsMerging(false);
    }
  }, [worker]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleMerge(files);
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.items)
      .map(item => item.kind === 'file' ? item.getAsFile() : null)
      .filter((file): file is File => !!file);

    if (files.length > 0) {
      handleMerge(files);
    }
  }, [handleMerge]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input 
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          id="fileInput"
          accept=".fit,.gpx,.tcx"
        />
        
        <label 
          htmlFor="fileInput" 
          className="cursor-pointer inline-block mb-4"
        >
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Activity Merge</h1>
            <p className="text-gray-600">
              {isDragging ? 'Drop files here' : 'Drag files here or click to select'}
            </p>
            <button 
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Select Files
            </button>
          </div>
        </label>

        {isMerging && (
          <div className="mt-4 text-blue-500">
            Merging {fileNames.length} files...
          </div>
        )}

        {objectUrl && (
          <div className="mt-4">
            <a
              href={objectUrl}
              download={fileName}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Download Merged File
            </a>
            <p className="mt-2 text-sm text-gray-500">
              Merged from: {fileNames.join(', ')}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Supports FIT, GPX, and TCX files</p>
        <p>Files are processed in your browser - no data is uploaded</p>
      </div>
    </div>
  );
}