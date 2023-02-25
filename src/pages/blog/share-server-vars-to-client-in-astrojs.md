---
layout: '../../layouts/BlogPost.astro'
title: 'Astrojs: share server vars to client'
description: ''
pubDate: 'Feb 26 2023'
heroImage: '/assets/blog/server-to-client.webp'
---

In your astro file.

```javascript
---
const foregroundColor = "rgb(221 243 228)"; // CSS variable shared
const backgroundColor = "rgb(24 121 78)"; // CSS variable shared
const message = "Astro is awesome!"; // Javascript variable shared
---
```

```html
/* +++++ CSS variables to share as below +++++ */

<style define:vars={{ textColor: foregroundColor, backgroundColor }}>
  h1 {
    background-color: var(--backgroundColor);
    color: var(--textColor);
  }
</style>


/* ++++ Javascript variables to share as below ++++ */

<script define:vars={{ message }}>
  alert(message);
</script>
```

There is also a concept of [sharing states](https://docs.astro.build/en/core-concepts/sharing-state/) using [nanostore](https://github.com/nanostores/nanostores#guide) stated in documentation . It allows sharing states between components at framework level on client-side. Not between client and server.

Theoretically sharing states from server to client can be done using hydration technique by combining `define:vars` and [nanostore](https://github.com/nanostores/nanostores#guide) library map api during the onLoad event may be 🧪.

##### Alternatively load the full script externaly

It's not that obvious how to use imports in astro files client side.

```html
<!-- Test.astro -->
<canvas class="webgl"></canvas>

<script type="module">
  import * as THREE from 'three'

  console.log(THREE) //undefined :(
</script>
```

This returns `Uncaught TypeError: Failed to resolve module specifier "three".`
`Relative references must start with either "/", "./", or "../".` in the console.

Astro doesn't let you import npm modules in inline script tags within .astro unfortunatley. However we can import in an external `.js`/`.ts` file, then make use of `Astro.resolve` like so:

```html
<!-- Test.astro -->
<canvas class="webgl"></canvas>

<script src={Astro.resolve('./myScript.js')} type="module"/>
```

`type="module"` guarantees your script will load client side.

Inside `myScript.js` we can import things as expected.

```javascript
// myScript.js
import * as THREE from 'three'

console.log(THREE) // Three.js module!
```
