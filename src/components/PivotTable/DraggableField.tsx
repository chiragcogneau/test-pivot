import React from 'react';
import { GripVertical } from 'lucide-react';

type DraggableFieldProps = {
  field: string;
  type: 'row' | 'column' | 'value';
  onDragStart: (e: React.DragEvent, field: string, type: string) => void;
};

export const DraggableField: React.FC<DraggableFieldProps> = ({ field, type, onDragStart }) => {
  return (
    <div
      draggable
      className="flex items-center gap-2 px-3 py-2 bg-white rounded border cursor-move hover:bg-gray-50"
      onDragStart={(e) => onDragStart(e, field, type)}
    >
      <GripVertical className="w-4 h-4 text-gray-400" />
      <span>{field}</span>
    </div>
  );
};