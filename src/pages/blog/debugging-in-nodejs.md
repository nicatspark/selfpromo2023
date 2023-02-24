---
layout: '../../layouts/BlogPost.astro'
title: 'Debugging nodejs like frontend'
description: ''
pubDate: 'Jan 18 2023'
#heroImage: '/placeholder-hero.jpg'
---

In node `node server.js --inspect-brk`

With yarn `yarn test --inspect-brk`

or npm `npm start -- --inspect-brk`

Now, open up any Edge or Chrome dev tools window and click the little green Node.js logo button next to the responsivity button.

####### Debugging Exceptions

If you want to debug a thrown exception, go to the Sources tab and click the octagonal button with a pause symbol. This causes Chrome DevTools to stop on any uncaught thrown exceptions.

###### --inspect versus --inspect-brk

What's the difference between --inspect and --inspect-brk?

`-inspect-brk` pauses execution immediately when node starts while `-inspect` pauses execution if it hits a debugger statement and there is an attached debugger.

I usually prefer `-inspect-brk` because it gives me time to attach the debugger whereas when only using `-inspect`, the execution could finish before I have a chance to attach Chrome DevTools!

[blog post](https://www.builder.io/blog/debug-nodejs)
[youtube](https://www.youtube.com/shorts/bYydFXrTJ98)
