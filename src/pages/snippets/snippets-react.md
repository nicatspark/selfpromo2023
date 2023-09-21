---
layout: '../../layouts/SnippetPost.astro'
title: 'React snippets'
description: ''
pubDate: 'Jan 7 2023'
---

##### Load SVG image vs. inline SVG

Inline SVG has the advantage of beeing accessible
for CSS animation from React. Inline also loads faster.
First the img way.

```jsx
 import myIcon from './relative/path/to/icon.svg'

 // In render method.
 <img src={myIcon} alt="icon" />

 // ...now inline
 import { ReactComponent as MyIcon } from "./icon.svg"

 // In render method.
 <MyIcon /> // or...
 <MyIcon className="someClassThatWillBeUsedInCSS" alt="icon" />
```

##### Implement useState with useReducer

```jsx
const [name, setName] = useReducer((_, value) => value, 'James')
;<input value={name} onChange={(e) => setName(e.target.value)} />
```

##### Manually Re-render a Component

```javascript
const [, rerender] = useState()
rerender({})
//...or...
const [, rerender] = useReducer((x) => x + 1, 0)
rerender()
```

##### Pass a Function to use useState

```javascript
const [count, setCount] = useState(0)
setCount((c) => c + 1)

// Example
const [count, setCount] = useState(0)
useEffect(() => {
  const id = setInterval(() => {
    setCount((c) => c + 1)
  }, 1000)
  return () => clearInterval(id)
}, [])
```

##### Define HTML Elements upon use

```jsx
 const Button = ({ Component = 'button', ...props }) => <Component {...props} />

 <Button>A Button</Button> // Renders a button element
 <Button Component="a">A Link</Button> // Renders an anchor element
```

##### React Keys with Fragments

```jsx
pokemons.map((pokemon) => (
  <React.Fragment key={pokemon}>
    <strong>Name: </strong>
    <span>{pokemon}</span>
  </React.Fragment>
))
```

##### Implicit create JSX Elements and nested elements

```jsx
const element = // JSX
  React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      {
        className: 'greeting',
      },
      'Hello, world!'
    ),
    React.createElement('p', null, ' lalalalala ')
  )
```

##### Cancellable fetch and clean up in react

```javascript
export default function User({ id }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let controller = new AbortController()
    ;(async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          {
            signal: controller.signal,
          }
        )
        setUser(await response.json())
        controller = null
      } catch (e) {
        // Handle the error
      }
    })()
    // clean up function
    return () => controller?.abort()
    // add a dependency array
  }, [id])

  return (
    <div>
      {user === null ? (
        <p>Loading user's data ...</p>
      ) : (
        <pre key={user.id}>{user.name}</pre>
      )}
    </div>
  )
}
```

##### Bake your own QueryClient ([Youtube](https://www.youtube.com/watch?v=zwQs4wXr9Bg))

In your client side rendered component you want to cache already fetched data.

```ts
function makeQueryClient() {
  const fetchMap = new Map<string, Promise<any>>()
  return function queryClient<QueryResult>(
    name: string,
    query: () => Promise<QueryResult>
  ): Promise<QueryResult> {
    if (!fetchMap.has(name)) {
      fetchMap.set(name, query())
    }
    return fetchMap.get(name)!
  }
}

const queryClient = makeQueryClient()
```

Then use it inside your component like...

```ts
const pokemon = use(
  queryClient<Pokemon[]>('pokemon', () =>
    fetch('http://localhost:3000/api/pokemon').then((res) => res.json())
  )
)
```

If you need to drill down more data, the `use` hook _can_ be conditional

```ts
const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>()

const pokemonDetail = selectedPokemon
  ? use(
      queryClient<Pokemon>(['pokemon', selectedPokemon.id].join('-'), () =>
        fetch(`http://localhost:3000/api/${selectedPokemon.id}`).then((res) =>
          res.json()
        )
      )
    )
  : null
```
