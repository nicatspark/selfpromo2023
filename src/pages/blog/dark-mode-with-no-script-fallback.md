---
layout: '../../layouts/BlogPost.astro'
title: 'Dark mode with no script fallback'
description: ''
pubDate: 'Mar 4 2023'
heroImage: '/assets/blog/dark-mode.webp'
---

Seen many examples on dark/light mode that fully relies on javascript to be enabled. So had to do something about it.

This code has both a `light-mode` class and a `dark-mode` class that is set in the `<html>` tag. So there is no way implemented to unset it back to taking system default once set. For that reason you might think twice before store a selection in `localStorage`, only in `sessionStorage` to give the user the choise every time the user comes to your site.

#### HTML

```html
<div class="test">Test of dark mode with js toggle and no-script fallback</div>
<button onclick="toggleMode()">Toggle mode</button>
```

#### CSS (SCSS)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #666;
    --box-bg-color: #333;
    --text-color: #ccc;
  }
}
@media (prefers-color-scheme: light) {
  :root {
    --bg-color: #fff;
    --box-bg-color: #666;
    --text-color: #ccc;
  }
}
:root {
  &.light-mode {
    --bg-color: #fff;
    --box-bg-color: #eee;
    --text-color: #333;
  }
  &.dark-mode {
    --bg-color: #666;
    --box-bg-color: #333;
    --text-color: #ccc;
  }
}

body {
  background-color: var(--bg-color);
}

.test {
  background-color: var(--box-bg-color);
  color: var(--text-color);
  padding: 2rem;
}
```

#### Typescript

```typescript
type Modes = 'light-mode' | 'dark-mode'

function toggleMode() {
  /* use sessionStorage for persistance in a MPA app. */
  const rootEl = document.documentElement
  if (!rootEl) return
  const isSystemDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  rootEl.classList.contains('dark-mode') ||
  (!rootEl.classList.contains('light-mode') && isSystemDarkMode)
    ? switchClass('dark-mode', 'light-mode')
    : switchClass('light-mode', 'dark-mode')

  function switchClass(remove: Mode, add: Mode) {
    rootEl.classList.remove(remove)
    rootEl.classList.add(add)
    rootEl.style.colorScheme = add.split('-')[0]
  }
}
```

Check out [my code at CodePen.io](https://codepen.io/nicolashervy/pen/wvEdXOJ)

#### Favicon bonus tip!

Make your favicon as a SVG file and you can have it adapt to dark/light mode with one media query css.

```html
<svg
  enable-background="new 0 0 122.88 122.88"
  viewBox="0 0 122.88 122.88"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m61.44 0c8.32 ...truncated endless numbers for your convenience... 23.81 10.92 33.03z"
  />
  <style>
    @media (prefers-color-scheme: dark) {
      :root {
        filter: invert(100%);
      }
    }
  </style>
</svg>
```
