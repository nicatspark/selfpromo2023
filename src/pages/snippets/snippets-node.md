---
layout: '../../layouts/BlogPost.astro'
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
