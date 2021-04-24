In array iterative methods, elements which are appended to the array after the call to map begins will not be visited by callback.

# The "use strict" Directive

* The 'use strict' pragma must be declared at the top of the script or function in order to be respected. It should look like this: `'use strict';` or this `"use strict";`.
* Strict mode is always automatically at play within ES6 modules (ALL code within modules) and the body of javascript classes.
* Concatenating a mixture of strict and non-strict scripts creates one script that is either fully strict or fully non-strict. Interestingly, this has caused a bug on Amazon.com whereby the site would only show lightning-deals that had already ended.

Use strict has the following effects:

Description: Variables used without being declared.
Example: `foo = 123;`
Without: Will become properties of the global object.
With: Will raise an error.

Description: Attempting to write to a read-only propery (i.e. a non-writable, a getter property) or delete an undeletable property.
Example: `Object.defineProperty(object1, 'property1', { value: 42,  writable: false }); object1.property1 = 33;`
Without: Will fail silently.
With: Will raise an error.

Description: Duplicating a parameter name or an object key.
Example: `var myVar = {dessert: 'Ice cream', dessert: 'Cake'};`
Without: The last value clobbers all previous values.
With: Will raise an error.

Description: Creating copies of an argument - such as `firstArg = arguments[0]`.
Example: `function doThings() { let firstThing = arguments[0]; firstThing = 123; arguments[0] === 123; }`
Without: The variable acts like a reference to `arguments[0]`. They are always kept in sync with each other.
With: The values are independent.

Description: Attempting to set or access `arguments.callee`.
Example: `function foo() { arguments.callee }`
Without: Returns the enclosing function.
With: Will raise an error.

Description: Attempting to set properties upon primitive values.
Example: `(45).foo = 45; 'fourtyfive'.foo = 45; false.foo = 45;`
Without: Will fail silently.
With: Will raise an error.

Description: Declaring octal literals using unofficial ES6 syntax.
Example: `0123` or `'\0123'`
Without: Will create a number from base 8.
With: Will raise an error.

Description: Using `eval` or `arguments` as an identifier, or any of the follwing reserved words: implements, interface, let, package, private, protected, public, static, yield.
Example: `var eval = 123;`
Without: foo
With: Will raise an error.

Description: Using eval to create variables in the same scope as the eval statement, using the delete operator to delete variables, and using the with statement.
Example: `var myVar = 0; delete myVar;`
Without: Is permitted
With: Will raise an error, as such machinations prevent the compiler from performing optimisations.

Description: Using `this` within a function when that function is not a property of another object.
Example: `function foo() { console.log(this); } foo();`
Without: `this` will point to the global object.
With: `this` will be undefined.

# New built-ins

`Array.isArray(subject)`

Returns true when one would expect. However, note that it returns false when a TypedArray instance is inspected.

`strInstance.trim()`

Returns a new string that has had the whitespace removed from the beginning and end. Removal includes spaces, new lines, and tabs.

`arrayInstance.forEach(callback(value, key, arrayInstanceReference), thisArg)`

* Returns undefined.
* There is no way to stop or break a forEach() loop other than by throwing an exception.

`arrayInstance.map(callback(value, key, arrayInstanceReference), thisArg)`

* Since map builds a new array, using it when you aren't using the returned array is an anti-pattern; use forEach or for-of instead.
* Take care not to pass in a function that will consider the index to be a legitimate second argument. i.e. In `[1, 2, 3].map(parseInt)`, the index will be interpreted as the radix.

`arrayInstance.filter(callback(value, key, arrayInstanceReference), thisArg)`

* A notable use-case of `filter`: Create a function that wraps the filter function, accepting a query parameter. This is less flexible than simply using the raw `filter` function, but the layer of abstraction can make the invoking code more terse.

`arrayInstance.reduce(callback(accumulator, currentValue, index, arrayReference), initialValue)`

* If `initialValue` is provided, the first iteration begins at array index 0. If not, the initial value is set to the value of the first array item, and the first iteration begins at array index 1.
* The initial value of the accumulator may be set to an object for more powerful accumulation operations.

`arrayInstance.reduceRight(callback(accumulator, currentValue, index, arrayReference), initialValue)`

Works identically to `arrayInstance.reduce()`, but runs from right to left.

`arrayInstance.every(callback(value, key, arrayInstanceReference), thisArg)`


* Aborts subsequent iterations and returns false if a falsey value is found.

`arrayInstance.some(callback(value, key, arrayInstanceReference), thisArg)`

* Aborts subsequent iterations and returns true if a truthy value is found.

`arrayInstance.indexOf(subject, startingIndex = 0)`

* Returns the first index (from the starting index) at which the given subject can be found in the array.
* Returns -1 if no match is found.
* To get past an item occurrance, the startingIndex must be at least one greater than the index of the item occurrance. i.e. ['jane', 'david', 'markus', 'david', 'john', 'darcy'].indexOf('david', 4)
* If the startingIndex is a negative number, it is taken as the offset from the end of the array. However, the array will still be searched from left to right.

`arrayInstance.lastIndexOf(subject, startingIndex = 0)`

* Returns the last index (from the starting index) at which the given subject can be found in the array.
* If the startingIndex is a negative number, it is taken as the offset from the end of the array. However, the array will still be searched from right to left.

`JSON.parse(jsonString, reviverFunction(key, value))`

* The reviver runs on each of the JSON object's memebers. If the reviver returns `undefined`, then that member removed from the data structure.
* Within the reviver, `this` points to the object being created.

`JSON.stringify(subject, replacer, spacer)`

* Undefined, functions and symbols all convert to null when inside an array.
* Undefined, functions and symbols are all omitted when found as properties of an object.
* Infinity, NaN and null are converted to null.
* If a value has a `toJSON()` method, the value is coerced by this.
* All object properties that are keyed by symbols are ignored, even when using the replacer function.
* Only enumerable properties are serialized.
* The spacer argument defines how the JSON output will be indented. (i.e. it can be ' ' or '\t' etc.)
* One parameter is supplied to the `toJSON()` property of an object.
	* if this object is a property value, the property name
	* if it is in an array, the index in the array, as a string
	* an empty string if JSON.stringify() was directly called on this object
* `JSON.stringify()` will throw an error if it encounters circular references.
* When the replacer parameter is a function:
	* It accepts two parameters: `function(key, value) {}`
	* It should return the value that should be added to the JSON string, as follows:
* If you return a Number, the string corresponding to that number is used as the value for the property when added to the JSON string.
* If you return a String, that string is used as the property's value when adding it to the JSON string.
* If you return a Boolean, "true" or "false" is used as the property's value, as appropriate, when adding it to the JSON string.
* If you return null, null will be added to the JSON string.
* If you return any other object, the object is recursively stringified into the JSON string, calling the replacer function on each property, unless the object is a function, in which case nothing is added to the JSON string.
* If you return undefined, the property is not included (i.e., filtered out) in the output JSON string.
* When the replacer parameter is an array, the array's values act as a property key whitelist.

`Date.now()`

* Returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
* When querying the time, the accurracy may be off by 50ms or so. This is an intentional discrepancy, put in place by browser vendors to protect against spectre/meltdown low-level CPU attack vectors.

# Property Getters and Setters

* A getter function must take no arguments. A setter function must take one argument.
