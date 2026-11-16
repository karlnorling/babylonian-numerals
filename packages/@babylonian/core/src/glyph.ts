/** Babylonian numerals count in sixties: each place holds a digit from 0 to 59. */
export const BASE = 60;

/** Height of a digit in viewBox units. Widths vary with the number of wedges. */
export const DIGIT_HEIGHT = 60;

/** A wedge outline, as points to fill. */
export type Wedge = readonly (readonly [number, number])[];

/**
 * How an empty place is drawn: `placeholder` is the two slanted wedges of late Babylonian
 * texts, and `space` leaves a gap as earlier scribes did. A number that is just zero always
 * gets the placeholder, so it has something to show.
 */
export type ZeroStyle = 'placeholder' | 'space';

/** Rows of upright wedges for 1 to 9, top row first. */
const UNIT_ROWS: Record<number, number[]> = {
  1: [1],
  2: [2],
  3: [3],
  4: [2, 2],
  5: [3, 2],
  6: [3, 3],
  7: [4, 3],
  8: [4, 4],
  9: [3, 3, 3],
};
/** Rows of corner wedges for 10 to 50, top row first. */
const TEN_ROWS: Record<number, number[]> = {
  1: [1],
  2: [2],
  3: [3],
  4: [2, 2],
  5: [3, 2],
};

/** Upright wedge sizes by the number of rows they share the height with. */
const UPRIGHT = {
  1: { width: 18, head: 15 },
  2: { width: 15, head: 11 },
  3: { width: 12, head: 8 },
} as const;
const ROW_GAP = 5;
const UPRIGHT_SPACING = 3;
/** Corner wedges nest inside each other, like <<<. */
const CORNER = { width: 22, nest: 11 };
/** Space between the tens and the units of one digit. */
const INNER_GAP = 6;
const ZERO_WIDTH = 22;

export interface DigitShape {
  wedges: Wedge[];
  width: number;
}

/** An upright wedge: a triangular head on top of a tapering stem. */
function upright(cx: number, top: number, height: number, rows: 1 | 2 | 3): Wedge {
  const { width, head } = UPRIGHT[rows];
  return [
    [cx - width / 2, top],
    [cx + width / 2, top],
    [cx + 2, top + head],
    [cx + 1, top + height],
    [cx - 1, top + height],
    [cx - 2, top + head],
  ];
}

/** A corner wedge (Winkelhaken), pointing left. */
function corner(x: number, cy: number, height: number): Wedge {
  return [
    [x, cy],
    [x + CORNER.width, cy - height / 2],
    [x + CORNER.width * 0.62, cy],
    [x + CORNER.width, cy + height / 2],
  ];
}

function rotate(wedge: Wedge, cx: number, cy: number, degrees: number): Wedge {
  const r = (degrees * Math.PI) / 180;
  const [cos, sin] = [Math.cos(r), Math.sin(r)];
  return wedge.map(([x, y]) => [
    cx + (x - cx) * cos - (y - cy) * sin,
    cy + (x - cx) * sin + (y - cy) * cos,
  ]);
}

/** The late Babylonian placeholder for an empty place: two small slanted wedges. */
export function zeroShape(): DigitShape {
  const cx = ZERO_WIDTH / 2;
  return {
    width: ZERO_WIDTH,
    wedges: [14, 46].map((cy) => rotate(upright(cx, cy - 11, 22, 3), cx, cy, -45)),
  };
}

/**
 * The wedges for one digit from 0 to 59, with the tens on the left and the units on the
 * right, in a box `DIGIT_HEIGHT` tall starting at x = 0. Zero is the placeholder.
 */
export function digitShape(digit: number): DigitShape {
  if (!Number.isInteger(digit) || digit < 0 || digit >= BASE) {
    throw new RangeError(`A Babylonian digit runs from 0 to 59, got ${digit}`);
  }
  if (digit === 0) return zeroShape();
  const tens = Math.floor(digit / 10);
  const units = digit % 10;
  const wedges: Wedge[] = [];
  let x = 0;

  if (tens > 0) {
    const rows = TEN_ROWS[tens]!;
    const height = rows.length === 1 ? 28 : 24;
    const centres = rows.length === 1 ? [30] : [16, 44];
    const width = (n: number) => CORNER.width + (n - 1) * CORNER.nest;
    const blockWidth = Math.max(...rows.map(width));
    rows.forEach((n, row) => {
      const start = (blockWidth - width(n)) / 2;
      for (let i = 0; i < n; i++)
        wedges.push(corner(start + i * CORNER.nest, centres[row]!, height));
    });
    x = blockWidth + (units > 0 ? INNER_GAP : 0);
  }

  if (units > 0) {
    const rows = UNIT_ROWS[units]!;
    const count = rows.length as 1 | 2 | 3;
    const height = (DIGIT_HEIGHT - (count - 1) * ROW_GAP) / count;
    const step = UPRIGHT[count].width + UPRIGHT_SPACING;
    const width = (n: number) => n * step - UPRIGHT_SPACING;
    const blockWidth = Math.max(...rows.map(width));
    rows.forEach((n, row) => {
      const start = x + (blockWidth - width(n)) / 2 + UPRIGHT[count].width / 2;
      const top = row * (height + ROW_GAP);
      for (let i = 0; i < n; i++) wedges.push(upright(start + i * step, top, height, count));
    });
    x += blockWidth;
  }
  return { wedges, width: x };
}

/** A horizontal wedge pointing right, used here as a minus sign. */
export function minusWedge(x: number, width: number): Wedge {
  const cy = DIGIT_HEIGHT / 2;
  return rotate(upright(x + width / 2, cy - width / 2, width, 2), x + width / 2, cy, -90);
}
