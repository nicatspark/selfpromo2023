---
layout: '../../layouts/SnippetPost.astro'
title: 'Pub/sub pattern'
description: 'Javascript patterns - pub/sub'
pubDate: 'Jan 7 2023'
---

If you're not feeling like figure things out yourself use my framework agnostic [broadcaster package](http://broadcaster.hervy.se).

`npm install broadcaster/foundit`

...or use one of these...

```javascript
/*
 * Broadcaster © 2008 Tore Darell
 *
 *
 *
 * DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 * Version 2, December 2004
 *
 * Copyright (C) 2004 Sam Hocevar
 * 14 rue de Plaisance, 75014 Paris, France
 * Everyone is permitted to copy and distribute verbatim or modified
 * copies of this license document, and changing it is allowed as long
 * as the name is changed.
 *
 * DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 * TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 * 0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 *
 *
 * Implements a centralised broadcast/listen pattern. A broadcaster
 * is simple and dumb and only knows how to broadcast a message to
 * listeners for that particular message.
 *
 * var b = new Broadcaster();
 *
 * b.broadcast('a message'); //Nothing happens
 * b.listen('a message', function(){ alert('a message was received'); });
 * b.broadcast('a message'); //alerts
 *
 * b.listen('some state has changed', function(s){ alert('new state is now: '+s); });
 * b.broadcast('some state has changed', 'new state'); // alerts "new state is now: new state'"
 *
 * var collector = [];
 * b.listen('new item', function(i){ this.push(i); }, collector);
 * b.broadcast('new item', 'cat'); // ['cat']
 * b.broadcast('new item', 'dog'); // ['cat', 'dog']
 *
 * The special message '*' is used as a global listener which will receive all messages:
 *
 * b.listen('*', function(message){ alert(message + ' was received'); })
 * b.fire('foo'); //Alerts "foo was received"
 *
 * A broadcaster can easily be used to make an object observable:
 *
 * function ElementObserver(element, interval){
 *   this.element = element;
 *   this.broadcaster = new Broadcaster(); //The magic line
 *   var that = this, oldValue = element.innerHTML;
 *   this._interval = setInterval(function(){
 *     var newValue = element.innerHTML;
 *     if (newValue !== oldValue) {
 *       that.broadcaster.broadcast('value changed', newValue, oldValue);
 *     }
 *     oldValue = newValue;
 *   }, interval || 500);
 * };
 *
 * var observers = ['some_id', 'some_other_id'].map(function(id){ return new ElementObserver($(id)); });
 * observers.each(function(o){
 *   o.broadcaster.listen('value changed', function(ov, nv){
 *     alert('Value in '+o.element+' changed from '+ov+' to '+nv);
 *   });
 * });
 *
 */

Broadcaster = function () {
  this.listeners = {}
}
;(function (p) {
  p.defaultScope = this // window/global

  //Attach a listener for a particular message with a callback function and
  //an optional scope in which it will run. Returns the callback function.
  p.listen = function (message, callback, scope) {
    if (!this.listeners[message]) {
      this.listeners[message] = []
    }
    this.listeners[message].push({ callback: callback, scope: scope })
    return callback
  }
  p.subscribe = p.listen

  //Remove a listener which matches a particular message and callback function
  p.stopListening = function (message, callback) {
    var l = this.listeners,
      m = message,
      c = callback,
      i
    if (l[m]) {
      for (i = 0; i < l[m].length; i++) {
        if (l[m][i].callback == c) {
          l[m].splice(i, 1)
        }
      }
    }
  }
  p.unsubscribe = p.stopListening

  //Broadcast a message. Any additional arguments are proxied to
  //the listener's callback function. Listeners for the special
  //message '*' will receive all messages that are fired
  p.broadcast = function (message) {
    var l = this.listeners[message],
      g = this.listeners['*'],
      args,
      i

    if (l || g) {
      args = Array.prototype.slice.call(arguments, 1)

      if (l) {
        //Specific listeners
        for (i = 0; i < l.length; i++) {
          l[i].callback.apply(l[i].scope || this.defaultScope, args)
        }
      }

      if (g) {
        //Global listeners
        for (i = 0; i < g.length; i++) {
          //Globals also receive message name
          g[i].callback.apply(g[i].scope || this.defaultScope, arguments)
        }
      }
    }
  }
  p.fire = p.broadcast
  p.send = p.broadcast
})(Broadcaster.prototype)
```

---

```javascript
/**
 * The Publisher/Subscriber Pattern in JavaScript
 * From https://medium.com/better-programming/the-publisher-subscriber-pattern-in-javascript-2b31b7ea075a
 * The publisher/subscriber pattern is a design pattern that allows us
 * to create powerful dynamic applications with modules that can communicate
 * with each other without being directly dependent on each other.
 * Advatage: Nifty
 * Disadvantage: Does not scale well. Can't assert if you already subscribed to the same callback before.
 * Best for: Usecases with a limited scope.
 */

function pubSub() {
  const subscribers = {}

  function publish(eventName, data) {
    if (!Array.isArray(subscribers[eventName])) {
      return
    }
    subscribers[eventName].forEach((callback) => {
      callback(data)
    })
  }

  function subscribe(eventName, callback) {
    if (!Array.isArray(subscribers[eventName])) {
      subscribers[eventName] = []
    }

    subscribers[eventName].push(callback)

    const index = subscribers[eventName].length - 1

    return {
      unsubscribe() {
        subscribers[eventName].splice(index, 1)
        /* Alt. without using index */
        // subscribers[eventName] = subscribers[eventName].filter((cb) => {
        //   /* Does not include the callback in the new array */
        //   return (cb === callback)? false: true;
        // })
      },
    }
  }

  return {
    publish,
    subscribe,
  }
}
// ===========
function showMeTheMoney(money) {
  console.log(money)
}
pubSub().subscribe('show-money', showMeTheMoney)
// Later...
pubSub().publish('show-money', 1000000)
//============
const unsubscribeFood = subscribe('food', function (data) {
  console.log(`Received some food: ${data}`)
})
// Removes the subscribed callback
unsubscribeFood()
```

#### A refactored version of my Broadcaster lib

No frills barbones version where you can namespace it to fit your needs.

```typescript
const namespace = 'SKF_UI_'

//--------------------------------------------------------------------------------------------------
// Eported eventEmitter
//--------------------------------------------------------------------------------------------------

interface emitEventProps {
  eventDescription: string
  eventRootElement?: HTMLElement
  tagName: string
}

/**
 * Creates a namespaced event and emits it from given element.
 *
 * @param {Object} obj - Object containing event data
 * @param {string} obj.eventDescription - A string that the details property in the listener callback can read
 * @param {string} obj.eventRootElement - a reference to the element from where to emit
 * @param {string} obj.tagName - A namespace string that holds the ui tag name of the emitter
 * @returns namespaced event id string mostly for debuggin purpose. This is the id to use in your listener.
 */
const eventEmit = ({
  eventDescription,
  eventRootElement,
  tagName,
}: emitEventProps) => {
  if (!eventRootElement) return
  const eventNameId = `${namespace}${tagName.toLocaleUpperCase()}`
  const tag_event = new CustomEvent(eventNameId, {
    bubbles: true,
    detail: {
      description: eventDescription,
    },
  })
  eventRootElement?.dispatchEvent(tag_event)
  return eventNameId
}

//--------------------------------------------------------------------------------------------------
// Eported eventListener
//--------------------------------------------------------------------------------------------------

interface EventListenerOptionsType {
  capture?: boolean
  once?: boolean
  passive?: boolean
}

// Constants
const hubId = ` ${namespace}LISTENER `
const eventTarget = createOrGetCustomEventNode(hubId)

/**
 * A optional event listener function matching the 'eventEmit' function. Feature de-anonymizer
 * on listener callback (de-anonymizing and thereby making inline functions cancelable),
 * returns a cancel-listener-function (practical in useEffects) and
 * create and appends a comment node where one can inspect listeners from devtools.
 *
 * @param tagName - The name of the ui component emitting the event.
 * @param listenerCallback - Callback function triggered on reception of emit.
 * @param options - Takes an object with boolean key of 'once' that auto removes listener after one receieved emit.
 * @returns function to cancel listener
 */
const eventListener = (
  tagName: string,
  listenerCallback: EventListenerOrEventListenerObject,
  options: { once?: boolean } = {}
) => {
  return bind(eventTarget, {
    type: (namespace +
      tagName.toLocaleUpperCase()) as keyof HTMLElementEventMap,
    listener: listenerCallback,
    options,
  })
}

//--------------------------------------------------------------------------------------------------
// Functional lego logic
//--------------------------------------------------------------------------------------------------

/** Helps name anonumous functions that can not be used in native event handler */
function bind(
  target: Node,
  {
    type,
    listener,
    options,
  }: {
    listener: EventListenerOrEventListenerObject
    options?: EventListenerOptionsType
    type: keyof HTMLElementEventMap
  }
) {
  target.addEventListener(type, listener, options)
  return function unbind() {
    target.removeEventListener(type, listener, options)
  }
}

/** Initiate or retreive node for custom event */
function createOrGetCustomEventNode(hubId: string): Node {
  const nodeIterator = document.createNodeIterator(
    document.body,
    NodeFilter.SHOW_COMMENT
  )
  while (nodeIterator.nextNode()) {
    if (nodeIterator.referenceNode.nodeValue === hubId) {
      return nodeIterator.referenceNode
    }
  }
  return document.body.appendChild(document.createComment(hubId))
}

//--------------------------------------------------------------------------------------------------
// Exports
//--------------------------------------------------------------------------------------------------

export { eventEmit, eventListener }
```
