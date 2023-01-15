---
layout: '../../layouts/SnippetPost.astro'
title: 'HydroActive - functional and SSR ready Web Components'
description: ''
heroImage: '/assets/blog/hydroactive.webp'
pubDate: 'Jan 13 2023'
draft: 'true'
---

I stumbled upon this functional library to create web components.

```html
<my-counter>
  <template shadowroot="open">
    <div>The current count is <span>5</span>.</div>
    <button>Increment</button>
  </template>
</my-counter>
```

```javascript
import { component } from 'hydroactive'

// `component()` creates a web component based on the given hydrate function. The
// callback is invoked on hydration and provides a `$` variable with additional
// functionality to provide interactivity to the pre-rendered component.
const MyCounter = component(($) => {
  // `$.live()` automatically hydrates this property by doing
  // `this.shadowRoot!.querySelector('span')!.textContent!` and parsing the result as a
  // `Number`. Returns a `Signal` to provide reactive reads and writes.
  // Whenever `setCount` is called, the `<span />` tag is automatically updated.
  const [count, setCount] = $.live('span', Number)

  // Ergonomic wrapper to read an element from the shadow DOM and assert it exists.
  // Also types the result based on the query, this has type `HTMLButtonElement`.
  const incrementBtn = $.query('button')

  // Ergonomic wrapper to bind event listeners. Automatically removes and re-adds the
  // listener when the element is disconnected from / reconnected to the DOM.
  $.listen(incrementBtn, 'click', () => {
    // `setCount()` automatically updates the underlying DOM with the new value.
    setCount(count() + 1)
  })
})

customElements.define('my-counter', MyCounter);

declare global {
    interface HTMLElementTagNameMap {
        'my-counter': InstanceType<typeof MyCounter>;
    }
}
```

[Hydroactive explained - YouTube](https://youtu.be/zL0TzFY6aj0)
[GitHub](https://github.com/dgp1130/HydroActive/)
[Npm](https://www.npmjs.com/package/hydroactive)
[Declarative shadow dom polyfill](https://web.dev/declarative-shadow-dom/#polyfill)
[More examples](https://github.com/dgp1130/HydroActive/blob/main/src/examples)
