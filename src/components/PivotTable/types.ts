export type AggregationType = 'sum' | 'average' | 'count' | 'min' | 'max';

export type FormatRule = {
  field: string;
  condition: 'greater' | 'less' | 'equal' | 'between';
  value1: number;
  value2?: number;
  color: string;
};

export type ColumnDefinition = {
  field: string;
  header: string;
  aggregate: AggregationType;
  formatRules?: FormatRule[];
};

export type ValueConfig = {
  field: string;
  aggregate: AggregationType;
  formatRules?: FormatRule[];
};

export type PivotTableProps = {
  data: Record<string, any>[];
  rows: string[];
  columns: string[];
  values: ColumnDefinition[];
  defaultExpanded?: boolean;
};