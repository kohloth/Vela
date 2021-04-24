# Properties

# Container properties

```
flex-direction: row | row-reverse | column | column-reverse
Assigns main-axis and cross-axis to x and y

flex-wrap: nowrap | wrap | wrap-reverse
Defines item-wrapping behaviour.

flex-flow: &lt;flex-direction&gt; &lt;flex-wrap&gt;
Shorthand.

justify-content: flex-start | flex-end | center | space-between | space-around
Describes distribution of space between (and around) content items along the main-axis.

align-items: stretch | center | flex-start | flex-end | baseline
Controls the alignment of items on the cross-axis.

align-content: stretch | center | flex-start | flex-end | space-between | space-around
Controls the alignment of item lines on the cross-axis.
```

# Item properties

```
order: &lt;int&gt;
flex-grow:  &lt;number&gt;
Defines how much an item size can increase along the main-axis to fill the remaining space.

flex-shrink: &lt;number&gt;
Defines how much an item size can decrease along the main-axis to ensure items fit in the available space.

flex-basis: &lt;number&gt;
Defines the initial width of a flex item.

flex: &lt;flex-grow&gt; &lt;flex-shrink&gt; &lt;flex-basis&gt;
Shorthand.

align-self: auto | stretch | center | flex-start | flex-end | baseline
Overrides the align-items property of a flex container at item-level.
```


# Examples

# Perfect centering

```
&lt;div class="flex-container"&gt;
&lt;div&gt;test&lt;/div&gt;
&lt;/div&gt;

.flex-container {
	display: flex;
	justify-content: center;
	align-items: center;
}
```

# Nav and sticky footer

```
&lt;div class="flex-container"&gt;
&lt;header&gt;&lt;/header&gt;
&lt;main&gt;&lt;/main&gt;
&lt;footer&gt;&lt;/footer&gt;
&lt;/div&gt;

.flex-container {
	width: 100%;
	height: 300px;
	display: flex;
	flex-direction: column;
}
.flex-container header {
	background: #5f3939;
	height: 50px;
}
.flex-container main {
	background: #2f4c2f;
	flex-grow: 1;
}
.flex-container footer {
	background: #676738;
	height: 50px;
}
```

# Notes

* A flex container is usually signified with a display property of `flex`. However, it can also be signified with `inline-flex`. The latter is the same as the former, with the exception that with the latter, the element itself is an inline element, as opposed to a block element.
* `flex-basis` and `width`/`height` are largely interchangable when the `flex-direction` is congruent. `flex-basis` will always apply to the box dimension that runs along the main axis. It should be a number followed by a UOM. (i.e. 50%, 250px etc...)
* `flex-shrink: 0` and `flex-grow: 0` can be used to enforce an unchanging `width` or `flex-basis` rule.
* In case both `flex-basis` (other than `auto`) and `width` (or `height` in case of `flex-direction: column`) are set for an element, `flex-basis` has priority. As such, `width` and `height` can be used as fallbacks.
* As it is out-of-flow, an absolutely-positioned child of a flex container does not participate in flex layout.
* The margins of adjacent flex items do not collapse.
* [The flexbox CSS spec](https://drafts.csswg.org/css-flexbox-1)