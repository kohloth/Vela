
# Object

## Converters

### Object.keys(anObject)

```
let obj = {dessert: 'Ice cream', flavour: 'Vanilla'};
log(Object.keys(obj)); // ['dessert', 'flavour'];
```

### Object.values(anObject)

```
let obj = {dessert: 'Ice cream', flavour: 'Vanilla'};
log(Object.values(obj)); // ['Ice cream', 'Vanilla'];
```

### Object.entries(anObject)

```
let obj = {dessert: 'Ice cream', flavour: 'Vanilla'};
log(Object.entries(obj)); // [['dessert', 'Ice cream'], ['flavour', 'Vanilla']];
```

### Object.fromEntries(entriesMapper)

Will accept an entries mapper variable that is either an array or a map.
ES2019

```
const arrayEntries = [['dessert', 'ice cream'], ['flavour', 'strawberry']];
const mapEntries = new Map([['dessert', 'ice cream'], ['flavour', 'strawberry']]);
const obj1 = Object.fromEntries(arrayEntries);
const obj2 = Object.fromEntries(mapEntries);
```

## Compositing

### Object.assign(target, source1, source2, source3...)

```
let obj = {dessert: 'Ice cream', flavour: 'Vanilla'};
let newObj = Object.assign({flake: 'Yes'}, obj);
log(newObj); // Has all 3 props
```

### Object.create(objectToBeProto, propertiesObject)

```
function Lizard(name) {
	this.name = name;
}
Lizard.prototype.move = function() {
	return this.name + ' is moving.';
}

function Dragon(name) {
	Lizard.call(this, name);
}
Dragon.prototype = Object.create(Lizard.prototype, {
	breatheCucumbers: {
		configurable: true,
		enumerable: true,
		writable: true,
		value: function() {
			return this.name + ' is breathing cucumbers.';
		}
	}
});
Dragon.prototype.constructor = Dragon;
```

### Object.defineProperty(obj, propertyObject)

As per defineProperties, only it only accepts one property.

### Object.defineProperties(targetObj, propertiesObject)

```
// Default properties object takes the form of:
// {
// 	value: undefined, // The object value
// 	configurable: false, // Can be changed or deleted
//	writable: false, // Can be reassigned
//	enumerable: false, // Appears during enumeration
// }
```

* If enumerable is false, the property will not appear in for...in, or in the result of an iterator call. i.e. Object.keys(obj), Object.values(obj), Object.entries(obj).
* If writable is false, the property can't be assigned a new value.
* If configurable is false, the property can't be deleted or have it's property descriptors change.

## Boxing

### Object.preventExtensions()

### Object.freeze(obj)

The Object.freeze() method freezes an object. A frozen object can no longer be changed; freezing an object prevents new properties from being added to it, existing properties from being removed, prevents changing the enumerability, configurability, or writability of existing properties, and prevents the values of existing properties from being changed. In addition, freezing an object also prevents its prototype from being changed. freeze() returns the same object that was passed in. freeze() is shallow.

### Object.seal(obj)

The Object.seal() method seals an object, preventing new properties from being added to it and marking all existing properties as non-configurable. Values of present properties can still be changed as long as they are writable.

# Inspection

# Object.is(value1 value2)

Similar to the === operator. However, +0 and -0 are considered inequal.


## Object.isFrozen(obj)

### Object.isSealed(obj)

### Object.isExtensible(obj)

# Array

## Converters

### Array.from(notQuiteAnArray, mapFn, thisArg)

Array.from() lets you create Arrays from:

* array-like objects (objects with a length property and indexed elements) or
* iterable objects (objects where you can get its elements, such as Map and Set).

Array.from() has an optional parameter mapFn, which allows you to execute a map function on each element of the array (or subclass object) that is being created. More clearly, Array.from(obj, mapFn, thisArg) has the same result as Array.from(obj).map(mapFn, thisArg), except that it does not create an intermediate array.

```
// As expected
console.log(Array.from('123')); // ["1", "2", "3"]
console.log(Array.from([1, 2, 3])); // [1, 2, 3]
console.log(Array.from('hello')); // ["h", "e", "l", "l", "o"]
console.log(Array.from(['one', 'two', 'three'])); // ["one", "two", "three"]
console.log((function() { return Array.from(arguments) })(1, 'two', 'three')); // [1, "two", "three"]
console.log(Array.from(new Set([4, 5, 6]))); // [4, 5, 6]
console.log(Array.from(new Map([['one', 1], ['two', 2], ['three', 3]]))); // [['one', 1], ['two', 2], ['three', 3]]

// Edge cases
console.log(Array.from(123)); // Empty array
console.log(Array.from(true)); // Empty array
console.log(Array.from(false)); // Empty array
console.log(Array.from(Symbol())); // Empty array
console.log(Array.from({one: 'a', two: 'b'})); // Empty array

// Throws
// console.log(Array.from(null)); // throws TypeError
// console.log(Array.from()); // throws TypeError
// console.log(Array.from(undefined)); // throws TypeError
```

## Inspectors

### Array.isArray(subject)

Returns true and false as one would expect. However, note that this helper function does not consider `Uint8Array` to be an array.


### Array.of(item1, item2, item3)

A more logical version of `new Array(item1, item2, item3)`. Consider:
<textarea class="com-code-snippet" data-type="javascript">
Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3] // An inconsistency to the above.
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]
```

# String

## String.fromCharCode(unit1, unit2, unit3)

```
console.log(String.fromCharCode(189, 43, 190, 61));
// expected output: "½+¾="
```

## String.fromCodePoint(unit1, unit2, unit3)

```
console.log(String.fromCodePoint(9731, 9733, 9842, 0x2F804));
// expected output: "☃★♲你"
```

# Numbers

## Constants

### Number.MAX_VALUE

### Number.MAX_SAFE_INTEGER

### Number.POSITIVE_INFINITY

### Number.MIN_VALUE

### Number.MIN_SAFE_INTEGER

### Number.NEGATIVE_INFINITY

## Inspectors

### Number.isSafeInteger(n)

Returns true when `n` is less than `Number.MAX_SAFE_INTEGER` and more than `Number.MIN_SAFE_INTEGER`.

### Number.isNaN(n)

### Number.isFinite(n)

### Number.isInteger(n)

## Conversion

### Number.parseFloat(n)

Exactly the same as `parseFloat()` of the global object.


### Number.parseInt(n)

Exactly the same as `parseInt()` of the global object.

# Math

## Constants

### Math.PI

## Creation

### Math.random()

## Inspection

### Math.min(n1, n2, n3)

#### Math.max(n1, n2, n3)

### Math.sign(n)

## Rounding

### Math.floor(n)

### Math.ceil(n)

### Math.round(n)

### Math.trunc(n)

## Mutation

### Math.abs(n)

### Math.pow(baseN, exponentN)

## Math.sqrt(x)

### Math.cbrt(x)

### Math.sin(x)

### Math.cos(x)

### Math.tan(x)

# Date

## Date.now()

Returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC. Equivalent to `new Date().getTime()`.

## Date.parse(dateInfo)

Usage is discouraged as there are many differences in how different hosts parse date strings. It is better to parse dates manually.

## Date.UTC()

Accepts the same parameters as the Date constructor, but treats them as UTC. It returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.