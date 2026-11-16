# @babylonian/cli

Draw any number as [Babylonian cuneiform numerals](https://en.wikipedia.org/wiki/Babylonian_cuneiform_numerals) from the command line: SVG, PNG, JPEG or WebP.

```sh
npx @babylonian/cli 1993 > 1993.svg
npx @babylonian/cli 12.5 -o half.webp --size 200
npx @babylonian/cli -42 -o minus.png
```

Installed globally with `npm install -g @babylonian/cli`, the command is `babylonian`.

```
Usage: babylonian <number> [options]

Draws a number as Babylonian cuneiform numerals. Prints SVG to stdout unless --output is given.

Options:
  -o, --output <file>      Write to a .svg, .png, .jpg, .jpeg or .webp file
  -s, --size <px>          Image height in pixels (default 100)
  -c, --color <color>      Colour or CSS gradient (default currentColor for SVG,
                           black for images)
  -b, --background <color> Background colour or CSS gradient (default transparent,
                           white for JPEG)
  -g, --gap <n>            Space between places in viewBox units (default 22)
      --zero <placeholder|space>Draw empty places as a placeholder or a gap (default placeholder)
  -q, --quality <1-100>    JPEG and WebP quality
  -h, --help               Show this help
  -v, --version            Show the version

Examples:
  babylonian 1993 > 1993.svg
  babylonian 12.5 -o half.webp --size 200
  babylonian -42 -o minus.png
  babylonian 3661 -o hour.png -c 'linear-gradient(to right, red, blue)'
```

## License

MIT
