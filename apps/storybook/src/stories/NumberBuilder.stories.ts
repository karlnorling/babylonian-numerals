import { toSvg, type SvgOptions } from '@babylonian/core';
import type { Meta, StoryObj } from '@storybook/html-vite';

type Args = Omit<SvgOptions, 'title' | 'color' | 'background'> & {
  value: string;
  title: string;
  color: string;
  background: string;
};

/** Renders the args, or the parse error in place of the image. */
function render({ value, title, color, background, ...options }: Args): HTMLElement {
  const root = document.createElement('div');
  root.style.color = '#24292f';
  try {
    // Empty text controls fall back to the defaults: currentColor and no background.
    root.innerHTML = toSvg(value, {
      ...options,
      ...(color ? { color } : {}),
      ...(background ? { background } : {}),
      ...(title ? { title } : {}),
    });
  } catch (error) {
    root.setAttribute('role', 'alert');
    root.style.color = '#c92a2a';
    root.style.fontFamily = 'system-ui, sans-serif';
    root.textContent = (error as Error).message;
  }
  return root;
}

const meta = {
  title: 'Babylonian Numerals/Number Builder',
  render,
  args: {
    value: '1993',
    size: 160,
    gap: 22,
    padding: 20,
    zero: 'placeholder',
    color: '',
    background: '',
    title: '',
  },
  argTypes: {
    value: {
      control: 'text',
      description:
        'Any decimal number: whole, fractional, negative or very large. Passed as a string so every digit is kept.',
    },
    size: {
      control: { type: 'range', min: 24, max: 480, step: 4 },
      description: 'Image height in pixels.',
    },
    gap: { control: { type: 'range', min: 0, max: 80, step: 2 } },
    padding: { control: { type: 'range', min: 0, max: 40, step: 1 } },
    zero: {
      control: 'inline-radio',
      options: ['placeholder', 'space'],
      description:
        '`placeholder` draws an empty place as two slanted wedges, as late Babylonian scribes did. `space` leaves a gap, as earlier ones did.',
    },
    color: {
      control: 'text',
      description:
        'A CSS colour, or a gradient: `linear-gradient(to right, red, blue)`, `radial-gradient(…)` or their `repeating-` forms. Empty for currentColor.',
    },
    background: {
      control: 'text',
      description: 'A colour or a gradient, as for **color**. Empty for transparent.',
    },
    title: { control: 'text', description: 'Accessible name. Leave empty to use the number.' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Type any number in the **value** control and adjust the style. Every control maps to a `toSvg` option.',
      },
    },
  },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};

export const LargeNumber: Story = {
  args: { value: '1234567890' },
  parameters: { docs: { description: { story: 'Places count in sixties.' } } },
};

export const Fraction: Story = {
  args: { value: '12.5' },
  parameters: {
    docs: { description: { story: 'A dot starts the fraction: 12.5 is 12 and 30 sixtieths.' } },
  },
};

export const EmptyPlace: Story = {
  args: { value: '3601' },
  parameters: { docs: { description: { story: 'Two slanted wedges hold an empty place.' } } },
};

export const SpaceForZero: Story = {
  args: { value: '3601', zero: 'space' },
  parameters: { docs: { description: { story: 'Earlier scribes left a gap instead.' } } },
};

export const Negative: Story = {
  args: { value: '-42' },
  parameters: { docs: { description: { story: 'A horizontal wedge before the number.' } } },
};

export const Rainbow: Story = {
  args: {
    value: '1234567',
    color:
      'linear-gradient(to right, #e03131, #f76707, #fab005, #40c057, #228be6, #7048e8, #be4bdb)',
  },
};

export const Christmas: Story = {
  args: {
    value: '2026.1225',
    color: 'repeating-linear-gradient(135deg, #e03131 0 3%, #ffffff 3% 6%)',
    background: 'radial-gradient(#2b8a3e, #0b3d20)',
  },
};

export const InvalidInput: Story = {
  args: { value: 'twelve' },
  parameters: {
    docs: { description: { story: "Input that isn't a decimal number shows the error." } },
  },
};
