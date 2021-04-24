# Positional arguments

## Array.splice

If the `start` argument is negative, the operation begins at that many steps backwards from the end of the array. Note, however, that the delete operation always happens in a forwards direction. When working backwards, the `-1` refers to the last item in the array, not `-0` .

``` 
// Usage signature
var arrDeletedItems = array.splice(start, deleteCount, newItem1, newItem2, newItem3...);

// Deleting two elements
var array = [1, 2, 3, 4];
var deletedItems = array.splice(1, 2);
console.log(deletedItems); // [2, 3]
console.log(array) // [1, 4]

// Replacing two elements
var array = [1, 2, 3, 4];
var deletedItems = array.splice(1, 2, 'two', 'three');
console.log(deletedItems); // [2, 3]
console.log(array) // [1, 'two', 'three', 4]

// Deleting the last two elements
var array = [1, 2, 3, 4];
var deletedItems = array.splice(-2, 2); // Start at position -2, delete forwards 2
console.log(deletedItems); // [3, 4]
console.log(array) // [1, 2]

// Replacing the last two elements
var array = [1, 2, 3, 4];
var deletedItems = array.splice(-2, 2, 'three', 'four'); // Start at position -2, delete forwards 2
console.log(deletedItems); // [3, 4]
console.log(array) // [1, 2, 'three', 'four']
```

# Array.slice

``` 
// Usage signature
array.slice(startIdx, endIdx);

// Usage
let arr = [1,2,3,4,5,6,7,8];
arr.slice(0, 4); // [1,2,3,4]
arr.slice(-1); // [8]
arr.slice(-4, -2); // [5,6]
```

# String.slice / String.substring

`slice` and `substring` are almost identical, but `slice` is better, as it allows negative indexes, whereas `substring` just interprets these as 0. Note that even with negative arguments, `slice` still slices in a forward direction.

``` 
// Usage signature
str.substring(startIdx, endIdx);

// Usage
let str = '12345678';
str.slice(0, 4); // '1234'
str.slice(1, 5); // '2345'
string.slice(string.length - 4) // '5678'
string.slice(string.length - 4, string.length - 2) // '56'
string.slice(-2) // '78'
string.slice(-4, -2) // '56'
```

# Things that modify in place

No string methods modify the string in place. Only half of the array methods modify the array in place. The following list depicts methods that do modify things in place.

``` 
arr.copyWithin(target, start, end);
arr.fill(value, start, end);
arr.pop();
arr.push(item1, item2, item3...);
arr.reverse();
arr.shift();
arr.sort();
arr.splice();
arr.unshift();
```

All other array methods do not modify in place. This behaviour is deducible by common sense for all except `concat` and `slice` , which may seem like candidates for modifying arrays in place. However, neither of these do.

# Things that are live

Live things:

``` 
// getElementsBy(x) HTMLCollection
let liveHtmlCollection = document.getElementsByClassName('.panel');
let liveHtmlCollection = document.getElementsByTagName('div');

// Element object attributes property
var attr = element.attributes;
// The Element.attributes property returns a live collection of all attribute nodes registered to the specified node. It is a NamedNodeMap.

// classList
let liveDOMTokenList = element.classList;

// Child nodes NodeList
let liveNodeList = elementNode.childNodes;

// ParentNode HTMLCollection
let liveHtmlCollection = parentNode.children;

// Style
var style = window.getComputedStyle(element [, pseudoElt]);
// The returned style is a live CSSStyleDeclaration object, which updates automatically when the element's styles are changed.

// Stylesheets
let liveStylesheets = document.styleSheetSets;
```

<p>In contrast, the following things ARE NOT live:</p>

``` 
// QuerySelectorAll NodeList
var nodeList = document.querySelectorAll('div');
```

# Misc

Slice vs splice

* The `slice` method is used to slice out a section of array (shallow copy) within start and end delimiters. The `splice` method is used to modify an array in place, removing and / or adding elements.
* The `Array` prototype contains both methods. The `String` prototype only contains a method called `slice`.
