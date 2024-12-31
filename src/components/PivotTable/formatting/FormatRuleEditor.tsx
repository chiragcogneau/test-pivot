import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { FormatRule } from '../types';

type FormatRuleEditorProps = {
  rules: FormatRule[];
  onChange: (rules: FormatRule[]) => void;
  field: string;
};

export const FormatRuleEditor: React.FC<FormatRuleEditorProps> = ({
  rules,
  onChange,
  field,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const addRule = () => {
    const newRule: FormatRule = {
      field,
      condition: 'greater',
      value1: 0,
      color: '#ff0000',
    };
    onChange([...rules, newRule]);
  };

  const updateRule = (index: number, updates: Partial<FormatRule>) => {
    const newRules = rules.map((rule, i) =>
      i === index ? { ...rule, ...updates } : rule
    );
    onChange(newRules);
  };

  const removeRule = (index: number) => {
    onChange(rules.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <Settings className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border p-4 min-w-[300px]">
          <h3 className="font-semibold mb-3">Conditional Formatting</h3>
          
          {rules.map((rule, index) => (
            <div key={index} className="mb-3 p-2 border rounded">
              <div className="flex gap-2 mb-2">
                <select
                  value={rule.condition}
                  onChange={(e) => updateRule(index, { condition: e.target.value as FormatRule['condition'] })}
                  className="border rounded px-2 py-1"
                >
                  <option value="greater">Greater than</option>
                  <option value="less">Less than</option>
                  <option value="equal">Equal to</option>
                  <option value="between">Between</option>
                </select>
                <input
                  type="number"
                  value={rule.value1}
                  onChange={(e) => updateRule(index, { value1: Number(e.target.value) })}
                  className="border rounded px-2 py-1 w-20"
                />
                {rule.condition === 'between' && (
                  <input
                    type="number"
                    value={rule.value2 || 0}
                    onChange={(e) => updateRule(index, { value2: Number(e.target.value) })}
                    className="border rounded px-2 py-1 w-20"
                  />
                )}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={rule.color}
                  onChange={(e) => updateRule(index, { color: e.target.value })}
                  className="w-8 h-8"
                />
                <button
                  onClick={() => removeRule(index)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={addRule}
            className="w-full bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600"
          >
            Add Rule
          </button>
        </div>
      )}
    </div>
  );
};