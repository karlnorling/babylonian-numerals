import {
  DIGIT_HEIGHT,
  digitShape,
  minusWedge,
  zeroShape,
  type DigitShape,
  type Wedge,
  type ZeroStyle,
} from './glyph.js';
import { format, parse } from './number.js';
import { escapeAttr as escape, num, resolvePaint, type Paint } from './paint.js';
import type { NumberInput } from './parse.js';

export interface SvgOptions {
  /** Height of the image in pixels. The width follows from the number of places. Default 100. */
  size?: number;
  /**
   * Colour of the wedges. Default `currentColor`, so the SVG takes the surrounding text
   * colour. Also takes a CSS gradient such as `linear-gradient(to right, gold, crimson)`,
   * or a gradient object.
   */
  color?: Paint;
  /** Fills the image behind the wedges: a colour or a gradient. Default: transparent. */
  background?: Paint;
  /** Space between places in viewBox units, where a digit is 60 tall. Default 22. */
  gap?: number;
  /** Space around the numeral in viewBox units. Default 20. */
  padding?: number;
  /** `placeholder` draws empty places as two slanted wedges; `space` leaves a gap. Default `placeholder`. */
  zero?: ZeroStyle;
  /**
   * Accessible name, rendered as `<title>`. Defaults to the number written in decimal.
   * Pass `false` to leave it out and hide the image from assistive technology.
   */
  title?: string | false;
}

const MINUS = { width: 30, gap: 14 };

interface Placed {
  shape: DigitShape;
  x: number;
}

/**
 * Renders a number as an SVG string of Babylonian cuneiform numerals.
 *
 * Places run left to right in base 60, most significant first. Each digit is up to five
 * corner wedges for the tens and nine upright wedges for the units. A dot on the baseline
 * marks the start of the fraction, and a negative number starts with a horizontal wedge.
 */
export function toSvg(value: NumberInput, options: SvgOptions = {}): string {
  const number = parse(value);
  const { gap = 22, zero = 'placeholder' } = options;
  if (zero !== 'placeholder' && zero !== 'space') {
    throw new RangeError(`zero must be placeholder or space, got ${String(zero)}`);
  }
  const lone = number.integer.length === 1 && number.fraction.length === 0;
  const shapeOf = (digit: number): DigitShape => {
    if (digit !== 0 || zero === 'placeholder' || lone) return digitShape(digit);
    return { wedges: [], width: zeroShape().width };
  };

  const placed: Placed[] = [];
  let x = number.negative ? MINUS.width + MINUS.gap : 0;
  number.integer.forEach((digit, i) => {
    if (i > 0) x += gap;
    const shape = shapeOf(digit);
    placed.push({ shape, x });
    x += shape.width;
  });
  let dot: number | undefined;
  if (number.fraction.length > 0) {
    x += gap / 2 + DOT_R;
    dot = x;
    x += DOT_R + gap / 2;
    number.fraction.forEach((digit, i) => {
      if (i > 0) x += gap;
      const shape = shapeOf(digit);
      placed.push({ shape, x });
      x += shape.width;
    });
  }
  const extra = number.negative ? [minusWedge(0, MINUS.width)] : [];
  return render(placed, extra, x, dot, options, format(number));
}

/** One digit from 0 to 59 on its own, for keys and breakdowns. `place` is unused here. */
export function digitSvg(digit: number, _place = 0, options: SvgOptions = {}): string {
  const shape = digitShape(digit);
  return render([{ shape, x: 0 }], [], shape.width, undefined, options, String(digit));
}

const DOT_R = 5;

function render(
  placed: Placed[],
  extra: Wedge[],
  width: number,
  dot: number | undefined,
  options: SvgOptions,
  defaultTitle: string,
): string {
  const { size = 100, color = 'currentColor', background, padding = 20 } = options;
  if (!(size > 0)) throw new RangeError(`size must be positive, got ${size}`);
  const title = options.title ?? defaultTitle;

  const box = {
    x: -padding,
    y: -padding,
    width: width + 2 * padding,
    height: DIGIT_HEIGHT + 2 * padding,
  };
  const paint = resolvePaint(color, box, 'cuneiform-color');
  const fill =
    background === undefined ? undefined : resolvePaint(background, box, 'cuneiform-background');
  const defs = [...new Set([fill?.def, paint.def].filter(Boolean))].join('');

  const outline = (wedge: Wedge, dx: number) =>
    wedge.map(([x, y], i) => `${i ? 'L' : 'M'}${num(x + dx)} ${num(y)}`).join('') + 'Z';
  const d = [
    ...extra.map((wedge) => outline(wedge, 0)),
    ...placed.flatMap(({ shape, x }) => shape.wedges.map((wedge) => outline(wedge, x))),
  ].join('');

  const pixelWidth = (size * box.width) / box.height;
  const label = title === false ? 'aria-hidden="true"' : `role="img" aria-label="${escape(title)}"`;
  const p = escape(paint.value);
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${[box.x, box.y, box.width, box.height].map(num).join(' ')}" width="${num(pixelWidth)}" height="${num(size)}" ${label}>`,
    title === false ? '' : `<title>${escape(title)}</title>`,
    defs ? `<defs>${defs}</defs>` : '',
    fill === undefined
      ? ''
      : `<rect x="${num(box.x)}" y="${num(box.y)}" width="${num(box.width)}" height="${num(box.height)}" fill="${escape(fill.value)}"/>`,
    d
      ? `<path d="${d}" fill="${p}" stroke="${p}" stroke-width="1.5" stroke-linejoin="round"/>`
      : '',
    dot === undefined
      ? ''
      : `<circle cx="${num(dot)}" cy="${DIGIT_HEIGHT - DOT_R}" r="${DOT_R}" fill="${p}"/>`,
    '</svg>',
  ].join('');
}
