---
layout: '../../layouts/BlogPost.astro'
title: 'The underused Web Animation API'
description: ''
heroImage: '/assets/blog/webanimationapi.webp'
pubDate: 'Jan 13 2023'
---

Today I'll tell about an API even seasoned developer have missed. I know this not only from empirical studies because today I saw the statistics in freshly released [State Of Javascript](https://2022.stateofjs.com/en-US/features/browser-apis/web_animations) and the API had kind of low numbers.

Animations can be a useful tool to enhance the user experience on the web. Aside from providing an appealing visual experience, animations can aid in the user's understanding of elements appearing, moving and disappearing from a page.

Currently, there are two animation techniques that are commonly used on the web: CSS transitions/animations and animating through JavaScript by modifying inline styles.

Both of these offer JavaScript events like `animationend` which allow you to react to an animation that finished, though it can still be hard to synchronize animations with application state due to the way animations have to be started. They are a powerful, declarative and performant way to do animations on individual elements.

The [Web Animations API] is a relatively new addition to the browser and is still very much in development. It promises to combine the benefits of CSS Transitions/Animations and JavaScript based animations.

##### Benefits of the Web Animation API

- Timing, no need to sync with onAnimationEnd event.
- Separation of concerns, no longer mix the animation logic with CSS styling.
- Huge improvment in control, you can run the animation back and forward programatically.

Check it out!

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
[Browser support is good](https://caniuse.com/web-animation) 👍
