# Simple example

```
document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementsByTagName('canvas')[0];
	const styles = getComputedStyle(canvas);
	canvas.setAttribute('width', styles.width);
	canvas.setAttribute('height', styles.height);
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = '#228855';
	ctx.fillRect(10, 10, 100, 100);
});
```

# Various shapes

```
document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementsByTagName('canvas')[0];
	const styles = getComputedStyle(canvas);
	canvas.setAttribute('width', styles.width);
	canvas.setAttribute('height', styles.height);
	const ctx = canvas.getContext('2d');

	// Draw green square
	{
		ctx.fillStyle = '#228855';
		ctx.fillRect(10, 10, 100, 100);
		// fillRect(xStart, yStart, xDimension, yDimension)
	}
	
	// Draw circle
	{
		ctx.fillStyle = 'none';
		ctx.strokeStyle = '#33aabb';
		ctx.lineWidth = 20;
		ctx.beginPath();
		ctx.arc(250, 250, 50, 0, 2 * Math.PI);
		ctx.stroke();
		// arc(circleCentreX, circleCentreY, radius, startAngleInRadians, endAngleInRadians, counterClockwise = false)
	}
	
	// Draw semicircle
	{
		ctx.fillStyle = '#00bfac';
		ctx.strokeStyle = 'none';
		ctx.lineWidth = 20;
		ctx.beginPath();
		ctx.arc(350, 350, 25, 0, 1 * Math.PI);
		ctx.fill();
		// arc(circleCentreX, circleCentreY, radius, startAngleInRadians, endAngleInRadians, counterClockwise = false)
	}

	
	// Draw house
	{
		// Set up drawing tools
		ctx.fillStyle = '#000';
		ctx.lineWidth = 10;
		ctx.strokeStyle = '#000';

		// Wall
		ctx.strokeRect(75, 140, 150, 110);

		// Door
		ctx.fillRect(130, 190, 40, 60);

		// Roof
		ctx.beginPath();
		ctx.moveTo(50, 140);
		ctx.lineTo(150, 60);
		ctx.lineTo(250, 140);
		ctx.closePath();
		ctx.stroke();
	}
	
	// Draw curvy thing
	{
		// Set up drawing tools
		ctx.fillStyle = '#45ab6c';
		ctx.lineWidth = 10;
		ctx.strokeStyle = '#a0893c';

		ctx.beginPath();
		ctx.moveTo(100, 350);
		ctx.arc(100, 350, 50, 0, 1 * Math.PI);
		ctx.arc(200, 250, 80, 0, 1 * Math.PI);
		ctx.lineTo(50, 50);
		ctx.lineTo(20, 100);
		ctx.lineTo(400, 50);
		ctx.lineTo(400, 400);
		ctx.lineTo(150, 430);
		ctx.closePath();
		ctx.stroke();
	}
});
```

# Animation loop

```
<!DOCTYPE html>
<html>
	<head>
		<style>
			body {
				background: #000;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin: 0;
				padding: 0;
				width: 100vw;
				height: 100vh;
			}
			canvas {
				background: #444;
				width: 90vw;
				height: 60vw;
			}
			button {
				width: 100px;
				margin: 5px;
			}
		</style>
		<script>
			var app = (function() {
			
				let loopHandle = null;
				let canvas = null;
				let ctx = null;
				let cachedWidth = null;
				let cachedHeight = null;
				let lastTime = null;
				let markerOffset = null;
				let markerReverse = false;
				let handRotation = 0;
				
				function adjustCanvasSize() {
					canvas.removeAttribute('width');
					canvas.removeAttribute('height');
					const styles = getComputedStyle(canvas);
					
					cachedHeight = parseInt(styles.height);
					
					let newWidth = parseInt(styles.width);
					let widthDelta = 1;
					if (cachedWidth) {
						widthDelta = ((100 / cachedWidth) * newWidth) / 100;
						markerOffset *= widthDelta;
					}
					cachedWidth = newWidth;
					
					canvas.setAttribute('width', cachedWidth);
					canvas.setAttribute('height', cachedHeight);
				}
				function init() {
					canvas = document.getElementsByTagName('canvas')[0];
					ctx = canvas.getContext('2d');
					adjustCanvasSize();
					markerOffset = w(25);
					play();
				}
				function play() {
					if (!loopHandle) {
						lastTime = (new Date()).getTime();
						render();
					}
				}
				function w(v = 100) {
					return (cachedWidth / 100) * v;
				}
				function h(v = 100) {
					return (cachedHeight / 100) * v;
				}
				function stop() {
					cancelAnimationFrame(loopHandle);
					loopHandle = null;
				}
				function render() {
					loopHandle = requestAnimationFrame(() => {
					
						// Work out delta
						const currentTime = (new Date()).getTime();
						const delta = (currentTime - lastTime) / 1000;
						
						// Work out clock hand rotational end position
						handRotation += ((Math.PI * 2) / 60) * delta;
						
						// The small rectangle should move at a rate of 10% of the screen width per second.
						// This is 20% of the large rectangle width per second.
						// It should take 5 seconds to complete a run.
						const squareAdj = delta * w(10);
						if (markerOffset > w(75)) {
							markerReverse = true;
						}
						if (markerOffset < w(25)) {
							markerReverse = false;
						}
						if (markerReverse) {
							markerOffset -= squareAdj;
						} else {
							markerOffset += squareAdj;
						}
					
						// Clear canvas for full redraw
						ctx.clearRect(0, 0, w(), h());
					
						// Draw things
						{
							// Draw big rectangle
							ctx.fillStyle = '#0abfac';
							ctx.fillRect(w(25), h(25), w(50), h(50));
							
							// Draw little moving rectangle
							ctx.fillStyle = '#dd3322';
							ctx.fillRect(markerOffset, w(10), w(1), h(10));
							
							// Draw clock hand
							ctx.beginPath();
							ctx.strokeStyle = '#ff0abf';
							ctx.lineWidth = 10;
							ctx.moveTo(w(50), h(50));
							ctx.arc(w(50), h(50), h(25), 0, handRotation);
							ctx.stroke();
						}
						
						// Recurse
						lastTime = currentTime;
						render();
					});
				}
				return { init, stop, play, adjustCanvasSize };
			})();
			document.addEventListener('DOMContentLoaded', () => {
				app.init();
			});
			window.addEventListener('resize', () => {
				app.adjustCanvasSize();
			});
		</script>
	</head>
	<body>
		<canvas></canvas>
		<button onclick="app.play()">Play</button>
		<button onclick="app.stop()">Stop</button>
	</body>
</html>
```


	
# Drawing text

Two key methods exist for drawing text:

* `CanvasRenderingContext2D.fillText(text, x, y [, maxWidth]);`
* `CanvasRenderingContext2D.strokeText(text, x, y [, maxWidth]);`

Note that any font may be used, provided it is either available on the users operating system, or has been embeded with a font-face declaration, in the customary fashion.

```
<!DOCTYPE html>
<html>
	<head>
		<style>
			body {
				background: #999;
			}
			canvas {
				background: #ccc;
				width: 200px;
				height: 200px;
			}
		</style>
		<script>
			document.addEventListener('DOMContentLoaded', () => {
			
				const canvas = document.getElementsByTagName('canvas')[0];
				const styles = getComputedStyle(canvas);
				canvas.setAttribute('width', styles.width);
				canvas.setAttribute('height', styles.height);
				const ctx = canvas.getContext('2d');
				
				// Text is positioned from RIGHT and TOP edges of text box, at:
				// RIGHT text edge: 200 from canvas left edge,
				// and TOP text edge: 0 from canvas top edge.
				// Text also has a maxwidth constraint of 50.
				ctx.font = '50px sans-serif';
				ctx.fillStyle = 'red';
				ctx.textBaseline = 'top';
				ctx.textAlign = 'right';
				ctx.fillText ('Red text', 200, 0, 50);
				
				// Text is positioned from LEFT and BOTTOM edges of text box, at:
				// LEFT text edge: 0 from canvas left edge,
				// and BOTTOM text edge: 200 from canvas top edge.
				ctx.font = '20px sans-serif';
				ctx.fillStyle = 'purple';
				ctx.textAlign = 'left';
				ctx.textBaseline = 'bottom';
				ctx.fillText ('Purple text', 0, 200);
			});
		</script>
	</head>
	<body>
		<canvas></canvas>
	</body>
</html>
```

# Drawing a bitmap

An image source may be any of the following:

* HTMlImageElement - these are created with an `img` tag, or the `Image` constructor.
* SVGImageElement
* HTMLVideoElement
* HTMLCanvasElement

These are known collectively by the (very abstract) type CanvasImageSource.
				
The syntax is polymorhpic:

* ctx.drawImage(image, offsetX, offsetY);
* ctx.drawImage(image, offsetX, offsetY, imageWidth, imageHeight);
* ctx.drawImage(image, cropFromX, cropFromY, cropAreaWidth, cropAreaHeight, offsetX, offsetY, imageWidth, imageHeight);

```
document.addEventListener('DOMContentLoaded', () => {

	const canvas = document.getElementsByTagName('canvas')[0];
	const styles = getComputedStyle(canvas);
	canvas.setAttribute('width', styles.width);
	canvas.setAttribute('height', styles.height);
	const ctx = canvas.getContext('2d');
	
	let images = new Map([
		['mich', new Map([
			['url', './resources/mich.jpg'],
			['handle', null]
		])],
		['venus', new Map([
			['url', './resources/venus.png'],
			['handle', null]
		])]
	]);
	
	let imagePromises = [];
	for (let [imageKey, image] of images) {
		imagePromises.push(new Promise((resolve, reject) => {
			let handle = new Image();
			handle.addEventListener('load', () => {
				resolve();
			});
			handle.addEventListener('error', () => {
				reject();
			});
			handle.src = image.get('url');
			image.set('handle', handle);
		}));
	}
	Promise.all(imagePromises)
	.then(() => {
	
		let venusImage = images.get('venus').get('handle');
		let michImage = images.get('mich').get('handle');
	
		// Placed image
		ctx.drawImage(venusImage, 10, 50);
		
		// Scaled image
		ctx.drawImage(venusImage, 110, 50, 50, 50);
		
		// Cropped and scaled image
		ctx.drawImage(michImage, 200, 100, 50, 50, 10, 160, 150, 150);
		
	});

});
```

# Further information

A good list of all 2d canvas rendering context methods can be found [on MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)