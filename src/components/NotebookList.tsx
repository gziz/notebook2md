import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { NotebookItem } from './NotebookItem';
import type { NotebookFile } from '../types/notebook';

interface NotebookListProps {
  notebooks: NotebookFile[];
  onNotebooksReorder: (notebooks: NotebookFile[]) => void;
  onRemoveNotebook: (id: string) => void;
}

export function NotebookList({ notebooks, onNotebooksReorder, onRemoveNotebook }: NotebookListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = notebooks.findIndex((notebook) => notebook.id === active.id);
      const newIndex = notebooks.findIndex((notebook) => notebook.id === over.id);
      onNotebooksReorder(arrayMove(notebooks, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={notebooks.map(n => n.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {notebooks.map((notebook) => (
            <NotebookItem
              key={notebook.id}
              notebook={notebook}
              onRemove={() => onRemoveNotebook(notebook.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}