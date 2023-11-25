---
layout: '../../layouts/BlogPost.astro'
title: 'How to create an endpoint in Astrojs'
description: ''
pubDate: 'Jan 11 2023'
heroImage: '/placeholder-hero.jpg'
---

Here are two ways to create an endpoint in Astrojs. Let's play around with the idea that we want to use a form to upload an image and two ways to do that in Astrojs. First a primer om formData.

##### About formData

> `FormData` [is an] interface [which] provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the fetch() or XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data". Source: MDN - [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData?ref=hackernoon.com)

Basically instead of using JSON to send data to and from your server, you'd use `FormData`, except unlike JSON it supports files natively.

For example:

```js
// 1. Create or Get a File
/** Creating a File */
const fileContent = `Text content...Lorem Ipsium`
const buffer = new TextEncoder().encode(fileContent)
const blob = new Blob([buffer])
const file = new File([blob], 'text-file.txt', { type: 'text/plain' })
/** OR */
/** Getting a File */
const fileInput = document.querySelector('#files') // <input id="files" type="file" multiple />
const file = fileInput.files.item(0)

// 2. Create FormData
const formData = new FormData()

// 3. Add File to FormData through the `file` field
formData.append('file', file) // FormData keys are called fields
```

```js
const file = fileInput.files.item(0)
```

> fileInput.files is a [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList?ref=hackernoon.com), which is similar but **not** an array, to work around this you can convert the `FileList` to an array of `File`'s using `Array.from`
> For our use case, since we're only trying to upload one file, it'd be easier to select the first File in the `FileList`
> Learn more on MDN - [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/files?ref=hackernoon.com) and [MDN - File](https://developer.mozilla.org/en-US/docs/Web/API/File?ref=hackernoon.com)
> Note: you can also just directly use `FileReader` instead of using an `<input />` element.

##### Usage

There are 2 ways to support FormData in Astro; the easy and the hard way, I'll show you both.

Note: both the easy and hard way require Astro to be configured in server (SSR) mode.

```js
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  output: 'server',
})
```

##### Easy way

The easy way requires you to create a new .ts file that will act as your endpoint, for example, if you wanted a /upload endpoint, you would create a `.ts` file in `src/pages`.

Read Astro's official docs on `File Routes` to learn more

Your basic file tree should look like this after creating your endpoint.

```plaintext
src/
 pages/
   upload.ts
   index.astro
```

Inside your `index.astro` file follow the example I gave above in #getting-started, on getting `FormData` up and running.

Once you've created an instance of `FormData` and populated it with the files you'd like to upload, you then just setup a POST request to that endpoint.

```js
// ...
const res = await fetch('/upload', {
  method: 'POST',
  body: formData,
})
const result = await res.json()
console.log(JSON.stringify(result))
```

From the endpoint side you'd then need to export a post method to handle the POST request being sent,

Here is where things get complex. I recommend going through Astro's File Routes Docs.

```js
import type { APIContext } from 'astro'

// File routes export a get() function, which gets called to generate the file.
// Return an object with `body` to save the file contents in your final build.
// If you export a post() function, you can catch post requests, and respond accordingly
export async function post({ request }: APIContext) {
  const formData = await request.formData()
  return {
    body: JSON.stringify({
      fileNames: await Promise.all(
        formData.getAll('files').map(async (file: File) => {
          return {
            webkitRelativePath: file.webkitRelativePath,
            lastModified: file.lastModified,
            name: file.name,
            size: file.size,
            type: file.type,
            buffer: {
              type: 'Buffer',
              value: Array.from(
                new Int8Array(await file.arrayBuffer()).values()
              ),
            },
          }
        })
      ),
    }),
  }
}
```

The basics of what's happening here are fairly simple, but the code all put together seems rather complex, so let's break it down.

First, the exported post function handles POST requests as its name suggests, meaning if you send a get request and don't export a get function an error will occur.

`export async function post() { ... }` what?! Yeah, I too recently learned that Astro supports this out of the box, which is awesome.

> W3Schools cover `POST and GET` fairly well, take a look at their article if you're not familiar with POST and GET requests

Let's first talk about the `request` parameter. As it's name suggests `request` is an instance of the Request class which includes all the methods that Request supports, including a method for transforming said request into FormData you can work with.

```js
// ...
export async function post({ request }: APIContext) {
  const formData = await request.formData()
  // ...
}
```

Using formData you can get all the instances of a specific field (FormData keys are called fields), for example, get all File's in the file field.

```js
// ...
export async function post({ request }: APIContext) {
  const formData = await request.formData()
  return {
    body: JSON.stringify({
      // getAll('file') will return an array of File classes
      fileNames: formData.getAll('file'),
    }),
  }
}
```

The problem with this solution is that it will return {"fileNames":[{}]} due to JSON.stringify being unable to convert File classes to a string.

To deal with this formatting issue we need to format the File's array properly.

```js
// ...
export async function post({ request }: APIContext) {
  const formData = await request.formData()
  return {
    body: JSON.stringify({
      // getAll('files') will return an array of File classes
      fileNames: formData.getAll('files').map(async (file: File) => {
        return {
          webkitRelativePath: file.webkitRelativePath,
          lastModified: file.lastModified,
          name: file.name,
          size: file.size,
          type: file.type,
          buffer: {
            /* ... */
          },
        }
      }),
    }),
  }
}
```

The last part is converting ArrayBuffers into data that is easy to work with, for this case using arrays to represent buffers works rather well, so we just do some conversion,

```js
// ...
export async function post({ request }: APIContext) {
  const formData = await request.formData()
  return {
    body: JSON.stringify({
      // getAll('file') will return an array of File classes
      fileNames: formData.getAll('file').map(async (file: File) => {
        return {
          // ...
          buffer: {
            type: 'Buffer',
            value: Array.from(new Int8Array(await file.arrayBuffer()).values()),
          },
        }
      }),
    }),
  }
}
```

That's the easy way. Using Astro's baked in file routes to act as an endpoint for your FormData.

> To actually run Astro with the /upload endpoint all you need is npm run dev.

You can view a demo of the easy way on [Stackblitz](https://stackblitz.com/edit/github-a2gvve-izjjam?file=README.md%2Castro.config.mjs%2Csrc%2Findex.ts&on=stackblitz&ref=hackernoon.com) and [GitHub](https://github.com/okikio/astro-form-data-easy-edition?ref=hackernoon.com).

##### Hard way

The hard way requires you to use the [multer](https://github.com/expressjs/multer?ref=hackernoon.com) middleware together with [expressjs](https://expressjs.com/?ref=hackernoon.com), in order to make the @astrojs/node integration support FormData requests.

The hard way mostly builds on the #easy-way, except instead of a `src/pages/upload.ts` file, you would instead use a `server.mjs` file in the root directory to define your endpoints, so, your file structure would look more like this.

```plaintext
src/
 pages/
   index.astro
server.mjs
```

The core of the hard way occurs inside `server.mjs`. `server.mjs` should look like this by the end of this blog post.

```js
import express from 'express'
import { handler as ssrHandler } from './dist/server/entry.mjs'
import multer from 'multer'

const app = express()
app.use(express.static('dist/client/'))
app.use(ssrHandler)

const upload = multer()
app.post('/upload', upload.array('file'), function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  // req.files['avatar'][0] -> File
  // req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
  console.log(req.files)
  res.json({ fileNames: req.files })
})

app.listen(8080)
```

When you build an Astro project in server (SSR) mode (e.g. `npm run build`), Astro will automatically generate a `dist/server/entry.mjs` file, it's this file that allows us to build our own custom nodejs server and then run Astro off this server.

For this specific use case we are using express for the server, and to enable FormData support in express we need the multer middleware, so if you're familiar with express at all this should look familiar.

```js
import express from 'express'
import { handler as ssrHandler } from './dist/server/entry.mjs'

const app = express()
app.use(express.static('dist/client/'))
app.use(ssrHandler)

// ...
app.listen(8080)
```

The ssrHandler enables Astro to run on the express server, for the most part it can be treated like any other express middleware and ignored.

> Note: If you're not familiar with the code snippet above, please go through express' documentation, it'll make the rest of the explanation easier to understand

The real interesting part is where multer and express meet.

By using a POST request handler we are able to recieve POST requests made to the /upload endpoint and respond back with the parsed FormData results, but unlike in the #easy-way, express is able to handle all the formatting allowing File responses to be as expected.

```js
// ...
import multer from 'multer'

const app = express()
// ...

const upload = multer()
app.post('/upload', upload.array('files'), function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  // req.files['avatar'][0] -> File
  // req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
  console.log(req.files)
  res.json({ fileNames: req.files })
})

app.listen(8080)
```

Response to express POST request.

That's the hard way. Using Astro's SSR mode together with express and multer to create the `/upload` endpoint which supports formData.

> To actually run Astro you need to do a bit more than you'd need for the #easy-way.
>
> 1. Install express and multer -> `npm install express multer`
> 2. Build Astro handler -> `npm run build`
> 3. Run server.mjs -> `node server.mjs`
>
> The hard way may seem easier, but that is due to having done alot of the prep work in the #easy-way, it is actually more overall work than the easy way.

You can view a demo of the hard way on [Stackblitz](https://stackblitz.com/edit/github-a2gvve?file=server.mjs&ref=hackernoon.com) or [GitHUB](https://github.com/okikio/astro-form-data?ref=hackernoon.com)

##### Conclusion

There are 2 ways of using FormData with Astro, the easy way and the hard way.

The easy way is to use Astro's bakend in File Routes to act as an endpoint for your FormData POST requests.

The hard way is to use Astro's SSR mode together with express and multer to create a `/upload` endpoint which supports FormData.

There is no right way, but I will recommend the easy way as it is easier and less confusing to work with overall.

---

Original article at [hackernoon.com](https://hackernoon.com/upload-files-easily-and-quickly-in-nodejs-using-astro)
