import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { PivotCell } from './PivotCell';
import { getUniqueValues } from './utils';
import { PivotTableProps } from './types';

export const PivotTable: React.FC<PivotTableProps> = ({
  data,
  rows,
  columns,
  values,
  defaultExpanded = false,
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>(
    defaultExpanded ? {} : { root: true }
  );

  const uniqueColumnValues = useMemo(
    () => columns.map(col => getUniqueValues(data, col)),
    [data, columns]
  );

  const toggleRow = (rowKey: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowKey]: !prev[rowKey],
    }));
  };

  const renderRow = (rowData: Record<string, any>[], depth: number = 0, rowPath: string[] = []) => {
    if (depth >= rows.length) return null;

    const currentField = rows[depth];
    const uniqueValues = getUniqueValues(rowData, currentField);
    const rowKey = rowPath.join('-');

    return uniqueValues.map(value => {
      const newPath = [...rowPath, value];
      const currentRowKey = newPath.join('-');
      const filteredData = rowData.filter(item => item[currentField] === value);
      const isExpanded = expandedRows[currentRowKey];
      const hasChildren = depth < rows.length - 1;

      return (
        <React.Fragment key={currentRowKey}>
          <tr className={depth === 0 ? 'bg-gray-50' : ''}>
            {depth === 0 && <td className="w-8 px-2 border" />}
            {Array(depth)
              .fill(0)
              .map((_, i) => (
                <td key={i} className="w-8 px-2 border" />
              ))}
            <td
              className="px-4 py-2 border"
              colSpan={rows.length - depth}
              onClick={() => hasChildren && toggleRow(currentRowKey)}
            >
              <div className="flex items-center gap-2">
                {hasChildren && (
                  <button className="p-1 hover:bg-gray-200 rounded">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                )}
                {value}
              </div>
            </td>
            {uniqueColumnValues[0].map(colValue => (
              values.map(valueCol => (
                <PivotCell
                  key={`${currentRowKey}-${colValue}-${valueCol.field}`}
                  data={filteredData.filter(item => item[columns[0]] === colValue)}
                  value={valueCol}
                />
              ))
            ))}
          </tr>
          {hasChildren && isExpanded && renderRow(filteredData, depth + 1, newPath)}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="overflow-x-auto border rounded-lg shadow">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-8 px-2 border" />
            {rows.map(row => (
              <th key={row} className="px-4 py-2 font-semibold text-left border">
                {row}
              </th>
            ))}
            {uniqueColumnValues[0].map(colValue => (
              values.map(valueCol => (
                <th
                  key={`${colValue}-${valueCol.field}`}
                  className="px-4 py-2 font-semibold text-right border"
                >
                  {`${colValue} - ${valueCol.header}`}
                </th>
              ))
            ))}
          </tr>
        </thead>
        <tbody>{renderRow(data)}</tbody>
      </table>
    </div>
  );
};