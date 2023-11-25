---
layout: '../../layouts/SnippetPost.astro'
title: 'Async functions'
description: 'Since we mostly use one or two of these it is easy to forget the syntaax sometimes.'
pubDate: 'Jan 7 2023'
---

#### The different shapes of async functions

##### Async arrow functions look like this

```js
const foo = async () => {
  // do something
}
```

##### Async arrow functions look like this for a single argument passed to it

```js
const foo = async (evt) => {
  // do something with evt
}
```

##### The anonymous form works as well

```js
const foo = async function () {
  // do something
}
```

##### An async function declaration looks like this

```js
async function foo() {
  // do something
}
```

##### Using async function in a callback

```js
const foo = event.onCall(async () => {
  // do something
})
```

##### Native fetch in a one-liner

```js
const getPost = async (id) => {
  return await (
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}}`)
  ).json()
}
```

However, it is difficult to properly error-handle it. You probably want to use this pattern instead.

```js
fetch("anything")
    .then(response => {
      if(!response.ok) { // status not in the 200-range
        if(response.status === 404) throw new Error("Not found")
        else if(response.status === 401) throw new Error("Unauthorized")
        else if(response.status === 418) throw new Error("I'm a teapot !")
        else throw new Error("Other error")
      }
      else // ... could be [return response.json;] for example
    })
    .then(data => /* ... */)
    .catch(error => { /* network error / offline */ })
```

Since this quickly becomes quite verbose and non dynamic you might be intrested in [extending the native error](/blog/error-handling-in-typescript). Or use a [library like Wretch](/blog/error-handling-fetch).

##### So how to load in parallel with best practice in mind?

Key here is to use `allSettled` instead of `Promise.all` with a `try/catch`.

```js
async function getPageData() {
  const result = await Promise.allSettled([fetchUser(), fetchProduct()])

  const [user, product] = handle(result) //case not result.ok===true, error handle to the best of your ability.
}
```

---

People interested in this article also found good use of this:

- [tries-to-execute-a-function-until-it-does-not-return-falsey-attempts-number-of-times](/snippets/snippets-helper-functions#tries-to-execute-a-function-until-it-does-not-return-falsey-attempts-number-of-times)
