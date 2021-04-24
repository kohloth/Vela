# AJAX API interface

```
function siteUrl(urlPart) {
	let urlBase = 'http://mysite.com';
	if (urlPart) urlBase += '/' + urlPart;
}
```

```
let endpointNames = new Map([
	'users', '/users',
	'cars', '/cars',
	'boats', '/boats'
]);
```

```
function ajax({
	endpointName = null
} = {}) {
	let endpointUrl = siteUrl(endpointNames[endpointName]);
	return new Promise((resolve, reject) => {
		fetch(endpointUrl)
			.then(response => response.json())
			.then(data => {
				if (data.serverError) {
					let errorMessage = 'Server error: ' + JSON.stringify(data.serverError);
					reject(errorMessage);
				}
				resolve(data);
			})
			.catch(error => {
				reject(errorMessage);
			})
	});
}
```
More fetch examples can be found at: [https://gist.github.com/justsml/529d0b1ddc5249095ff4b890aad5e801](https://gist.github.com/justsml/529d0b1ddc5249095ff4b890aad5e801)

# Event delegation

```
<div>
	<ul>
		<li data-id="1"><a>hello</a>
		<li data-id="2"><a>hello</a>
		<li data-id="3"><a>hello</a>
	</ul>
</div>
```

```
// Helpers
function normaliseTarget(el, selector) {
	if (el.matches(selector)) return el;
	return closest(el, selector);
}
function closest(el, selector) {
	let elOut = null;
	while (el && (el = el.parentElement)) {
		if (el.matches(selector)) {
			return el;
		}
	}
	return elOut;
}
function delegateEventListener(parentElement, selector, eventName, callback) {
	let wrappedCallback = (e) => {
		let element = normaliseTarget(e.target, selector);
		if (element) {
			callback(e, element);
		}
	};
	parentElement.addEventListener(eventName, wrappedCallback);
	return wrappedCallback;
}
	
// Usage 1
document.querySelector('ul').addEventListener('click', (e) => {
	let element = normaliseTarget(e.target, 'li');
	if (element) {
		let id = element.dataset.id;
		console.log(id);	
	}
})

// Usage 2
let callback = delegateEventListener(document.querySelector('ul'), 'li', 'click', (e, selectedElement) => {
	console.log('ID : ' + selectedElement.dataset.id)
});

// Usage 2: Removal
console.log('started');
setTimeout(() => {
	document.querySelector('ul').removeEventListener('click', callback);
	console.log('removed');
}, 3000);
```