---
layout: '../../layouts/BlogPost.astro'
title: 'Frontend: 3 hits, 3 misses for 2022-23'
description: "3 hits and 3 misses in frontend that is either observations or predictions for 2023. Yes, this is the opinionated and unfiltered retrospective you've been looking for."
pubDate: 'Dec 2 2022'
heroImage: '/assets/blog/thumbsup.png'
---

##### [`TanstackQuery`](https://tanstack.com/query/v4) 👍

aka React Query as it changed its name and announced support for Vue, Svelte and Solid as well. This is not just a great addition in your tool belt but a milestone in modern frontend development if you ask me. No less so since it in an elegant way solves the React 18 ”double render of the useEffect hook”-issue. What it does? It manages all the caching strategies you need and if you ever tried to implement a caching strategy yourself you know what it saves you from. It also lead to less bloat in your state since you no longer need to store the fetched data in the global state. All asynchronous data fetching tasks should be wrapped in TanstackQuery from now on if you ask me. I just hope there will be support for vanillaJS soon too. (Btw, check out the recently released TanstackRouter)

##### `Fullstack frameworks and the ”Island Architecture”` 👍

I.e. the React centric Next, Remix, the "ship no JS" Astro, the Deno based Fresh and I guess Vues Next equivalent Nuxt as well and so on - All these frameworks gives the frontend developer back the control over the backend/frontend bridge. And by back I mean back as in the old days of server served, multi page applications. Also we get better performance, probably better DX overall and certainly better UX if speed and TTI is an important parameter. And if you still want that "native app"-responsiveness goody only a single page application can bring, just serve that as a one-route-client-render-big-app-island and enjoy the server control you get as a bonus. Halleluja!

##### [`tRPC`](https://trpc.io/) 👍

I may be a bit early on this one but since Typescript practically became ubiquitous in 2022 I predict tRPC has the potential of knocking REST of the throne after more than 20 years. Although tRPC kind of uses REST under the hood. What you get is type safety and great intellisense from the backend. Works best with the fullstack frameworks where you have backend/frontend in the same repo. If GraphQL and REST are done for? No, they are still good options for different team setup. If you don’t have great communication between frontend/backend team then GraphQL is still a good solution and REST can still do its thing if the data shape is mature with Swagger, OpenApi, etc.

## And three paradigms that are in decline for 2023

_Ok, don’t be too mad at me when I take a swing at your favorite framework but here we go…_

##### `React` 👎

(as a single page application) - No I don’t think React will die anytime soon. It is simply almost to big to fail. But it can become less hyped or liked as new fresh frameworks emerge like Solid, Svelte, Qwik, etc. And a lot of that has to do with the Virtual DOM that React has in place to iron out the differences between modern browsers and Internet Explorer mainly. At least that is how I understand it. Since IE is officially dead as of June this year I believe many frontend devs feel weight of unnecessary bloat. Doesn’t necessarily mean they will jump ship though. The eco system around React is still unsurpassed. But even there some cornerstones of the React ecosystem are being ported to other frameworks which again lowers the barrier of entry for React devs to actually do the switch.

However if you feel adventurous but don’t want to jump ship completely, try Preact. Preact is a minimal React clone-ish (3kb) with the thinnest possible Virtual DOM abstraction on top of the DOM but with the same JSX support. If you add a 5kb add-on you get most of the bells and whistles (e.g portals) from the full-grown big brother.

##### `Tailwind CSS` 👎

Promising to be scalable (as they do on their landing page) and not delivering must take a toll sooner or later. Despite having React on this list, this might be the most controversial prediction. There’s no denying that Tailwind have had a huge success so far but you could see the trend turning down slightly in last years’ State-of-CSS survey. And since there are many diehard fans out there I challenge you, tell me how you in a fairly complex app do a A-B test for the UX department or reuse a page component with a big number of complex and nested components but with alternate styling. That is the achilles heel of inline styles and the reason it has been considered a bad pattern for over two decades. It doesn't matter that the inline styles is dressed up as classes. Sure this is a use case not everyone ends up in. However most can’t say in advance if they will or not. And once they do it will be to late because it is surprisingly hard to eject Tailwind once it is in your code. That’s when you find yourself staring into the abyss of a technical dead end. I should know because we lost our biggest customer, worth millions, in a project I was part of. The competitor showcased their competing implementation and they had that exact requested feature we had to turn down due to this Tailwind limitation. Not saying it was the only reason but it certainly didn’t look good to me.
Anyway I predict a slow decay where it finally will end up beside Bootstrap as a legacy, inline css technique no one really wants. (Btw check out Open Props, it's kind of like Tailwind done right)

##### `Redux` 👎

Yes, you read it here first. Don’t start a new project using Redux for your state management. It is just big, tedious and bloats your code with boilerplatey DX for no real benefit. And no, Redux Toolkit won’t save you from that. We thank you for your service but now it time to split up. I encourage anyone to try any of the new small state managers out there, like Recoil or even better - Jotai or Zustand. You can even mix since they might have slightly different unique selling points besides the tiny footprint. Jotai has the smallest footprint and some nice extras up it sleeve while Zustand while being manageable follow the flux pattern (as Redux do to) which probably makes many feel at home.
