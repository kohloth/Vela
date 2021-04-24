# Background

Since the end of 2018, browser support for native web components has become the norm. As such, they are a possible alternative to synthetic UI frameworks.

## Arguments for using native web components

* There are no dependencies. File sizes are reduced. Build is simpler. There is less abstraction.
* Its native ubiquity may eventually give rise to popularity.

## Arguments for using a framework such as React

* Frameworks such as React are still far more popular, and therefore, maintainable.
* A framework such as React offers more than just component encapsulation. It provides a declarative UI rendering model, routers and elegant JSX element-composition syntax.

# Element declaration overview


User-defined elements are created as a javascript class, registered to the `CustomElementRegistry`, and then used n markup. Components may act in response to a spartan set of lifecycle hooks, in addition to conventional DOM events.

Two types of custom element exist. Customised built-in elements inherit from existing, concret elements such as HTMLUListElement and HTMLAnchorElement. Autonomous custom elements are entirely idiosyncratic, and only extend the HTMLElement class.

Native web components have their contents described by a shadow dom node. This, for most intents and purposes, works just like any other collection of nested nodes, but is a little more encapsulated.

# Autonomous element

```
// Create class
class PopUpInfo extends HTMLElement {
	constructor() {
		super();
		var shadow = this.attachShadow({mode: 'open'});
		var wrapper = document.createElement('span');
		wrapper.setAttribute('class','wrapper');
		var style = document.createElement('style');
		style.textContent = '.wrapper { background: red; }'; // ...etc...
		shadow.appendChild(style);
		shadow.appendChild(wrapper);
	}
}

// Register element
customElements.define('popup-info', PopUpInfo);

// In page HTML, use the element
<popup-info img="img/alt.png" text="Your card validation code (CVC)
is an extra security feature — it is the last 3 or 4 numbers on the
back of your card."></popup-info>
```

# Customised built-in element

```
// Create class
class ExpandingList extends HTMLUListElement {
	constructor() {
		super();
		// ...
	}
}

// Register element
customElements.define('expanding-list', ExpandingList, { extends: "ul" });

// In page HTML, use the element
<ul is="expanding-list">
	// ...
</ul>
```

# Lifecycle hooks

```
// Create class
class PopUpInfo extends HTMLElement {
	
	// This getter must be present if the attributeChangedCallback
	// method is to fire.
	static get observedAttributes() {
		return ['title', 'message'];
	}

	constructor() {
		super();
		...
	}
	connectedCallback() {
		// Mounted
	}
	disconnectedCallback() {
		// Unmounted
	}
	adoptedCallback() {
		// Moved to a different document
	}
	attributeChangedCallback() {
		// HTML element attribute changed
	}
}
```
