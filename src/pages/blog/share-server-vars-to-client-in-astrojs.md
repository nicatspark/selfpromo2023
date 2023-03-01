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

##### Updated: Alternatively load the full script externaly

The previous code here seems to have been deprecated. But this is much smaller if it works as suggested:

```html
<script>
  import 'lightbox2/dist/js/lightbox.min.js'
</script>
```
