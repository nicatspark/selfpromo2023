---
layout: '../../layouts/SnippetPost.astro'
title: 'Node js snippets'
description: 'Node'
pubDate: 'Jan 7 2023'
---

##### Create Directory

This snippet uses existsSync() to check whether a directory exists and then mkdirSync() to create it if it doesn’t.

```javascript
const fs = require('fs')
const createDirIfNotExists = (dir) =>
  !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined
createDirIfNotExists('test')
// creates the directory 'test', if it doesn't exist
```

##### isBrowser

This snippet can be used to determine whether the current runtime environment is a browser. This is helpful for avoiding errors when running front-end modules on the server (Node).

```javascript
const isBrowser = () => ![typeof window, typeof document].includes('undefined')

isBrowser() // true (browser)
isBrowser() // false (Node)
```

##### readFileLines

This snippet can be used to read a file by getting an array of lines from a file.

```javascript
const fs = require('fs')
const readFileLines = (filename) =>
  fs.readFileSync(filename).toString('UTF8').split('\n')

let arr = readFileLines('test.txt')
console.log(arr) // ['line1', 'line2', 'line3']
```

##### Debugging nodejs like frontend

In node `node server.js --inspect-brk`

With yarn `yarn test --inspect-brk`

or npm `npm start -- --inspect-brk`

Now, open up any Edge or Chrome dev tools window and click the little green Node.js logo button next to the responsivity button.

###### Debugging Exceptions

If you want to debug a thrown exception, go to the Sources tab and click the octagonal button with a pause symbol. This causes Chrome DevTools to stop on any uncaught thrown exceptions.

###### About --inspect versus --inspect-brk

What's the difference between --inspect and --inspect-brk?

`-inspect-brk` pauses execution immediately when node starts while `-inspect` pauses execution if it hits a debugger statement and there is an attached debugger.

I usually prefer `-inspect-brk` because it gives me time to attach the debugger whereas when only using `-inspect`, the execution could finish before I have a chance to attach Chrome DevTools!

- [blog post](https://www.builder.io/blog/debug-nodejs)
- [youtube](https://www.youtube.com/shorts/bYydFXrTJ98)
