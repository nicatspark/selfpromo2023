---
layout: '../../layouts/BlogPost.astro'
title: 'Usefull links'
description: 'Micro frontends links'
pubDate: 'Jan 6 2023'
---

#### Micro frontends

_2019-06-18 01:363_ [https://martinfowler.com/articles/micro-frontends.html](https://martinfowler.com/articles/micro-frontends.html) TL;DR In short, micro frontends are all about slicing up big and scary things into smaller, more manageable pieces.

_2019-07-11 07:56_ It is not an ideal state to have many front-end frameworks within the company but it is a way to transition to a more homogenic front-end situation. [Medium article](https://link.medium.com/qF4AICBdeY)

_2019-11-30 15:37_ THIS is a very interesting way of including different frameworks into each other. At 13:50 [https://youtu.be/o1Sr39DVdOQ] extra interesting in conjunction with the open-wc project.
_2019-12-05 16:59_ Embedding a react SPA in a Web Component <https://medium.com/@gilfink/wrapping-react-components-inside-custom-elements-97431d1155bd> to be used in another framework.

In depth about micro frontends architechture <https://lucamezzalira.com/>

_2020-05-23 09:41_ Whenever we need to take our micro frontend situation to the next level. <https://link.medium.com/4JOfwA7tI6>

_2020-07-01 22:50_ Micro frontends in retrospect [Medium article](https://link.medium.com/tUh7ieT7L7)

#### Redux

_2019-06-20 11:33_ As mentioned in a private conversation, a new way of connecting react components to redux that is less verbose. Right now in react-redux release candidate. [https://youtu.be/3zoIigieur0](https://youtu.be/3zoIigieur0) This looks promising.

_2019-07-10 01:41_ And BOOM! Version 7.1 of React-Redux is officially released. (7.1 uses React hooks to connect to Redux store that I in previous examples got from a alpha release candidate.) More info and a timeline travel through some previous versions here <https://youtu.be/zNs-phgKx3Q> by a Redux dev person.

_2019-08-29 23:14_ Removing boilerplate code around Redux can’t be bad. <https://link.medium.com/JQIZvN6ByZ>

_2019-08-30 09:30_ Getting started with Redux-Saga [Medium article](https://medium.com/@lavitr01051977/make-your-first-call-to-api-using-redux-saga-15aa995df5b6)

_2019-08-30 09:31_ React Router with Redux [Medium article](https://medium.com/@lavitr01051977/react-router-redux-app-with-call-to-api-70a324c34ecb)
_2019-10-31 08:52_ Above is yesterdays news. Today this is how to do it. <https://www.youtube.com/watch?v=CZeulkp1ClA> with React Router v5.

_2019-11-03 22:09_ This is a comendable project [redux-starter-kit](https://redux-starter-kit.js.org) that I wont use for two reasons. 1 - IMO it does create a lot of stuff for you that you will not understand unless you go through the pain of both discover the need for or get to know because you've done all the wiring by yourself. 2 - It is opinionated and not necessarily the way I prefer to set it up. However I will look into it some more because it also has some off the shelf utility functions I have not seen before.

_2019-11-03 22:18_ This "getting started with Redux" has one of the best instructions I think on how to wire up Redux Saga and get started. Unfortunately the rest is class based React and thus a bit out of fashion but if one only focus on the non-react parts it has some golden nuggets apart from Sagas aswell. <https://www.valentinog.com/blog/redux/>
_Note to self: The way action creators/action types are set up is the same as in SCadmin and this will come in handy in the upcomming React project._

_2019-11-27 11:03_ [Mixing redux with typescript] A bit outdated (from january 2019) but does have the redux part nicely layed out with typescript. <https://medium.com/@ksholla20/react-redux-with-typescript-ad7266896a9b>

_2019-11-28 09:24_ Usefull Redux Thunks tips and tricks. <https://youtu.be/xihoZZU0gao>

_2020-07-13 09:33_ [Is Recoil the new shiny thing that replaces Redux?](https://link.medium.com/ywMsgHQ747)

#### Configurator

_2019-07-09 15:40_ [Article about building a configurator](https://link.medium.com/SdBxX0zrbY).

#### Styled Components

_2019-08-22 15:24_ If Styled Components is a keeper then <https://github.com/styled-components/babel-plugin-styled-components> is a thing to add to my React boilerplate for larger apps. Easier debugging of Styled Components.

#### Docker

_019-08-29 23:12_ This is above my head but never the less interesting... [Youtube](https://youtu.be/Td7w0_nD5_4)

#### Optimizations

_2019-09-14 20:58_ [Optimization by planing when to load scripts](https://www.youtube.com/watch?v=eDd6Y6Z50Mg)

_2019-10-15 10:00_ [Error Logging Frontend js errors back to server](https://medium.com/@devspotlight/best-practices-for-client-side-logging-and-error-handling-in-react-log-analysis-log-monitoring-531fea4a5fae)

_2019-10-26 09:16_ [An article about doing a controlled startup of a web app the same as we aspire to do. Need to evaluate it](https://medium.com/javascript-in-plain-english/how-to-handle-and-design-the-startup-of-a-react-application-da779f3727e5)

_2019-10-31 09:36_ Remember the differences android and ios measures window height in respect to the keyboard was a headache when I was doing the mobile version of the current configurator. [Now it seems there is a native solution](https://twitter.com/jesper_vos/status/1179673256925814785?s=09).
(I had to store the viewport height upon onload as an attribute or css style on mobile and lock it to that)

_2019-11-30 02:23_ [Faster JSON!](https://www.youtube.com/watch?v=1gEoOuixsYs)

_2019-11-30 09:07_ [App startup orchestration](https://medium.com/javascript-in-plain-english/how-to-handle-and-design-the-startup-of-a-react-application-da779f3727e5)

#### CSS Libraries

_2019-10-07 15:49_ Semantic-UI: A jQuery free alternative to Bootstrap. With a React specific fork https://react.semantic-ui.com/

#### UX

_2019-10-19 10:11_ Talking about microcopy would be a useful thing to involve Scania in. Talking points: when to use Scania corporate tone and when to use a more casual and emphatic voice, users emotional journey, how this works with translations. <https://medium.com/swlh/my-6-point-microcopy-checklist-for-non-ux-writers-634eb52b29c9>

_2019-10-23 08:53_ Microanimations/transitions might be more programmatically readable with this libraries than plain css. <https://reactcommunity.org/react-transition-group/>

_2019-10-31 13:18_ All web apps made to mimic native apps should lock screen orientation down and just use it as a feature when it has something extra to offer. <https://code-boxx.com/lock-screen-orientation/>

_2020-01-13 21:58_ Finally a css solution to :hover on touch screens <https://link.medium.com/QPKG4ORYd3>

#### React

_2019-10-19 00:26_ **Capturing gestures** won’t happen by itself. We need a library. This is a pretty lowlevel library. Will probably need to look further. <https://dev.to/bmcmahen/building-react-components-with-gesture-support-3nn8>

_2019-10-07 15:15_ Cute **micro-animation library** <https://react.useanimations.com/>

_2019-11-01 14:54_ **Sharing React components** seems to be perhaps even more user frendly than reusing Polymer components using https://bit.dev/

_2019-11-03 23:02_ **Axios** has been the goto alternative to the native javascript fetch. Now comes this little library and it looks really sexy out of the box <https://swr.now.sh/>

_2019-10-06 08:07_ This will come in handy. **useBreakpoint hook** - media query breakpoints in react. <https://link.medium.com/PyNjAQDDy0>
The spinn-off js-in-css library to Styled Components called Polished.js also handles breakpoints. Polished.js works well in combo with Styled Components. <https://polished.js.org/>
Media query function set up in plain js with styled-components <https://medium.com/@samuelresua/easy-media-queries-in-styled-components-690b78f50053>
Update to first link <https://medium.com/better-programming/how-to-use-media-queries-programmatically-in-react-4d6562c3bc97>

_2019-09-02 18:01_ Article describes a way to use multiple projects under the same url:
<https://link.medium.com/n6c43G8SEZ>

_2019-11-16 12:22_ Not even forms are straight forward in React. So there are libraries for that like <https://medium.com/better-programming/build-the-next-generation-of-forms-with-react-hooks-forms-b4f2039e51c1> or Formik2 or Redux Forms
Formik <https://github.com/jaredpalmer/formik/releases/tag/v2.0.1>

_2019-11-03 22:34_ The react hooks way to detect click outside <https://codesandbox.io/s/9o3lw5792w>
More <https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82>

_2020-01-24 20:53_ A few potentially useful React tips here <https://link.medium.com/FlTaGD49v3>

_2020-07-29 19:25_ Webpack 5/React will adress some micro frontend issues. <https://link.medium.com/GSi09Mvmw8>

#### Animations

_2019-11-03 23:41_ Super interesting talk about **animation** in webb apps on mobile (vs desktop) <https://www.youtube.com/watch?v=JDDxR1a15Yo&feature=youtu.be&t=10664>

_2019-11-12 08:59_ The slider component that needs to work with both gestures and on desktop with super smooth animations probably is going to cost us a lot of developing hours. CSS to the rescue! scroll-snap seems to have full support for all browsers we care about <https://caniuse.com/#search=scroll-snap>
If scroll-snap fails on us this is a good starting point for doing the same in JS/React. [Youtube](https://www.youtube.com/watch?v=3ax9TW2c2bY&list=LLuVFSB0bbZK_B3dciRnBBfw&index=41&t=1008s)
[More alernate starting points if scroll-snap fails](https://medium.com/dailyjs/horizontal-scroll-animation-fc39ae43cbe5)

#### Testing

_2019-11-12 23:51_ Make **Jest** also test Styled-Components <https://github.com/styled-components/jest-styled-components>

_2019-11-21 19:53_ A good primer for automated tests with Jest an Enzyme https://link.medium.com/BAaUIuWRN1

#### Web components

Polymer without build tools, just **native web components** <https://stackblitz.com/edit/open-wc-lit-demos?file=01-basic%2F01-basic-setup.js>

#### Analytics

_2019-11-16 18:00_ Analytics tool <https://www.hotjar.com/?utm_source=SyndicateAds&utm_medium=display&utm_campaign=NativeCPC&utm_content=8a4a673f623aff992f1a5908b3c3fb94>

#### Typescript

_2019-12-13 15:38_ Nice Typescript intro, it's live coding 50 minutes so using the youtube speed setting is recommended <https://youtu.be/IadZyDwfwWI>

#### Router

_2020-01-20 23:45_ Lets code a client side router. It very well might be the easiest way forward in a micro frontend lanscape to roll your own orchestrator that ties together underlying spa’s with a few but common functions. One of these is a router function. Here is an article on how to roll your own. <https://link.medium.com/GM2w3MhIp3>

#### PWA

_2020-07-20 11:49_ [PWA is seriously catching up with native](https://youtu.be/M0wPM8B6z5c)
