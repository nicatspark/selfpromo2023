// Async arrow functions look like this:

const foo = async () => {
  // do something
};
// Async arrow functions look like this for a single argument passed to it:

const foo = async evt => {
  // do something with evt
};
// The anonymous form works as well:

const foo = async function() {
  // do something
};
// An async function declaration looks like this:

async function foo() {
  // do something
}
// Using async function in a callback:

const foo = event.onCall(async () => {
  // do something
});


/**
 * Native fetch in a one-liner.
 */
const getPost = async (id) => {
  return await (await fetch(`https://jsonplaceholder.typicode.com/posts/${id}}`)).json()
}