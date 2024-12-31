import { FormatRule } from '../types';

export const useFormatting = (value: number, rules?: FormatRule[]) => {
  if (!rules?.length) return {};

  for (const rule of rules) {
    const matches = checkCondition(value, rule);
    if (matches) {
      return {
        style: {
          backgroundColor: rule.color,
          color: getContrastColor(rule.color),
        },
      };
    }
  }

  return {};
};

const checkCondition = (value: number, rule: FormatRule): boolean => {
  switch (rule.condition) {
    case 'greater':
      return value > rule.value1;
    case 'less':
      return value < rule.value1;
    case 'equal':
      return value === rule.value1;
    case 'between':
      return value >= rule.value1 && value <= (rule.value2 || rule.value1);
    default:
      return false;
  }
};

const getContrastColor = (hexColor: string): string => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
};