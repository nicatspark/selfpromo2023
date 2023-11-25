---
layout: '../../layouts/BlogPost.astro'
title: 'How to handle errors in typescript'
description: ''
pubDate: 'Jan 30 2023'
draft: false
heroImage: '/assets/blog/errorhandling.webp'
---

Error handling in Type/JavaScript is a topic that doesn’t get the importance it deserves. It’s crucial to the longevity of any project to catch and log errors.

As I’ve started working with TypeScript more over the years, I started to realize that I didn’t really understand error handling. I would often run into this problem:

```js
try {
    throw new Error('Ooops)
} catch (error) {
    console.error(error.messages)
}
```

error is type unknown, so we can’t perform any actions with error until we cast it to a new type, or narrow the type. The correct answer is to narrow the type, and we’ll look at how to do that, but why is this even necessary?

In JavaScript, just about anything can be thrown:

```js
throw 'oops'
throw 210
throw null
throw undefined
throw { message: 'You get the idea' }
```

So the error that is caught truly is unknown. But, there are ways we can handle errors cleanly with TypeScript, and over the years I’ve developed a design pattern that I really enjoy using to help me do just that.

#### First, the basics of errors in JavaScript

##### Types of errors in JavaScript

[There are many types of errors in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#error_types), but the most common are:

- `ReferenceError` — The code referenced a variable that doesn’t exist.
- `TypeError` — A value wasn’t the expected type.
- `SyntaxError` — The code was syntactically invalid.

##### Throwing errors

There are times when you should throw an error manually. For example, you might have some code that relies on a value being returned from a function call, but there’s a possibility of the value being `undefined`, or at least TypeScript believes there is. In this example throwing is the best solution to narrow the `user` that is returned.

```js
function createProject() {
  // Inferred type is user | undefined
  const user = getUser()
  // user could be undefined, so TS complains
  saveProject({ name: '', userId: user.id })
}

// BAD
function createProject() {
  // Inferred type is user | undefined
  const user = getUser()

  if (!user) return // Dont do this

  saveProject({ name: '', userId: user.id })
}

// GOOD
function createProject() {
  // Inferred type is user | undefined
  const user = getUser()

  if (!user) {
    throw new ReferenceError('User undefined')
  }

  saveProject({ name: '', userId: user.id })
}
```

##### Catching errors

Once an error is thrown, it will bubble up the callstack until caught in a `try/catch` statement. When code that is run inside of a `try` block throws an error, it will be “caught” in the catch block. The error can originate from a function nested inside of a function, and will bubble up until caught.

```js
try {
  throw new ReferenceError()
} catch (error) {
  console.error(error)
}
```

##### Narrowing the type of error

Once caught, it can be useful to check the type of error that was thrown. This allows us to narrow the type from `unknown`, to a specific type that we can then interact with. We can do that with `instanceof`.

```js
try {
  throw new ReferenceError()
} catch (error) {
  if (error instanceof ReferenceError) {
    console.error(error.message)
  }
}
```

##### Enough of the basics, let’s look at the design pattern

In my latest project I grouped my code by domains in directories named Features. I’ll go over this architecture in detail in another post, but TL;DR is that a Feature dir contains code for a given domain. It can contain related components, hooks, types, errors, and more. What we’re interested in for this post are the errors. Each Feature dir contains an `errors.ts` file where I define a custom error class for the respective domain.

##### Creating a custom error type

In my `errors.ts` file I export a `class`. I maintain a union type for the potential names, which adds some nice intellisense and type safety. The class extends the Error object, which allows a stack trace to be inserted (for most JS runtimes).

```typescript
type ErrorName =
  | 'GET_PROJECT_ERROR'
  | 'CREATE_PROJECT_ERROR'
  | 'PROJECT_LIMMIT_REACHED'

export class ProjectError extends Error {
  name: ErrorName
  message: string
  cause: any

  constructor({
    name,
    message,
    cause,
  }: {
    name: ErrorName
    message: string
    cause: any
  }) {
    super()
    this.name = name
    this.message = message
    this.cause = cause
  }
}
```

##### Throwing a custom error

When a new error is instantiated, the name value has intellisense and must be one of the names defined in the union type.

```js
export async function createProject() {
  const { data, error } = await api.createProject()

  if (error) {
    throw new ProjectError({
      name: 'CREATE_PROJECT_ERROR',
      message: 'API error occurred while creating project',
      cause: error,
    })
  }

  if (data.length === projectLimit) {
    throw new ProjectError({
      name: 'PROJECT_LIMIT_REACHED',
      message: 'Project limit has been reached.',
    })
  }

  return data
}
```

##### Catching a custom error

When the error is caught we can narrow the error type by using `instanceof`. Once narrowed, `error.name` gives us intellisense. At this point we can perform logic based on the name of the error that was thrown. In this example the `PROJECT_LIMIT_REACHED` error is one we want to show the user, and we provided a message specifically to be rendered for the user.

```js
try {
  await createProject()
} catch (error) {
  if (error instanceof ProjectError) {
    if (error.name === 'PROJECT_LIMIT_REACHED') {
      toast(error.message)
    }
  }
}
```

##### Making a reusable error base

Since I have many `errors.ts` files, I want to ensure my code stays DRY. The only dynamic code in our class is the union type of names. So I create an `ErrorBase` class, which accepts a generic that is used as the name type.

```typescript
export class ErrorBase<T extends string> extends Error {
  name: T
  message: string
  cause: any

  constructor({
    name,
    message,
    cause,
  }: {
    name: T
    message: string
    cause?: any
  }) {
    super()
    this.name = name
    this.message = message
    this.cause = cause
  }
}
```

Now, when I create a new custom error class I can extend this base, and all I need to do is give it the union type of available names.

```typescript
import { ErrorBase } from '../utils/error-base'

type ErrorName =
  | 'GET_PROJECT_ERROR'
  | 'CREATE_PROJECT_ERROR'
  | 'PROJECT_LIMIT_REACHED'

export class TeamError extends ErrorBase<ErrorName> {}
```

---

[Source](https://medium.com/udacity-engineering/handling-errors-like-a-pro-in-typescript-d7a314ad4991)
