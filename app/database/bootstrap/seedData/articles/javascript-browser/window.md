
# Controlling applets

## window.stop

Stops the browser from loading any further resources for this applet.

## window.close

Closes this applet.

## window.open

Programmatically opens a new applet. The second argument signifies where the url should open into. It can represent a window, tab or iframe. If omitted, a new window is opened. Note that the third windowOptions argument is a string list of comma-separated flags.

# Querying fundamental geometries

All of the following:

* are used to obtain the dimensions of fundamental geometric objects.
* are read-only values.
* are well-supported or invariably supported.
* return values in pixels.

## window.innerHeight

Height of entire webpage document

## window.innerWidth

Width of entire webpage document

## window.outerHeight

Height of entire browser window on the desktop

## window.outerWidth

Width of entire browser window on the desktop

## window.screenX

Distance between the left edge of the users monitor screen and the left edge of the browser window

## window.screenY

Distance between the top edge of the users monitor screen and the top edge of the browser window

## window.screenLeft

Supposedly a newer alias to window.screenX. However, after testing in Chrome, values are slightly different.

## window.screenTop

Supposedly a newer alias to window.screenY. However, after testing in Chrome, values are slightly different.


## window.pageXOffset

How far a user has scrolled accross the page.


## window.pageYOffset

How far a user has scrolled down the page.


## window.scrollX

A newer alias to window.pageXOffset. Browser support slightly less dependable.

## window.scrollY

A newer alias to window.pageYOffset. Browser support slightly less dependable.

# Adjusting fundamental geometries

* All of the following may be called by a `ScrollToOptions` dictionary object. The necessary shape of this object is shown below. Note, however, that support for this is patchy. No IE, no Edge, and no Safari.
* Methods that end in `To` set values absolutely. Methods that end in `By` set values relatively.
* All values should be passed as integers. i.e. `window.scrollTo(50, 0)` and not strings with UOMs - i.e. `window.scrollTo(50px, 0px)`.
* For security reasons, all four move and resize methods will not work unless the window has been opened by an invocation of `window.open`.

```
window.scrollTo({
	top: 100,
	left: 100,
	behavior: 'smooth' // smooth | auto
})
```

## window.scrollTo(xAbsPos, yAbsPos)

Scrolls window to exact coords given.


## window.scrollBy(xIncrement, yIncrement)

Scrolls window by coords given. Negative integers may be used.


## window.resizeTo(outerWidth, outerHeight)

Resizes window to exact coords given.
```
function quarter() {
	window.resizeTo(
		window.screen.availWidth / 2,
		window.screen.availHeight / 2
	);
}
```

## window.resizeBy(xIncrement, yIncrement)

Resizes window by coords given. Negative integers may be used.

## window.moveTo(xAbsPos, yAbsPos)

Moves window to exact coords given.

## window.moveBy(xIncrement, yIncrement)

Moves window by coords given. Negative integers may be used.

# User input dialogs

## window.alert

```
alert('An error occurred.');
```

## window.confirm

```
if (window.confirm('Do it?')) {
doIt();
}
```

## window.prompt

`window.prompt`
```
let message = 'Enter your name';
let default = 'Adam';
let userInput = window.prompt(message, default);
```

# Callback hooks

## window.setTimeout

```
let timeoutHandle = setTimeout(() => {
	console.log('About one second later...');
}, 1000);
clearTimeout(timeoutHandle);
```

## window.setInterval

```
let intervalHandle = setInterval(() => {
	console.log('Another second...');
}, 1000);
clearInterval(intervalHandle);
```

## window.requestAnimationFrame

Runs the specified function before a repaint. Function must recurse to run continuously.
```
function step(&lt;DOMHighResTimeStamp&gt; timestamp) => {
	console.log('Another frame...');
	requestAnimationFrame(step);
}
let frameHandle = requestAnimationFrame(step);
cancelAnimationFrame(frameHandle);
```

To conserve memeory, the function will not run (in most browsers) if the window is minimised or the tab is otherwise not visible.

## window.requestIdleCallback

Defers a function to run during a time when the event loop is idle.
```
let options = {
	timeout: 1000
};
let handle = window.requestIdleCallback(function() {
	console.log('This is not too important');
}, options)
cancelIdleCallback(handle);
```

# Modern utils

## window.btoa(str)

Base64-encodes str.

## window.atob(str)

Base64-decodes str.

## window.getComputedStyle(element)

Returns computed style attributes of element in the form of a live &lt;CSSStyleDeclaration&gt; object. Read-only. This object will update dynamically to reflex changes in appearance.
The computed style of pseudo-elements can also be obtained, by means of the syntax: `window.getComputedStyle(element, ':after')`.

```
let el = document.getElementById('Syntax');
let computedStyles = window.getComputedStyle(el);
computedStyles.backgroundColor; // rgba(0, 0, 0, 0)
el.style.backgroundColor = 'red';
computedStyles.backgroundColor; // rgba(255, 0, 0, 0)
```
## window.getSelection

Returns a &lt;Selection&gt; object describing the current user-selected text. This object can be transformed into a string like so:

```
let sel = getSelection();
console.log(sel.toString());
```

## window.fetch

Modern AJAX implementation. Takes one mandatory argument: The URL of the resource you wish to fetch. Other arguments are optional. Returns a native promise.

```
// Example to get JSON
fetch('https://api.github.com/orgs/nodejs')
	.then(response =&gt; response.json())
	.then(jsonData =&gt; {
		console.log(jsonData);
	})
	.catch(error =&gt; console.error(error))
```

```
// Post JSON example
postRequest('http://example.com/api/v1/users', {user: 'Dan'})
	.then(data => console.log(data)) // Result from the `response.json()` call
	.catch(error => console.error(error))

function postRequest(url, data) {
	return fetch(url, {
		credentials: 'same-origin', // 'include', default: 'omit'
		method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
		body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
	})
	.then(response => response.json())
}
```

# window.location

The location can also be reassigned by treating the location object as a string, such as: `window.location.href = 'http://www.mysite.com'` or `window.location = 'http://www.mysite.com'`.

## window.location.href

The full shebang
https://developer.mozilla.org/en-US/docs/Web/API/Window/location?test=123#syntax

## window.location.hostname

The domain
developer.mozilla.org

## window.location.host

The domain, plus the port if the port is not the standard port.
developer.mozilla.org:8888

## window.location.origin

https://developer.mozilla.org

## window.location.pathname

The path to the file.
/en-US/docs/Web/API/Window/location

## window.location.search

The query string.
?test=123

## window.location.protocol

The protocol.
https:

## window.location.port

The port number.
8888

## window.location.hash

The document fragment hash.
#syntax

## window.location.reload()

Reloads the document that is at the current URL.

## window.location.replace(newUrl)

Essentially redirects to the new url, obliterating history.

## window.location.assign(newUrl)

Essentially redirects to the new url, preserving history.

# window.history

```
window.history.back() // Same as user pressing back button in browser
window.history.forward() // Same as user pressing forward button in browser
window.history.go(-1) // Same as history.back()
window.history.go(1) // Same as history.forward()
window.history.go(-5) // Same as history.back() run 5 times
window.history.go(0) // Reloads the current URL
```

```
// Suppose the current URL is: coolthings.com/some/sub/dir
history.pushState(null, null, 'audio'); // The URL will now read: coolthings.com/some/sub/dir/audio
history.pushState(null, null, '/audio'); // The URL will now read: coolthings.com/audio

// To use data:
history.pushState({foo: 'bar', 'bar': 123}, null, '/audio');
console.log(history.state);
```

## history.pushState(dataObject, historyTitle, url)

Changes URL in the browser. The back button will restore the unaugmented URL.

## history.replaceState(dataObject, historyTitle, url)

Changes URL in the browser. The back button will take the user back to the previous page.

# window.navigator

Contains information about the users browser. This information is easily spoofed and largely irrelevant. In some browsers, a duplicate pointer to this object exists at `window.clientInformation`.


# window.screen

Contains information about the users screen. This information is largely redundant, considering the presence of similar data in the `window` object itself.


# Web storage

HTML5 introduced `window.localStorage` and `window.sessionStorage` as an alternative to cookies.

* Data stored is specific to the domain. This includes the protocol. Data stored under http will not be available under https and vice-versa.
* Keys and values are always strings.
* Data within `sessionStorage` is obliterated when the user closes the page/tab/window.
* The APIs for `sessionStorage` and `localStorage` tessellate.
* All browsers that support web storage have a data limit of at least 5MB.
* Unlike cookies, nothing is sent to the server.

```
// Checking for storage feature
if (typeof(Storage) !== "undefined") alert('Your browser supports web storage!');
```

```
// Method API form
localStorage.setItem('flavour', 'strawberry');
let flavour = localStorage.getItem('flavour');
localStorage.removeItem('flavour');
localStorage.clear(); // Remove everything.
```

```
// Property API form
localStorage.flavour = 'strawberry';
let flavour = localStorage.flavour;
delete localStorage.flavour;
localStorage.clear(); // Remove everything.
```

# window.performance

The Window interface's performance property returns a Performance object, which can be used to gather performance information about the current document. It serves as the point of exposure for the Performance Timeline API, the High Resolution Time API, the Navigation Timing API, the User Timing API, and the Resource Timing API.

# window.customElements

A reference to the CustomElementRegistry object, which can be used to register new custom elements and get information about previously registered custom elements.

```
	window.customElements.define('element-details', class extends HTMLElement {
		constructor() {
			super();
			const template = document
				.getElementById('element-details-template')
				.content;
			const shadowRoot = this.attachShadow({mode: 'open'})
				.appendChild(template.cloneNode(true));
		}
	});
```

# window.crypto

Contains methods that aid in the encryption and decryption of data. Can also be used to generate random numbers.

# window.speechSynthesis

```
// Basic usage
speechSynthesis.speak(new SpeechSynthesisUtterance('The rain in spain.'));
```

```
// More advanced usage
// Note that the voices are loaded asynchronously, so we can only get a list
// of the voices after the onVoicesChanged event has fired.
// Note, however, that this event will only fire in Chrome, Firefox, and Edge.
window.speechSynthesis.onvoiceschanged = function() {
	let rand = (max) =&gt; Math.floor(Math.random() * Math.floor(max));
	let voices = speechSynthesis.getVoices();
	let voiceIndex = Math.floor(Math.random() * Math.floor(voices.length));
	let utterance = new SpeechSynthesisUtterance('The rain in spain.');
	utterance.voice = voices[voiceIndex];
	utterance.pitch = Math.random();
	utterance.rate = Math.random();
	utterance.onend = () => {console.log('Done')};
	speechSynthesis.speak(utterance);
}
```