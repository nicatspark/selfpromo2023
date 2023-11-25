---
layout: '../../layouts/SnippetPost.astro'
title: 'Javascript arrays helpers'
description: ''
pubDate: 'Jan 7 2023'
---

##### ByteSize

This snippet returns the length of a string in bytes.

```js
const byteSize = (str) => new Blob([str]).size

byteSize('😀') // 4
byteSize('Hello World') // 11
```

##### 13. capitalize

This snippet capitalizes the first letter of a string.

```js
const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('')

capitalize('fooBar') // 'FooBar'
capitalize('fooBar', true) // 'Foobar'
// or...
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
```

##### CapitalizeEveryWord

This snippet capitalizes the first letter of every word in a given string.

```js
const capitalizeEveryWord = (str) =>
  str.replace(/\b[a-z]/g, (char) => char.toUpperCase())

capitalizeEveryWord('hello world!') // 'Hello World!'
```

##### Decapitalize

This snippet turns the first letter of a string into lowercase.

```js
const decapitalize = ([first, ...rest]) => first.toLowerCase() + rest.join('')

decapitalize('FooBar') // 'fooBar'
decapitalize('FooBar') // 'fooBar'
```

##### Pad

This snippet can be used to pad a string on both sides with a specified character if it is shorter than the specified length.

```js
const pad = (str, length, char = ' ') =>
  str.padStart((str.length + length) / 2, char).padEnd(length, char)

pad('cat', 8) // '  cat   '
pad(String(42), 6, '0') // '004200'
pad('foobar', 3) // 'foobar'
```

##### SortCharactersInString

This snippet can be used to alphabetically sort the characters in a string.

```js
const sortCharactersInString = (str) =>
  [...str].sort((a, b) => a.localeCompare(b)).join('')

sortCharactersInString('cabbage') // 'aabbceg'
```

##### SplitLines

This snippet can be used to split a multi-line string into an array of lines.

```js
const splitLines = (str) => str.split(/\r?\n/)

splitLines('This\nis a\nmultiline\nstring.\n') // ['This', 'is a', 'multiline', 'string.' , '']
```

##### StripHTMLTags

This snippet can be used to remove HTML/XML tags from a string.

```js
const stripHTMLTags = (str) => str.replace(/<[^>]*>/g, '')

stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>') // 'lorem ipsum'
```

##### Words

This snippet converts a string into an array of words.

```js
const words = (str, pattern = /[^a-zA-Z-]+/) =>
  str.split(pattern).filter(Boolean)

words('I love javaScript!!') // ["I", "love", "javaScript"]
words('python, javaScript & coffee') // ["python", "javaScript", "coffee"]
```

##### Truncate in middle

```js
const truncateInMiddle = (string, length, start, end) => {
  return `${string.slice(0, start)}...${string.slice(string.length - end)}`
}
```

##### Convert string to URL slug

```js
const slugify = (string) =>
  string
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
```

##### Genrate a random string

```js
const randomString = () => Math.random().toString(36).slice(2)
// for eg: y3lpt2gs5q
```

##### To pascal case + to camel case

```typescript
function toCamelCase(string: string) {
  return toPascalCase(`${string}`).replace(
    new RegExp(/^([A-Z])(.*)/, 'g'),
    ($1, $2, $3) => `${$2.toLowerCase() + $3}`
  )
}

function toPascalCase(string: string) {
  return `${string}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w*)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase())
}

console.log(toCamelCase('Alpha-beta')) // alphaBeta
console.log(toPascalCase(' aLLlpha-BETA eta')) // AlllphaBetaEta
```
