---
layout: '../../layouts/SnippetPost.astro'
title: 'Typescript'
description: ''
pubDate: 'Jan 7 2023'
---

##### Function overload

```typescript
function foo(arg1: number, arg2: number): number
function foo(arg1: string, arg2: string): string
function foo(arg1: string | number, arg2: string | number): string | number {
  return arg1 || arg2
}

// ❎ x is of type string
const x = foo('sample1', 'sample2')
// ❎ y is of type number
const y = foo(10, 24)

console.log(`x`, typeof x, x)
console.log(`y`, typeof y, y)

export default foo
```

##### Pick<Type, Keys>

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo, 'title', 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
}
```

##### Non nullable type

Removes null or undefined from a type.

```typescript
type NonNullable<T> = T extends null | undefined ? never : T
//usage
type MyType = string | null
const a: NonNullable<MyType> = 'myString' // Type is only string
```

##### Readonly and optional mapped types

Redefine a type.

```typescript
interface MyReadOnlyType {
  readonly [P in K]: T
}
interface MyOptionalType {
  [P in K]?: T
}
```

##### Common mapped types

```typescript
 { [ P in K ] : T }
 { [ P in K ] ?: T }
 { [ P in K ] -?: T }
 { readonly [ P in K ] : T }
 { readonly [ P in K ] ?: T }
 { -readonly [ P in K ] ?: T }
```

##### Partial type

```typescript
type MyPartial<User> = { [P in keyof User]?: User[P] }
// usage
type User = {
  name: string
  password: string
  address: string
  phone: string
}

const partialUserType: MyPartial<User> = {
  name: 'Sten',
  password: '1234',
}
```

##### All partial except specified properties

Make all properties optional except

```typescript
type partialExcept = Partial<HslObject> & Pick<HslObject, 'hue'>
```

##### PartialBy

Create optional except specified

```typescript
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type HslObjectLightness = PartialBy<HslObject, 'saturation' | 'hue'>
```

##### Getter type. (using the 'as' keyword available since ts 4.1)

Creates a new key out of the current key string.
Symbol and number keys are filtered out with the & opperator.

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}
interface Person {
  name: string
  age: number
  location: string
}
type LazyPerson = Getters<Person>
// {
//   getName: () => string;
//   getAge: () => number;
//   getLocation: () => string;
// }
```

##### Remove type of field

```typescript
type RemoveKindFiled<T> = {
  [K in keyof T as Exclude<K, 'kind'>]: T[K]
}
type Exclude<T, U> = T extends U ? never : T
// usage
type KindlessCircle = RemoveKindField<circle>

interface Circle {
  kind: 'circle'
  radius: number
}
// ==> RemoveKindField<Circle>
{
  radius: number
}
```

##### Conditional types

```typescript
T extends U ? X : Y
// Read as When T can be assigned to type U then return X, else Y

// usage
type IsString<T> = T extends string ? true : false;
​
type I0 = IsString<number>;  // false
type I1 = IsString<"abc">;  // true
type I2 = IsString<any>;  // boolean
type I3 = IsString<never>;  // never
```

##### Mixing up mapped types with conditionals, examples

```typescript
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>
interface User {
  id: number
  name: string
  age: number
  updateName(newName: string): void
}
type T5 = FunctionPropertyNames<User> // "updateName"
type T6 = FunctionProperties<User> // { updateName: (newName: string) => void; }
type T7 = NonFunctionPropertyNames<User> // "id" | "name" | "age"
type T8 = NonFunctionProperties<User> // { id: number; name: string; age: number; }
```
