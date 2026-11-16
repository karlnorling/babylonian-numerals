// Settings the docs components share: presets, looks and the options this system adds.
export interface Extra {
  key: string;
  label: string;
  flag: string;
  type: 'select' | 'checkbox';
  options?: { value: string; label: string }[];
  default: string | boolean;
}

export interface Look {
  value: string;
  color?: string;
  background?: string;
}

export const system = {
  name: 'Babylonian cuneiform numerals',
  base: 60,
  breakdownTitle: 'Digit by digit, in base 60',
  sizeLabel: 'Height',
  sizeDefault: 120,
  gapDefault: 22,
  miniSize: 44,
  chartSize: 48,
  exampleSize: 72,
  randomMax: 216000,
  presets: ['1993', '60', '3600', '3661', '12.5', '-42', '0', '86400'],
  extras: [
    {
      key: 'zero',
      label: 'Empty places',
      flag: '--zero',
      type: 'select',
      options: [
        {
          value: 'placeholder',
          label: 'Placeholder',
        },
        {
          value: 'space',
          label: 'Space',
        },
      ],
      default: 'placeholder',
    },
  ] as Extra[],
  looks: {
    plain: { value: '1993' } as Look,
    rainbow: {
      value: '1234567',
      color:
        'linear-gradient(to right, #e03131, #f76707, #fab005, #40c057, #228be6, #7048e8, #be4bdb)',
    } as Look,
    christmas: {
      value: '2026.1225',
      color: 'repeating-linear-gradient(135deg, #e03131 0 3%, #ffffff 3% 6%)',
      background: 'radial-gradient(#2b8a3e, #0b3d20)',
    } as Look,
  },
};
