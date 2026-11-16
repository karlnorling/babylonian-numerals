import { describe, expect, it } from 'vitest';
import { DIGIT_HEIGHT, digitShape, zeroShape } from '../src/index.js';

/** Corner wedges have four points, upright wedges six. */
const corners = (digit: number) => digitShape(digit).wedges.filter((w) => w.length === 4).length;
const uprights = (digit: number) => digitShape(digit).wedges.filter((w) => w.length === 6).length;

describe('digitShape', () => {
  it.each([
    [1, 0, 1],
    [9, 0, 9],
    [10, 1, 0],
    [23, 2, 3],
    [59, 5, 9],
  ])('draws %i as %i corner wedges and %i upright wedges', (digit, tens, units) => {
    expect(corners(digit)).toBe(tens);
    expect(uprights(digit)).toBe(units);
  });

  it('puts the tens to the left of the units', () => {
    const { wedges } = digitShape(11);
    const [ten, one] = wedges;
    expect(Math.max(...ten!.map(([x]) => x))).toBeLessThan(Math.min(...one!.map(([x]) => x)));
  });

  it('keeps every wedge inside the digit height', () => {
    for (let digit = 1; digit < 60; digit++) {
      const ys = digitShape(digit)
        .wedges.flat()
        .map(([, y]) => y);
      expect(Math.min(...ys)).toBeGreaterThanOrEqual(0);
      expect(Math.max(...ys)).toBeLessThanOrEqual(DIGIT_HEIGHT);
    }
  });

  it('grows wider with more wedges', () => {
    expect(digitShape(3).width).toBeGreaterThan(digitShape(1).width);
    expect(digitShape(51).width).toBeGreaterThan(digitShape(1).width);
  });

  it('draws zero as the placeholder of two slanted wedges', () => {
    expect(digitShape(0)).toEqual(zeroShape());
    expect(zeroShape().wedges).toHaveLength(2);
  });

  it.each([-1, 60, 1.5])('rejects %s', (digit) => {
    expect(() => digitShape(digit)).toThrow('0 to 59');
  });
});
