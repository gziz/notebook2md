import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, FileJson } from 'lucide-react';
import type { NotebookFile } from '../types/notebook';

interface NotebookItemProps {
  notebook: NotebookFile;
  onRemove: () => void;
}

export function NotebookItem({ notebook, onRemove }: NotebookItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: notebook.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <button
        className="cursor-grab hover:text-gray-700 text-gray-400"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" />
      </button>
      
      <FileJson className="h-5 w-5 text-blue-500" />
      <span className="flex-1 text-sm truncate">{notebook.name}</span>
      
      <button
        onClick={onRemove}
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}