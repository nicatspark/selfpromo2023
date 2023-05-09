---
layout: '../../layouts/SnippetPost.astro'
title: 'Typescript'
description: ''
pubDate: 'Jan 7 2023'
---

##### Function overload

Function overload has a serious drawback. It needs to have all possible combinations of arguments covered. With a couple of arguments the complexity quickly get out of hand.

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

##### Instead of enums use this

Instead of doing types for your data, generate type _from_ your data.

```typescript
const weights = {
  heavy: 900,
  light: 200,
} as const // narrows the type from number to actual value

type Weights = typeof weights;

type WeightKey = keyof Weights; // wil get you a union > "heavy" | "light"

// iterate over that object and grab you a union of the actual value
type WeightValue = (typeof weights)[WeightKey]; // > 900 | 200

function styleText(weight: weightKey | WeightValue) {
  console.log(message: weight);
}

styleText(weights.heavy); // paste in like an enum
styleText('heavy'); // paste in values directly
styleText('light');
styleText(900);
```

##### Keyof `object` but for values

Doing a `keyof typeof myObject` is great for creating an union type out of object keys. Here is how you do the same for values.

```typescript
// Create a valueOf ts-function helper...
type ValueOf<T> = T[keyof T]

// ...or just inline (and admitadly more readable introspect)

type MyValueUnion = (typeof weights)[keyof WeightKey]
```

##### Need to get rid of that undefined?

Got an incomming argument that is optional but you know it will be set further in? Narrow out that undefined.

```typescript
function assertMember(arg: unknown): asserts arg is member {
  if(!arg ||
    typeof arg !== 'object' ||
    !('id' in arg) ||
    typeof arg.id !== 'number') {
      throw new Error()
    }
}

assertMember(memberObj) // below memberObj is without undefined

...
```

Or if your target is a primitve

```typescript
function isNotNull<T>(arg: T | null | undefined): arg is T {
  return !!arg
}
```

...but personally I had most luck with this function:

```typescript
function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${value} is not defined`)
  }
}
```
