# Information

The following drag and drop event narrative is typical:

* The user applies their pointer upon an element and moves it. The `dragstart` event fires on the element that has been lifted. The handler of this event should set a textual property upon the `dataTransfer` object of the drag event, which can later be used to identify the element that is being dragged.
* The user drags the item they have picked up over another element. The `dragenter` event fires on that element. If the function that handles this event calls `e.preventDefault()`, it will not automatically block a drop, and it is then considered a legitimate drop target.
* The user releases their pointer, and the `drop` event fires upon the receiving element. The function that handles this event will then typically deduce the element that the user intended to drop there, by operating upon the relevant `dataTransfer` string. The subsequent code will then typically move the lifted node, or simply copy it. Within this handler function, it is also advisable to call `e.preventDefault()` so as to ensure that the browser will not open a new page or somesuch in response to receiving a dropped link event or somesuch.
* Finally, the `dragend` event fires upon the element that was originally lifted. This is typically used to remove the element from it's current location if needed. The `dragend` event will fire regardless of whether the drop ended successfully, or was cancelled. This information can be gleaned by inspecting the `dropEffect` attribute - if it has a value of `'none'`, then the drag was cancelled. It is worth noting that the drop event will fire regardless of whether it occurred within the viewport, or within another OS window or facet.

The remaining events may also come into play:
* `dragleave` fires when a dragged element or text selection leaves a valid drop target.
* `drag` continually fires when an element or text selection is being dragged.
* `dragover` continually fires when an element or text selection is being dragged over a valid drop target.

It is possible to specify a cursor-hugging ghost image to describe what is being dragged. However, by default, a visage of the element itself will be used, which in most cases, is more useful.

# Drag data mimetypes

* `text/plain`: Specifically well suited to passages of text. Should also exist in all handlers as a generic fallback.
* `text/uri-list`: Used to represent either a single link, or many links, delimited with a newline.
* `text/html`: An HTML string.
* `text/xml`: An XML string.
* `foo`: 
* `foo`: 

Images and files are not well-supported. Images are usually dragged by their URL value, with the type `text/uri-list`.
Custom types may be used. If w3schools examples are anything to go by, `text` is not a bad default name.
	
# Example

```
<!DOCTYPE html>
<html>
<head>
	<script>
	
		function handleDragStart(e) {
			let tagName = e.target.tagName.toLowerCase();
			switch (tagName) {
				case 'a':
					e.dataTransfer.setData('text/uri-list', e.target.getAttribute('href'));
					e.dataTransfer.setData('text/plain', e.target.textContent);
					break;
				case 'p':
					e.dataTransfer.setData('text/plain', e.target.textContent);
					break;
				case 'div':
					e.dataTransfer.setData('text/node-key', e.target.dataset.item);
					e.dataTransfer.setData('text/plain', e.target.textContent);
					break;
				default:
					throw new Error('Invalid tag name: ' + tagName);
			}
		};
		
		function handleDragOver(e) {
			let dropZoneId = e.target.getAttribute('id');
			if (dropZoneId === 'link-target' && [...e.dataTransfer.types].includes('text/uri-list')) {
				e.preventDefault();
			}
			if (dropZoneId === 'text-target' && ([...e.dataTransfer.types].includes('text/uri-list') || [...e.dataTransfer.types].includes('text/plain'))) {
				e.preventDefault();
			}
			if (dropZoneId === 'node-target' && [...e.dataTransfer.types].includes('text/node-key')) {
				e.preventDefault();
			}
		}
		
		function handleDrop(e) {
			let dropZoneId = e.target.getAttribute('id');
			let data;
			e.preventDefault();
			switch (dropZoneId) {
				case 'link-target':
					data = e.dataTransfer.getData('text/uri-list');
					e.target.insertAdjacentText('beforeend', data + ' ');
					break;
				case 'text-target':
					data = e.dataTransfer.getData('text/plain');
					e.target.insertAdjacentText('beforeend', data + ' ');
					break;
				case 'node-target':
					data = e.dataTransfer.getData('text/node-key');
					let node = document.querySelector(`[data-item=${data}]`);
					e.target.insertAdjacentElement('beforeend', node.cloneNode(true));
					break;
				default:
					throw new Error('Invalid drop zone type: ' + dropZoneId);
			}
		}
		
		function handleDragEnd(e) {
			let checkbox = document.getElementsByTagName('input')[0];
			let shouldCopy = checkbox.checked;
			if (!shouldCopy) {
				e.target.outerHTML = '';
			}
		}
	
		document.addEventListener('DOMContentLoaded', () => {
			Array.from(document.querySelector('.sources').children).forEach(child => {
				child.addEventListener('dragstart', handleDragStart);
				child.addEventListener('dragend', handleDragEnd);
			});
			Array.from(document.querySelectorAll('.targets > div > div')).forEach(child => {
				// let dropZoneId = child.getAttribute('id');
				child.addEventListener('dragover', handleDragOver);
				child.addEventListener('drop', handleDrop);
			});
		});
		
	</script>
</head>
<body>
	<div class="sources-wrap">
		<div class="sources">
			<a draggable="true" href="http://www.google.com">Visit Google</a>
			<a draggable="true" href="http://www.amazon.com">Visit Amazon</a>
			<a draggable="true" href="http://www.ebay.com">Visit Ebay</a>
			<p draggable="true">Lorem ipsum</p>
			<p draggable="true">dolor sit amet</p>
			<p draggable="true">sed lorem lorem</p>
			<div draggable="true" data-item="cake">Have some cake</div>
			<div draggable="true" data-item="bread">Have some bread</div>
			<div draggable="true" data-item="biscuits">Have some biscuits</div>
		</div>
		<p>Copy?</p>
		<input type="checkbox" checked>
	</div>
	<div class="targets">
		<div>
			# I accept links
			<div id="link-target">
			</div>
		</div>
		<div>
			# I accept text
			<div id="text-target">
			</div>
		</div>
		<div>
			# I accept elements
			<div id="node-target">
			</div>
		</div>
	</div>
</body>
</html>
```

# DropEffect

In addition to being able to specify data that pertains to the drag gesture in the dataTransfer object, the specification describes a way to place an action flag too. It may be copy, move, or link. The code below shows how this is done in theory, and where the browser does not fully support the specification.

```
function handleDragStart(e) {
	e.dataTransfer.setData('text/plain', e.target.textContent);
	e.dataTransfer.effectAllowed = 'copyMove';
	// ... Describes what may be done with the object that is being dragged.
	// Works in Chrome
};

function handleDragOver(e) {
	e.preventDefault();
	e.dataTransfer.dropEffect = e.ctrlKey ? 'copy' : 'move';
	// ... describes what will happen to the item when it is dropped.
	// Works in Chrome
}

function handleDrop(e) {
	e.preventDefault();
	console.log(e.dataTransfer.dropEffect);
	// ... describes the action that is elected within the handleDragOver method.
	// Doesn't work in Chrome
	// ... returns 'none' when it should return 'copy' or 'move'
}
```

Confirmation of this lack of support [exists here](https://stackoverflow.com/questions/20471273/html5-drag-and-drop-effectallowed-and-dropeffect/26082807).
