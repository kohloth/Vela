# Information

* When creating accessible software, remember that disability takes many forms. Disability can be a visual impairment, an auditory impairment, an impairment of dexterity, or a psychological impairment. Disability may also be a combination of these things.
* When creating accessible software, remember that disability exists in varying degrees. Some people may be completely blind, whereas some may be long-sighted. Some people may have completely and permanently lost use of both of their arms, whereas some people may only be able to use one arm because they are temporarily cradling a child in the other.
* With the two points above in mind, note that any effort to make a website more easily operable for users who are more commonly thought of as "disabled", will also make the site more accessible to all users generally. This can only be a good thing if you want people to use it.
* Having said this, there are 5 key interaction styles. Covering each of these should stand you in relatively good stead. They are as follows. (Source: Presentation given by Alastair Campbell)
	* Keyboard only
	* Screen magnification
	* Screen reader
	* Deafness
	* Cognitive issues

* Similarly to conventional cross browser testing, usability testing should take place with a varity of clients. It should include a variety of browsers, operating systems, and screen readers. Jaws and NVDA are among the most popular screen readers, while the Chrome extension Chromevox is more faithful to standards.
* Perhaps the most canonical accessibility standards are contained within the WCAG 2.0, (web content accessibility guidelines) - which was released in 2008. Since then, minor revisions and enhancements were published in 2018 in the form of the WCAG 2.1. Version 2.1. focuses largely on people with low vision, people with cognitive impairments, and people with disabilities that access websites using mobile devices.
* The degree of adherence to these standards is expressed with the conformance rankings A, AA, and AAA.
* Most assisstive technologies parse a webpage in a minimal form known as an accessibility tree. This is essentially a minimalistic set of nested nodes that is an abstraction of the literal HTML. Just like regualar HTML nodes, each node of the derived accessibility tree can have properties. The most important of these are role, name, value, and state. By default, the accessibility tree nodes get their properties from standard markup, but in the cases where markup is not sufficient, aria tags can and should be used to explicitly set them.

# WCAG 2.0 highlights

* The document can be accessed in full <a href="https://www.w3.org/TR/WCAG20/">here.
* The WCAG 2.0 was created by the W3C in collaboration with various organisations and individuals throughout the world.
* It is built around the following principles: perceivable, operable, understandable, and robust.
* The 12 guidelines are:
	* 1.1. Perceivable: Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.
	* 1.2. Perceivable: Time-based Media: Provide alternatives for time-based media.
	* 1.3. Perceivable: Create content that can be presented in different ways (for example simpler layout) without losing information or structure.
	* 1.4. Perceivable: Make it easier for users to see and hear content including separating foreground from background.
	* 2.1. Operable: Make all functionality available from a keyboard.
	* 2.2. Operable: Provide users enough time to read and use content.
	* 2.3. Operable: Do not design content in a way that is known to cause seizures.
	* 2.4. Operable: Provide ways to help users navigate, find content, and determine where they are.
	* 3.1. Understandable: Make text content readable and understandable.
	* 3.2. Understandable: Make Web pages appear and operate in predictable ways.
	* 3.3. Understandable: Provide input assisstance to help users avoid and correct mistakes.
	* 4.1. Robust: Maximize compatibility with current and future user agents, including assistive technologies.

# WCAG 2.1 highlights
		
The 2.1 version is stand-alone, and conformance to it is also conformance to version 2.0.
Version 2.1. introduces a dozen or so extra criteria. These include:

* Text should be made more readable by having a minimal line spacing value (AA)
* Input fields should identify their purpose clearly and programatically (AA)
* UI regions, icons and other UI components identify their purpose clearly and programatically (AAA)
* Non text contrast: User interface elements should have sufficient contrast to be perceivable and usable. (AA)
* Animations should be disablable (AAA)

# Implementation checklist

* Make an effort to author documents with good standard markup before making an effort to author douments with accessibility-specific markup. A developer should do this, as often, standard markup will provide information that is sufficient for a screen reader to construct a complete accessibility tree. This concept is backed by item 2.1, "first rule of aria use". in the W3C document entitled "Using ARIA". It states: "If you can use a native HTML element [HTML51] or attribute with the semantics and behavior you require already built in, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, then do so."
	* Use semantic markup tags such as `h1, h2, h3, section, header, footer, address, aside`.
	* Ensure form inputs are tied to a label element by means of`id` and `for` attributes.

* Ensure that content is laid-out in a logical way. When it is programatically parsed by an assisstive technology, the ordering and nesting of elements and headings should make sense.
* Make any element that is desired to be focusable (and which is not focusable by default) with a tabindex of 0. Make any element that is desired to be unfocusable (and which is focusable by default) with a tabindex of -1.
* Give all rich media elements some form of textual representation. Images should have alt tags. Videos should have caption tracks. Audio elements should be transcribed into standard hyper text.
* Always give some form of indication as to which element on the page is focused. It is permissible to disable the browsers default focus styling by clobbering the `outline` style, but custom and clear focus styles must be subsequently implemented.
* Keep main content within one wrapping element and popup content within another. Disable focusabiliy of the main content elements when popups display by making them invisible with CSS, making them unreachable with an aria-hidden attribute, or making them unreachable with a tabindex value of -1.
* Ensure popups can be dismissed and videos can be stopped by presses of the escape key.
* Use SVG if possible, as it will look clear once zoomed in.
* Consider using vertical media queries to hide or rearrange elements when users are zoomed in. Use of CSS grid can help with radical reflows.
* Use native form inputs when possible. Assisstive technologies will anticipate these more readily than custom input types. Accessibility can sometimes be improved further by using modern HTML5 form inputs such as `tel` and `email` where appropriate.
* Ensure all form inputs are described with a corresponding label, or, if not, a surrogate descriptor element that is somehow linked.
* Consider adding "skip navigation" and "return to top" buttons that only appears on tabfocus.
* Text should ideally be of sufficient contrast to ensure readability. Alternatively, a high-contrast mode should be available.
* Images of text must not be used, as they are not programatically determinable.
* Give users enough time to read and interact with elements. Anything that is time-based should have a non time-contingent variant.
* The site must be operable by means of keyboard alone.
* Ensure that no keyboard traps exist.

Sources:

[W3C: Using Aria](https://w3c.github.io/using-aria/#firstrule)

# Specialist markup

## Aria tags

### Surrogate value

```
aria-labelledby
Used to specify an element that is a short textual description of another.
<p id="thing-label">This thing is a thing
<thing aria-labelledby="thing-label">

aria-label
Used to specify a textual description of an element. Overrides any existing natural textual description. This should only be used when an element on the page containing a description does not already exist and aria-labelledby cannot be used.

aria-describedby
A more verbose version of labelledby. Should be used when tying a verbose descriptive element to an element that lacks a description.
```

### Nature description

```
aria-readonly
aria-required
```

### State

```
aria-disabled
aria-checked
aria-invalid
aria-hidden
aria-expanded
aria-selected
```

### Misc

```
aria-live
This tag is used to identify regions of the page that update dynamically. This live categorisation is also implicit in certain region roles. Any region that is live will cause the screen reader to announce the new content when the content changes. The announcements are given one of two priorities, which is signified by the attribute value. Note that things are only announced after they change, and that a region must also be live from page load if the announcements are to work.
<div aria-live="polite">
<div aria-live="assertive">
<div role="alert">
<div role="status">
<div role="log">
<div role="progressbar">

```

Sources:

* [W3C: Aria states and properties](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties)

## Roles

```
Widget roles
	Button
	Checkbox
	Gridcell
	Link
	Menuitem
	Menuitemcheckbox 
	Menuitemradio
	Option
	Progressbar
	Radio
	Scrollbar
	Searchbox
	Separator (when focusable)
	Slider
	Spinbutton
	Switch
	Tab
	Tabpanel
Composite roles
	Combobox
	Grid (including row, gridcell, rowheader, columnheader roles)
	Listbox (including option role)
	Menu
	Menubar
	Radiogroup (see radio role)
	Tablist (including tab and tabpanel roles)
	Tree
Document structure roles
	Application
	Article
	Cell
	Columnheader
	Definition
	Directory
	Document
	Feed
	Figure
	Group
	Heading
	Img
	List
	Listitem
	Math
	None
	Note
	Presentation
	Row
	Rowgroup
	Rowheader
Landmark roles
	Banner
	Complementary
	Contentinfo
	Form
	Main
	Navigation
Live region roles
	Alert
	Log
	Marquee
	Status
Window roles
	Alertdialog
	Dialog
```

Sources:

* [MDN aria roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques)
* [W3C: Aria states and properties](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties)