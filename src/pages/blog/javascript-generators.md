---
layout: '../../layouts/BlogPost.astro'
title: 'Javascript Generators'
description: ''
pubDate: 'Oct 21 2023'
heroImage: '/assets/blog/css-explosion.webp'
draft: false
---

Let’s be honest: how often do we come across code that uses generators?

I review code from various developers daily, yet I rarely encounter generators.

Why is that?

Do people not understand them? Or do they fail to see their benefits?

JavaScript, known for its flexibility and wide-ranging features, has introduced a unique tool in ECMAScript 2015 — generators. These are powerful means to control asynchronous programming, produce iterable objects, and yield multiple values. In this guide, we’ll learn the mechanics of generators, their applications, and how you can harness their potential.

#### What are Generators?

Generators differ from traditional functions. They can start and halt their execution multiple times. This allows them to yield numerous values and continue their execution later on, making them perfect for managing asynchronous operations, constructing iterators, and handling endless data streams.

A generator is distinguished by the function\* syntax. Consider this basic example:

```js
function* generateSequence() {
  yield 1
  yield 2
  yield 3
}
```

Here, yield returns a value and halts the generator's execution. With each call, the generator yields the subsequent value.

#### Interacting with Generator Objects

Invoking a generator function won’t directly run its body. Instead, it yields a Generator object that lets us control its execution. Since this object is iterable, it's adaptable to for...of loops and similar operations.

Let’s break down the Generator object:

`next()`: This method resumes the generator, returns the next yielded value, and shows if the generator has concluded with the done property.

Using our earlier generateSequence example:

```js
console.log(generator.next()); // { value: 1, done: false }
return(): This method ends the generator prematurely, as if you’ve executed a return command.
console.log(numbers.return(100)); // { value: 100, done: true }
throw(): It lets us insert an error, facilitating error handling right inside the generator.
```

```js
function* generateTasks() {
  try {
    yield 'Start task'
    yield 'Continue task'
    yield 'Almost done with task'
  } catch (error) {
    console.log('A problem occurred:', error.message)
  }
}

const tasks = generateTasks()

console.log(tasks.next().value) // Outputs: "Start task"
console.log(tasks.next().value) // Outputs: "Continue task"
tasks.throw(new Error('Oops! Something went wrong.'))
// Outputs: "A problem occurred: Oops! Something went wrong."
console.log(tasks.next()) // Outputs: { value: undefined, done: true }
```

In the example above, after initiating a couple of tasks using the next() method, we introduce an error using the throw() method. The generator, thanks to the try-catch block, captures this error, logs an error message, and gracefully manages the error scenario.

#### Leveraging Generators for Infinite Data Streams

Generators are adept at managing infinite data streams. You can design a potentially unending data structure, producing values only when requested. Think of situations like infinite scrolling in web applications.

```js
function* infiniteNumbers() {
  let index = 0
  while (true) {
    yield index++
  }
}
```

I confess, `while(true)`` could scare anyone at first glance, but that is the magic of generators.

Synchronous and Asynchronous Iteration with Generators
When blended with promises, generators can emulate the async/await pattern, offering a neater, more intuitive method to draft asynchronous code. To illustrate, let’s fetch data using a generator:

```js
function* fetchData() {
  const users = yield fetch('https://api.example.com/users')
  console.log('Users:', users)
  // ...
}
```

#### Advanced Utilization of Generators

While async/await is a go-to for straightforward asynchronous tasks, generators, with their advanced features, bring versatility to the table.

```js
Generator Composition: This lets you seamlessly incorporate multiple generators, creating intricate value sequences.
function* generateSequence() {
  yield* generateNumbers();
  yield* generateCharacters('A', 'Z');
}
```

Infinite Generators: Generators can produce infinite value sequences, ideal for continuous data streams or infinite algorithms. Remember the while(true) above?

#### Real-world Scenario (updated): Infinite Scroll

It might seem challenging to conceptualize a significant and tangible application for Javascript Generators. However, they seamlessly integrate with async code and support infinite iterations, among other things. Let’s check an example.

Disclaimer: The code presented below is purely illustrative. Production-ready code would need to address numerous edge cases.

I propose we construct a social media feed that supports infinite scrolling. In other words, as users scroll to the end of a list, additional posts are fetched and appended to the feed.

Second Disclaimer: While generators offer one approach, they aren’t exclusive in the JavaScript ecosystem. There are alternative methods to achieve similar outcomes. Nonetheless, for the sake of learning, let’s construct a mechanism to continuously fetch posts as the user scrolls.

Initially, I’ll set up a basic HTML/CSS structure to house the data, in case you’d like to experiment with it:

```js
// CSS code
.post {
  height: 300px;
}

// HTML code
<div id="postsContainer">

</div>
```

Next, we’ll review the script designed to fetch “10 posts.” As the user scrolls and approaches the page’s end, the generator kicks in to retrieve the subsequent 10 posts:

```js
// This is just a replacement for regular `fetch`
// It creates and returns a chunk of 10 posts
async function simulatedFetch(currentPage) {
  const posts = Array.from({ length: 10 }, (_, i) => ({
    content: `Post - ${currentPage}${i}`,
  }))
  return Promise.resolve(posts)
}

async function* paginatedFetcher(apiUrl, itemsPerPage) {
  let currentPage = 0

  while (true) {
    // Coomenting what would be a real case
    // const response = await fetch(`${apiUrl}?page=${currentPage}&limit=${itemsPerPage}`);
    const response = await simulatedFetch(currentPage)

    // const posts = await response.json();
    const posts = response

    if (posts.length === 0) {
      return // end of data
    }

    yield posts
    currentPage++
  }
}

// Usage with infinite scroll:
// API is illustrative and not really used in this example
const getPosts = paginatedFetcher('https://api.example.com/posts', 10)

// Function to display posts to the DOM
function displayPosts(posts) {
  const container = document.getElementById('postsContainer')
  posts.forEach((post) => {
    const postElement = document.createElement('div')
    postElement.className = 'post'
    postElement.innerText = post.content
    container.appendChild(postElement)
  })
}

// Infinite scroll logic
window.onscroll = async function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    const { value } = await getPosts.next()
    if (value) {
      displayPosts(value)
    }
  }
}

// Initial fetch
;(async () => {
  const { value } = await getPosts.next()
  displayPosts(value)
})()
```

#### More examples where generators can be used

1. **Lazy Iteration:**
   Loading large datasets piece by piece, e.g., paginating through a big dataset without needing to load everything into memory.
2. **Asynchronous Programming:**
   Using generators in combination with promises to handle asynchronous operations (before the widespread adoption of async/await, which is syntactic sugar on top of generators and promises).
3. **Infinite Sequences:**
   Generating infinite sequences like the Fibonacci series, prime numbers, or any other mathematical series without consuming infinite memory.
4. **State Machines:**
   Managing stateful logic within applications, such as controlling the steps in a wizard or tutorial.
5. **Custom Iterators:**
   Implementing custom iterators for unique data structures that aren't natively iterable.
6. **Animation and Game Loops:**
   Coordinating complex sequences of animations or steps in game logic.
7. **Pipeline Processing:**
   Creating a chain of processing steps where data is passed from one generator to another, allowing for a modular approach to data transformation.
8. **Throttling Events:**
   For user interfaces, handling events such as button clicks or mouse movements with a controlled rate, ignoring excess events that come in a rapid sequence.
9. **Co-routines and Task Scheduling:**
   Implementing simple co-routines or task schedulers where tasks can yield control back to a central scheduler.
10. **Simulating Multi-threading:**
    While JavaScript is single-threaded, generators can give the illusion of multitasking by allowing functions to yield control and subsequently be resumed.
11. **Web Crawlers and Scapers:**
    Building crawlers that follow links or scrape data in a step-by-step fashion, allowing for pauses or delays.
12. **Data Streaming:**
    Handling streams of data, especially when the size of the data is too large to be processed all at once.
13. **Interactive Tutorials:**
    Designing guided step-by-step tutorials where each action waits for user input before moving to the next step.
14. **Pull-based Data Consumption:**
    In scenarios where a consumer dictates the pace at which it retrieves data instead of being pushed data at the producer's pace.
15. **Implementing custom generators for test data:**
    Generating a series of test inputs for automated testing.

#### Conclusion

Generators in JavaScript are not just a novelty; they’re instrumental in managing asynchronous tasks, devising iterable objects, and more.

I hope that the next time you need to manage data on-the-fly, you won’t hesitate to use generators.

Do share if you’ve effectively employed generators in real-world scenarios. The more examples we encounter, the easier it becomes to pinpoint situations where they fit seamlessly.

---

_[Source of this article](https://blog.stackademic.com/dont-be-afraid-of-javascript-generators-15c998aea652)_
