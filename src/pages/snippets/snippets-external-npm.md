---
layout: '../../layouts/SnippetPost.astro'
title: 'Useful npm packages'
description: 'Usefull npm packages'
pubDate: 'Jan 6 2023'
---

#### Expose localhost to internet

[Localtunnel](https://localtunnel.github.io/www/) is an open-source project. It is necessary for your system to already have Node.js installed in order for you to be able to install it using npm using the following command:

`npm install -g localtunnel`

After that, you will obtain access to the lt command, and you will be able to start your HTTP tunnel using the following command:

`lt --port 400`

Make sure to change the command to correspond with the port on which your web application is operating.

You will get a publicly accessible URL and for the most part, that would be enough for you to set up an integration with a service that supports webhooks.

You will be provided with a URL that is open to the public.

What’s interesting about Localtunnel is that there is also a repository you can clone to [set up your own localtunnel server](https://github.com/localtunnel/server), and hence use your own custom domain. This approach requires you have control of a server where you can set up DNS entries, as well as handle incoming TCP connections for any non-root TCP port.

---

#### Auto Animate

[Auto Animate](https://auto-animate.formkit.com/#usage-react) is a nifty minimal micro animation library for React, Vue , Svelte or Angular. Basically a one line implementation. It's not perfect but for the amount of effort you need to put in it is awsome.

Install for React: `@formkit/auto-animate/react`

```Javascript
import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const App = function () {
  const [items, setItems] = useState([0, 1, 2])
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  const add = () => setItems([...items, items.length])
  return <>
  <ul ref={parent}>
    {items.map(
      item => <li key={item}>{ item }</li>
    )}
  </ul>
  <button onClick={add}>Add number</button>
  <button onClick={() => enableAnimations(false)}>Disable</button>
</>
}

export default App
```

---
