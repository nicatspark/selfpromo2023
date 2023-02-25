---
layout: '../../layouts/SnippetPost.astro'
title: 'Trickeries with CSS'
description: 'Tricky CSS or CSS that trick you up'
pubDate: 'Jan 7 2023'
---

##### CSS only tooltip

```html
<a data-tool-tip="My little tooltip.">A random link</a>
```

```css
a {
  position: relative;
  &[data-tool-tip] {
    &::after {
      content: attr(data-tool-tip);
      display: block;
      position: absolute;
      background-color: #ccc;
      border-radius: 5px;
      padding: 1em 3em;
      color: white;
      font-size: 0.8em;
      bottom: 0;
      left: 0;
      white-space: nowrap;
      transform: scale(0);
      transition: transform ease-out 150ms, bottom ease-out 150ms;
    }
    &:hover::after {
      bottom: 100%;
      transform: scale(1);
    }
  }
}
```

##### Clever multicolumn responsive layout with flex

```css
.split {
  display: flex;
  flex-direction: column;
}
@media (min-width: 40em) {
  .split {
    flex-direction: row;
  }
  .split > * {
    flex-basis: 100%; /* makes them even */
  }
  .split > * + * {
    margin-left: 2em; /* clever gutter */
  }
}
```

##### Different easings in css

```css
:root {
  --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  --ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  --ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);

  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);

  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
  --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
  --ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
```

##### Bounce back

```css
transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
```

##### Dynamic and clamped font size

```css
calc(2px + ((5 * (100vw - 800px))/799))
calc(14px + 8 * ((100vw - 500px)/1500))
```

##### Set multiple styles at once via javascript

```javascript
function setStylesOnElement(element, stylesObj) {
  // this wont work -> element.style = {...element.style, ...stylesObj};
  Object.assign(element.style, stylesObj)
}
```

##### Check for user color theme preference

```css
@media (prefers-color-scheme: dark) {
  // your code for dark mode here
}
```

##### Text tooltips

```html
<button type="button" class="tooltip" data-tip="This css tooltip">
  I have a Tooltip
</button>
<style>
  /* only add tooltip when there is a message */
  .tooltip[data-tip]:not([data-tip=''])::before {
    content: attr(data-tip);
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 15px 10px;
    border-radius: 3px;
    max-width: 300px;
    width: 250%;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: calc(100% + 12px);
  }
  /* The direction arrow */
  .tooltip[data-tip]:not([data-tip=''])::after {
    content: '';
    border-width: 6px;
    border-style: solid;
    border-color: transparent;
    border-top-color: rgba(0, 0, 0, 0.8);
    width: 0;
    height: 0;
    display: inline-block;
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translate(-50%, 0);
  }
</style>
```

##### Custom text underline

```css
/* Alt 1 */
.shadow-underline {
  display: inline;
  box-shadow: inset 0 -0.23em white, inset 0 -0.25em green, inset 0 -0.3em white,
    inset 0 -0.4em red;
  text-shadow: 0.04em 0 white, -0.04em 0 white;
}

/* Alt 2 */
.custom-underline {
  display: inline;
  background: linear-gradient(90deg, black 50%, white 0) 0 78%/4px 2px repeat-x,
    linear-gradient(90deg, white 50%, black 0) 0 82%/4px 2px repeat-x;
  text-shadow: 0.04em 0 white, -0.04em 0 white;
}
```

##### No HTML for wrapper needed

A better and less HTML intrusive solution would use CSS
padding alone. The formula is something like this:
100vw — min(max-width, (100vw — (left-gap + right-gap))) / 2.

```css
main {
  background: #3f51b5;
  padding: 15px calc((100vw - min(900px, calc(100vw - 50px))) / 2);
  color: #fff;
}
```

##### Extend the clickable area

```css
button {
  border: none;
  background: #222;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  padding: 0;
  position: relative;
  cursor: pointer;
}
button::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 200%;
  display: inline-block;
  /* for demo purpose only - should be removed   */
  background: rgba(0, 0, 0, 0.2);
}
```

##### Responsive text

```css
font-size: calc(
  [minimum size] + ([maximum size] - [minimum size]) * ((
          100vw - [minimum viewport width]
        ) / ([maximum viewport width] - [minimum viewport width]))
);
// or there is decent support for clamping
font-size: clamp(min, viewport-width-unit, max);
```

##### Image grid with random height (aka maisonary layout grid)

```html
<div class="container">
  <div class="item"> </div>
  <div class="item"> </div>
  <div class="item"> </div>
  <div class="item"> </div>
  <div class="item"> </div>
</div>
<style>
  .container {
    width: 600px;
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;

    -webkit-column-gap: 15px;
    -moz-column-gap: 15px;
    column-gap: 15px;
  }
  .item {
    display: block;
    /* match gap size */
    margin-bottom: 15px;
  }
</style>
```

##### Truncate with Ellipsis (single line)

```css
p {
  /*  use max-width so the ellipsis
  only shows when reached that size     */

  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
```

##### Truncate with an ellipsis (multiple lines)

```css
p {
  /* old display option */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* max number of lines to show */
  -webkit-line-clamp: 3;
  /* needed for it to work */
  overflow: hidden;
}
```

##### Vertical alignment an inline, inline-block, or table-cell box

```css
img {
  /* only for block tags */
  display: inline-block;
  vertical-align: middle;
}
```

##### Aspect ratio

Create a 16 by 9 rectangle of 200px wide.

```css
.container {
  width: 200px;
}
.box {
  padding-top: calc((9 / 16) * 100%);
  background: #eee;
}
/* You can also use the after pseudo-element to create the ratio size */
.container {
  width: 200px;
}
.box::after {
  content: '';
  display: block;
  padding-top: calc((9 / 16) * 100%);
  background: #eee;
}
/* In modern css */
.box {
  aspect-ratio: 16 / 9;
}
```

##### Text around an image

```css
img {
  float: right;
  shape-outside: url(some-url-to-your-image);
}
```

##### is, matches, any and :where

```css
/* turn */
section h1,
article h1,
aside h1,
nav h1 {
  font-size: 25px;
}
/* into */
:is(section, article, aside, nav) h1 {
  font-size: 25px;
}
```

The `:where` works similarly but the specificity is always zero
where the `:is` specificity is of the overall selector.

##### CSS Pie Timer

Here is my [codepen example](https://codepen.io/nicolashervy/pen/KKyMXVg)  
Note: Won't work in firefox just yet.

```css
@property --a {
  syntax: '<angle>';
  inherits: false;
  initial-value: 10deg;
}

.pie {
  --a: 10deg; /*  needed for firefox to have a valid output */
  background-image: conic-gradient(#fff var(--a), #000 0% 100%);
  border-radius: 50%;
  transition: --a 3s linear;
  &:hover {
    --a: 360deg;
  }
}
```

##### Tada animation

```css
.email {
  animation: tada 0.5s 2s;
}
@keyframes Tada {
  from: {
    transform: scale3d(1,1,1);
  }
  10,20 {
    transform: scale3d(0.9,0.9,0.9)
    rotate3d: (0,0,1,-3d);
  }
  30,50,70 {
    transform: scale3d(1.1,1.1,1.1)
    rotate3d(0,0,1,3deg)
  }
  40,60,80 {
    transform: scale3d(1.1,1.1,1.1)
    rotate3d(0,0,1,-3deg)
  }
  to {
    transform: scale3d(1,1,1);
  }
}
```

```css
.counter-notification {
  opacity: 0;
  animation: pop 0.1s 2.5s cubic-bezier(0.71, -0.52, 0.7, 1.72) forwards;
}

@keyframes pop {
  from: {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opactiy: 1;
  }
}
```

[source](https://www.youtube.com/shorts/8wNAhCTyH9A)
