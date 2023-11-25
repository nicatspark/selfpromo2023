---
layout: '../../layouts/SnippetPost.astro'
title: 'Javascript arrays helpers'
description: ''
pubDate: 'Jan 7 2023'
---

##### Loop around a collection

```js
;[...document.querySelectorAll('div')].map((arrItem) => {
  console.log(item)
})
// ...or...
;[].forEach.call(document.querySelectorAll('div'), (item) => {
  console.log(item)
})
```

##### All

This snippet returns true if the predicate function returns true for all elements in a collection and false otherwise. You can omit the second argument fn if you want to use Boolean as a default value.

```js
const all = (arr, fn = Boolean) => arr.every(fn)

all([4, 2, 3], (x) => x > 1) // true
all([1, 2, 3]) // true
```

##### Approximately equal

This snippet checks whether two numbers are approximately equal to each other, with a small difference.

```js
const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon

approximatelyEqual(Math.PI / 2.0, 1.5708) // true
```

##### Cast array

```js
const castArray = (val) => (Array.isArray(val) ? val : [val])

castArray('foo') // ['foo']
castArray([1]) // [1]

const castArray = (val) => (Array.isArray(val) ? val : [val])

castArray('foo') // ['foo']
castArray([1]) // [1]
```

##### Compact

This snippet removes false values from an array.} arr

```js
const compact = (arr) => arr.filter(Boolean)

compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34])
// [ 1, 2, 3, 'a', 's', 34 ]
```

##### Count occurrences

This snippet counts the occurrences of a value in an array.

```js
const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
countOccurrences([1, 1, 2, 1, 2, 3], 1) // 3
```

##### Deep flatten

This snippet flattens an array recursively.

```js
const deepFlatten = (arr) =>
  [].concat(...arr.map((v) => (Array.isArray(v) ? deepFlatten(v) : v)))

deepFlatten([1, [2], [[3], 4], 5]) // [1,2,3,4,5]
```

##### Difference

This snippet finds the difference between two arrays.

```js
const difference = (a, b) => {
  const s = new Set(b)
  return a.filter((x) => !s.has(x))
}

difference([1, 2, 3], [1, 2, 4]) // [3]
```

##### Difference with

This snippet removes the values for which the comparator function returns false.

```js
const differenceWith = (arr, val, comp) =>
  arr.filter((a) => val.findIndex((b) => comp(a, b)) === -1)

differenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0],
  (a, b) => Math.round(a) === Math.round(b)
)
// [1, 1.2]
```

##### Drop elements

This snippet returns a new array with n elements removed from the left.

```js
const drop = (arr, n = 1) => arr.slice(n)

drop([1, 2, 3]) // [2,3]
drop([1, 2, 3], 2) // [3]
drop([1, 2, 3], 42) // []
```

##### Drop right

This snippet returns a new array with n elements removed from the right.

```js
const dropRight = (arr, n = 1) => arr.slice(0, -n)

dropRight([1, 2, 3]) // [1,2]
dropRight([1, 2, 3], 2) // [1]
dropRight([1, 2, 3], 42) // []
```

##### Drop right while

This snippet removes elements from the right side of an array until the passed function returns true.

```js
const dropRightWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0, -1)
  return arr
}

dropRightWhile([1, 2, 3, 4], (n) => n < 3) // [1, 2]
```

##### Drop while

This snippet removes elements from an array until the passed function returns true.

```js
const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1)
  return arr
}

dropWhile([1, 2, 3, 4], (n) => n >= 3) // [3,4]
```

##### Find last

This snippet returns the last element for which a given function returns a truthy value.

```js
const findLast = (arr, fn) => arr.filter(fn).pop()

findLast([1, 2, 3, 4], (n) => n % 2 === 1) // 3
```

##### Flatten

This snippet flattens an array up to a specified depth using recursion.

```js
const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  )

flatten([1, [2], 3, 4]) // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2) // [1, 2, 3, [4, 5], 6, 7, 8]
```

##### For each right

This snippet executes a function for each element of an array starting from the array’s last element.

```js
const forEachRight = (arr, callback) => arr.slice(0).reverse().forEach(callback)

forEachRight([1, 2, 3, 4], (val) => console.log(val)) // '4', '3', '2', '1'
```

##### IndexOf all

This snippet can be used to get all indexes of a value in an array, which returns an empty array, in case this value is not included in it.

```js
const indexOfAll = (arr, val) =>
  arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])

indexOfAll([1, 2, 3, 1, 2, 3], 1) // [0,3]
indexOfAll([1, 2, 3], 4) // []
```

##### Initial

This snippet returns all elements of an array except the last one.

```js
const initial = (arr) => arr.slice(0, -1)

initial([1, 2, 3]) // [1,2]const initial = arr => arr.slice(0, -1);
initial([1, 2, 3]) // [1,2]'
```

##### Intersection

This snippet can be used to get an array with elements that are included in two other arrays.

```js
const intersection = (a, b) => {
  const s = new Set(b)
  return a.filter((x) => s.has(x))
}

intersection([1, 2, 3], [4, 3, 2]) // [2, 3]
```

##### Intersection by

This snippet can be used to return a list of elements that exist in both arrays, after a particular function has been executed to each element of both arrays.

```js
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn))
  return a.filter((x) => s.has(fn(x)))
}

intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor) // [2.1]
```

##### Intersection with

This snippet can be used to return a list of elements that exist in both arrays by using a comparator function.

```js
const intersectionWith = (a, b, comp) =>
  a.filter((x) => b.findIndex((y) => comp(x, y)) !== -1)

intersectionWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
) // [1.5, 3, 0]
```

##### Is anagram

This snippet can be used to check whether a particular string is an anagram with another string.

```js
const isAnagram = (str1, str2) => {
  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('')
  return normalize(str1) === normalize(str2)
}

isAnagram('iceman', 'cinema') // true
```

##### Is array like

This snippet can be used to check if a provided argument is iterable like an array.

```js
const isArrayLike = (obj) =>
  obj != null && typeof obj[Symbol.iterator] === 'function'

isArrayLike(document.querySelectorAll('.className')) // true
isArrayLike('abc') // true
isArrayLike(null) // false
```

##### MaxN

This snippet returns the n largest elements from a list. If n is greater than or equal to the list’s length, then it will return the original list (sorted in descending order).

```js
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n)

maxN([1, 2, 3]) // [3]
maxN([1, 2, 3], 2) // [3,2]
```

##### Negate

This snippet can be used to apply the not operator (!) to a predicate function with its arguments.

```js
const negate =
  (func) =>
  (...args) =>
    !func(...args)

;[1, 2, 3, 4, 5, 6].filter(negate((n) => n % 2 === 0)) // [ 1, 3, 5 ]
```

##### Random integer array in range

This snippet can be used to generate an array with n random integers in a specified range.

```js
const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  )

randomIntArrayInRange(12, 35, 10) // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]
```

##### Sample

This snippet can be used to get a random number from an array.

```js
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]

sample([3, 7, 9, 11]) // 9
```

##### Sample size

This snippet can be used to get n random elements from unique positions from an array up to the size of the array. Elements in the array are shuffled using the Fisher-Yates algorithm.

```js
const sampleSize = ([...arr], n = 1) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr.slice(0, n)
}

sampleSize([1, 2, 3], 2) // [3,1]
sampleSize([1, 2, 3], 4) // [2,3,1]
```

##### Shuffle

This snippet can be used to order the elements of an array randomly using the Fisher-Yates algorithm.

```js
const shuffle = ([...arr]) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}
// or
const shuffle = (arr) => arr.sort(() => 0.5 - Math.random())

const foo = [1, 2, 3]
shuffle(foo) // [2, 3, 1], foo = [1, 2, 3]
```

##### Similarity

This snippet can be used to return an array of elements that appear in two arrays.

```js
const similarity = (arr, values) => arr.filter((v) => values.includes(v))

similarity([1, 2, 3], [1, 2, 4]) // [1, 2]
```

##### Sum

This snippet can be used to find the sum of two or more numbers or arrays.

```js
const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0)

sum(1, 2, 3, 4) // 10
sum(...[1, 2, 3, 4]) // 10
```

##### Tail

This snippet can be used to get an array with all the elements of an array except for the first one. If the array has only one element, then that an array with that element will be returned instead.

```js
const tail = (arr) => (arr.length > 1 ? arr.slice(1) : arr)

tail([1, 2, 3]) // [2,3]
tail([1]) // [1]
```

##### Take

This snippet can be used to get an array with n elements removed from the beginning.

```js
const take = (arr, n = 1) => arr.slice(0, n)

take([1, 2, 3], 5) // [1, 2, 3]
take([1, 2, 3], 0) // []
```

##### TakeRight

This snippet can be used to get an array with n elements removed from the end.

```js
const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length)

takeRight([1, 2, 3], 2) // [ 2, 3 ]
takeRight([1, 2, 3]) // [3]
```

##### Union

This snippet can be used to find the union of two arrays, resulting in an array that has elements that come from both arrays but that do not repeat.

```js
const union = (a, b) => Array.from(new Set([...a, ...b]))

union([1, 2, 3], [4, 3, 2]) // [1,2,3,4]
```

##### Unique elements

This snippet uses ES6 Set and the …rest operator to get every element only once.

```js
const uniqueElements = (arr) => [...new Set(arr)]

uniqueElements([1, 2, 2, 3, 4, 4, 5]) // [1, 2, 3, 4, 5]
```

##### Get last element in an array

```js
const arr = [1, 2, 2, 3, 4, 4, 5]
console.log(arr.splice(-1)) // 5
// or
arr.at(-1) // Chrome for now
```

##### Shuffling an array

```js
const list = [1, 2, 3]
console.log(list.sort(() => Math.random() - 0.5)) // [2,1,3]
```

##### Max / min of array

```js
const list = [1, 2, 3]
console.log(Math.max(...list), Math.min(...list)) // 3, 1
```

##### Calculate the average of an array

```js
const average = (arr) => arr.reduce((a, b) => a + b) / arr.length
console.log(`average: `, average([1, 5, 10])) // 5
```

##### From array to text language

```js
const array = ['one', 'two', 'three']
const f = new Intl.ListFormat('en-us')
console.log(f.format(array)) // one, two, and three
// also check out ListFormat options argument
{
  type: 'disjunktion'
} // or
{
  style: 'short'
} // &
{
  style: 'narrow'
} // (nothing)
```
