
/**
 * Load SVG image vs. inline SVG.
 * Inline SVG has the advantage of beeing accessible
 * for CSS animation from React. Inline also loads faster.
 * First the img way.
 */
 import myIcon from './relative/path/to/icon.svg'

 // In render method.
 <img src={myIcon} alt="icon" />
 
 // ...now inline
 import { ReactComponent as MyIcon } from "./icon.svg"
 
 // In render method.
 <MyIcon /> // or...
 <MyIcon className="someClassThatWillBeUsedInCSS" alt="icon" />
 
 
 /**
  * Implement useState with useReducer.
  */
 const [name, setName] = useReducer((_, value) => value, 'James');
 <input value={name} onChange={e => setName(e.target.value)} />
 
 
 /**
  * Manually Re-render a Component.
  */
 const [, rerender] = useState()
 rerender({})
 ...or...
 const [, rerender] = useReducer(x => x + 1, 0);
 rerender()
 
 
 /**
  * Pass a Function to setState
  */
 const [count, setCount] = useState(0)
 setCount(c => c + 1)
 
 // Example
 const [count, setCount] = useState(0)
 useEffect(() => {
   const id = setInterval(() => {
     setCount(c => c + 1);
   }, 1000);
   return () => clearInterval(id);
 }, []);
 
 
 /**
  * String Values as HTML Elements
  */
 const Button = ({ Component = 'button', ...props }) => <Component {...props} />
 
 <Button>A Button</Button> // Renders a button element
 <Button Component="a">A Link</Button> // Renders an anchor element
 
 
 /**
  * React Keys with Fragments
  */
 pokemons.map(pokemon => (
   <React.Fragment key={pokemon}>
     <strong>Name: </strong>
     <span>{pokemon}</span>
   </React.Fragment>
 ))
 
 /**
  * Implicit create JSX Elements and nested elements.
  */
  const element = // JSX
  React.createElement("div", null, React.createElement("h1", {
    className: "greeting"
  }, "Hello, world!"), React.createElement("p", null, " lalalalala "));

  /**
   * Cacellable fetch and clean up in react
   */
   export default function User({ id }) {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      let controller = new AbortController();
      (async () => {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`,
            {
              signal: controller.signal,
            },
          );
          setUser(await response.json());
          controller = null;
        } catch (e) {
          // Handle the error
        }
      })();
      // clean up function
      return () => controller?.abort();
      // add a dependency array
    }, [id]);
  
    return (
      <div>
        {user === null ? (
          <p>Loading user's data ...</p>
        ) : (
          <pre key={user.id}>{user.name}</pre>
        )}
      </div>
    );
  };