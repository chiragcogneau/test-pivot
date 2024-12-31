import React from 'react';
import { aggregateData, formatValue } from './utils';
import { ColumnDefinition } from './types';
import { useFormatting } from './formatting/useFormatting';

type PivotCellProps = {
  data: Record<string, any>[];
  value: ColumnDefinition;
};

export const PivotCell: React.FC<PivotCellProps> = ({ data, value }) => {
  const aggregatedValue = aggregateData(data, value.field, value.aggregate || 'sum');
  const formatting = useFormatting(aggregatedValue, value.formatRules);

  return (
    <td 
      className="px-4 py-2 text-right border transition-colors"
      {...formatting}
    >
      {formatValue(aggregatedValue)}
    </td>
  );
};