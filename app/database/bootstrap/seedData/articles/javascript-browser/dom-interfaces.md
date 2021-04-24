# DOM Node interface inheritance model

```
EventTarget
	Node
		Document
		DocumentFragment
		DocumentType
		Element
			SVGElement
			HTMLElement
				HTMLAnchorElement
				HTMLAreaElement
				HTMLUListElement
				...
		CharacterData
			Comment
			ProcessingInstruction
			Text
```

An exhaustive list of HTML node interfaces can be found at: [https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM)
	
# Interface list

| Name                     | Type               | Inherits from | Experimental |
|--------------------------|--------------------|---------------|--------------|
| Attr                     | Interface          | Node          | NO           |
| CDATASection             | Interface          | -             | NO           |
| CharacterData            | Abstract interface | Node          | NO           |
| ChildNode                | Abstract interface | -             | YES          |
| Comment                  | Interface          | CharacterData | NO           |
| CustomEvent              | Interface          | -             | NO           |
| Document                 | Interface          | Node          | NO           |
| DocumentFragment         | Interface          | Node          | NO           |
| DocumentType             | Interface          | Node          | NO           |
| DOMException             | Interface          | -             | NO           |
| DOMImplementation        | Interface          | -             | NO           |
| DOMString                | Interface          | -             | NO           |
| DOMTimeStamp             | Interface          | -             | NO           |
| DOMStringList            | Interface          | -             | NO           |
| DOMTokenList             | Interface          | -             | NO           |
| Element                  | Interface          | Node          | NO           |
| Event                    | Interface          | -             | NO           |
| EventTarget              | Interface          | -             | NO           |
| HTMLCollection           | Interface          | -             | NO           |
| MutationObserver         | Interface          | -             | NO           |
| MutationRecord           | Interface          | -             | NO           |
| NamedNodeMap             | Interface          | -             | NO           |
| Node                     | Interface          | EventTarget   | NO           |
| NodeFilter               | Interface          | -             | NO           |
| NodeIterator             | Interface          | -             | NO           |
| NodeList                 | Interface          | -             | NO           |
| NonDocumentTypeChildNode | Interface          | -             | NO           |
| ParentNode               | Mixin              | -             | NO           |
| ProcessingInstruction    | Interface          | CharacterData | NO           |
| Selection                | Interface          | -             | YES          |
| Range                    | Interface          | -             | NO           |
| Text                     | Interface          | CharacterData | NO           |
| TextDecoder              | Interface          | -             | Y            |
| TextEncoder              | Interface          | -             | YES          |
| TimeRanges               | Interface          | -             | NO           |
| TreeWalker               | Interface          | -             | NO           |
| URL                      | Interface          | -             | NO           |
| Window                   | Interface          | -             | NO           |
| Worker                   | Interface          | -             | NO           |
| XMLDocument              | Interface          | -             | YES          |

Source: [https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
