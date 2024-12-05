import React, { useState, useEffect } from 'react';
import { FileDropzone } from './components/FileDropzone';
import { NotebookList } from './components/NotebookList';
import { MarkdownDisplay } from './components/MarkdownDisplay';
import { parseNotebook, convertToMarkdown } from './utils/notebookParser';
import type { NotebookFile } from './types/notebook';

function App() {
  const [notebooks, setNotebooks] = useState<NotebookFile[]>([]);
  const [markdown, setMarkdown] = useState<string>('');

  const handleFilesAccepted = async (files: File[]) => {
    const newNotebooks = await Promise.all(
      files.map(file => parseNotebook(file))
    );
    setNotebooks(prev => [...prev, ...newNotebooks]);
  };

  const handleNotebooksReorder = (reorderedNotebooks: NotebookFile[]) => {
    setNotebooks(reorderedNotebooks);
  };

  const handleRemoveNotebook = (id: string) => {
    setNotebooks(prev => prev.filter(notebook => notebook.id !== id));
  };

  useEffect(() => {
    const combinedMarkdown = notebooks
      .map(notebook => convertToMarkdown(notebook))
      .join('\n---\n\n');
    setMarkdown(combinedMarkdown);
  }, [notebooks]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Notebook to Markdown Converter
          </h1>
          <p className="mt-2 text-gray-600">
            Drop your Python notebooks and get them converted to markdown
          </p>
        </div>

        <FileDropzone onFilesAccepted={handleFilesAccepted} />

        {notebooks.length > 0 && (
          <>
            <div className="bg-white shadow-sm rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Notebooks ({notebooks.length})
              </h2>
              <NotebookList
                notebooks={notebooks}
                onNotebooksReorder={handleNotebooksReorder}
                onRemoveNotebook={handleRemoveNotebook}
              />
            </div>

            <MarkdownDisplay markdown={markdown} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;