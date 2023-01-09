---
layout: '../../layouts/BlogPost.astro'
title: 'The new view-transitions api'
description: ''
pubDate: 'Jan 9 2023'
---

The view-transitions API lets you create animations declaratively between pages. Something that will further take our web apps closer to the look and fell of well designed native application on your phone.

If you know me I am a succer for all things native because this means I wont have to rebuild or relearn as things evolve. So this is great news.

Now the view-transitions api is in beta stage and expected to soon be available in browsers. It is currently available behind a flag in chrome.

##### 1. Enable view-transition api in chrome

To play around with it before it is available you need to [enable the viewTransitions API and the viewTransitions API for navigations](chrome://flags)

##### 2. Add meta to head

Then add `<meta name="view-transition" content="same-origin">` to your head section on booth pages you want to add a transition between.

##### 3. Tag the el you want to transtition between

Tag the el (in CSS) you want to transtition between on booth pages like so.

Page1.html:

```html
<a href="page2.html">
  <img
    style="view-transition-name: myImage; contain: layout"
    width="200"
    src="cat.jpg"
  />
</a>
```

Page2.html:

```html
<a href="page1.html">
  <img
    style="view-transition-name: myImage; contain: layout"
    width="800"
    src="cat.jpg"
  />
</a>
```

Simple and straight forward, right?

##### Customize transition

Now you can also tweak transitions times from the default for example by adding following to the page css.

```css
::view-transition-group(myImage) {
  animation-duration: 4s;
}
```

Check out [can i use](https://caniuse.com/?search=view-transition) before implementing.
