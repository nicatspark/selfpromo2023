---
layout: '../../layouts/BlogPost.astro'
title: 'CSS module scripts'
description: ''
pubDate: 'Jan 12 2023'
heroImage: '/assets/blog/css-explosion.webp'
draft: false
---

CSS module scripts is about loading stylesheets into a JS file much like Javascript imports and being able to treat the style sheet like a variable. The style sheet can then be applied to document or shadow root in the same manner as constructable stylesheets.
The benefits is convenience and performance relative to other ways of importing and applying CSS.

##### Browser support

The [proposed HTML spec](https://html.spec.whatwg.org/multipage/webappapis.html#creating-a-css-module-script).
At the time of writing there is a [bug in Mozilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1720570) (Firefox) and a bug in [Webkit](https://bugs.webkit.org/show_bug.cgi?id=227967) (Safari).

##### Using CSS module scripts

```javascript
import sheet from './styles.css' assert { type: 'css' }
document.adoptedStyleSheets = [sheet]
shadowRoot.adoptedStyleSheets = [sheet]
```

The default export of a CSS module script is a [constructable stylesheet](https://web.dev/constructable-stylesheets/) whose contents are those of the imported file. Like any other [constructable stylesheet](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets), it is applied to documents or shadow roots using adoptedStyleSheets.

Unlike other ways of applying CSS from JavaScript, there is no need to create `<style>` elements or mess with JavaScript strings of CSS text.

CSS modules also have some of the same benefits as JavaScript modules.

- Deduplication: if the same CSS file is imported from multiple places in an application, it will still only be fetched, instantiated, and parsed a single time.
- Consistent order of evaluation: when the importing JavaScript is running, it can rely on the stylesheet it imports having already been fetched and parsed.
- Security: modules are fetched with CORS and use strict MIME-type checking.

##### Import Assertions (what's with the 'assert'?)

The `assert { type: 'css' }` part of the import statement is an [import assertion](https://v8.dev/features/import-assertions). This is required; without it, the import is treated as a normal JavaScript module import, and will fail if the imported file has a non-JavaScript MIME type.

```javascript
import sheet from './styles.css' // Failed to load module script:
// Expected a JavaScript module
// script but the server responded
// with a MIME type of "text/css".
```

##### Dynamically imported stylesheets

You can also import a CSS module using dynamic import, with a new second parameter for the type: 'css' import assertion:

```javascript
const cssModule = await import('./style.css', {
  assert: { type: 'css' },
})
document.adoptedStyleSheets = [cssModule.default]
```

> ☝️ Gotchas
> Note that it's `cssModule.default` (not cssModule itself) that is added to adoptedStyleSheets. This is because the object returned from dynamic import() is a module namespace object. The CSSStyleSheet is the default export of the module, so it's accessed at `cssModule.default`.

##### @import rules not yet allowed

Currently CSS `@import` rules don't work in constructable stylesheets, including CSS module scripts. If `@import` rules are present in a constructable stylesheet, those rules will be ignored.

Support for @import in CSS module scripts may be added to the specification. Track this specification discussion in [the GitHub issue](https://github.com/WICG/webcomponents/issues/870).

---

_[Source of this article](https://web.dev/css-module-scripts/)_
