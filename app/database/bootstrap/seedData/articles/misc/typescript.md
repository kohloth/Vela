# Information

* Typescript is a superset of Javascript. It helps developers write more stable, scalable code by using static types. The static type syntax that it is based around also brings the boon of improved IDE suggestions.
* Typescript was created by Microsoft and released in 2012. It became open source under an Apache 2.0 licence in 2014.


A single typescript file can be compiled from the command line as follows:

```
npm i -g typescript
tsc myscript.ts
```

To compile a whole directory, create a `tsconfig.json` file within the project directory as so...
{
	"compilerOptions": {
		"emitDecoratorMetadata": true,
		"module": "commonjs",
		"target": "ES5",
		"outDir": "ts-built",
		"rootDir": "src"
	}
}
finally, run `tsc -w`. Note that this will watch the input files for changes.

# Basic usage

Variables should be given a type and an identifier. This may be during a declaration and assignment, or a standalone declaration.

```
// Explicitly declaring types and assigning
var myString: string = 'string';
var myNumber: number = 123;
var myBoolean: boolean = false;

// Explicitly declaring types then assigning
var myString: string;
var myNumber: number;
var myBoolean: boolean;
myString = 'string';
myNumber = 123;
myBoolean = false;

// Array usage
var myStrings: string[] = ['one', 'two'];
var myNumbers: number[] = [1, 2, 3];
var myBooleans: boolean[] = [true, false];

// Array usage, alternative syntax
var myNumbers: Array<number> = [1, 2, 3];

// Tuples
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

Typescript also automatically infers variable type based on previous values, or the context in which it was used. Attempting to assign a value of the wrong type to a variable with an inferred type will fail just as assignment to a variable with an explicitly defined type would.

```
	let myVar = 123;
	myVar = 'one'; // Error!
```

Therefore, opting out of type checking must be done explicitly, like so:

Types are factored out during compile time in a process known as Type Erasure. Type errors are therefore caught at compile type, and not at run-time.

```
	let myVar: any = 123;
	myVar = 'one'; // Allowed
```

All primitive types in typescript are subtypes of `null` and `undefined`. Therefore, the transpiller will not complain if a value with a type of `number` is assigned a value of `null` or `undefined`.
An object type may also be used to represent anything that is not a primitive. Note that as `undefined` and `null` are primitive, they will throw errors when stuffed into an `object` variable.

```
	function create(o: object | null): void;

	create({ prop: 0 }); // OK
	create(null); // OK

	create(42); // Error
	create("string"); // Error
	create(false); // Error
	create(undefined); // Error
```

If it is desirable to use a variable as a particular type, the typescript transpiller can be informed to release it's grip by using a type assertion. Type assertions can look like one of the following two forms:

```
	let someValue: any = "this is a string";
	let strLength: number = (<string>someValue).length;
```

```
	let someValue: any = "this is a string";
	let strLength: number = (someValue as string).length;
```


# Interfaces

Simple interface usage

```
interface Snack {
	price: number,
	description: string,
	tasty: boolean
}

let price: number = 3.99;
let description: string = 'Ice cream';
let tasty: boolean = true;

let iceCreamSnack: Snack = {price, description, tasty};
let cabbageSnack: Snack = {
	price: .50,
	description: 'cabbage',
	tasty: false
};

let snacks: Snack[] = [];
snacks.push(iceCreamSnack, cabbageSnack);
```

An interface member may be marked as optional:

```
interface Snack {
	price: number,
	description: string,
	tasty?: boolean // optional
}
```

An interface member may be marked as readonly:

```
interface Snack {
	price: number,
	description: string,
	readonly tasty: boolean
}
let snack: Snack = { price: 4, description: 'Cake', tasty: true };
snack.tasty = false; // Error
```
An interface member may be used to define the shape of a function and its return value. Note that the parameter names are not important any may vary between the interface and the function definition.
```
interface SearchFunc {
	(source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
	let result = source.search(subString);
	return result > -1;
}
```

An interface may also be used to define the shape of a class. However, the interface can only be used to define class instance and prototype, not static members.

```
interface ClockInterface {
	currentTime: Date;
	setTime(d: Date): void;
}

class Clock implements ClockInterface {
	currentTime: Date = new Date();
	setTime(d: Date) {
		this.currentTime = d;
	}
	constructor(h: number, m: number) { }
}
```

An interface may extend another interface, or many interfaces:

```
interface Shape {
	color: string;
}

interface PenStroke {
	penWidth: number;
}

interface Square extends Shape, PenStroke {
	sideLength: number;
}
```

Interfaces may also extend classes:

```
class Control {
	private state: any;
}

interface SelectableControl extends Control {
	select(): void;
}
```

# Classes

A class with typehints in typescript looks like this:

```
abstract class Animal {
	name: string;
	private hobby: string = 'Sleeping';
	static classInfo: string = 'The animal class.';
	constructor(name: string = 'Unnamed creature') {
		this.name = name;
	}
	move() {
		return `${this.name} is moving.`;
	}
	private afterInit() {
		console.log('A new animal instance has been created.');
	}
}
```

Note that:

* Classes may be abstract
* Members may be public or private, but are public by default.
* Members may be static.

# Destructuring

## Destructured arguments

```
	interface Dessert {
		dessert: string,
		flavour: string,
		size: string
	}

	function orderDessert({
		dessert = 'Ice cream',
		flavour = 'Vanilla',
		size = 'Medium'
	} : {
		dessert?: string,
		flavour?: string,
		size?: string
	} = {}) : Dessert {
		let output: Dessert = {dessert, flavour, size};
		console.log(output);
		return output;
	}

	let dessert1: Dessert = orderDessert({
		flavour: 'Chocolate'
	});
	let dessert2: Dessert = orderDessert();
	let dessert3: Dessert = orderDessert({
		flavour: 'Strawberry',
		size: 'Large',
		dessert: 'Cake'
	});
	let desserts: Dessert[] = [];
	desserts.push(dessert1, dessert2, dessert3);

	console.log(desserts);

	let dessert4: Dessert = orderDessert({
		onFire: true
	}); // Throws a transpillation error
```

# Functions

In typescript, functions must be called with the correct number of parameters. Optional parameters should be marked with a `?`.

```
function connectToDb(dbName: string, dbPort: number, dbHost? = 'localhost') {
	// ...
}
```

It is possible to write overloaded functions with the following syntax:

```
let suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x: { suit: string; card: number; }[]): number;
function pickCard(x: number): { suit: string; card: number; };
function pickCard(x): any {
	if (typeof x == "object") {
		let pickedCard = Math.floor(Math.random() * x.length);
		return pickedCard;
	}
	else if (typeof x == "number") {
		let pickedSuit = Math.floor(x / 13);
		return { suit: suits[pickedSuit], card: x % 13 };
	}
}
```

	
# Enums

Enums are a data type that typescript adds to javascript. It allows developers to access numbers based on alphanumeric names. It is designed to reduce the usage of magic strings.

```
enum Direction {
	up, // 0
	down, // 1
	left, // 2
	right, // 3
}
```

It is possible to start the index at a greater number like so:

```
enum Direction {
	up = 5, // 5
	down, // 6
	left, // 7
	right, // 8
}
```

Alternatively, each one may be assigned a value manually.

# Generics

"Generics" is the name given to the act of declaring a function as usable with data of any type, without resorting to the `any` data type, which can cause static typing data to be undesirably discarded. The syntax looks like this:

```
function returnVar<T>(var: T): T {
	return var;
}
let numVar: number = 1;
let strVar: string = 'one';
let newNumVar: number = returnVar(number);
let newStrVar: string = returnVar(string);
```

This pattern ensures that the function will return data of a type that matches it's input, and circumvents messiness like the following:

```
function returnVar(var: any): any {
	return var;
}
let numVar: number = 1;
let strVar: string = 'one';
let newNumVar: number = returnVar(strVar);
```

Restricting generics can be authored as such:

```
function returnPerson<T extends Person>(var: T): T {
	return var;
}
```