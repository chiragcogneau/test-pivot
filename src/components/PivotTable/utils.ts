import { ColumnDefinition } from './types';

export const aggregateData = (
  data: Record<string, any>[],
  field: string,
  aggregateType: string
): number => {
  if (!data.length) return 0;

  switch (aggregateType) {
    case 'sum':
      return data.reduce((acc, curr) => acc + (Number(curr[field]) || 0), 0);
    case 'average':
      return data.reduce((acc, curr) => acc + (Number(curr[field]) || 0), 0) / data.length;
    case 'count':
      return data.length;
    case 'min':
      return Math.min(...data.map(item => Number(item[field]) || 0));
    case 'max':
      return Math.max(...data.map(item => Number(item[field]) || 0));
    default:
      return 0;
  }
};

export const getUniqueValues = (data: Record<string, any>[], field: string): any[] => {
  return [...new Set(data.map(item => item[field]))].sort();
};

export const formatValue = (value: number): string => {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
};