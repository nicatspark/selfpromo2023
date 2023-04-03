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

##### Debugging Exceptions

If you want to debug a thrown exception, go to the Sources tab and click the octagonal button with a pause symbol. This causes Chrome DevTools to stop on any uncaught thrown exceptions.

##### About --inspect versus --inspect-brk

What's the difference between --inspect and --inspect-brk?

`-inspect-brk` pauses execution immediately when node starts while `-inspect` pauses execution if it hits a debugger statement and there is an attached debugger.

I usually prefer `-inspect-brk` because it gives me time to attach the debugger whereas when only using `-inspect`, the execution could finish before I have a chance to attach Chrome DevTools!

- [blog post](https://www.builder.io/blog/debug-nodejs)
- [youtube](https://www.youtube.com/shorts/bYydFXrTJ98)

### Package.json

##### How to force a node version in package.json

```bash
{
  "scripts": {
    "check-node-version": "nvm use 18",
    "dev": "yarn check-node-version && next dev"
  },
  "engines": {
    "node": "18.x"
  },
  "enginesStrict": true
}
```

##### How to enforce a specific package manager for your repo

**Edit .npmrc**
You might not have this file in your codebase. If this is the case, create this file in the root folder of your application.

It allows us to specify package manager configurations and it is used by both npm and yarn.

Your .npmrc file should have the engine-strict property marked as true.

```text
//.npmrc file

engine-strict = true
```

This option tells the package manager to use the version of the engines we have specified in the package.json file.

**Edit package.json**
Inside your package.json file you should add the engines section if you don’t currently have it.

```json
//package.json
{ 
  ...
  "engines": {
    "npm": "please-use-yarn",
    "yarn": ">= 1.19.1"
  },
  ...
}
```

In the above code, the package.json file uses a version of yarn 1.19.1 or greater.
But for npm we specify a version that doesn’t exist.

This way we make sure that when someone tries to use npm instead of yarn, they will receive an error that outputs ‘please-use-yarn‘.

Once you’ve done the above changes, try to run npm install. You will receive an error that prevents you from using npm.

Source: [article here](https://www.freecodecamp.org/news/how-to-force-use-yarn-or-npm/) and [diskussion here](https://github.com/yarnpkg/yarn/issues/4895)