
# Hooks 

## Notes

Advantages of hooks.

* No need to use class components: Components are less verbose
* No need to use class components: No need to bind the value of `this` for all methods.
* No need to use class components: No need to deliberate over the use of a class or a function component.
* Variables can be shorter. i.e. `name` and `setName` can replace `this.state.name` and `this.setState({ name: newName });`.
* State variables are kept separate. Instead of a store object that holds many variables, we just have many variables.
* It is not necessecary to duplicate code within the lifecycle hook methods `componentWillMount` and `componentDidUpdate`. Instead, `useEffect` can be used for both.
* Set up and tear down procedures are segregated into pairs.
* Cross cutting of concerns may be achieved with custom hooks: No HOCs resulting in complex composition or wrapper hell.
* Cross cutting of concerns may be achieved with custom hooks: Easier to test resuable functionality - in isolation.
* Consuming context in a component does not require extra nested markup. One can simply call `context = useContext(ThemeContext)`
* Unlike `componentDidMount` and `componentDidUpdate`, `useEffect` does not block the browser from repainting.

## useState

```
const [count, setCount] = useState(0);
```

When you need to reference existing state while setting a new state, a callback function pattern is used:

```
setCount(prevCount => prevCount + 1);
```

Note that it is always safe to omit the setter function from dependency lists.

## useEffect

```
const [count, setCount] = useState(0);
useEffect(() => {
	document.title = `You have ${count} items.`;
});

const [width, setWidth] = useState(window.innerWidth);
useEffect(() => {
	const handleResize = () => setWidth(window.innerWidth);
	window.addEventListener('resize', handleResize);
	return () => {
		window.removeEventListener('resize', handleResize);
	};
});
```

`useEffect` executes asynchronously to the painting of the component, running after this, and therefore do not block the painting. When effects need to happen synchronously, use `useLayoutEffect`.
The function passed to `useEffect` (and by extension, the cleanup function that this passed-in function returns) is destroyed, recreated, and rerun upon every render. This is to keep variables from going stale. Performance gains may be achieved by forcing the passed in function to skip running, by passing in an array of dependancies as a second argument. When this is done, the function is only recreated and run if any of the variables in the dependencies array have changed.

```
const [count, setCount] = useState(0);
useEffect(() => {
	document.title = `You have ${count} items.`;
}, [count]);
```

Passing in an empty array makes it so that the function is never-recreated / re-run.

```
const [count, setCount] = useState(0);
useEffect(() => {
document.title = `You have ${count} items.`; // Will always show '0'.
}, []);
```
 
## useContext

```
import { ThemeContext } from './contextProvider.js';
import React, { useContext } from 'react';
const theme = useContext(ThemeContext);
```

Any component that utilises the useContext hook will be re-rendered when the context value changes.
NB: While `useContext` circumvents the need to have a `ThemeContext.Consumer` in the ReactDOM tree, it is still necessary to have a `ThemeContext.Provider` node further up in the ReactDOM tree.
 
## Custom hooks

# Basic custom component

```
function MyComponent() {
	const width = useWindowWidth();
	return (
		{width}
	);
}
function useWindowWidth() {
	const [width, setWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
	return width;
}
```

# Form input
```
function MyComponent() {
	const name = useFormInput('Mary');
	const surname = useFormInput('Poppins');
	return (
		<input {...name} />
		<input {...surname} />
	);
}
function useFormInput(initialValue) {
	const [value, setValue] = useState(initialValue);
	function handleChange(e) {
		setValue(e.target.value);
	}
	return { value, onChange: setValue };
}
```
 
# useReducer

`useReducer` is an alternative to `useState` when it comes to managing state in a component. It can be advantageous over `useState`, when complex state management is required:

* It circumvents the need to have dozens of state variables and state callbacks. Instead, just the one reducer function can be supplied.
* It circumvents the need to pass dozens of state callbacks down into nested components. Instead, just the one reducer function can be supplied.

```
const initialState = {count: 0};

function reducer(state, action) {
	switch (action.type) {
		case 'increment':
			return {count: state.count + 1};
		case 'decrement':
			return {count: state.count - 1};
		default:
			throw new Error();
	}
}

function Counter() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<div>
			Count: {state.count}
			<button onClick={() => dispatch({type: 'decrement'})}>-
			<button onClick={() => dispatch({type: 'increment'})}>+
		</div>
	);
}
```

## useCallback / useMemo

Stores a callback function or computed value. Takes an array of dependancies as a second argument. The callback function or computed value is recreated when one or more of the values in the array changes.

```
useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).
```

If an empty array of dependencies are passed to `useCallback`, the function never updates.


## useRef

`useRef` returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.
Can be used to store references to DOM nodes, but also general purpose objects.

```
function TextInputWithFocusButton() {
	const inputEl = useRef(null);
	const onButtonClick = () => {
		inputEl.current.focus();
	};
	return (
		<div>
			<input ref={inputEl} type="text" />
			<button onClick={onButtonClick}>Focus the input
		</div>
	);
}
```

## useDebugValue

Used to show a label in dev tools.
 
# Redux

## Vs flux

* Redux has a single store, not many.
* Redux is immutable, not mutable, and as such, permits state time-travel.
 
# Build pipelines and linting

The following build pipeline methodologies are available:

* minimal - i.e. Only use a react script in the head of the document, and then use non-JSX syntax.
* manual - i.e. Create your own sophisitcated ecosystem of scripts and configuration files.
* create-react-app
* create-react-app, with eject, and customisations
* Gatsby
* Nwb
* Neutrino

Gatsby appears to be similar to `create-react-app`, but with the following advantages:

* System is more carefully designed to make apps load as fast as possible.
* Configuration can be done without the ungraceful ejection.
* Configurations can be saved as enities known as "themes". Themes may be reused, singularly, or collectively, as a composite configuration.

Gatsby is marked by a few other definitive features, but it is unclear if these ones are particularly helpful:

* There is an ecosystem of plugins.
* A unified GraphQL API abstracts out other APIs.

Being able to customise a React app build pipeline gives control, most usefully, over the follwing specific things:

* Linting rules
* Locations of files
* Bundling, loading and preloading behaviour

To easily create a react app with custom linting:

* Run `npx create-react-app my-app`
* Run `cd my-app && npm run eject`
* Comment out (or skillfully adjust) the linting portion of the webpack config file.
* Install eslint as a separate tool: `npn i -D eslint && ./node_modules/.bin/eslint --init`
* For convenience, create a shortcut for the linting script within package.json: `./node_modules/.bin/eslint yourfile.js`
* To run linting, you may now use: `npm run lint -- ./src`

# Testing

The following tools are commonly used for testing:

* Storybook: Toolkit that lets you easily catalog, view, debug and even develop UI components in isolation.
* Jest: Modern javascript test runner.
* React testing library: Helpers for react testing.
* jsdom: An approximation of the DOM that can run in a nodeJS environment.
* Percy: Visual test runner. Compares cannonical bitmaps with bitmaps generated during tests to ensure that nothing has regressed.

Testing components in react is usually done around a basic methodology involving rendering a component into a jsdom DOM, and then asserting that portions of it (i.e. the textual content of a h1 element) matches the string that was expected.
It's worth noting that Jest is easier to set up when the app was created using `create-react-app`.

# Storybook

To set up storybook:

* In the project directory, run: `npx -p @storybook/cli sb init`