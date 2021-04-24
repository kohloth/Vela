# New object methods

* Object.setPrototypeOf(object, newPrototype)

# New string methods

* stringInstance.startsWith(testString)
* stringInstance.endsWith(testString)
* stringInstance.repeat(nTimes)

# Arrow functions

* A mini function.
* Shorter syntax.
* Lacks own `this` binding, and `arguments` object.
* Ill-suited as a method.
* Cannot be used as a constructor. Do not have a prototype property.
* Lexical `this` binding.
* The `use strict` pragma is not applicable.
* Can be used with `call` and `apply`, but such contrivances have no effect.
* When returning object literals, the object literal must be wrapped in brackets: `var func = () => ({ foo: 1 });`

# Classes

* Classes are just an abstraction of prototypes.
* Class declarations are not hoisted.
* `super()` must be called within the `constructor` method of an extending class:
	* Before accessing `this`, and
	* If the `constructor` method does not return an object to be used in lieu of the class instance itself.
* Static methods can be defined by prefixing a method with the `static` keyword. Note that this is the same as writing something like: `class Foo(){}; Foo.bar = function() {};`
* Public and private field declarations are an experimental feature, but for now, instance properties must be defined inside of class methods, and static class-side properties and prototype data properties must be defined outside of the ClassBody declaration.
* As of 2019, IE does not support classes.

```
class Rectangle {
	height; // Public field declaration
	#width; // Private field declaration
	constructor(height, width) {
		this.height = height;
		this.width = width;
	}
}
```

# Enhanced object literals

```
let color = 'red';
let part = 'wing';
let myObj = {
	[color + part]: true, // Computed property names
	color, // Property value shorthand
	doThings() { ... } // Shorthand method definition
}
```

# Template strings

* Backtick syntax allows expression interpolation, and multiline strings.
* Expression interpolation may be nested. ``mystring ${`things`}``
* Tagged templates may be used to generate text with more complex conditionality.

# Destructuring

Array destructuring
```
let [a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20
```

Array destructuring, with rest operator
```
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]
```

Array destructuring, with default
```
let [a = 5, b = 5, c = 5] = [10, 20];
console.log(a); // 10
console.log(b); // 20
console.log(c); // 5
```

Object destructuring
```
let {dessert, flavour} = {dessert: 'Ice cream', flavour: 'Strawberry', 'price': 'Too much'};
console.log(dessert); // 'Ice cream'
console.log(flavour); // 'Strawberry'
console.log(price) // Undefined
```

Object destructuring, with rest operator
```
({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}
```

Object destructuring, with prior declaration
```
// Note the use of brackets on line 2. This is required to prevent the engine from interpreting
// the {} as a block.
let dessert, flavour;
({dessert, flavour} = {dessert: 'Ice cream', flavour: 'Strawberry', 'price': 'Too much'});
```

Object destructuring, with default values
```
let {
	dessert = 'Cake',
	flavour = 'Strawberry',
	size = 'Lots'
} = {
	dessert: 'Ice cream',
	flavour: 'Strawberry',
	'price': 'Too much'
};
console.log(dessert); // 'Ice cream'
console.log(flavour); // 'Strawberry'
console.log(price) // Undefined
console.log(size); // 'Lots'
```

Object destructuring, with default values and new variable names
```
let {
	dessert: myDessert,
	flavour: awesomeFlavour = 'Banoffee',
	size: dessertAmount = 'Lots'
} = {
	dessert: 'Ice cream',
	flavour: undefined,
	price: 'Too much'
};
console.log(myDessert); // 'Ice cream'
console.log(awesomeFlavour); // 'Banoffee'
console.log(dessertAmount); // 'Lots'
```

```
function orderDessert({
	dessert = 'Ice cream',
	flavour = 'Vanilla',
	size = 'Medium'
} = {}) {
	console.log({dessert, flavour, size});
}
orderDessert({
	flavour: 'Chocolate'
});
```

It is worth noting that in accorance with the ES6 specification, when objects are iterated with constructs that were designed to follow a specific order, that order is:

* Numeric keys first, in ascending, numeric order
* String keys second, in the order in which they were added.
* Symbol keys last, in the order in which they were added.

Iteration constructs that respect order:

* Object.getOwnPropertyNames()
* Object.getOwnPropertySymbols()
* Reflect.ownKeys

Iteration constructs that do not respect order:

* for-in
* Object.keys()

# Spread

```
myFunction(...iterableObj); // For function calls
[...iterableObj, 1, 'ten']; // For array literals or strings
let objClone = { ...obj }; // For object literal
[...myObj] // This will fail, as myObj is not iterable, and we are trying to spread into an array.
```

* Can be used to copy and concatenate objects and arrays.
* Can be used instead of apply. Allows constructors to be used with an array of parameters.

# let + const

* `let` is like `var`, but restricts the scope of the variable to the block it is defined within (and all descentant blocks). A variable declared with `let` may not be declared again within the same scope.
* At the top level, `let`, unlike `var`, does not create a property on the global object. This helps prevent the accidental overriding of important global properties.
* `let` can be used within a for loop initialiser block, circumventing the need for a IIFE.
* As an alternative to inner functions, `let` can be used inside brackets `{}` to create a private / sheilded block of code.
* `let` variables are not hoisted like `var` variables. They are said to exist in the TDZ. They can only be used after they have been declared and defined. Using the normally safe `typeof` operator to inspect a variable in the TDZ will raise an error.
* `const` is like `let`, but the value may not be changed.

# Set + WeakSet

A set is a data type that can be used to house unique values. Attempting to add a value to a set that already exists in the set will have no effect.

* Set properties are:
	* size
* Set methods are: add(value) delete(value) has(value) clear() values() keys() entries() foreach().
* The `add` method returns the set, allowing chainability.
* The `forEach` method iterates over items in the same order that they were added.
* A set may be constructed with an iterable:
	* `new Set([1, 2, 3])`
	* `new Set('hello')`
* Object equality in a set is based on the internal reference identity, and not the shape of the object.
* In comparison to a Set, a WeakSet bears the following idosyncrasies:
	* WeakSets can only contain objects.
	* WeakSets are not enumerable. They have no `entries, keys, values` iterators, and they have no `forEach` method.
	* WeakSets have no `clear` method.
	* WeakSets are weak: Objects within them may be garbage collected if other references to these objects are deleted.

With this in mind, weaksets are only useful for the purpose of tagging objects that have a certain status.

# Map + WeakMap

* The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.
* A for...of loop returns an array of [key, value] for each iteration.
* A map is similar to an object literal, but it grants the following advantages:

* A map entry can have absolutely anything as it's key
* A map iteration routine will invariably access items in the order in which they were added to the map
* It is easy to get the number of items in a map, with the `size` property.
* A map is an iterable, and can be iterated with a for...of loop.
* A map is cleaner - it's prototype is always simply `Map`.


* A map has the following methods: add(key, value), has(key), get(key), delete(key), clear(), values(), keys(), entries(), forEach().
* The `add` method returns the set, allowing chainability.

Relationship with arrays:
```
var kvArray = [['key1', 'value1'], ['key2', 'value2']];

// Use the regular Map constructor to transform a 2D key-value Array into a map
// If a key appears more than once, the value associated with the last
// duplicate overrides the formers.
var myMap = new Map(kvArray);

myMap.get('key1'); // returns "value1"

// Use the Array.from function to transform a map into a 2D key-value Array
console.log(Array.from(myMap)); // Will show you exactly the same Array as kvArray

// A more succinct way to do the same with spread syntax
console.log([...myMap]);
```

A WeakMap is like a Map, except for the following differences:

* An item in a WeakSet can only be keyed by an object.
* WeakMaps are not enumerable. They have no `entries, keys, values` iterators, and they have no `forEach` method.
* WeakMaps have no `clear` method.
* WeakMaps are weak: Objects within them may be garbage collected if other references to the keys that index these objects are deleted.

# Promises

Creating immediately resolved / rejected promises
```
return Promise.resolve('larry');
return Promise.reject('Could not get username');
```

Consuming a promise
```
function asyncThing() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve('waddap');
		}, 300);
	});
}
asyncThing().then((message) =&gt; {
	console.log(message);
});
```

Consuming a promise or handing rejection.
```
function asyncThing() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve('waddap');
		}, 300);
	});
}
asyncThing().then((message) =&gt; {
	console.log(message);
}, (errorMessage) =&gt; {
	console.log(errorMessage);
});
```

Consuming, catching an error, finally.
```
function getUserList() {
	return new Promise(function(resolve, reject) {
		try {
			ajax(userListUrl, function(userData) {
				resolve(userData);
			});
		} catch (e) {
			reject();
		}
	});
}
showLoadIndicator();
getUserList().then((userList) =&gt; {
	document.querySelector('.result').innerHTML = userList;
}).catch((errorMessage) =&gt; {
	document.querySelector('.result').innerHTML = errorMessage;
}).finally(() =&gt; {
	removeLoadIndicator();
});
```

Running several promises in a block
```
// If the iterable contains non-promise values, they will be ignored, but still counted
// in the returned promise array value (if the promise is fulfilled)
var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("foo");
	}, 100);
}); 

Promise.all([p1, p2, p3]).then(values => { 
	console.log(values); // [3, 1337, "foo"] 
});
```



# Symbols
* Symbols can be created using either of the following two methods:
	* let sym = Symbol('To access the shopping basket.');
	* let sym = Symbol.for('user.basket');

* The argument given to the `Symbol` method is simply a description that can be used in debugging.
* The argument given to the `Symbol.for` method is actually a string key. If a symbol with this key already exists, javascript returns that symbol from the global symbol registry. If it does not, javascript creates a new symbol, inserts it into the registry, and returns it.
* Symbols are not created using the `new` keyword.

* The usefulness of symbols is questionable, as:
	* If robustly unique keys are desired, objects can be used as keys when maps are leveraged.
	* Symbols do not work well cross-realm, unless Symbol.for is used. However, creating a key based upon a string key to avoid the use of string keys is arguably contrived.
	* Object (or map) properties can be somewhat hidden from the public scope - by means of zealously guarding the relevant symbol keys. However, there are ways of getting an object's symbols from public scope - for example, `obj.getOwnPropertySymbols()`
	* They provide a way to make properties inenumerable. However, a mechanism for this effect already exists in the form of `Object.defineProperty`.
	* String keys work perfectly well.
* Symbols are useful, however, as:
	* Well-known symbols provide a robust way to access language internals.

# Iterators + generators


* Iterator: A function that returns a stateful object with a next() method, which in turn, returns an object of the shape `{value: x, done: x}`.
* Generator: A function, marked with an asterisk, and containing the yield statement, that returns an iterator object when called.
* Iterable: An object that houses a generator, keyed under the well-known symbol `Symbol.iterator`

It is possbile to implement a generator using pre-ES6 features. However, ES6 simplifies the process.
Pre-ES6 generator
```
function IterableObject(itemsArray) {
	this.internalPointer = 0;
	this.items = itemsArray;
}
IterableObject.prototype.generator = function() {
	var scope = this;
	return {
		next: function() {
			var done = scope.internalPointer >= scope.items.length;
			var value = done ? undefined : scope.items[scope.internalPointer++];
			return {done: done, value: value};
		}
	};
};
var myIterable = new IterableObject([1, 2, 3]);
var iterator = myIterable.generator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

ES6 generator (NB: This example is contrived)
```
function IterableObject(itemsArray) {
	this.internalPointer = 0;
	this.items = itemsArray;
}
IterableObject.prototype.generator = function *() {
	yield this.items[0];
	yield this.items[1];
	yield this.items[2];
};
var myIterable = new IterableObject([1, 2, 3]);
var iterator = myIterable.generator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

The generator in the ES6 example immediately above could more usefully be written like this:
```
IterableObject.prototype.generator = function *() {
for (var i = 0; i < this.items.length; i++) {
yield this.items[i];
}
};
```

The above culminates in a complete code figure when the generator is housed upon the object under `Symbol.iterator`. This makes the object a fully-fleged iterable, and it becomes malleable under `for...of` and the spread operator.
```
function IterableObject(itemsArray) {
	this.internalPointer = 0;
	this.items = itemsArray;
}
IterableObject.prototype[Symbol.iterator] = function *() {
	for (var i = 0; i < this.items.length; i++) {
		yield this.items[i];
	}
};
var myIterable = new IterableObject([1, 2, 3]);
for (var currentItem of myIterable) {
	console.log(currentItem);
} // 1, 2, 3
console.log([...myIterable]); // [1, 2, 3]
```

Iterators / generators may be delegated to by other iterators / generators by means of the `yield *otherGen()` syntax.
```
function *numberGen() {
	yeild 1;
	yeild 2;
}
function *colorGen() {
	yeild 'red';
	yeild 'yellow';
}
function *combinedGen() {
	yeild *numberGen();
	yeild *colorGen();
	yeild true;
}
var iterator = combinedGen();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: "red", done: false }
console.log(iterator.next()); // { value: "yellow", done: false }
console.log(iterator.next()); // { value: true, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

A return statement may be used inside an iterator instead of a yeild statement. Doing so makes the subsequent call to the interator.next() method return done true, and a value of the returned value - regardless of any subsequent yeild statements. Following calls return done true and undefined as the value. The spread operator and for-of loops ignore any value returned by return, as they immediately stop executing when done is true.
Return statements within generators can be used to seed the parameters of delegating generators:
```
function *numberGen() {
	yield 1;
	yield 2;
	return 3;
}

function *repeatingGen(numberOfTimesToRepeat) {
	let numbers = ['one', 'two', 'three'];
	for (let i = 0; i < numberOfTimesToRepeat; i++) {
		yield numbers[i];
	}
}

function *combinedGen() {
	let result = yield *numberGen(); // 3
	yield *repeatingGen(result);
}

var iterator = combinedGen();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 'one', done: false }
console.log(iterator.next()); // { value: 'two', done: false }
console.log(iterator.next()); // { value: 'three', done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

Iterators can be made to throw errors. Errors may also be caught from within the generator function.
The array object prototype houses generators at 4 locations. Symbol.iterator, values(), keys(), and entries(). values() is an alias of Symbol.iterator.
```
let myArray = [1, 2, 3];
for (var item of myArray) {
	console.log(item);
} // 1, 2, 3
for (var item of myArray.values()) {
	console.log(item);
} // 1, 2, 3
for (var item of myArray.keys()) {
	console.log(item);
} // 0, 1, 2
for (var item of myArray.entries()) {
	console.log(item);
} // [0, 1], [1, 2], [2, 3]
```

Iterables, iterators and generators are useful, as they allow imperative iteration instructions to come under the realm of the object itself.
In ES6, arrays, sets, maps and strings are all iterables. All except string have the four generators shown above. String only has a generator at `Symbol.iterator`. The default iterable for maps is `entries`.
Using the for-of to iterate strings is preferrable to using for, as for relies upon bracket notion. Bracket notation, in turn, operates on code-points and not characters. Therefore, unexpected results can occur when working with strings that contain double-byte characters.
As iterator / generator functions pause, they can be used to establish patterns that manage asynchronous code. However, promises and async / await are the modern tools that are more suited to this purpose.
Technical details:

* The `yield` keyword can only exist as a direct child of the generator function. It cannot appear within a nested forEach callback, for instance.
* When used on a generator function, the `typeof` operator simply returns `function`.
* Generators can be created with a function declaration or function expression. However, arrow functions cannot be generators. There is a syntax for creating a generator object property using method shorthand, which involves prepending the property name with an asterisk: `myObj = { *generator(){} };`

# for..of

For...of is a language construct that is used to iterate iterable objects / generators. By default, it can be used by the following:

* Array
* Map
* Set
* String
* NodeList
* arguments
* Any result of a call to a generator function

# proxies and the reflect API

A proxy object is an object linked to a target object. Developers work with the proxy instead of the target object. Such a set up allows developers to intercept low level operations upon the target object with traps, thereby creating exotic behaviours.

Proxy trap
Overrides the behaviour of
Default behavior

get
Reading a property value
Reflect.get()

set
Writing to a property
Reflect.set()

has
The `in` operator
Reflect.has()

deleteProperty
The `delete` operator
Reflect.deleteProperty()

getPrototypeOf
Object.getPrototypeOf()
Reflect.getPrototypeOf()

setPrototypeOf
Object.setPrototypeOf()
Reflect.setPrototypeOf()

isExtensible
Object.isExtensible()
Reflect.isExtensible()

preventExtensions
Object.preventExtensions()
Reflect.preventExtensions()

getOwnPropertyDescriptor
Object.getOwnPropertyDescriptor()
Reflect.getOwnPropertyDescriptor()

defineProperty
Object.defineProperty()
Reflect.defineProperty()

ownKeys
Object.keys(), Object.getOwnPropertyNames(), Object.getOwnPropertySymbols()
Reflect.ownKeys()

apply
Calling a function
Reflect.apply()

construct
Calling a function with `new`
Reflect.construct()

```
let target = {};
let proxy = new Proxy(target, {
	set(trapTarget, key, value, receiver) {
		// ignore existing properties so as not to affect them
		if (!trapTarget.hasOwnProperty(key)) {
			if (isNaN(value)) {
				throw new TypeError("Property must be a number.");
			}
		}
		// add the property
		return Reflect.set(trapTarget, key, value, receiver);
	},
	get(trapTarget, key, receiver) {
		if (!(key in receiver)) {
			throw new TypeError("Property " + key + " doesn't exist.");
		}
		return Reflect.get(trapTarget, key, receiver);
	},
	has(trapTarget, key) {
		if (key === "value") {
			return false;
		} else {
			return Reflect.has(trapTarget, key);
		}
	},
	deleteProperty(trapTarget, key) {
		if (key === "value") {
			return false;
		} else {
			return Reflect.deleteProperty(trapTarget, key);
		}
	},
	getPrototypeOf(trapTarget) {
		return Reflect.getPrototypeOf(trapTarget);
	},
	setPrototypeOf(trapTarget, proto) {
		return Reflect.setPrototypeOf(trapTarget, proto);
	},
	isExtensible(trapTarget) {
		return Reflect.isExtensible(trapTarget);
	},
	preventExtensions(trapTarget) {
		return Reflect.preventExtensions(trapTarget);
	},
	defineProperty(trapTarget, key, descriptor) {
		return Reflect.defineProperty(trapTarget, key, descriptor);
	},
	getOwnPropertyDescriptor(trapTarget, key) {
		return Reflect.getOwnPropertyDescriptor(trapTarget, key);
	},
	ownKeys(trapTarget) {
		return Reflect.ownKeys(trapTarget).filter(key => {
			return typeof key !== "string" || key[0] !== "_";
		});
	},
	apply: function(trapTarget, thisArg, argumentList) {
		return Reflect.apply(trapTarget, thisArg, argumentList);
	},
	construct: function(trapTarget, argumentList) {
		return Reflect.construct(trapTarget, argumentList);
	}
});
```

# Modules

## Export

```
// During declaration
export let bar = 123;
export function foo() {};

// Retrospectively
export default baz;
export {
	foo,
	bar as theBar,
	baz as default
}
```

## Import

```
import defaultExport from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name"; // For its side effects only
```

The import keyword may be called as a function to dynamically import a module. When used this way, it returns a promise.

```
import('/modules/my-module.js')
.	then((module) => {
		// Do something with the module.
});
```

This form also supports the await keyword.
```
let module = await import('/modules/my-module.js');
```

# Binary and octal literals

```
let twoHundredAndFiftyFive = 0xff;
let fourHundredAndNinetyThree = 0o755; // new
let eight = 0b1000; // new
let sixteen = 0b10000; // new
```

# Unicode

Before ES6, JS implementations, and the specification, assumed that all characters are represented by a single code point. This is true for all characters that are part of the UTF-16 BMP. However, UTF-16 also describes characters that appear on supplementary planes, by means of surrogate pairs. To handle such characters correctly (and not erroneously treat them as two separate characters of the BMP), ES6 introduces the following features:
```
// MP version of stringInstance.charCodeAt(stringIndex);
stringInstance.codePointAt(stringIndex);

// Creates a string from the code point.
String.fromCodePoint(codePointId);

// The regex Unicode flag, "u"
/[\s\S]/gu
```

# Tail call optimisation

Part of the language specification that describes how engines should run. When this part of the specification is respected, the call stack size doesn't increase when the last expression within a function is a call to another function. This preserves memory. However, this part of the specification is not implemented by many engines.