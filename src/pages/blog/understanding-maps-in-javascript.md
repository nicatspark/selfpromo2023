---
layout: '../../layouts/BlogPost.astro'
title: 'Understanding maps in javascript'
description: 'Map is a collection of key and value pairs, similar to Object. When and how should we use it?'
pubDate: 'Apr 12 2023'
#heroImage: '/assets/blog/typefaces.webp'
draft: false
---

#### What is Map

Map is a collection of key and value pairs, similar to Object. The main difference between a Map and an Object is that Map allows key on any type either primitive or an object.

Let’s learn how to create a Map and do operations on it.

#### Creating a Map

You can create a Map by using the new keyword

```javascript
let map = new Map();
This will create an empty Map.

Add a new element to Map
To set a key with the value we use map.set(key, value)

map.set("1", "my key is a string");
map.set(1, "my key is a Number");
map.set(true, "my key is a boolean");
```

Map allows keys with different datatype rather than converting them to string. So, in the above example, "1" and 1 are two distinct keys.

We can also use objects as keys in Map.

```javascript
let myObj = {name: "John Doe"};
map.set(myObj, "my value");
Access an element in a Map
To get the value, we use map.get(key) method.

//output: "my key is a string"
console.log(map.get("1"));

//output: my key is a Number
console.log(map.get(1));
```

We can also create a map from a nested array.

```javascript
const arr = [['one',1],['two',2]];
Object.fromEntries(arr); // an object
new Map(arr) // a map
```

We should not access Map using object syntax: `map[key]`. This will make Map behave similar to a javascript object with all the limitations of an object.

#### Convert a Map to Object

To convert a Map to an object, we can use the `Object.fromEntries()` method, passing the Map as an argument. For example:

```javascript
const map = new Map([
  ['user1', 'John'],
  ['user2', 'Kate'],
  ['user3', 'Peter'],
]);

const obj = Object.fromEntries(map);

// { user1: 'John', user2: 'Kate', user3: 'Peter' }
console.log(obj);
```

Note: `Object.fromEntries()` can transform any list of key-value pairs into an object. For example, it can directly transform the array of key-value pairs that we passed to the Map() constructor:

```javascript
const arr = [
  ['user1', 'John'],
  ['user2', 'Kate'],
  ['user3', 'Peter'],
];
const obj = Object.fromEntries(arr);

// { user1: 'John', user2: 'Kate', user3: 'Peter' }
console.log(obj);
```

#### Remove a key-value pair in Map

To delete a key-value pair from a Map we use `map.delete(key)`.

```javascript
map.delete(true)
Remove all key-value pairs from Map
To remove all key-value pairs from Map we use map.clear()

map.clear()
Count number of elements in a Map
```

To count the number of elements in Map we use `map.size`

```javascript
let map = new Map();
map.set(1, "one");
map.set(2, "two");

//output: 2
console.log(map.size)
Check if a key exists in a Map
To check if a key-value pair exists in Map we use map.has(key)

//output: true
map.has (1);
```

In this article, we learned what is Map and basic operations that we can perform on Map. In the next article, we will learn how to iterate over Map and convert it to array and object and vice versa.

#### Iterating a Map

For iterating over a Map, we can use the following javascript constructs:

- for..of
- forEach()

Let's create a Map first to loop over from the knowledge gained in our previous article.

```javascript
let map = new Map()

map.set("one", "first element");
map.set("two", "second element");
map.set(3, "third element");
Iterating map with for..of
We can use for..of to iterate a Map in Javascript.

for (let [key, value] of map) {
console.log(key + " = " + value);
}

//output
// one = first element
// two = second element
// 3 = third element
```

Map also provides these three methods, which comes in handy while iterating over a Map.

```javascript
map.keys() - Returns an iterable for keys
map.values() - Returns an iterable for values
map.entries() - Returns an iterable of key,value
for (let key of map.keys()) {
  console.log(key);
}

// output
// one
// two
// 3

for (let value of map.values()) {
  console.log(value);
}

// output
// first element
// second element
// third element

for (let [key, value] of  map.entries()) {
  console.log(key + " = " + value)
}

//output
// one = first element
// two = second element
// 3 = third element
```

#### Iterating Map with forEach()

We can also iterate through a Map using `forEach()`.

```javascript
map.forEach(function(value, key) {
	console.log(key + " = " + value);
})

//output
// one = first element
// two = second element
// 3 = third element
```

Map preserves the order in which values are inserted. So, while iterating over a Map, elements will be in the same order in which they are inserted.

#### Summary

To iterate over a Map, we can use for..of and `forEach()` loop constructs.
Map provides three methods that return iterable: `map.keys()`, `map.values()` and `map.entries()`.
Iteration over Maps is always in insertion order.
