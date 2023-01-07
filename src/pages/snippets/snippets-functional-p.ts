// Functional programming
// from https://medium.com/better-programming/functional-programming-in-javascript-introduction-and-practical-examples-d268e44395b2

/**
 * Instead of for loops.
 */
const list1to100 = () => {
  return new Array(100).fill(null).map((x, i) => i + 1);
};
// or in short...
Array(10)
  .fill(null)
  .map((x, i) => console.log(i));

/**
 * Basic compose function.
 */
const compose = (...fns) => x => fns.reduceRight((res, fn) => fn(res), x);

// Usage
const centsToDollars = compose(
  addSeparators,
  addDollarSign,
  roundTo2dp,
  divideBy100
);

/**
 * Basic Pipe function in typescript
 */
 const pipe = <T>(...fns: Array<(arg: T) => T>) => (value: T) => fns.reduce((acc, fn) => fn(acc), value);


/**
 * Use tap and Trace for debugging inside compose
 */
const tap = f => x => {
  f(x);
  return x;
};
const trace = label => tap(console.log.bind(console, label + ':'));

// Debugging implemented to use case.
const centsToDollars = compose(
  trace('addSeparators'),
  addSeparators,
  trace('addDollarSign'),
  addDollarSign,
  trace('roundTo2dp'),
  roundTo2dp,
  trace('divideBy100'),
  divideBy100,
  trace('argument')
);

/* Output
argument: 100000000
divideBy100: 1000000
roundTo2dp: 1000000.00
addDollarSign: $1000000.00
addSeparators: $1,000,000.00
*/

/**
 * Container
 * Use a container to encapsulate "side-effecty" operations.
 */
class Container {
  constructor(fn) {
    this.value = fn;
    if (!isFunction(this.value) && !isAsync(this.value)) {
      throw new TypeError(
        `Container expects a function, not a ${typeof this.value}.`
      );
    }
  }
  run() {
    return this.value();
  }
  map(fn) {
    if (!isFunction(fn) && !isAsync(fn)) {
      throw new TypeError(
        `The map method expects a function, not a ${typeof fn}.`
      );
    }
    return new Container(() =>
      isPromise(this.value()) ? this.value().then(fn) : fn(this.value())
    );
  }
}

// Usage
const sayHello = () => 'Hello';
const addName = (name, str) => str + ' ' + name;
const container = new Container(sayHello);
const greet = container
  .map(addName.bind(this, 'Joe Bloggs'))
  .map(tap(console.log));
