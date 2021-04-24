# URL

```
function getPathParts(url) {
	const el = document.createElement('a');
	el.href = url;
	const desiredProperties = [
		'protocol',
		'host',
		'hostname',
		'pathname',
		'search',
	];
	const output = {};
	desiredProperties.forEach(prop => {
		output[prop] = el[prop];
	});
	return output;
}

function getAppParameters() {

	const defaultParams = {
		mode: 'production',
		testCafeIsRunning: false,
	};

	const suppliedParams = window.location.search
		.slice(1)
		.split('&')
		.map(p => p.split('='))
		.reduce((obj, [key, value]) => ({
			...obj,
			[key]: parseBool(value),
		}), {});

	const output = { ...defaultParams, ...suppliedParams };
	if (!['production', 'development'].includes(output.mode)) {
		throw new Error(`Invalid app mode: ${output.mode}`);
	}

	return output;
}
```

# DOM node

```
function addToClassList(el, className) {
	return el.setAttribute('class', `${el.getAttribute('class')} ${className}`);
}

function removeFromClassList(el, className) {
	const removedClass = el.getAttribute('class').replace(new RegExp(`(\\s|^)${className}(\\s|$)`, 'g'), '$2');
	el.setAttribute('class', removedClass);
}
```