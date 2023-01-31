---
layout: '../../layouts/BlogPost.astro'
title: 'Error handling fetch requests (Wretch)'
description: ''
pubDate: 'Jan 31 2023'
draft: false
heroImage: '/assets/blog/errorhandling.webp'
---

The fetch request is awsome but you might be writing it wrong.

You might think you catch all error with the catch clause but in reality you will only catch network error. All 404 and other specific error sent by the server will not automatically throw an error.

```javascript
fetch('/someapi')
    .then(res => res.json)
    .then(user => user)
    catch(err => console.log(err))
```

One option is too catch server error responses and throw it into en error.

```javascript
fetch("anything")
  .then(response => {
    if(!response.ok) {
      if(response.status === 404) throw new Error("Not found")
      else if(response.status === 401) throw new Error("Unauthorized")
      else if(response.status === 418) throw new Error("I'm a teapot !")
      else throw new Error("Other error")
    }
    else // ...
  })
  .then(data => /* ... */)
  .catch(error => { /* network error / offline */ })
```

Another is to use a library like [`wretch`](https://www.npmjs.com/package/wretch)

```javascript
wretch('/someapi')
    .get()
    .badRequest(err => /* ... */)
    .notFound(err => /* ... */)
    .unauthorized(err => /* ... */)
    .internalError(err => /* ... */)
    .json(json => {
    // Do stuff with the parsed json
  });
```

Another example

```javascript
wretch("anything")
  .get()
  .notFound(error => { /* ... */ })
  .unauthorized(error => { /* ... */ })
  .error(418, error => { /* ... */ })
  .res(response => /* ... */)
  .catch(error => { /* uncaught errors */ })
```

Or just for simplifying a post. Here we compare `fetch` here with `wretch` from their user docs

```javascript
fetch("endpoint", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ "hello": "world" })
}).then(response => /* ... */)
// Omitting the data retrieval and error management parts…
```

```javascript
wretch("endpoint")
  .post({ "hello": "world" })
  .res(response => /* ... */)
```
