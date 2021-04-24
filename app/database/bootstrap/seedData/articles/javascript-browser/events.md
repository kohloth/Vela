# General

* When using `node.onclick = () => {}` notation, one element can only ever have one callback for that particular event. (In other words, the callback is overridden each time.) Conversely, when using `node.addEventListener(fn)`, many may be added - just as in a sub-pub / observer pattern.
* `node.removeEventListener()` only succeeds in removing the event listener if the event name string, function reference, and `useCapture` parameter each match their respective `node.addEventListener()`counterparts.

# Touch events

To account for the fact that most websites are built only with mouse and keyboard input in mind, touch screen devices typically interpret single point touch gestures as both a touchstart event, and a mouse click event. The double firing usually works well, but if touch events are triggering mouse events in an undesirable way, the mouse event can be prevented from within the touch event callback, as the touch event callback always happens first.
		
```
element.addEventListener('touchstart', e => {
	e.preventDefault(); // Stops the mouse event from happening next.
});
```

When the user interacts with the site with a touch, three Interfaces come into play. A `TouchEvent` event fires. One of it's properties is a `TouchList`. This is a list of `Touch` objects.
As website users can interact with pages by means of a finger, a stylus, a mouse, and more, a hardware agnostic standard, the Pointer Events standard, has been introduced by the W3C. However, it is not yet reliably implemented.
A good touch event tutorial exists on the MDN. It can be found at any of the following links:

* //mdn.mozillademos.org/en-US/docs/Web/API/Touch_events$samples/Example?revision=1550703
* http://jsfiddle.net/Darbicus/z3Xdx/10/
* https://developer.mozilla.org/en-US/docs/Web/API/Touch_events


```
var ongoingTouches = [];
function startup() {
	var el = document.getElementsByTagName("canvas")[0];
	el.addEventListener("touchstart", handleStart, false);
	el.addEventListener("touchend", handleEnd, false);
	el.addEventListener("touchcancel", handleCancel, false);
	el.addEventListener("touchmove", handleMove, false);
}
function handleStart(evt) {
	evt.preventDefault();
	var el = document.getElementsByTagName("canvas")[0];
	var ctx = el.getContext("2d");
	var touches = evt.changedTouches;
	for (var i = 0; i < touches.length; i++) {
		ongoingTouches.push(copyTouch(touches[i]));
		var color = '#000';
		// ... draw circle ...
	}
}
function handleMove(evt) {
	evt.preventDefault();
	var el = document.getElementsByTagName("canvas")[0];
	var ctx = el.getContext("2d");
	var touches = evt.changedTouches;
	for (var i = 0; i < touches.length; i++) {
		var color = '#000';
		var idx = ongoingTouchIndexById(touches[i].identifier);
		if (idx >= 0) {
			// ... Draw part of path ...
			ongoingTouches.splice(idx, 1, copyTouch(touches[i]));	// swap in the new touch record
		} else {
			console.log("Can't figure out which touch to continue");
		}
	}
}
function handleEnd(evt) {
	evt.preventDefault();
	var el = document.getElementsByTagName("canvas")[0];
	var ctx = el.getContext("2d");
	var touches = evt.changedTouches;
	for (var i = 0; i < touches.length; i++) {
		var color = colorForTouch(touches[i]);
		var idx = ongoingTouchIndexById(touches[i].identifier);
		if (idx >= 0) {
			// ... Draw part of path ...
			ongoingTouches.splice(idx, 1);	// remove it; we're done
		} else {
			console.log("Can't figure out which touch to end");
		}
	}
}
function handleCancel(evt) {
	evt.preventDefault();
	var touches = evt.changedTouches;
	for (var i = 0; i < touches.length; i++) {
		var idx = ongoingTouchIndexById(touches[i].identifier);
		ongoingTouches.splice(idx, 1);	// remove it; we're done
	}
}
function copyTouch(touch) {
	return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
}
function ongoingTouchIndexById(idToFind) {
	for (var i = 0; i < ongoingTouches.length; i++) {
		var id = ongoingTouches[i].identifier;
		if (id == idToFind) {
			return i;
		}
	}
	return -1;
}
```
