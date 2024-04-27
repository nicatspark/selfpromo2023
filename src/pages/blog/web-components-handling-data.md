---
layout: '../../layouts/BlogPost.astro'
title: 'How to communicate between web components'
description: '4 ways to exchange data using web components'
pubDate: 'Apr 27 2024'
heroImage: '/assets/blog/css-explosion.webp'
---

4 different ways of passing data into custom elements.

#### Attributes

- Can be set through the HTML and JavaScript, using getAttribute and setAttribute.
- Only work with strings.
- Can be observed.
- Very easy and straight-forward to use.

#### Properties

- Can be used in JavaScript only.
- Can handle all data types.
- Great for getting complex data in a custom element.
- Custom elements should have getters and setters to handle them properly.

#### Events

- Great for getting data out of custom elements.
- Can get messy when using many different elements with many events.
- Use the Custom Events API.

#### Event bus

- Great for communication between components.
- There can be more than 1 bus for different communication channels.
- Some effort is required to build the bus.

What method you choose to work with should depend on what you need to achieve. It’s not uncommon to combine a few or all of these techniques in one application. Lets dive in to each of these to see how they work.

#### Attributes example

How to observe and listen to attribute changes

```js
class CustomList extends HTMLElement {
  static get observedAttributes() {
    return ['filter']
  }
  attributeChangedCallback(name, oldValue, newValue) {
    // best practice to avoid unnesecary renders
    if (oldValue === newValue) return

    // do something when an attribute has changed
    console.log(`The attribute ${name} has changed`)
  }
}
```

Drawback is we can only handle strings.

#### Properties example

To add complex data we use getters and setters.

```js
class User {
  constructor() {
    this._name = 'John Doe'
    this._age = 25
  }
  get name() {
    return this._name
  }
  set name(name) {
    this._name = name
  }
  get age() {
    return `This user is ${this._age} years old`
  }
  set age(age) {
    if (age < 18) {
      throw new RangeError('User must at least be 18 years old!')
    }
    this._age = age
  }
}
```

If you’d to interact with this class, you’d do it this way:

```js
var user = new User()
console.log(user.name) // -> "John Doe"
console.log(user.age) // -> "This user is 25 years old"
user.name = 'Jane Doe'
console.log(user.name) // -> "Jane Doe"
user.age = 17 // Ka-bumm!
```

Although you could, it’s not a good practice to access the properties directly:

```js
const user = new User()
console.log(user._name) // -> "John Doe"
// (°_°)
```

Let’s see how this knowledge helps us in implementing custom elements.

```js
class CustomList extends HTMLElement {
  constructor() {
    super()

    this._items = []
  }
  set items(value) {
    this._items = value
  }

  get items() {
    return this._items
  }
}
```

We define our getter and setter methods, which are needed for each property we want to pass into the custom element.

Now that we have declared items as a configurable property for our element, we can pass it in using JavaScript:

```js
var list = document.querySelector('custom-list')
list.items = [1, 2, 3]
console.log(list.items) // -> [1, 2, 3]
```

Thankfully, we are not limited to the use of arrays. Every data type can be passed, like this function:

```js
list.callback = () => console.log('Hello World')
list.callback() // -> "Hello World"
```

#### Custom Events

Here is an example where we use a custom element to encapsulate the logic of a counter. A button fires a custom event `clicked` once clicked.

```js
class ClickCounter extends HTMLElement {
  constructor() {
    super()

    this._timesClicked = 0

    var button = document.createElement('button')
    button.textContent = 'Click me'
    button.onclick = (evt) => {
      this._timesClicked++

      this.dispatchEvent(
        new CustomEvent('clicked', {
          detail: this._timesClicked,
        })
      )
    }

    this.append(button)
  }
}
customElements.define('click-counter', ClickCounter)
var counter = document.querySelector('click-counter')
counter.addEventListener('clicked', (evt) => {
  console.log(evt.detail)
})
```

But there’s a catch: this technique doesn’t really work (nor scale) in an app with many different Web Components that need to communicate with each other. You don’t want to listen for many different events per component, making your code unreadable and complex. Let’s have a look at how to solve this situation.

#### Event Bus

This last technique also makes use of the Custom Events API, but instead of listening to local events on our components, we define an application-wide, global bus which transports our events and makes them accessible everywhere.

Event buses can get rather complex, depending on your needs. In the following example, I want to keep it simple so you can fully understand the idea behind this concept.

```js
class EventBus {
  constructor() {
    this._bus = document.createElement('div')
  }

  register(event, callback) {
    this._bus.addEventListener(event, callback)
  }

  remove(event, callback) {
    this._bus.removeEventListener(event, callback)
  }
  fire(event, detail = {}) {
    this._bus.dispatchEvent(new CustomEvent(event, { detail }))
  }
}
var bus = new EventBus()
export default bus
```

The above code example is inspired by [this article](https://pineco.de/creating-a-javascript-event-bus/), which goes into a bit more detail.

Basically, we create a new JavaScript class. Once this class is initialized, we create a new HTML element (which is never appended nor used in the DOM). This HTML element is required since custom events need to be bound to an actual HTML element.

We then define 3 methods:

- register allows us to add new event listeners to the bus. The event name, as well as the callback, are up to you.
- remove deletes an existing event listener from the bus.
- Finally, fire dispatches an event (again, you can choose the name), optionally we can attach additional data using the detail parameter.

The last 3 lines make sure that we initialize the bus and export its reference.

Throughout your app, you most likely work with many different files, so each file that needs to register or fire events can import it now:

```js
import EventBus from "./event-bus.js";
EventBus.register("someevent", (evt) => {...});
EventBus.fire("someevent");
```

Because we export and import only the instance (var bus = new EventBus()), we make sure that all of our events are handled by the same bus.

[Inspired by this article](https://itnext.io/handling-data-with-web-components-9e7e4a452e6e)
