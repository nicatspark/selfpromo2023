---
layout: '../../layouts/SnippetPost.astro'
title: 'TS color helper functions'
description: 'Make a color lighter,darker, greyscale or normalize an arraay of colors.'
pubDate: 'March 13 2023'
---

This is a library of usefull color manipulation functions.
At its core it is manipulating HSL values. So any color
reprensentation has to be transformed to HSL first.
There is support to translate from HEX/RGB but it is easy
to add support for any other color format if needed.
Aplha supprt is WIP but does not interfere with any color fn.

### Example usage

- First, turn your color into a color object
- unless its already like { hue:20, saturation:0.3, lightness:0.5, alpha:1 }
  const `clrObj = rgbToObject({ red:20, green:0.3, blue:0.5, alpha:1 })`
  or `const clrObj = webHslToObject('hsl(20deg 100% 50%)')`
- Then run desired effect `const myLighterShade = lighten(0.2)(clrObj)`
- To use as web color `colorObjToWeb(myLighterShade)`

The transformers are forgiving. hslToObject detects wheather you
use 0-1 or 0-100 for saturation and lightness.
Same for rgbToObject and the 0-1 or 0-255 range for the rgb values.
The other functions however will expect 0-1 values in the color object.

### Fan of CSS vars? Got you covered

CSS properties or CSS vars are fantastic. Until you need that color string.
Well with the `cssVarToColorObject` function you can extract the color and manipulate it. Here what you have to do:

- Provide the function with element and the css var. It only work if the css var is either a hex or hsl or color value (Ie `#BADA55` or `hsl(20deg, 80%, 50%)`).
- The result can be used as a color object in for example the lighten function.

```html
<style type="text/css">
  :root {
    --my-css-var: #bada55;
  }
  .aNestedGrandChild {
    background-color: var(--my-css-var);
  }
  .aNestedGrandChild:hover {
    background-color: Red;
  }
</style>
<div id="myDiv" style="--my-css-var:#BADA55">
  <div id="aNestedGrandChild" style="color:--my-css-var"></div>
</div>
<script>
  const el = document.getElementById('aNestedGrandChild')
  const clrObj = cssVarToColorObject({ el, cssVar: '--my-css-var' })
  const newColor = lighten(0.2)(clrObj)
</script>
```

lighten = (0.1) => (clrObj) =>

Later I might publish this as a NPM library. For now just copy this code.

```typescript
interface Rgb {
  r: number
  g: number
  b: number
  a?: number
}
interface RgbObject {
  red: number
  green: number
  blue: number
  alpha?: number
}

interface Hsl {
  h: number
  s: number
  l: number
  a?: number
}
interface HslObject {
  hue: number
  saturation: number
  lightness: number
  alpha?: number
}

type ColorObject = PartialBy<HslObject & RgbObject, 'red' | 'green' | 'blue'>

type HslAttributes = keyof HslObject // union including alpha
type HslProperty = keyof Omit<HslObject, 'alpha'>

type HEX = `#${string}`
type HSL = `hsl(${string})` | `hsla(${string})`

// Create optional except specified, example:
// type HslObjectLightness = PartialBy<HslObject, 'saturation'|'hue'>
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

const hexToWebRGB = (hex: HEX, alpha?: number) => {
  const { red, green, blue } = hexToObject(hex)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return `rgba(${red}, ${green}, ${blue}${
    isNaN(alpha as any) ? '' : `, ${alpha}`
  })`
}

const hexToWebHsl = (hex: string, alpha?: number) => {
  const { hue, saturation, lightness } = hexToObject(hex)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return `hsl(${hue}deg ${saturation}% ${lightness}%${
    isNaN(alpha as any) ? '' : ` / ${alpha}`
  })`
}

const colorObjToWeb = (color: ColorObject) => {
  return `hsl(${color.hue} ${color.saturation * 100}% ${
    color.lightness * 100
  }% / ${(color.alpha || 1) * 100}%)`
}

interface CssVarToObject {
  el: HTMLElement | null
  cssVar: `--${string}`
}

/**
 * HSL <-> RGB
 */

const _clamp = ({ val, min, max }: { val: number; min: number; max: number }) =>
  Math.max(min, Math.min(val, max))

const _fix = (v: number): number => +v.toFixed(2)

const _rgbToLightness = ({ r, g, b }: Rgb) =>
  (1 / 2) * (Math.max(r, g, b) + Math.min(r, g, b))

const _rgbToSaturation = ({ r, g, b }: Rgb) => {
  const L = _rgbToLightness({ r, g, b })
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  return L === 0 || L === 1 ? 0 : (max - min) / (1 - Math.abs(2 * L - 1))
}

const _rgbToHue = ({ r, g, b }: Rgb) =>
  Math.round(
    (Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180) / Math.PI
  )

const _rgbToHsl = ({ r, g, b }: Rgb) => {
  const lightness = _rgbToLightness({ r, g, b })
  const saturation = _rgbToSaturation({ r, g, b })
  const hue = _rgbToHue({ r, g, b })
  return [hue, _fix(saturation), _fix(lightness)]
}

const _hslToRgb = ({ h, s, l }: Hsl) => {
  const C = (1 - Math.abs(2 * l - 1)) * s
  const hPrime = h / 60
  const X = C * (1 - Math.abs((hPrime % 2) - 1))
  const m = l - C / 2
  const withLight = ({ r, g, b }: Rgb) => [r + m, g + m, b + m]
  if (hPrime <= 1) {
    return withLight({ r: C, g: X, b: 0 })
  } else if (hPrime <= 2) {
    return withLight({ r: X, g: C, b: 0 })
  } else if (hPrime <= 3) {
    return withLight({ r: 0, g: C, b: X })
  } else if (hPrime <= 4) {
    return withLight({ r: 0, g: X, b: C })
  } else if (hPrime <= 5) {
    return withLight({ r: X, g: 0, b: C })
  } else if (hPrime <= 6) {
    return withLight({ r: C, g: 0, b: X })
  }
  throw new Error('An error ocured')
}

//--------------------------------------------------------------------------------------------------
// Create a color object
//--------------------------------------------------------------------------------------------------

/** Example: rgbToObject({red:0.4,green:0.3,blue:0.4}) */
const rgbToObject = ({ red, green, blue, alpha }: RgbObject): ColorObject => {
  if (red + green + blue > 3) {
    red = red / 255
    green = green / 255
    blue = blue / 255
  }
  const [hue, saturation, lightness] = _rgbToHsl({ r: red, g: green, b: blue })
  return {
    red: _fix(red),
    green: _fix(green),
    blue: _fix(blue),
    hue,
    saturation: _fix(saturation),
    lightness: _fix(lightness),
    alpha,
  }
}

/** Example: webHslToObject('hsl(60deg 10% 50% / 100%)') */
const webHslToObject = (webHsl: HSL) => {
  const parentesisContentsRegex = /\(([^)]+)\)/
  const data = webHsl.match(parentesisContentsRegex)
  if (!data?.length) throw new Error('Not a matching HSL color format.')
  const clr = data[1]
    .replace(/[^0-9]+/g, ',')
    .split(',')
    .filter(Boolean)
  return hslToObject({
    hue: +clr[0],
    saturation: +clr[1],
    lightness: +clr[2],
    alpha: +clr[3] || 1,
  })
}

/** Example: hslToObject({hue:20,saturation:0.3,lightness:0.4}) */
const hslToObject = ({
  hue,
  saturation,
  lightness,
  alpha = 1,
}: HslObject): ColorObject => {
  if (saturation > 1 && saturation < 100 && lightness > 1 && lightness < 100) {
    saturation = saturation * 0.01
    lightness = lightness * 0.01
  }
  const [red, green, blue] = _hslToRgb({ h: hue, s: saturation, l: lightness })
  return {
    red: _fix(red),
    green: _fix(green),
    blue: _fix(blue),
    hue,
    saturation: _fix(saturation),
    lightness: _fix(lightness),
    alpha,
  }
}

/** Example: hexToObject('#BADA55') */
const hexToObject = (hex: string, alpha = 1) => {
  const red = parseInt(hex.slice(1, 3), 16) / 255
  const green = parseInt(hex.slice(3, 5), 16) / 255
  const blue = parseInt(hex.slice(5, 7), 16) / 255
  return rgbToObject({ red, green, blue, alpha })
}

//--------------------------------------------------------------------------------------------------
// Color manipulation functions
//--------------------------------------------------------------------------------------------------

/**
 * Example usage:
 * const rotate30 = rotateHue(30);
 * const resultingColorObj =  rotate30({hue: 60, saturation: 0.5, lightness: 30});
 * --> Can be written like this: rotateHue(30)({hue: 60, saturation: 0.5, lightness: 30});
 * const lighterHslColorString = colorObjToWeb(resultingColorObj);
 */
const rotateHue =
  (rotation: number) =>
  ({ hue, ...rest }: ColorObject) => {
    const modulo = (x: number, n: number) => ((x % n) + n) % n
    const newHue = modulo(hue + rotation, 360)
    return { ...rest, hue: newHue }
  }

/** getComplementary(hexToObject('#bada55')) */
const getComplementary = rotateHue(180)

/** getTriadic(hexToObject('#bada55')) */
const getTriadic = (color: ColorObject) => {
  const rootColor = hslToObject(color)
  const first = rotateHue(120)
  const second = rotateHue(-120)
  return [first(color), second(color), rootColor]
}

/** Example: saturate(0.2)({hue: 20, saturation:0.5, lightness: 0.8}) */
const saturate =
  (x: number) =>
  ({ saturation, ...rest }: ColorObject) => ({
    ...rest,
    saturation: +_clamp({ val: saturation + x, min: 0, max: 1 }).toFixed(2),
  })

/** Example: desaturate(0.2)({hue: 20, saturation:0.2, lightness: 0.8}) */
const desaturate =
  (x: number) =>
  ({ saturation, ...rest }: ColorObject) => ({
    ...rest,
    saturation: +_clamp({ val: saturation - x, min: 0, max: 1 }).toFixed(2),
  })

/** Example: lighten(0.1)({hue: 20, saturation:0.2, lightness: 0.8}) */
const lighten =
  (x: number) =>
  ({ lightness, ...rest }: ColorObject) => ({
    ...rest,
    lightness: +_clamp({ val: lightness + x, min: 0, max: 1 }).toFixed(2),
  })

/** Example: darken(0.5)({hue: 20, saturation:0.2, lightness: 0.8}) */
const darken =
  (x: number) =>
  ({ lightness, ...rest }: ColorObject) => ({
    ...rest,
    lightness: +_clamp({ val: lightness - x, min: 0, max: 1 }).toFixed(2),
  })

//--------------------------------------------------------------------------------------------------
// Color predicates
//--------------------------------------------------------------------------------------------------

type HslObjectSaturation = PartialBy<ColorObject, 'hue' | 'lightness'>

const isGrayscale = ({ saturation }: HslObjectSaturation) => saturation === 0

//--------------------------------------------------------------------------------------------------
// Dealing with arrays
//--------------------------------------------------------------------------------------------------

type HslObjectLightness = PartialBy<ColorObject, 'hue' | 'saturation'>

const isLight = ({ lightness }: HslObjectLightness) => lightness > 0.5
const isDark = ({ lightness }: HslObjectLightness) => lightness <= 0.5

const filterlightColors = (colors: HslObjectLightness[]) =>
  colors.filter(isLight)
const filterDarkColors = (colors: HslObjectLightness[]) => colors.filter(isDark)

const _compareAttribute =
  (attribute: HslProperty) => (a: ColorObject, b: ColorObject) =>
    a[attribute] - b[attribute]
/** Example: compareLightness({hue:20, saturation:0.4, lightness:0.5}, {hue:20, saturation:0.2, lightness:0.3}) */
const compareLightness = _compareAttribute('lightness')
const compareSaturation = _compareAttribute('saturation')
const compareHue = _compareAttribute('hue')

const overwriteAttribute =
  (attribute: HslAttributes) => (value: number) => (array: ColorObject[]) =>
    array.map((element) => ({ ...element, [attribute]: value }))

const _toSum = (a: number, b: number) => a + b
const _toAttribute = (attribute: HslProperty) => (element: ColorObject) =>
  element[attribute]
export const _averageOfAttribute =
  (attribute: HslProperty) => (array: ColorObject[]) =>
    array.map(_toAttribute(attribute)).reduce(_toSum) / array.length

const _normalizeAttribute =
  (attribute: HslProperty) => (array: ColorObject[]) => {
    const averageValue = _averageOfAttribute(attribute)(array)
    const _normalize = overwriteAttribute(attribute)(averageValue)
    return _normalize(array)
  }
const normalizeSaturation = _normalizeAttribute('saturation')
const normalizeLightness = _normalizeAttribute('lightness')
const normalizeHue = _normalizeAttribute('hue')

//--------------------------------------------------------------------------------------------------
// Exports
//--------------------------------------------------------------------------------------------------

export {
  cssVarToColorObject,
  webHslToObject,
  hexToWebRGB,
  hexToWebHsl,
  colorObjToWeb,
  hexToObject,
  rgbToObject,
  hslToObject,
  rotateHue,
  getComplementary,
  getTriadic,
  saturate,
  desaturate,
  lighten,
  darken,
  isGrayscale,
  filterDarkColors,
  filterlightColors,
  compareLightness,
  compareSaturation,
  compareHue,
  normalizeSaturation,
  normalizeLightness,
  normalizeHue,
}
```

Then you can use following snippet to auto calculate alt hover colors etc.

```typescript
interface eventClrVariation {
  event: 'onmouseover'
  light: number
  suffix: string
  cssProperty: string
}

const autoCssVarOnEvent =
  ({ event, light, suffix, cssProperty }: eventClrVariation) =>
  ({ el, cssVar }: CssVarToObject) => {
    if (!el) throw new Error('Element is undefined.')
    const webClr = getComputedStyle(el).getPropertyValue(cssVar)
    if (webClr[0] !== '#' || webClr.slice(0, 3) === 'hsl')
      throw new Error('Could not parse color. Use Hex or Hsl format.')
    const newClrObj = lighten(light)(
      webClr[0] === '#'
        ? hexToObject(webClr as HEX)
        : webHslToObject(webClr as HSL)
    )
    document.documentElement.style.setProperty(
      `${cssVar}-${suffix}`,
      colorObjToWeb(newClrObj)
    )
    el[event] = () =>
      el.style.setProperty(cssProperty, `var(${cssVar}-${suffix})`)
  }
```

Use like this.

```typescript
//Creates a reusable function that creates a darker shade of existing css var color and add suffix of "-hover".
const hoverAltClrCreator = autoCssVarOnEvent({event:'onmouseover',light:-10,suffix:'hover', cssProperty:'background-color'})

// Use over and over again.
hoverAltClrCreator({document.querySelector('button'), cssVar: '--accent-color'})
```

Now when you experiment with your colors the variant color will be automatically created.
