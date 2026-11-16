import { BASE } from './glyph.js';
import { formatInBase, parseInBase, type NumberInput, type ParsedNumber } from './parse.js';

/** Splits a number into base-60 digits, one per place. `0.5` is the fraction digit 30. */
export function parse(value: NumberInput): ParsedNumber {
  return parseInBase(value, BASE);
}

/** Writes parsed digits back as a canonical decimal string, e.g. `-12.5`. */
export function format(number: ParsedNumber): string {
  return formatInBase(number, BASE);
}

/**
 * Writes a number in the notation historians use for sexagesimal: places separated by
 * commas and the fractional point by a semicolon. `1.5` is `1;30` and `3661` is `1,1,1`.
 */
export function formatSexagesimal(value: NumberInput | ParsedNumber): string {
  const { negative, integer, fraction } = typeof value === 'object' ? value : parse(value);
  return `${negative ? '-' : ''}${integer.join(',')}${fraction.length ? `;${fraction.join(',')}` : ''}`;
}
