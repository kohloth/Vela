# Table

| Name                            | Full syntax                                                         | Interface  | Type     | Takes node | Takes str | Parses HTML str | Moves mounted node? | Set returns          | Set location             | Get returns             |
|---------------------------------|---------------------------------------------------------------------|------------|----------|------------|-----------|-----------------|---------------------|----------------------|--------------------------|-------------------------|
|                                 |                                                                     |            |          |            |           |                 |                     |                      |                          |                         |
| node.textContent                | node.textContent = ‘Hello world’                                    | Node       | Property | No         | Yes       | No              | N/A                 | The inserted entity  | Within                   | HTML string: All        |
| node.appendChild()              | node.appendChild(childNode)                                         | Node       | Method   | Yes        | No        | No              | Yes                 | The inserted entity  | beforeend                | N/A                     |
| node.insertBefore()             | var insertedNode = parentNode.insertBefore(newNode, referenceNode); | Node       | Method   | Yes        | No        | No              | Yes                 | The inserted entity  | Before the referenceNode | N/A                     |
|                                 |                                                                     |            |          |            |           |                 |                     |                      |                          |                         |
| element.outerHTML               | element.outerHTML = ‘’                                              | Element    | Property | No         | Yes       | Yes             | N/A                 | The inserted entity  | Without                  | HTML string: All        |
| element.innerHTML               | element.innerHTML = ‘’                                              | Element    | Property | No         | Yes       | Yes             | N/A                 | The inserted entity  | Within                   | HTML string: All        |
| element.attachShadow()          | var shadowroot = element.attachShadow({mode: ‘open’})               | Element    | Method   | N/A        | N/A       | N/A             | N/A                 | The shadow root      | Within?                  | N/A                     |
| element.insertAdjacentElement() | element.insertAdjacentElement(position, element)                    | Element    | Method   | Yes        | No        | No              | Yes                 | The inserted element | Specified by argument    | N/A                     |
| element.insertAdjacentHTML()    | element.insertAdjacentHTML(position, text)                          | Element    | Method   | No         | Yes       | Yes             | N/A                 | undefined            | Specified by argument    | N/A                     |
| element.insertAdjacentText()    | element.insertAdjacentText(position, element)                       | Element    | Method   | No         | Yes       | No              | N/A                 | undefined            | Specified by argument    | N/A                     |
|                                 |                                                                     |            |          |            |           |                 |                     |                      |                          |                         |
| htmlElement.innerText           | htmlElement.innerText = ‘’                                          | HTMElement | Property | No         | Yes       | No              | N/A                 | The inserted entity  | Within                   | HTML string: Human only |
|                                 |                                                                     |            |          |            |           |                 |                     |                      |                          |                         |
| parentNode.append()             | parentNode.append((Node or DOMString)... nodes)                     | ParentNode | Method   | Yes        | Yes       | No              | Yes                 | undefined            | beforeend                | N/A                     |
| parentNode.prepend()            | parentNode.prepend(...nodes)                                        | ParentNode | Method   | Yes        | Yes       | No              | Yes                 | undefined            | afterbegin               | N/A                     |

	
# Demo script

```
<!DOCTYPE html>
<html>
<head>
	<title>Demo</title>
	<meta charset="UTF-8">
	<style>
		.buttons {
		
		}
	</style>
	<script>
	
		var elements, h1, h2, ul, p, innerDiv, node, nodeText, plainString, htmlString;
	
		document.addEventListener('DOMContentLoaded', () => {
			elements = document.querySelector('.elements');
			h1 = document.querySelector('h1');
			h2 = document.querySelector('h2');
			ul = document.querySelector('ul');
			p = document.querySelector('p');
			innerDiv = document.querySelector('.inner-div');
		
			node = document.createElement('p');
			nodeText = document.createTextNode('Inserted paragraph'); node.appendChild(nodeText);
			plainString = 'Inserted plain string';
			htmlString = '<h3>Inserted heading 3</h3>';
		});
		
		// ##################################################
		
		function textContentNode() {
			console.log(elements.textContent = node);
		}
		function textContentPlain() {
			console.log(elements.textContent = plainString);
		}
		function textContentHtml() {
			console.log(elements.textContent = htmlString);
		}
		
		// ##################################################
		
		function appendChildNode() {
			console.log(elements.appendChild(node));
		}
		function appendChildPlain() {
			console.log(elements.appendChild(plainString));
		}
		function appendChildHtml() {
			console.log(elements.appendChild(htmlString));
		}
		
		// ##################################################
		
		function insertBeforeNode() {
			console.log(elements.insertBefore(node, p));
		}
		function insertBeforePlain() {
			console.log(elements.insertBefore(plainString, p));
		}
		function insertBeforeHtml() {
			console.log(elements.insertBefore(htmlString, p));
		}
		
		// ##################################################
		
		function outerHtmlNode() {
			console.log(ul.outerHTML = node);
		}
		function outerHtmlPlain() {
			console.log(ul.outerHTML = plainString);
		}
		function outerHtmlHtml() {
			console.log(ul.outerHTML = htmlString);
		}
		
		// ##################################################
		
		function innerHtmlNode() {
			console.log(elements.innerHTML = node);
		}
		function innerHtmlPlain() {
			console.log(elements.innerHTML = plainString);
		}
		function innerHtmlHtml() {
			console.log(elements.innerHTML = htmlString);
		}
		
		// ##################################################
		
		function adjElementNode() {
			console.log(p.insertAdjacentElement('afterend', node));
		}
		function adjElementPlain() {
			console.log(p.insertAdjacentElement('afterend', plainString));
		}
		function adjElementHtml() {
			console.log(p.insertAdjacentElement('afterend', htmlString));
		}
		
		// ##################################################
		
		function adjHtmlNode() {
			console.log(p.insertAdjacentHTML('afterend', node));
		}
		function adjHtmlPlain() {
			console.log(p.insertAdjacentHTML('afterend', plainString));
		}
		function adjHtmlHtml() {
			console.log(p.insertAdjacentHTML('afterend', htmlString));
		}
		
		// ##################################################
		
		function adjTextNode() {
			console.log(p.insertAdjacentText('afterend', node));
		}
		function adjTextPlain() {
			console.log(p.insertAdjacentText('afterend', plainString));
		}
		function adjTextHtml() {
			console.log(p.insertAdjacentText('afterend', htmlString));
		}
		
		// ##################################################
		
		function innerTextNode() {
			console.log(elements.innerText = node);
		}
		function innerTextPlain() {
			console.log(elements.innerText = plainString);
		}
		function innerTextHtml() {
			console.log(elements.innerText = htmlString);
		}
		
		// ##################################################
		
		function appendNode() {
			console.log(elements.append(node));
		}
		function appendPlain() {
			console.log(elements.append(plainString));
		}
		function appendHtml() {
			console.log(elements.append(htmlString));
		}
		
		// ##################################################
		
		function prependNode() {
			console.log(elements.prepend(node));
		}
		function prependPlain() {
			console.log(elements.prepend(plainString));
		}
		function prependHtml() {
			console.log(elements.prepend(htmlString));
		}
		
		// ##################################################
		// ##################################################

		function copyTestInsertBefore() {
			console.log(elements.insertBefore(p, h1));
		}
		function copyTestInsertAdjacentElement() {
			console.log(ul.insertAdjacentElement('beforebegin', p));
		}
		function copyTestAppend() {
			console.log(innerDiv.append(p));
		}
		function copyTestPrepend() {
			console.log(innerDiv.prepend(p));
		}
		
	</script>
</head>
<body>
	<div class="elements">
		<h1>Welcome</h1>
		<h2>This is a web page</h2>
		<div class="inner-div"></div>
		<ul>
			<li>One</li>
			<li>Two</li>
			<li>Three</li>
		</ul>
		<p>Some stuff</p>
	</div>
	<div class="buttons">
		<div>
			<button onclick="textContentNode()">node.textContent, node</button>
			<button onclick="textContentPlain()">node.textContent, plainString </button>
			<button onclick="textContentHtml()">node.textContent, htmlString</button>
		</div>
		<div>
			<button onclick="appendChildNode()">node.appendChild, node</button>
			<button onclick="appendChildPlain()">node.appendChild, plainString</button>
			<button onclick="appendChildHtml()">node.appendChild, htmlString</button>
		</div>
		<div>
			<button onclick="insertBeforeNode()">node.insertBefore, node</button>
			<button onclick="insertBeforePlain()">node.insertBefore, plainString</button>
			<button onclick="insertBeforeHtml()">node.insertBefore, htmlString</button>
		</div>
		<div>
			<button onclick="outerHtmlNode()">element.outerHtml, node</button>
			<button onclick="outerHtmlPlain()">element.outerHtml, plainString</button>
			<button onclick="outerHtmlHtml()">element.outerHtml, htmlString</button>
		</div>
		<div>
			<button onclick="innerHtmlNode()">element.innerHtml, node</button>
			<button onclick="innerHtmlPlain()">element.innerHtml, plainString</button>
			<button onclick="innerHtmlHtml()">element.innerHtml, htmlString</button>
		</div>
		<div>
			<button onclick="adjElementNode()">element.insertAdjacentElement, node</button>
			<button onclick="adjElementPlain()">element.insertAdjacentElement, plainString</button>
			<button onclick="adjElementHtml()">element.insertAdjacentElement, htmlString</button>
		</div>
		<div>
			<button onclick="adjHtmlNode()">element.insertAdjacentHTML, node</button>
			<button onclick="adjHtmlPlain()">element.insertAdjacentHTML, plainString</button>
			<button onclick="adjHtmlHtml()">element.insertAdjacentHTML, htmlString</button>
		</div>
		<div>
			<button onclick="adjTextNode()">element.insertAdjacentText, node</button>
			<button onclick="adjTextPlain()">element.insertAdjacentText, plainString</button>
			<button onclick="adjTextHtml()">element.insertAdjacentText, htmlString</button>
		</div>
		<div>
			<button onclick="innerTextNode()">htmlElement.innerText, node</button>
			<button onclick="innerTextPlain()">htmlElement.innerText, plainString</button>
			<button onclick="innerTextHtml()">htmlElement.innerText, htmlString</button>
		</div>
		<div>
			<button onclick="appendNode()">parentNode.append, node</button>
			<button onclick="appendPlain()">parentNode.append, plainString</button>
			<button onclick="appendHtml()">parentNode.append, htmlString</button>
		</div>
		<div>
			<button onclick="prependNode()">parentNode.prepend, node</button>
			<button onclick="prependPlain()">parentNode.prepend, plainString</button>
			<button onclick="prependHtml()">parentNode.prepend, htmlString</button>
		</div>
		<div>
			<button onclick="copyTestInsertBefore()">copyTestInsertBefore, p</button>
			<button onclick="copyTestInsertAdjacentElement()">copyTextInsertAdjacentElement, p</button>
			<button onclick="copyTestAppend()">copyTestAppend, p</button>
			<button onclick="copyTestPrepend()">copyTestPrepend, p</button>
		</div>
	</div>
</body>
</html>
```