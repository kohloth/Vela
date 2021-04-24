# Information

WebWorkers are scripts that are run in the browser on a separate thread. They communicate with the main thread by sending messages to it, and receiving messages from it.

Web workers can be used to prevent the user interface from hanging when fairly intensive processing needs to take place. It is possible to achieve a poor man's version of this functionality by simply using `setTimeout` to make the intensive operation run asynchronously. However, such code is still blocking once it has started to run, and such an approach is a little hacky. Web workers are capable of running operations on a truely separate thread (and a separate CPU core), allowing them to be entirely non-blocking even once they have started.

A webworker does not have access to many of the objects that are built into most webpages. For example, the DOM. As a general rule of thumb, only rely on features native to the ESx specification. Some of the extra things that are available within the domain of a webworker are: setInterval, setTimeout, atob, btoa, importScripts, console, broadcast channel, fetch, fileReader, websocket, and a few others.
In a web worker, `self` is the global object.

Some browsers allow webworker messages to be objects, whereas some require the messages to be encoded as strings.

There are two ways to stop a worker: by calling worker.terminate() from the main page or by calling self.close() inside of the worker itself.

URIs for subworkers are resolved relative to the parent worker's location rather than that of the owning page.

When using `importScripts`, the scripts are loaded in order, synchronously. The call to `importScripts` does not return until all files have been loaded and executed. (Partly for this reason), `importScripts` can only be used within a webworker.

3 types of webworker exist. In order of the most commonly used and widely supported:

* Dedicated worker
* Shared worker
* Service worker

It is possible to use web workers in the context of an application that is bundled with Webpack, simply by specifying an additional entry point / bundle.

```
{
	entry: {
	bundle: './app/main.js',
	worker: './app/my-worker-file.js'
	},
	output: {
	filename: '[name].js'
	}
	...
}
```
	
# Worker example

The follwing example demonstrates the basics of how webworkers are used.
When run, it will also illustrate how resource-intensive functionality housed within a webworker differs from standard code and standard async code. Note that only the web-worker version manages to keep the UI unimpeded.

## Main file

```
<! DOCTYPE html>

<html>
<head>
	<style>
		button, input {
			box-sizing: border-box;
			display: block;
			width: 300px;
			padding: 5px;
			margin: 0 0 5px 0;
		}
	</style>
	<script>
		function showAMessage() {
			document.getElementById('messages').insertAdjacentHTML('afterbegin', '* Lobster!');
		}
		function showAComplexMessage() {
			let userMessage = document.getElementById('message-input').value;
			for (var i = 1; i < 10000000; i++) {
				userMessage = btoa(userMessage);
				userMessage = atob(userMessage);
			}
			let outputMessage = userMessage;
			document.getElementById('messages').insertAdjacentHTML('afterbegin', `* ${outputMessage}` );
		}
		function showAComplexMessageUsingAsync() {
			setTimeout(() => {
				let userMessage = document.getElementById('message-input').value;
				for (var i = 1; i < 10000000; i++) {
					userMessage = btoa(userMessage);
					userMessage = atob(userMessage);
				}
				let outputMessage = userMessage;
				document.getElementById('messages').insertAdjacentHTML('afterbegin', `* ${outputMessage}` );
			}, 3000);
		}
		function showAComplexMessageUsingWorker() {
			let userMessage = document.getElementById('message-input').value;
			worker.postMessage({eventType: 'plainMessageSent', userMessage});
		}
		function sendAnInvalidEvent() {
			worker.postMessage({eventType: 'giveMeSugarAndWater'});
		}
		
		var worker = new Worker('worker.js');
		console.log(worker);
		worker.addEventListener('message', (e) => {
			switch (e.data.eventType) {
				case 'complexMessageSent':
					break;
				default:
					throw new Error('Invalid message type: ' + e.data.eventType);
			}
			document.getElementById('messages').insertAdjacentHTML('afterbegin', `* ${e.data.complexMessage}` );
		});
	</script>
</head>
<body>
	<input type="text" id="message-input">
	<button onclick="showAMessage()">Show a message</button>
	<button onclick="showAComplexMessage()">Show a complex message</button>
	<button onclick="showAComplexMessageUsingAsync()">Show a complex message using async</button>
	<button onclick="showAComplexMessageUsingWorker()">Show a complex message using worker</button>
	<button onclick="sendAnInvalidEvent()">Send an invalid event</button>
	<ul id="messages"></ul>
</body>
</html>
```

## Web worker

```
self.addEventListener('message', (e) => {
	switch (e.data.eventType) {
		case 'plainMessageSent':
			if (e.data.userMessage === 'trolling') {
				self.postMessage({eventType: 'lallaaaaa'});
			} else {
				let userMessage = e.data.userMessage;
				for (var i = 1; i < 10000000; i++) {
					userMessage = btoa(userMessage);
					userMessage = atob(userMessage);
				}
				self.postMessage({eventType: 'complexMessageSent', complexMessage: userMessage});
			}
			break;
		default:
			throw new Error('Invalid message type: ' + e.data.eventType);
	}
});
```

# Shared workers

For a shared worker to be shared successfully, all pages that depend upon it must have the same protocol, host and port.
Shared workers are initialised and used slightly differently from dedicated workers. The port property has to be referenced explicity, and the `start()` function has to be called in both scripts if bidirectional communication is required.


# Service workers

Services workers are essentially used as a proxy between the application and the server. It allows network requests to be intercepted and massaged.

# Using a broadcast channel

As an alternative to sending messages to the web worker directly, (and having the web worker send messages to it's dependants directly), a more general broadcast channel can be used. This device can be used to send messages between windows, iframes, tabs, and workers. However, note that support is currently limited to FF and Chrome.

```
// Connection to a broadcast channel
var bc = new BroadcastChannel('test_channel');

// Example of sending of a simple message
bc.postMessage('This is a test message.');

// Example of a simple event handler that only
// logs the message to the console
bc.onmessage = function (e) { 
	console.log(e.data); 
}

// Disconnect the channel
bc.close()
```