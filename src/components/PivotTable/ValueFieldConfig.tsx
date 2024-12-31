import React from 'react';
import { GripVertical } from 'lucide-react';
import { AggregationType, FormatRule } from './types';
import { AggregationDropdown } from './AggregationDropdown';
import { FormatRuleEditor } from './formatting/FormatRuleEditor';

type ValueFieldConfigProps = {
  field: string;
  aggregate: AggregationType;
  formatRules?: FormatRule[];
  onDragStart: (e: React.DragEvent, field: string, type: string) => void;
  onAggregateChange: (field: string, aggregate: AggregationType) => void;
  onFormatRulesChange: (field: string, rules: FormatRule[]) => void;
};

export const ValueFieldConfig: React.FC<ValueFieldConfigProps> = ({
  field,
  aggregate,
  formatRules = [],
  onDragStart,
  onAggregateChange,
  onFormatRulesChange,
}) => {
  return (
    <div
      draggable
      className="flex items-center gap-2 px-3 py-2 bg-white rounded border cursor-move group"
      onDragStart={(e) => onDragStart(e, field, 'value')}
    >
      <GripVertical className="w-4 h-4 text-gray-400" />
      <span className="text-gray-700">{field}</span>
      <span className="text-xs text-gray-500">
        ({aggregate})
      </span>
      <div className="flex gap-1">
        <AggregationDropdown
          value={aggregate}
          onChange={(newAggregate) => onAggregateChange(field, newAggregate)}
        />
        <FormatRuleEditor
          rules={formatRules}
          onChange={(rules) => onFormatRulesChange(field, rules)}
          field={field}
        />
      </div>
    </div>
  );
};