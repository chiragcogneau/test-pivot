import React from 'react';
import { ValueFieldConfig } from './ValueFieldConfig';
import { AggregationType, FormatRule, ValueConfig } from './types';

type ValueZoneProps = {
  title: string;
  values: ValueConfig[];
  onDragStart: (e: React.DragEvent, field: string, type: string) => void;
  onDrop: (e: React.DragEvent) => void;
  onAggregateChange: (field: string, aggregate: AggregationType) => void;
  onFormatRulesChange: (field: string, rules: FormatRule[]) => void;
};

export const ValueZone: React.FC<ValueZoneProps> = ({
  title,
  values,
  onDragStart,
  onDrop,
  onAggregateChange,
  onFormatRulesChange,
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
        {values.map(({ field, aggregate, formatRules }) => (
          <ValueFieldConfig
            key={field}
            field={field}
            aggregate={aggregate}
            formatRules={formatRules}
            onDragStart={onDragStart}
            onAggregateChange={onAggregateChange}
            onFormatRulesChange={onFormatRulesChange}
          />
        ))}
      </div>
    </div>
  );
};