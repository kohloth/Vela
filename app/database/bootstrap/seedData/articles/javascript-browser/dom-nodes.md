# DOM cheatsheet

The list contains a functional selection of the attributes and methods that appear upon DOM objects. It is not exhaustive.

It should be noted that `document` is also a property of the global object, `window`: `window.document`. Furthermore, key nodes can be accessed as follows:

* `document.documentElement`: The `html` node.
* `document.head`: The `head` node.
* `document.body`: The `body` node.

All of the following properties can be looked up on the MDN by using a URL format of: https://developer.mozilla.org/en-US/docs/Web/API/(interface)/(method)

|                                     | Name                                                 | Return value                   | Exists upon                          | Support |    |
|-------------------------------------|------------------------------------------------------|--------------------------------|--------------------------------------|---------|----|
| Selecting elements                  |
| M                                   | `document.getElementById()`                          | <HTMLElement> or null          | <Document> interface                 | Full    |    |
| M                                   | `document.getElementsByClassName()`                  | <HTMLCollection>               | <Document> interface                 | Full    |    |
| M                                   | `document.getElementsByTagName()`                    | <HTMLCollection>               | <Document> interface                 | Full    |    |
| M                                   | `document.querySelector()`                           | <HTMLElement> or null          | <ParentNode> mixin                   | Full    |    |
| M                                   | `document.querySelectorAll()`                        | Static <NodeList>              | <ParentNode> mixin                   | Full    |    |
| Element traversals                  |
| P                                   | `node.children`                                      | <HTMLCollection>               | <ParentNode> mixin                   | Good    | R  |
| P                                   | `node.childNodes`                                    | Live <NodeList>                | <Node> interface                     | Full    | R  |
| P                                   | `node.parentElement`                                 | <Element> or null              | <Node> interface                     | Full    | R  |
| P                                   | `node.parentNode`                                    | <Node> or null                 | <Node> interface                     | Full    | R  |
| P                                   | `node.previousSibling`                               | <Node> or null                 | <Node> interface                     | Full    | R  |
| P                                   | `node.previousElementSibling`                        | <HTMLElement> or null          | <NonDocumentTypeChildNode> interface | Good    | R  |
| P                                   | `node.nextSibling`                                   | <Node> or null                 | <Node> interface                     | Full    | R  |
| P                                   | `node.nextElementSibling`                            | <HTMLElement> or null          | <NonDocumentTypeChildNode> interface | Good    | R  |
| P                                   | `node.firstChild`                                    | <Node> or null                 | <Node> interface                     | Full    | R  |
| P                                   | `node.firstElementChild`                             | <HTMLElement> or null          | <ParentNode> mixin                   | Good    | R  |
| P                                   | `node.lastChild`                                     | <Node> or null                 | <Node> interface                     | Full    | R  |
| P                                   | `node.lastElementChild`                              | <HTMLElement> or null          | <ParentNode> mixin                   | Good    | R  |
| P                                   | `node.childElementCount`                             | <Integer>                      | <ParentNode> mixin                   | Full    | R  |
| Element node info                   |
| P                                   | `node.localName`                                     | <DOMString>                    | <Element>                            | Full    | R  |
| P                                   | `node.tagName`                                       | <String>                       | <Element>                            | Full    | R  |
| P                                   | `node.nodeName`                                      | <DomString>                    | <Node>                               | Full    | R  |
| P                                   | `node.nodeType`                                      | <Integer>                      | <Node>                               | Full    | R  |
| P                                   | `node.nodeValue`                                     | <String>                       | <Node>                               | Full    | RW |
| M                                   | `node.matches`                                       | <Boolean>                      | <Element>                            | Full    |    |
| Element text and HTML               |
| P                                   | `node.innerHTML`                                     | <DomString>                    | <Element>                            | Full    | RW |
| P                                   | `node.innerText`                                     | <String>                       | <HTMLElement>                        | Full    | RW |
| P                                   | `node.textContent`                                   | <String> or null               | <Node>                               | Full    | RW |
| P                                   | `node.outerHTML`                                     | <DomString>                    | <Element>                            | Full    | RW |
| P                                   | `node.outerText`                                     | <String>                       | <HTMLElement>                        | Patchy  | RW |
| M                                   | `node.insertAdjacentHTML(position, <DOMString> el)`  | <Void>                         | <Element>                            | Full    |    |
| M                                   | `node.insertAdjacentText(position, <DOMString> el)`  | <Void>                         | <Element>                            | Full    |    |
| M                                   | `node.insertAdjacentElement(position, <Element> el)` | <Element> (or null on failure) | <Element>                            | Full    |    |
| Attributes                          |
| M                                   | `node.hasAttribute(attrName)`                        | <Boolean>                      | <Element>                            | Full    |    |
| M                                   | `node.getAttribute(attrName)`                        | <String> or null (or "")       | <Element>                            | Full    |    |
| M                                   | `node.setAttribute(attrName, attrValue)`             | undefined                      | <Element>                            | Full    |    |
| M                                   | `node.removeAttribute(attrName)`                     | undefined                      | <Element>                            | Full    |    |
| P                                   | `node.attributes`                                    | live <NamedNodeMap>            | <Element>                            | Full    | R  |
| Useful element property collections |
| P                                   | `node.style`                                         | <CSSStyleDeclaration>          | <HTMLElement>                        | Full    | R  |
| P                                   | `node.className`                                     | <String>                       | <Element>                            | Full    | RW |
| P                                   | `node.classList`                                     | <DOMTokenList>                 | <Element>                            | Full    | R  |
| P                                   | `node.dataset`                                       | <DomStringMap>                 | <HTMLElement>                        | Full    | R  |
| P                                   | `node.offsetParent`                                  | <Element>                      | <HTMLElement>                        | Full    | R  |
| Element geometrics                  |
| P                                   | `node.clientHeight`                                  | <Number>                       | <Element>                            | Full    | R  |
| P                                   | `node.clientWidth`                                   | <Number>                       | <Element>                            | Full    | R  |
| P                                   | `node.clientTop`                                     | <Number>                       | <Element>                            | Full    | R  |
| P                                   | `node.clientLeft`                                    | <Number>                       | <Element>                            | Full    | R  |
| P                                   | `node.offsetHeight`                                  | <Number>                       | <HTMLElement>                        | Full    | R  |
| P                                   | `node.offsetWidth`                                   | <Number>                       | <HTMLElement>                        | Full    | R  |
| P                                   | `node.offsetTop`                                     | <Number>                       | <HTMLElement>                        | Full    | R  |
| P                                   | `node.offsetLeft`                                    | <Number>                       | <HTMLElement>                        | Full    | R  |
| M                                   | `node.getBoundingClientRect()`                       | <DOMRect>                      | <HTMLElement>                        | Full    | R  |