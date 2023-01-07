---
layout: '../../layouts/BlogPost.astro'
title: 'The different shapes of async functions'
description: 'Since we mostly use one or two of these it is easy to forget the syntaax sometimes.'
pubDate: 'Jan 7 2023'
---

##### Async arrow functions look like this

```javascript
const foo = async () => {
  // do something
}
```

##### Async arrow functions look like this for a single argument passed to it

```javascript
const foo = async (evt) => {
  // do something with evt
}
```

##### The anonymous form works as well

```javascript
const foo = async function () {
  // do something
}
```

##### An async function declaration looks like this

```javascript
async function foo() {
  // do something
}
```

##### Using async function in a callback

```javascript
const foo = event.onCall(async () => {
  // do something
})
```

##### Native fetch in a one-liner

```javascript
const getPost = async (id) => {
  return await (
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}}`)
  ).json()
}
```
