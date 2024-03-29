---
layout: '../../layouts/SnippetPost.astro'
title: 'Javascript interacting with the DOM'
description: 'Javascript date'
pubDate: 'Jan 7 2023'
---

##### Bottom visible

This snippet checks whether the bottom of a page is visible.

```js
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight)

bottomVisible() // true
```

##### Element contains

This snippet checks whether the parent element contains the child.

```js
const elementContains = (parent, child) =>
  parent !== child && parent.contains(child)

elementContains(document.querySelector('head'), document.querySelector('title')) // true
elementContains(document.querySelector('body'), document.querySelector('body')) // false
```

##### Get style

This snippet can be used to get the value of a CSS rule for a particular element.

```js
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName]

getStyle(document.querySelector('p'), 'font-size') // '16px'
```

##### Hide

This snippet can be used to hide all elements specified.

```js
const hide = (...el) => [...el].forEach((e) => (e.style.display = 'none'))

hide(document.querySelectorAll('img')) // Hides all <img> elements on the page
```

##### Insert after

This snippet can be used to insert an HTML string after the end of a particular element.

```js
const insertAfter = (el, htmlString) =>
  el.insertAdjacentHTML('afterend', htmlString)

insertAfter(document.getElementById('myId'), '<p>after</p>') // <div id="myId">...</div> <p>after</p>
```

##### Insert before

This snippet can be used to insert an HTML string before a particular element.

```js
const insertBefore = (el, htmlString) =>
  el.insertAdjacentHTML('beforebegin', htmlString)

insertBefore(document.getElementById('myId'), '<p>before</p>') // <p>before</p> <div id="myId">...</div>
```

##### Is browser tab focused

This snippet can be used to determine whether the browser tab is focused.

```js
const isBrowserTabFocused = () => !document.hidden

isBrowserTabFocused() // true
```

##### Node list to array

This snippet can be used to convert a nodeList to an array.

```js
const nodeListToArray = (nodeList) => [...nodeList]

nodeListToArray(document.childNodes) // [ <!DOCTYPE html>, html ]
```

##### scroll to top

This snippet can be used to do a smooth scroll to the top of the current page.

```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}

scrollToTop()
```

##### Serialize cookie

This snippet can be used to serialize a cookie name-value pair into a Set-Cookie header string.

```js
const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`

serializeCookie('foo', 'bar') // 'foo=bar'
```

##### Set style

This snippet can be used to set the value of a CSS rule for a particular element.

```js
const setStyle = (el, ruleName, val) => (el.style[ruleName] = val)

setStyle(document.querySelector('p'), 'font-size', '20px')
// The first <p> element on the page will have a font-size of 20px
```

##### Show

This snippet can be used to show all the elements specified.

```js
const show = (...el) => [...el].forEach((e) => (e.style.display = ''))

show(...document.querySelectorAll('img')) // Shows all <img> elements on the page
```

##### Smooth scroll

This snippet can be used to smoothly scroll the element on which it is called into the visible area of the browser window.

```js
const smoothScroll = (element) =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth',
  })

smoothScroll('#fooBar') // scrolls smoothly to the element with the id fooBar
smoothScroll('.fooBar') // scrolls smoothly to the first element with a class of fooBar
```

##### Start a css transition with js fairly synchronosly

But watchout, the new [web animation api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) put this snippet in the legacy bin. Read my [intro article](http://localhost:3000/blog/we-animation-API).

```js
function setTransitionStylesOnElement(element, startStyles, endStyles) {
  return new Promise((resolve) => {
    Object.assign(element.style, startStyles)
    setTimeout(() => Object.assign(element.style, endStyles), 100)
    element.addEventListener('transitionend', postAnimation)
    function postAnimation() {
      element.removeEventListener('transitionend', postAnimation)
      marketsOverlay.removeAttribute('style')
      resolve(element)
    }
  })
}
// Useage.
const hiddenStyles = { opacity: 0, transition: 'all 0.5s' }
const visibleStyles = { opacity: 1, transition: 'all 0.5s' }

setStylesOnElement(overlayElement, visibleStyles, hiddenStyles).then((el) =>
  el.setAttribute('hidden')
)
```

##### Lazy-loading stylesheet on scroll

```js
const loadStyle = (src) => {
  if (document.createStylesheet) {
    document.createStylesheet(src)
  } else {
    const stylesheet = document.createElement('link')
    stylesheet.href = src
    stylesheet.type = 'text/css'
    stylesheet.rel = 'stylesheet'
    document.getElementsByTagName('head')[0].appendChild(stylesheet)
  }
}
let scrollFlag = false
window.onscroll = () => {
  if (!scrollFlag) {
    console.log('Started Scrolling!')
    setTimeout(() => {
      loadStyle('./style2.css')
    }, 1000)
    scrollFlag = true
  }
}
```

##### Mutation observer example

```js
// Select the node that will be observed for mutations
const targetNode = document.getElementById('some-id')

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true }

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.')
    } else if (mutation.type === 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.')
    }
  }
}

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback)

// Start observing the target node for configured mutations
observer.observe(targetNode, config)

// Later, you can stop observing
observer.disconnect()
```

or

```html
<div id="test">test</div>
<button onclick="handleClick()">OK</button>

<script>
  const el = document.getElementById('test')
  let n = 1
  const observe = new MutationObserver((mutations) => {
    console.log('attribute is changede', mutations)
  })
  observe.observe(el, {
    attributes: true,
  })
  function handleClick() {
    el.setAttribute('style', 'color: red')
    el.setAttribute('data-name', n++)
  }
  setTimeout(() => {
    observe.disconnect() // stop watch
  }, 5000)
</script>
```

##### Intersection observer example

```html
<style>
  .item {
    height: 350px;
  }
</style>

<div class="container">
  <div class="item" data-id="1">Invisible</div>
  <div class="item" data-id="2">Invisible</div>
  <div class="item" data-id="3">Invisible</div>
</div>
<script>
  if (window?.IntersectionObserver) {
    let items = [...document.getElementsByClassName('item')] // parses as a true array, also available Array.prototype.slice.call()
    let io = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          item.target.innerHTML =
            item.intersectionRatio === 1 // The display ratio of the element, when it is 1, it is completely visible, and when it is 0, it is completely invisible
              ? `Element is fully visible`
              : `Element is partially invisible`
        })
      },
      {
        root: null,
        rootMargin: '0px 0px',
        threshold: 1, // The threshold is set to 1, and the callback function is triggered only when the ratio reaches 1
      }
    )
    items.forEach((item) => io.observe(item))
  }
</script>
```

##### Preview images before upload

```html
<input type="file" name="" id="" />
<img src="" alt="" />
<script>
  const getObjectURL = (file) => window.URL.createObjectURL(file)

  document.querySelector('input').addEventListener('change', (event) => {
    document.querySelector('img').src = getObjectURL(event.target.files[0])
  })
</script>
```
