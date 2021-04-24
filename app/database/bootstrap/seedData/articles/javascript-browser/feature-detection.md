# Feature detection checks

```
function createElement() {
	if (typeof document.createElement !== 'function') {
		// This is the case in IE7, where the type of createElement is "object".
		// For this reason, we cannot call apply() as Object is not a Function.
		return document.createElement(arguments[0]);
	} else if (arguments[0].nodeName.toLowerCase() === 'svg') {
		return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
	} else {
		return document.createElement.apply(document, arguments);
	}
}
```


```
if (Window.Worker) {
	// Dedicated web workers are supported!
}

if (Window.SharedWorker) {
	// Shared web workers are supported!
}

if ('serviceWorker' in navigator) {
	// Service workers are supported!
}

if (typeof(Storage) !== "undefined") {
	// LocalStorage / SessionStorage are supported!
}

if ((function(){
	var div = document.createElement('div');
	return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
})()) {
	// Drag and drop is supported!
}

if ((function() {
	var elem = createElement('canvas');
	return !!(elem.getContext && elem.getContext('2d'));
})()) {
	// Canvas is supported!
}

if ((function() {
	var elem = createElement('audio');
	var bool = false;

	try {
	bool = !!elem.canPlayType;
	if (bool) {
		bool = new Boolean(bool);
		bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '');
		bool.mp3 = elem.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, '');
		bool.opus = elem.canPlayType('audio/ogg; codecs="opus"') ||
					elem.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, '');
		bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '');
		bool.m4a = (elem.canPlayType('audio/x-m4a;') ||
					elem.canPlayType('audio/aac;')).replace(/^no$/, '');
	}
	} catch (e) {}

	return bool;
})()) {
	// HTML5 audio is supported! 
}

if ((function() {
	var elem = createElement('video');
	var bool = false;

	// IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
	try {
		bool = !!elem.canPlayType;
		if (bool) {
		bool = new Boolean(bool);
		bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');

		// Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
		bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');

		bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');

		bool.vp9 = elem.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, '');

		bool.hls = elem.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, '');
		}
	} catch (e) {}

	return bool;
})()) {
	// HTML5 video is supported!
}
```

# Using modernizr

```
// CLI
npm i modernizr --save

// modernizr.json
{
	"feature-detects": [
		"css/flexbox",
		"css/flexboxlegacy",
		// ...etc
	]
}

// CLI
./node_modules/.bin/modernizr -uc ./modernizr.json -d ./modernizr.min.js
// -uc - The u is for uglify, and the c is to specify a custom config file (./modernizr.json).
// -d - The destination for the compiled bundle (./modernizr.min.js).
```