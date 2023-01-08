---
layout: '../../layouts/SnippetPost.astro'
title: 'Javascript math'
description: 'Good at math?'
pubDate: 'Jan 7 2023'
---

##### Degrees To Rads

This code snippet can be used to convert a value from degrees to radians.

```javascript
const degreesToRads = (deg) => (deg * Math.PI) / 180.0

degreesToRads(90.0) // ~1.5708
```

##### Rads To Degrees

This snippet can be used to convert an angle from radians to degrees.

```javascript
const radsToDegrees = (rad) => (rad * 180.0) / Math.PI

radsToDegrees(Math.PI / 2) // 90
```

##### Distance

This snippet returns the distance between two points by calculating the Euclidean distance.

```javascript
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0)

distance(1, 1, 2, 3) // 2.23606797749979
```

##### Random Integer In Range

This snippet can be used to generate a random integer in a specified range.

```javascript
const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

randomIntegerInRange(0, 5) // 3
```

##### Random Number In Range

This snippet can be used to return a random number in a specified range.

```javascript
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min

randomNumberInRange(2, 10) // 6.0211363285087005
```
