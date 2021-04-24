# Mediator

## Mediator

```
const ComponentEvent = require('../constructors/componentEvent.js').default;

const componentMediator = (function() {

	const componentListeners = [];

	function on() {

		const eventId = arguments[0];
		const callback = arguments[1];
		const listeningComponent = arguments[2] || null;

		if (arguments.length < 2 || arguments.length > 3) {
			throw new Error('Invalid argument length: ' + arguments.length);
		}

		const componentEvent = new ComponentEvent(eventId, callback, listeningComponent);
		componentListeners.push(componentEvent);
	}

	function trigger(eventId, eventData) {
		componentListeners.forEach((componentListener) => {
			if (componentListener.eventId === eventId) {
				componentListener.callback(eventData);
			}
		});
	}

	return {
		trigger,
		on
	};
})();

module.exports.default = componentMediator;
```

## Component event

```
function componentEvent(eventId, callback, listeningComponent) {
	this.eventId = eventId;
	this.callback = callback;
	this.listeningComponent = listeningComponent;
}

module.exports.default = componentEvent;
```