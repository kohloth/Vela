# Information

| Name                             | Includes proto | Includes non-enumerable | Includes symbols | Includes non-symbols |
|----------------------------------|----------------|-------------------------|------------------|----------------------|
| Array iterative methods          | N/A            | N/A                     | N/A              | N/A                  |
| Array for...of                   | N/A            | N/A                     | N/A              | N/A                  |
| Array spread                     | N/A            | N/A                     | N/A              | N/A                  |
| Object for...in                  | YES            | NO                      | NO               | YES                  |
| Object keys, values, entries     | NO             | NO                      | NO               | YES                  |
| Object getOwnPropertyNames       | NO             | YES                     | NO               | YES                  |
| Object getOwnPropertySymbols     | NO             | YES                     | YES              | NO                   |
| Object getOwnPropertyDescriptors | NO             | YES                     | YES              | YES                  |
| Object spread                    | NO             | NO                      | YES              | YES                  |

# General rules

* When iterating arrays, all concerns of symbol keys, proto properties and non-enumerables are moot.
* Object.getOwnProperty(x) methods always include non-enumerable properties.
* All methods exclude symbols, except Object.getOwnPropertySymbols().
* Only for...in includes proto.
* getOwnPropertyNames is for regular keys. getOwnPropertySymbols is for symbol keys. getOwnPropertyDescriptors is for all, and is verbose.

# Test script

```
// Define data
let reptile = {
	skin: 'scaly'
};
let snake = Object.create(reptile, {
	body: {
		value: 'long',
		enumerable: true,
		writable: true,
		configurable: true
	}
});
let sammy = Object.create(snake, {
	name: {
		value: 'Sammy',
		enumerable: true,
		writable: true,
		configurable: true
	},
	[Symbol('Car registration')]: {
		value: '123 SNAKE',
		enumerable: true,
		writable: true,
		configurable: true
	},
	[Symbol('National insurance')]: {
		value: 'JX JA 84 UA 4',
		enumerable: false,
		writable: false,
		configurable: false
	},
	creditCardNumber: {
		value: '1234',
		enumerable: false,
		writable: false,
		configurable: false
	},
});
let fruits = ['apple', 'orange', 'banana'];

console.log('################################################');
console.log('Iterating using array methods...');
fruits.forEach(fruit => console.log(fruit));
console.log(fruits.map(fruit => 'tasty ' + fruit));

console.log('################################################');
console.log('Iterating using array for...of...');
for (let fruit of fruits) {
	console.log(fruit);
}

console.log('################################################');
console.log('Iterating using array spread');
console.log([...fruits]);

console.log('################################################');
console.log('Iterating using for...in...');
for (let prop in sammy) {
	console.log(prop);
}

console.log('################################################');
console.log('Iterating using Object keys');
console.log(Object.keys(sammy));

console.log('################################################');
console.log('Iterating using Object values');
console.log(Object.values(sammy));

console.log('################################################');
console.log('Iterating using Object entries');
console.log(Object.entries(sammy));

console.log('################################################');
console.log('Iterating using Object getOwnPropertyNames');
console.log(Object.getOwnPropertyNames(sammy));

console.log('################################################');
console.log('Iterating using Object getOwnPropertySymbols');
console.log(Object.getOwnPropertySymbols(sammy));

console.log('################################################');
console.log('Iterating using Object getOwnPropertyDescriptors');
console.log(Object.getOwnPropertyDescriptors(sammy));

console.log('################################################');
console.log('Iterating using object spread. (i.e. Object.assign())');
console.log({...sammy});
```
