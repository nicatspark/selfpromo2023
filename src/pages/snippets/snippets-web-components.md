---
layout: '../../layouts/SnippetPost.astro'
title: 'Web components'
description: 'Usefull npm packages'
pubDate: 'Jan 6 2023'
---

[Much from this article](https://medium.com/better-programming/2020-007-the-facets-of-w3c-web-components-e76798ab7b29)

### How to keep separation of concerns in web components.

By calling this on connectedCallback we can load the HTML and CSS from separate files and thus keep our separation of concerns.

```js
async connectedCallback() {
 var htmlFragment = await this.fetchTemplate();
 var styleElement = await this.fetchCSS();
 this.attachShadow({mode: 'open'});
 this.shadowRoot.appendChild(htmlFragment);
 this.shadowRoot.appendChild(styleElement);
  }

  /**
   * To make a web component customizable and distributable
   * add CSS var to the host: part of the CSS that is shared
   * between the component and the parent code.
   */
  /*
  :host {
 --color: white;
 --background-color: black;
 --width: 70vw;
 --height: 50vh;
  }
  #component {
 color: var(--color);
 background-color: var(--background-color);
 width: var(--width);
 height: var(--height);
  }
```

Then in parent code, refer the variables as this:

```js
  my-component {
   --color: midnightblue;
   --background-color: mintcreme;
   --width: 700px;
   --height: 500px;
  }
```

### Distribution Package.json

```js
{
 "name": "my-component",
 "version": "1.0.0",
 "description": "a W3C standard web component",
 "repository": {
   "type": "git",
   "url": "https://github.com/my-github-user-name/my-component.git"
 },
 "files": [
   "my-component.html",
   "my-component.css",
   "my-component.js"
 ]
}
```

### Documentation

The published readme file should have these sections:

- Motivation. A statement of what problem the component solves.
- Features. A description of how the component solves that problem.
- Installation. A link to where to get the component, and where to put it.
- Configuration. A description of how to use each attribute exposed to the consumer.
- Example. A Hello World walk-through showing how to get the component working on an HTML page.
- Customization. A list of all the CSS variables that can be overridden.
- Events. A list of the events emitted or consumed by the component and their place in the lifecycle.

---

## 7 Web Component Tricks

[Original article](https://daverupert.com/2022/04/7-web-component-tricks/)

### 1. You can manipulate props right on a Lit element

This may be something only I would do, but if you make an element with Lit that exposes its properties, you can edit those props externally using querySelector.

`<my-counter counter="3"></my-counter>`

```html
<script>
const myCounter = document.querySelector('my-counter')
myCounter.counter = 10
</scrip>
```

### 2. :host-context let’s you style an element based on its parent

You can use `:host-context()` to style an element based on its parent. Your HTML may look like this:

```html
<my-element></my-element> <div class="card"><my-element></my-element></div>
```

In your CSS inside the Web Component, you have something like this:

```css
:host-context(.card) {
  background: pink;
}
:host-context(.card)::after {
  content: 'I’m in a card';
}
```

[See Example](https://codepen.io/davatron5000/pen/jOYKKPN)

### 3. Declarative ShadowDOM

```html
<my-element>
  <template shadowroot="open">
    <p>I'm a spooky skeleton screen 💀</p>
  </template>
</my-element>
```

Declarative Shadow DOM enables server-side rendering of Web Components, but one thing that’s not clear is your inlined template and the components actual template can be totally different.

[See Example](https://codepen.io/davatron5000/pen/PoEBezm)

### 4. Open WC has a project starter

If you’re looking for a `create-react-app` for Web Components, the folks at Open WC have you covered.

`npm init @open-wc`

You get so much from this (local server, testing configs, a storybook, production rollup config, etc) but my favorite bit is from the sample component’s test file: it runs an [accessibility audit](https://open-wc.org/docs/testing/chai-a11y-axe/) on your Shadow DOM!

```js
it('passes the a11y audit', async () => {
  const el = await fixture(html`<custom-element></custom-element>`)

  await expect(el).shadowDom.to.be.accessible()
})
```

Accessibility out of the box! Nice.

### 5. You can “rebrand” other people’s components

Want to mix and match components from different design systems but keep a consistent naming structure in your company? You can import a component and “rebrand” it or even add functionality.

```js
import { CoolButton } from 'cool-design-system'`

class OurButton extends CoolButton {
 constructor { super() }
}

customElements.define('our-button', OurButton)
```

### 6. The Open WC Publishing Guides are cool

The OpenWC group also has some nice [community guidelines for publishing Web Components](https://open-wc.org/guides/developing-components/publishing/).

- [x] Do publish latest standard EcmaScript
- [x] Do publish standard es modules
- [x] Do include "main": "index.js" and "module": "index.js" in your package.json
- [x] Do export element classes
- [x] Do export side effects separately
- [x] Do import 3rd party node modules with “bare” import specifiers
- [x] Do include file extensions in import specifiers

- ~~Do not optimize~~
- ~~Do not bundle~~
- ~~Do not minify~~
- ~~Do not use .mjs file extensions~~
- ~~Do not import polyfills~~

That’s helpful and hopefully provides a consistent experience, allowing for a consistent bundling story, and preventing weird footguns that might occur when trying to use other people’s Web Components in your project.

### 7. You don’t need build tools until the very, very end

If you want to write Web Components, you can write vanilla web components and use ES Modules to join them together. You can use a web component library like Lit with an import statement pointed at skypack.dev or unpkg.com. It’s super handy to get started with zero tooling.

If you want to install packages off of npm … you could try [Import Maps](https://github.com/WICG/import-maps) … but otherwise you’ll need a local dev server (vite or @web/dev-server) that supports “bare import specifiers”.

It’s only when going to production that you need tooling specific to your site’s needs. TypeScript is optional, bundling is optional, minifying code is optional. From a Web Component perspective, these are all considered “application-level concerns” that happen at deployment time.

[Rollup build script examples](https://open-wc.org/docs/building/rollup/) are out there, but Web Components don’t prescribe how to build your application, they don’t hitch you to an architecture. It could be a whole tree-shaken SPA (single page app), but Web Components also work well in a MPA (multi-page app) architecture. It’s up to you and your application to figure out what fits best.

---

### Get context from within a web component

Sometimes you might want to do things differently depending on were your component lives.

Instead of writing

```ts
this.getRootNode()?.host?
.getRootNode()?.host?
.getRootNode()?.host?
.getRootNode()?.host?
.getRootNode()?.host?
.tagName.toLowerCase()
```

Use this...

```ts
getAncestorHost(this, 5)

function getAncestorHost(component: Element, level: number = 1) {
  let host = component
  let current = level

  while (current-- > 0) {
    const h = (host.getRootNode() as ShadowRoot | undefined)?.host

    if (h === undefined) {
      console.warn(`Could not find host (level ${current + 1}/${level})`)
      return host
    }

    host = h
  }

  return host.tagName.toLowerCase()
}
```

Most of the time you would prefer to just add `<my-component data-context="${getAncestorHost(this," 2)}></my-component>`

which then lets you style it like

```css
:host([data-context='whatever-the-context-is']) {
  /* styles */
}
```

_idea from [here](https://benfrain.com/getting-the-context-of-web-components-lit/)_
