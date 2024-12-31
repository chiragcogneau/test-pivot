import React from 'react';
import { FieldZone } from './FieldZone';
import { ValueZone } from './ValueZone';
import { AggregationType, ValueConfig, FormatRule } from './types';

type PivotTableConfigProps = {
  availableFields: string[];
  rows: string[];
  columns: string[];
  values: ValueConfig[];
  onConfigChange: (config: {
    rows: string[];
    columns: string[];
    values: ValueConfig[];
  }) => void;
  onAggregateChange: (field: string, aggregate: AggregationType) => void;
  onFormatRulesChange: (field: string, rules: FormatRule[]) => void;
};

export const PivotTableConfig: React.FC<PivotTableConfigProps> = ({
  availableFields,
  rows,
  columns,
  values,
  onConfigChange,
  onAggregateChange,
  onFormatRulesChange,
}) => {
  const [draggedField, setDraggedField] = React.useState<{
    field: string;
    sourceType: string;
  } | null>(null);

  const handleDragStart = (e: React.DragEvent, field: string, type: string) => {
    setDraggedField({ field, sourceType: type });
  };

  const moveField = (field: string, sourceType: string, targetType: string) => {
    const newConfig = {
      rows: [...rows],
      columns: [...columns],
      values: [...values],
    };

    // Remove from source
    if (sourceType === 'row') newConfig.rows = rows.filter((f) => f !== field);
    if (sourceType === 'column') newConfig.columns = columns.filter((f) => f !== field);
    if (sourceType === 'value') newConfig.values = values.filter((v) => v.field !== field);

    // Add to target
    if (targetType === 'row' && !newConfig.rows.includes(field)) newConfig.rows.push(field);
    if (targetType === 'column' && !newConfig.columns.includes(field)) newConfig.columns.push(field);
    if (targetType === 'value' && !newConfig.values.find(v => v.field === field)) {
      newConfig.values.push({ field, aggregate: 'sum', formatRules: [] });
    }

    onConfigChange(newConfig);
  };

  const handleDrop = (targetType: string) => (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedField) {
      moveField(draggedField.field, draggedField.sourceType, targetType);
      setDraggedField(null);
    }
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex gap-4">
        <FieldZone
          title="Rows"
          type="row"
          fields={rows}
          onDragStart={handleDragStart}
          onDrop={handleDrop('row')}
        />
        <FieldZone
          title="Columns"
          type="column"
          fields={columns}
          onDragStart={handleDragStart}
          onDrop={handleDrop('column')}
        />
        <ValueZone
          title="Values"
          values={values}
          onDragStart={handleDragStart}
          onDrop={handleDrop('value')}
          onAggregateChange={onAggregateChange}
          onFormatRulesChange={onFormatRulesChange}
        />
      </div>
    </div>
  );
};