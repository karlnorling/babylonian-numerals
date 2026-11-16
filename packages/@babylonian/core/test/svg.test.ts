import { describe, expect, it } from 'vitest';
import { digitSvg, formatSexagesimal, parse, toSvg } from '../src/index.js';

const attr = (svg: string, name: string) => new RegExp(` ${name}="([^"]*)"`).exec(svg)?.[1];
const wedges = (svg: string) => (attr(svg, 'd') ?? '').split('M').length - 1;

describe('toSvg', () => {
  it('renders one digit 100px tall by default', () => {
    const svg = toSvg(1);
    expect(attr(svg, 'viewBox')).toBe('-20 -20 58 100');
    expect(attr(svg, 'height')).toBe('100');
    expect(svg).toContain('<title>1</title>');
    expect(attr(svg, 'fill')).toBe('currentColor');
  });

  it('writes one place per sixty', () => {
    // 3661 = 1·3600 + 1·60 + 1
    expect(wedges(toSvg(3661))).toBe(3);
    expect(wedges(toSvg(59))).toBe(14);
  });

  it('draws empty places as placeholders, or as gaps', () => {
    // 3601 = 1, 0, 1
    expect(wedges(toSvg(3601))).toBe(4);
    const spaced = toSvg(3601, { zero: 'space' });
    expect(wedges(spaced)).toBe(2);
    expect(attr(spaced, 'viewBox')).toBe(attr(toSvg(3601), 'viewBox'));
  });

  it('always draws a lone zero', () => {
    expect(wedges(toSvg(0, { zero: 'space' }))).toBe(2);
  });

  it('puts a dot on the baseline before the fraction', () => {
    const svg = toSvg(1.5);
    expect(svg).toMatch(/<circle cx="[\d.]+" cy="55" r="5" fill="currentColor"\/>/);
    expect(svg).toContain('<title>1.5</title>');
  });

  it('starts a negative number with a horizontal wedge', () => {
    const svg = toSvg(-1);
    expect(wedges(svg)).toBe(2);
    expect(attr(svg, 'viewBox')).toBe('-20 -20 102 100');
  });

  it('takes backgrounds and gradients', () => {
    const svg = toSvg(5, { color: 'linear-gradient(red, blue)', background: '#fff' });
    expect(attr(svg, 'fill')).toBe('#fff');
    expect(svg).toMatch(/<path d="[^"]+" fill="url\(#cuneiform-color-\w+\)"/);
  });

  it.each([
    [{ size: 0 }, 'size must be positive'],
    [{ zero: 'nothing' as 'space' }, 'zero must be placeholder or space'],
  ])('rejects %j', (options, message) => {
    expect(() => toSvg(1, options)).toThrow(message);
  });
});

describe('digitSvg', () => {
  it('draws one digit with its value as the title', () => {
    expect(digitSvg(42)).toContain('<title>42</title>');
    expect(wedges(digitSvg(42))).toBe(6);
  });
});

describe('formatSexagesimal', () => {
  it.each([
    [0, '0'],
    [59, '59'],
    [3661, '1,1,1'],
    [1.5, '1;30'],
    ['-12.25', '-12;15'],
    [0.01, '0;0,36'],
  ])('writes %s as %s', (value, expected) => {
    expect(formatSexagesimal(value)).toBe(expected);
  });

  it('takes parsed numbers too', () => {
    expect(formatSexagesimal(parse(3600))).toBe('1,0,0');
  });
});
