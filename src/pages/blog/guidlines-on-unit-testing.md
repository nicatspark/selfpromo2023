---
layout: '../../layouts/BlogPost.astro'
title: 'Guidelines for frontend unit tests'
description: ''
pubDate: 'Jan 12 2023'
#heroImage: ''
---

##### Types of tests

Visual regression tests/Snapshot testing
The main purpose for snapshot testing is to ensure that components doesn't accidentally get changed. Scenario: a developer changes some code as part of a user story for Component A but is unaware that the same code is used for Component B, this would cause the snapshot test for Component B to fail, telling the developer to investigate if that change really was planned.

##### Rendering tests

Rendering tests follow the principle of "Given a set of props or state, a set of DOM elements should be rendered". These kind of tests serves both to ensure that the component behaves in the way we want, but also as a documentation of the component.

##### Logic tests

Logic tests asserts that the application changes when the user interacts with it. A key to writing successful logic tests is to render the component in a realistic context, meaning that rather than rendering the component explicitly in the test, render a component higher up in the component tree.

##### Logic tests using callbacks

For a component with callbacks, logic tests can be performed to ensure that when a user interacts with a component, a given callback is called with a specific set of arguments. These kind of tests are useful when dealing with shared components that need to uphold an interface to the consumer. The drawback of these tests are that they validate upon information not usable by the end user.

##### Mocking

Try mocking on as low level as possible, often meaning mocking the network request using MSW.

##### Libraries to use

We use React Testing Library exclusively with Jest as our testing framework. To intercept and mock network requests we use Mock Service Worker .

##### Do not import Enzyme!

Prefer the user-event library over the low level fireEvent .
What components to test
It is a good practice to build complex components by composition, that is by building them out of other more specific components. Breaking up a component this way makes it easier to work with. In many cases such components exist only for the sake of code readability and should not be tested in isolation. Writing tests for internal component hinders code refactoring and makes it hard to draw test boundaries.

Test a component as it will be used. If you distribute a package, only write tests for the components that you export from the package.

##### Accessibility

Write all tests from a user perspective. Find elements in the same way a real user would interact with the application. Never lookup elements using id or class and try to avoid relying on data-id. A user cannot see any of these identifiers. Furthermore class attributes should be used for styling purposes only.

Instead look for elements by their ARIA roles , their label text, finding links and buttons from their text, etc.

As a last resort data-id can be used where the text content and label do not make sense or is not practical.

##### Examples

Find a button by role.

```javascript
screen.getByRole('button')
```

Try to be as specific as possible by making use of the elements' accessibility names in the accessibility tree.

```javascript
const lastName = screen.getByRole('textbox', { name: /last_name/ })
userEvent.type(lastName, 'Smith')
```

Try to narrow down your search scope by using within.

```javascript
const form = screen.getByRole('form', { name: /edit_profile/ })
const button = within(form).getByRole('button', { name: /save/ })
```

##### Async updates

When testing components that are using React Query one must remember that there will be several updates to the component. These components usually render some intermediary loading state while waiting for the data to be fetched.

Use waitForElementToBeRemoved or similar to wait for the component to move from the loading state to its final state.

If the test should assert that a loading spinner is displayed during the loading state, make sure to add a considerable delay to the mocked data call in the MSW handler. Otherwise the component may update so fast that the loading state can go by unnoticed in some cases making it highly timing sensitive and thus unstable.

##### The not wrapped in act(...) warning

Sooner or later you'll run into the warning An update to Component inside a test was not wrapped in act(...).. The reason behind this warning is explained in this excellent blog post by Kent C. Dodds. In short every interaction with a component in a test must be wrapped in act(...). This informs React that we expect an update to happen when the user interacts with the component. When an interaction is not wrapped in act(...) and we get the warning it simply means that React has detected an update that is not covered by the test.

A common cause for the warning is that the component updates after an async operation has completed. Maybe a loading spinner is removed after a data fetch call completes, but the test is not asserting that. The waitForElementToBeRemoved is useful in these scenarios.

```javascript
await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));
Helper libraries such as user-event do wrap calls in act(...) so running userEvent.click(element) by itself is enough.
```

##### Use getBy, findBy or queryBy?

React Testing Library provides three versions of the element query methods: getBy*, findBy* and queryBy\*. The difference between them is outlined in detail in the manual . Use the most appropriate version to avoid unnecessary code.

##### Rules of thumb

Use getBy to find an element or to assert its existence:

```javascript
const button = screen.getByRole('button')
```

Use queryBy in conjunction with expect to assert non-existence:

```javascript
expect(screen.queryByRole('button')).not.toBeInDocument()
```

Use findBy when an element is expected but will be rendered after an async operation has completed:

```javascript
const button = await screen.findByRole('button')
```

##### MSW handlers

Avoid defining global MSW handlers that are shared with all tests. Each handler should be exported as a function that returns a handler. These can then be used as building blocks for composing a set of handlers that is specific to the needs of a particular test.

As an example consider a test that needs to fetch a gateway and a list of available firmware versions. To setup the handlers for such a test the use method is used.

```javascript
server.use(getGateway(), getFirmwares())
```

The getFirmwares method is then exported from a shared module containing all handler builders and could look something like:

```javascript
export const getFirmwares = () => {
  return rest.get(`/firmwares`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ firmwares: ['1.0', '2.0'] }))
  })
}
```

Notes on performance
We have noticed that some tests can take a lot of time to run. You can read more about it in the comment field here . In short we found that the query \*byRole can take a long time for large document trees. One way to improve that can be to use within to narrow down the scope of the query.

##### Do's and don'ts

Don't mock fetch, use MWS instead
Don't mock Redux/Context, use MWS instead
Writing tests that use rerender is typically a sign that the test should be rendering a parent component instead
Don't log to the console in tests. All logs outputted during tests needs to be investigated.
Code duplication in tests is fine, tests should be easy to read, verbose and easy to change
Discussion
Would it be a good idea to test data being sent to APIs?
