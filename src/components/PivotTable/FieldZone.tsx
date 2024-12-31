import React from 'react';
import { DraggableField } from './DraggableField';

type FieldZoneProps = {
  title: string;
  type: 'row' | 'column' | 'value';
  fields: string[];
  onDragStart: (e: React.DragEvent, field: string, type: string) => void;
  onDrop: (e: React.DragEvent) => void;
};

export const FieldZone: React.FC<FieldZoneProps> = ({
  title,
  type,
  fields,
  onDragStart,
  onDrop,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="flex-1 p-4 bg-gray-50 rounded-lg"
      onDrop={onDrop}
      onDragOver={handleDragOver}
    >
      <h3 className="text-sm font-semibold mb-3 text-gray-700">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {fields.map((field) => (
          <DraggableField
            key={field}
            field={field}
            type={type}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
};