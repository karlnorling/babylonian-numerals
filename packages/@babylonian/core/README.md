# @babylonian/core

Render any number as [Babylonian cuneiform numerals](https://en.wikipedia.org/wiki/Babylonian_cuneiform_numerals) in SVG. No dependencies; works in Node and the browser.

<img src="https://raw.githubusercontent.com/karlnorling/babylonian-numerals/main/examples/1993.svg" alt="1993" height="80"> <img src="https://raw.githubusercontent.com/karlnorling/babylonian-numerals/main/examples/3661.svg" alt="3661" height="80"> <img src="https://raw.githubusercontent.com/karlnorling/babylonian-numerals/main/examples/rainbow.svg" alt="1234567 in rainbow colours" height="80">

```sh
npm install @babylonian/core
```

```js
import { toSvg } from '@babylonian/core';

document.body.innerHTML = toSvg(1993, { size: 200 });

// Colours and backgrounds take CSS gradients too.
toSvg('1234567', {
  color: 'linear-gradient(to right, #e03131, #f76707, #fab005, #40c057, #228be6, #7048e8, #be4bdb)',
});
```

Places count in sixties, empty places get the late Babylonian placeholder, and `formatSexagesimal` writes the same number as `1,23;20`. For PNG, JPEG or WebP, use [`@babylonian/raster`](https://www.npmjs.com/package/@babylonian/raster).

See the [docs and playground](https://karlnorling.github.io/babylonian-numerals/) for every option and how numbers are drawn.

## License

MIT
