/*
6. attempt
This snippet executes a function, returning either the result or the caught error object.
*/
const attempt = (fn, ...args) => {
  try {
    return fn(...args)
  } catch (e) {
    return e instanceof Error ? e : new Error(e)
  }
}
var elements = attempt(function (selector) {
  return document.querySelectorAll(selector)
}, '>_>')
if (elements instanceof Error) elements = [] // elements = []

/**
 * 7. average
 * This snippet returns the average of two or more numerical values.
 */
const average = (...nums) =>
  nums.reduce((acc, val) => acc + val, 0) / nums.length
average(...[1, 2, 3]) // 2
average(1, 2, 3) // 2

/**
 * 24. defer
 * This snippet delays the execution of a function until the current call stack is cleared.
 */
const defer = (fn, ...args) => setTimeout(fn, 1, ...args)

defer(console.log, 'a'), console.log('b') // logs 'b' then 'a'

/**
 * 42. functionName
 * This snippet prints the name of a function into the console.
 */
const functionName = (fn) => (console.debug(fn.name), fn)

functionName(Math.max) // max (logged in debug channel of console)

/**
 * 46. getType
 * This snippet can be used to get the type of a value.
 */
const getType = (v) =>
  v === undefined
    ? 'undefined'
    : v === null
    ? 'null'
    : v.constructor.name.toLowerCase()

getType(new Set([1, 2, 3])) // 'set'

/**
 * 58. is
 * This snippet can be used to check if a value is of a particular type.
 */
const is = (type, val) => ![, null].includes(val) && val.constructor === type

is(Array, [1]) // true
is(ArrayBuffer, new ArrayBuffer()) // true
is(Map, new Map()) // true
is(RegExp, /./g) // true
is(Set, new Set()) // true
is(WeakMap, new WeakMap()) // true
is(WeakSet, new WeakSet()) // true
is(String, '') // true
is(String, new String('')) // true
is(Number, 1) // true
is(Number, new Number(1)) // true
is(Boolean, true) // true
is(Boolean, new Boolean(true)) // true

/**
 * 69. isNumber
 * This snippet can be used to check whether a provided value is a number.
 */

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

isNumber('1') // false
isNumber(1) // true

/**
 * 73. isPromiseLike
 * This snippet checks whether an object looks like a Promise.
 */

const isPromiseLike = (obj) =>
  obj !== null &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function'

isPromiseLike({
  then: function () {
    return ''
  },
}) // true
isPromiseLike(null) // false
isPromiseLike({}) // false

/**
 * isPromise / isFunction (similar to the above but less code)
 * Checks if function is a promise. Note that it will execute them aswell.
 */
const isPromise = (item) =>
  Object.prototype.toString.call(item) == '[object Promise]'
const isFunction = (item) =>
  Object.prototype.toString.call(item) == '[object Function]'

isPromise(new Promise(() => {})) // true
isFunction(() => {}) // true

/**
 * 79. isValidJSON
 * This snippet can be used to check whether a string is a valid JSON.
 */
const isValidJSON = (str) => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

isValidJSON('{"name":"Adam","age":20}') // true
isValidJSON('{"name":"Adam",age:"20"}') // false
isValidJSON(null) // true

/**
 * 85. minN
 * This snippet returns the n smallest elements from a list. If n is greater than or equal to the list’s length, then it will return the original list (sorted in ascending order).
 */
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n)

minN([1, 2, 3]) // [1]
minN([1, 2, 3], 2) // [1,2]

/**
 * 90. Random Hexadecimal Color Code
 * This snippet can be used to generate a random hexadecimal color code.
 */
 const generateRandomHexColor = () =>
 `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

 generateRandomHexColor() // "#e34155"

 
/**
 * 98. runPromisesInSeries
 * This snippet can be used to run an array of promises in series.
 */
const runPromisesInSeries = (ps) =>
  ps.reduce((p, next) => p.then(next), Promise.resolve())
const delay = (d) => new Promise((r) => setTimeout(r, d))

runPromisesInSeries([() => delay(1000), () => delay(2000)])
// Executes each promise sequentially, taking a total of 3 seconds to complete

/**
 * 108. sleep
 * This snippet can be used to delay the execution of an asynchronous function by putting it into sleep.
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function sleepyWork() {
  console.log("I'm going to sleep for 1 second.")
  await sleep(1000)
  console.log('I woke up after 1 second.')
}

/**
 * 117. timeTaken
 * This snippet can be used to find out the time it takes to execute a function.
 */
const timeTaken = (callback) => {
  console.time('timeTaken')
  const r = callback()
  console.timeEnd('timeTaken')
  return r
}

timeTaken(() => Math.pow(2, 10)) // 1024, (logged): timeTaken: 0.02099609375ms

/**
 * 118. times
 * This snippet can be used to iterate over a callback n times.
 */
const times = (n, fn, context = undefined) => {
  let i = 0
  while (fn.call(context, i) !== false && ++i < n) {}
}

var output = ''
times(5, (i) => (output += i))
console.log(output) // 01234

/**
 * 119. toCurrency
 * This snippet can be used to format a number like a currency.
 */
const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, {
    style: 'currency',
    currency: curr,
  }).format(n)

toCurrency(123456.789, 'EUR') // €123,456.79  | currency: Euro | currencyLangFormat: Local
toCurrency(123456.789, 'USD', 'en-us') // $123,456.79  | currency: US Dollar | currencyLangFormat: English (United States)
toCurrency(123456.789, 'USD', 'fa') // ۱۲۳٬۴۵۶٫۷۹ ؜$ | currency: US Dollar | currencyLangFormat: Farsi
toCurrency(322342436423.2435, 'JPY') // ¥322,342,436,423 | currency: Japanese Yen | currencyLangFormat: Local
toCurrency(322342436423.2435, 'JPY', 'fi') // 322 342 436 423 ¥ | currency: Japanese Yen | currencyLangFormat: Finnish

/**
 * 120. toDecimalMark
 * This snippet uses the toLocaleString() function to convert float-point arithmetic to the decimal mark form by using a number to make a comma-separated string.
 */
const toDecimalMark = (num) => num.toLocaleString('en-US')

toDecimalMark(12305030388.9087) // "12,305,030,388.909"

/**
 * 126. validateNumber
 * This snippet can be used to check whether a value is a number.
 */
const validateNumber = (n) =>
  !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n

validateNumber('10') // true

/**
 * Cancellable fetch
 * https://developers.google.com/web/updates/2017/09/abortable-fetch
 * https://developer.mozilla.org/en-US/docs/Web/API/AbortController
 */

export function cancelableFetch(reqInfo, reqInit) {
  const abortController = new AbortController()
  const signal = abortController.signal
  const cancel = abortController.abort.bind(abortController)

  const wrapResult = function (result) {
    if (result instanceof Promise) {
      var promise = result
      promise.then = function (onfulfilled, onrejected) {
        var nativeThenResult = Object.getPrototypeOf(this).then.call(
          this,
          onfulfilled,
          onrejected
        )
        return wrapResult(nativeThenResult)
      }
      promise.cancel = cancel
    }
    return result
  }

  const req = window.fetch(reqInfo, Object.assign({ signal: signal }, reqInit))
  return wrapResult(req)
}
// ===========
const req = cancelableFetch('/api/config')
  .then((res) => res.json())
  .catch((err) => {
    if (err.code === DOMException.ABORT_ERR) {
      console.log('Request canceled.')
    } else {
      // handle error
    }
  })

setTimeout(() => req.cancel(), 2000)

/**
 * Run a (anonymous) function recursivly a countdown number of
 * times until condition are met or countdown is done.
 */
;({
  do({ countdown } = { countdown: 5 }) {
    console.log('Counting down: ' + countdown)
    countdown--
    // Do (asynk) work.
    if (countdown !== 0) setTimeout(() => this.do({ countdown }), 1000)
  },
}.do())

/**
 * Return a random boolean.
 * Result: a 50/50 change on returning true of false
 */
const randomBoolean = () => Math.random() >= 0.5
console.log(randomBoolean())

/**
 * Check if the provided day is a weekday.
 * Using this method, you’ll be able to check
 * if the date that you provide in the function
 * is either a weekday or weekend day.
 */
const isWeekday = (date) => date.getDay() % 6 !== 0
console.log(isWeekday(new Date(2021, 0, 11)))
// Result: true (Monday)
console.log(isWeekday(new Date(2021, 0, 10)))
// Result: false (Sunday)

/**
 * Check if the current tab is in view / focus.
 * We can check if the current tab is in view / focus
 * by using the document.hidden property.
 */
const isBrowserTabInView = () => document.hidden
isBrowserTabInView()
// Result: returns true or false depending on
// if tab is in view / focus

/**
 * Check if a number is even or odd.
 * A super simple task that can be solved by using the modulo
 * operator (%). If you’re not too familiar with it, here’s a
 * nice visual explanation on Stack Overflow.
 */
const isEven = (num) => num % 2 === 0
console.log(isEven(2))
// Result: true
console.log(isEven(3))
// Result: false

/**
 * Get the time from a date.
 * By using the .toTimeString() method and slicing the string at the
 * correct place, we can get the time from a date that we provide,
 * or get the current time.
 */
const timeFromDate = (date) => date.toTimeString().slice(0, 8)
console.log(timeFromDate(new Date(2021, 0, 10, 17, 30, 0)))
// Result: "17:30:00"
console.log(timeFromDate(new Date()))
// Result: will log the current time

/**
 * Truncate a number to a fixed decimal point.
 * Using the Math.pow() method, we can truncate a number to a certain
 * decimal point that we provide in the function.
 */
const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed)
// Examples
toFixed(25.198726354, 1) // 25.1
toFixed(25.198726354, 2) // 25.19
toFixed(25.198726354, 3) // 25.198
toFixed(25.198726354, 4) // 25.1987
toFixed(25.198726354, 5) // 25.19872
toFixed(25.198726354, 6) // 25.198726

/**
 * Check if an element is currently in focus.
 * We can check if an element is currently in focus using the
 * document.activeElement property.
 */
const elementIsInFocus = (el) => el === document.activeElement
elementIsInFocus(anyElement)
// Result: will return true if in focus, false if not in focus

/**
 * Check if the current user has touch events supported
 */
const touchSupported = () =>
  'ontouchstart' in window ||
  (window.DocumentTouch && document instanceof window.DocumentTouch)
console.log(touchSupported())
// Result: will return true if touch events are supported, false if not

/**
 * Check if the current user is on an Apple device.
 * We can use navigator.platform to check if the current user is
 * on an Apple device.
 */
const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform)
console.log(isAppleDevice)
// Result: will return true if user is on an Apple device

/**
 * Scroll to top of the page.
 * The window.scrollTo() method will take an x- and y-coordinate to
 * scroll to. If we set these to zero and zero, we’ll scroll to the
 * top of the page.
 */
const goToTop = () => window.scrollTo(0, 0)
goToTop()
// Result: will scroll the browser to the top of the page

/**
 * Get average value of arguments.
 * We can use the reduce method to get the average value of the
 * arguments that we provide in this function.
 */
const average = (...args) => args.reduce((a, b) => a + b) / args.length
average(1, 2, 3, 4)
// Result: 2.5

/**
 * Convert Fahrenheit / Celsius.
 * Dealing with temperatures can be confusing at times. These 2 functions
 * will help you convert Fahrenheit to Celsius and the other way around.
 */
const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32
const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9
// Examples
celsiusToFahrenheit(15) // 59
celsiusToFahrenheit(0) // 32
celsiusToFahrenheit(-20) // -4
fahrenheitToCelsius(59) // 15
fahrenheitToCelsius(32) // 0

/**
 * Get selected text on webpage
 */
const getSelectedText = () => window.getSelection().toString()


/**
 * Serialize a function together with environment variables.
 */

// First, what we want to serialize.
 const a = 123, b = 'hello';
 function test(x, y) {
   console.log(this);
   return a + x + b + y;
 }
 
 // Serialize a function *with its captured environment*
 const sf = serializeFn().serialize(test, { a: a, b: b });
 
 // Deserialize with captured environment
 const pf = serializeFn().parse(sf);
 
 // And call it
 console.log(pf(10, ', world'));

 function serializeFn() {
     const serialize = (f, env) => JSON.stringify({ src: f.toString(), env: env });
     const parse = (serialized) => {
         const parsed = JSON.parse(serialized);
         return createFunction(parsed.src, parsed.env || {});
     }
     const createFunction = (src, env) => (new Function(createFunctionBody(src, env))(env));
     const createFunctionBody = (src, env) => '"use strict";\n' + Object.keys(env).reduceRight(addVar, 'return ' + src + ';');
     const addVar = (s, k) => 'var ' + k + ' = arguments[0].' + k + ';\n' + s;
     return {serialize,parse}
 }
 

 /**
  * Create a hash of any string.
  */
 const hashCode = s => s.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0)
 

 /**
  * Get text selection.
  */
  const getSelectedText = () => window.getSelection().toString();
  getSelectedText();


 /**
  * Copy to clipboard.
  */
  const copyToClipboard = (text) =>
  navigator.clipboard?.writeText && navigator.clipboard.writeText(text);
  copyToClipboard("Hello World");


  /**
   * Clear all cookies.
   */
   const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`));


   /**
    * Turn url query params into an object.
    */
    const getParameters = (URL) => {
      URL = JSON.parse('{"' + decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +'"}');
      return JSON.stringify(URL);
    };
    getParameters(window.location)
    // Result: { search : "easy", page : 3 }


    /**
     * Detect dark mode.
     */
     const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
     console.log(isDarkMode) // Result: True or False

     /**
      * Scroll to top / bottom.
      */
      const scrollToTop = (element) =>
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      const scrollToBottom = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "end" });

  /**
   * Tries to execute a function until it does not return falsey, 'attempts' number of times.
   * 
   */
  // Try to execute a function until it returns true or it times out.

  function asyncRetrier(fn, attempts = 10, options = {}) {
    const defaultOptions = { delay: 1000, args: [] };
    const { delay, args } = { ...defaultOptions, ...options };
    const totalAttempts = attempts;
    return new Promise((resolve, reject) => {
      wrapper(fn, args)();
      function wrapper(fn, args) {
        attempts--;
        console.log(attempts, args);
        return async () => {
          const result = await fn(...args);
          if (!!result)
            resolve({
              result,
              status: 'Success',
              attempts: totalAttempts - attempts,
            });
          else if (attempts === 0)
            reject({
              result: undefined,
              status: `Tried ${totalAttempts - attempts} times but failed all.`,
              attempts: totalAttempts - attempts,
            });
          else setTimeout(() => wrapper(fn, args)(...args), delay, attempts);
        };
      }
    });
  }
  
  function testFunction(str) {
    return Math.random() - 0.5 > 0 ? str : false;
  }
  
  asyncRetrier(testFunction, 5, { delay: 1000, args: ['myString'] })
    .then(res =>
      console.log(`Success after ${res.attempts} attempts, got => `, res.result),
    )
    .catch(err => console.log(err.status));
  
/**
 * Create UUID
 */
  function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const userID=uuid(); //something like: "ec0c22fa-f909-48da-92cb-db17ecdb91c5"