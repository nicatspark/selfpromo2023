---
layout: '../../layouts/SnippetPost.astro'
title: 'Javascript event helper'
description: 'Javascript date'
pubDate: 'Jan 7 2023'
---

Event handling helper, always bind and unbind correctly. The type/listener/options need to be exact the same to be
able to unbind. The listener needs to be the same by reference. An anonymous function will therefor never unbind. This is a pitfall even seasoned devs fall into. This wrapper fixes that.

```js
export default function bind(target, { type: Event, listener, options }) {
  target.addEventlistener(type, listener, options)
  return function unbind() {
    target.removeEventlistener(type, listener, option)
  }
}
```

In a React useEffect it gets very slim having the unbind being returned and therefor preventing memory leaks.

```js
useEffect(() => bind(window, {'click', () => console.log('A click happended')}));
```
