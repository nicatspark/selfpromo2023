/**
 * Examples from https://medium.com/javascript-in-plain-english/the-proxy-api-is-so-powerful-that-every-web-developer-should-master-it-9bdc71a4032c
 */

const p = new Proxy(target, handler)
// target: the target object to wrap with Proxy (can be any type of object, including native arrays, functions, or even another proxy).
// handler: an object that defines which operations will be intercepted and how to redefine intercepted operations.

/**
 * Basic usage.
 */
 const man = {
    name: "Joe",
  };
  const proxy = new Proxy(man, {
    get(target, property, receiver) {
      console.log(`Accessing the ${property} property`);
      return target[property];
    },
  });
  console.log(proxy.name); // log: Accessing the name property \n Joe
  console.log(proxy.age); // log: Accessing the age property \n undefined

/**
 * When creating a Proxy object, in addition to defining the get trap, we can also define other traps, such as has, set, delete, apply or ownKeys, etc.
 * 
 * handler.get: is a trap for getting a property value.
 * handler.set: is a trap for setting a property value.
 * handler.has: is a trap for the in operator.
 * handler.deleteProperty: is a trap for the delete operator.
 * handler.ownKeys: is a trap for Reflect.ownKeys().
 * 
 * Note that all traps are optional. If no trap is defined, the default behavior 
 * of the source object is preserved. After reading the introduction of the traps 
 * above, do you think the Proxy API is very powerful?
 */

/**
 * Example 1
 * Enhanced Array
 */
function enhancedArray(arr) {
    return new Proxy(arr, {
        get(target, property, receiver) {
        const range = getRange(property);
        const indices = range ? range : getIndices(property);
        const values = indices.map((index) => {
            const key = index < 0 ? target.length + index : index;
            return Reflect.get(target, key, receiver);
        });
        return values.length === 1 ? values[0] : values;
        },
    });

    function getRange(str) {
        var [start, end] = str.split(":").map(Number);
        if (typeof end === "undefined") return false;

        let range = [];
        for (let i = start; i < end; i++) {
        range = range.concat(i);
        }
        return range;
    }

    function getIndices(str) {
        return str.split(",").map(Number);
    }
}

const arr = enhancedArray([10, 6, 8, 5, 2]);
console.log(arr[-1]); // 2
console.log(arr[[2, 4]]); // [ 8, 2 ]
console.log(arr[[2, -2, 1]]); // [ 8, 5, 6 ]
console.log(arr["2:4"]); // [ 8, 5 ]
console.log(arr["-2:3"]); // [ 5, 2, 10, 6, 8 ]

/**
 * Example 2
 * Enhanced Object
 */
 const enhancedObject = (target) =>
    new Proxy(target, {
        get(target, property) {
            if (property in target) {
            return target[property];
            } else {
            return getPropertyValue(property, target);
            }
        },
    });

    let value;
    function getPropertyValue(property, target) {
        value = null;
        for (const key of Object.keys(target)) {
        if (typeof target[key] === "object") {
            getPropertyValue(property, target[key]);
        } else if (typeof target[property] !== "undefined") {
            value = target[property];
            break;
        }
    }
    return value;
}
// Once we have the enhancedObject function, we can use it like this:
const data = enhancedObject({
    user: {
      name: "Joe",
      settings: {
        theme: "light",
      },
    },
});
console.log(data.user.settings.theme); // light
console.log(data.theme); // light
console.log(data.address); // null

/**
 * Example 3
 * Freeze Object
 */
 const man = { name: "Joe" };

 function freezeObject(obj) {
   return new Proxy(obj, {
     set() {
       return true;
     },
     deleteProperty() {
       return false;
     },
     defineProperty() {
       return true;
     },
     setPrototypeOf() {
       return true;
     },
   });
 }
 
 const freezedMan = freezeObject(man);
 
 //After defining the freeze function, let’s test its functionality:
 console.log(freezedMan.name); // Joe
 freezedMan.name = "Lolo"; 
 delete freezedMan.man; 
 freezedMan.age = 30;
 console.log(freezedMan); // { name: 'Joe' }

 /**
 * Example 4
 * Trace Method Call
 */
function traceMethodCall(obj) {
    const handler = {
      get(target, propKey, receiver) {
        const propValue = target[propKey]; // Get the original method
        return typeof propValue !== "function"
          ? propValue
          : function (...args) {
              const result = propValue.apply(this, args);
              console.log(
                `Call ${propKey} method -> ${JSON.stringify(result)}`
              );
              return result;
            };
      },
    };
    return new Proxy(obj, handler);
  }

// With the traceMethodCall function, we can use it to trace the method call of the specified object:
const man = {
    name: "Joe",
    say(msg) {
      return `${this.name} says: ${msg}`;
    },
};
const tracedObj = traceMethodCall(man);
tracedObj.say("Hello Proxy API"); 
// Call say method -> "Joe says: Hello Proxy API"

// In fact, in addition to being able to track method calls, we can also track access to properties in object.

/**
  * Example 5
  * Trace Property Access
  */
function tracePropertyAccess(obj, propKeys) {
    const propKeySet = new Set(propKeys);
    return new Proxy(obj, {
      get(target, propKey, receiver) {
        if (propKeySet.has(propKey)) {
          console.log("GET " + propKey);
        }
        return Reflect.get(target, propKey, receiver);
      },
      set(target, propKey, value, receiver) {
        if (propKeySet.has(propKey)) {
          console.log("SET " + propKey + "=" + value);
        }
        return Reflect.set(target, propKey, value, receiver);
      },
    });
}
// With the tracePropertyAccess function, we can use it to trace the property access of the specified object:
const man = {
    name: "Joe",
};
const tracedMan = tracePropertyAccess(man, ["name"]);
console.log(tracedMan.name); // GET name; Joe
console.log(tracedMan.age); // undefined
tracedMan.name = "Lolo"; // SET name=Lolo

/**
 * Example 6
 * Hide Property
 */
 function hideProperty(target, prefix = "_") {
    return new Proxy(target, {
      has: (obj, prop) => !prop.startsWith(prefix) && prop in obj,
      ownKeys: (obj) =>
        Reflect.ownKeys(obj).filter(
          (prop) => typeof prop !== "string" || !prop.startsWith(prefix)
        ),
      get: (obj, prop, rec) => (prop in rec ? obj[prop] : undefined),
    });
}

// With the hideProperty function, we can use it to hide properties starting with _(underscore):
const man = {
    name: "Joe",
    _pwd: "ProxyAPI",
};
const safeMan = hideProperty(man);
console.log(safeMan._pwd); // undefined
console.log("_pwd" in safeMan); // false
console.log(Object.keys(safeMan)); // [ 'name' ]

/**
 * Example 7
 * Sandbox
 * 
 * For JavaScript, the sandbox is not a sandbox in the traditional sense, 
 * it is just a security mechanism to run some untrusted code in the sandbox, 
 * so that it cannot access code outside the sandbox.
 */
 function sandbox(code) {
    code = "with (sandbox) {" + code + "}";
    const fn = new Function("sandbox", code);
  
    return function (sandbox) {
      const sandboxProxy = new Proxy(sandbox, {
        has(target, key) {
          return true;
        },
        get(target, key) {
          if (key === Symbol.unscopables) return undefined;
          return target[key];
        },
      });
      return fn(sandboxProxy);
    };
  }

// With the sandbox function, let’s verify its capabilities:
const man = {
    name: "Joe",
    log() {
      console.log("Hello Proxy API");
    },
};
let code = "log();console.log(name)";
sandbox(code)(man);

/**
 * Example 8
 * Builder
 *
 * The builder pattern decomposes a complex object into relatively simple parts, 
 * then creates them separately according to different needs, 
 * and finally builds the complex object. */

 function Builder(typeOrTemplate, template) {
    let type;
    if (typeOrTemplate instanceof Function) {
      type = typeOrTemplate;
    } else {
      template = typeOrTemplate;
    }
    const built = template ? Object.assign({}, template) : {};
    const builder = new Proxy(
      {},
      {
        get(target, prop) {
          if ("build" === prop) {
            if (type) {
              // A class name (identified by the constructor) was passed. Instantiate it with props.
              const obj = new type();
              return () => Object.assign(obj, Object.assign({}, built));
            } else {
              // No type information - just return the object.
              return () => built;
            }
          }
          return (...args) => {
            // If no arguments passed return current value.
            if (0 === args.length) {
              return built[prop.toString()];
            }
            built[prop.toString()] = args[0];
            return builder;
          };
        },
      }
    );
    return builder;
}

// With the Builder function, let’s look at two ways it can be used. The first way is to handle ordinary object:
const defaultUserInfo = {
    id: 1,
    userName: "Joe",
    email: "Joe@gmail.com",
};
const Joe = Builder(defaultUserInfo).id(2).build();
console.log(Joe);

// The second way is to handle the class:

class User {
    constructor() {}
}
const lolo = Builder(User, defaultUserInfo);
console.log(lolo.id(3).userName("Lolo").build());