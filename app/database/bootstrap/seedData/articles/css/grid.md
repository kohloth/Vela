# Terms

* `Grid container` The parent element that has the `display: grid` rule applied to it.
* `Grid item` All children of the grid container.
* `Grid cell` A grid item.
* `Grid line` An invisible line that separates rows from rows and columns from columns.
* `Grid column` A vertical array of items.
* `Grid row` A horizontal array of items.
* `Grid track` An array of items.
* `Grid gap / gutter` The space between rows and columns.

# Size methodologies: Container

`Grid template columns: auto`. The grid will have 3 columns. Each column will be the same width, except for when the content of a column is too large to fit. In such a case, the column width will increase to accommodate the content.

``` 

.grid-container {
	display: grid;
	grid-template-columns: auto auto auto;
}
```

`Grid template columns: fr` . The grid will have 4 columns. Each column will be the same width.

``` 
.grid-container {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}
```

`Grid template rows` Typically used in conjunction with `grid-template-columns` .

``` 
.grid-container {
	display: grid;
	grid-template-columns: 100px 100px 100px;
	grid-template-row: 1f 2fr 2fr 1fr;
}
```

# Size methodologies: Item, numeric

Using single values

``` 
.grid-container &gt; div {
	grid-column-start: 1;
	grid-column-end: 2;
	grid-row-start: 2;
	grid-row-end: 3;
}
```

Using absolute coordinates for column and row

``` 
.grid-container &gt; div {
	grid-column: 1 / 2;
	grid-row: 1 / 3;
}
```

Using relative coordinates for column and row

``` 
.grid-container &gt; div {
	grid-column: 1 / span 2;
	grid-row: 1 / span 3;
}
```

Using relative coordinates for column and row

``` 
.grid-container &gt; div {
	grid-column: 1 / span 2;
	grid-row: 1 / span 3;
}
```

Using names for column and row

``` 
.grid-container {
	display: grid;
	grid-template-columns: [col1-start] 100px  [col2-start] 100px  [col3-start] 100px [col3-end];
	grid-template-rows: [row1-start] auto [row2-start] auto [row2-end];
}

.grid-container &gt; header {
	grid-column: col1-start / col3-end;
	grid-row: row2-start / row2-end;
}
```

# Size methodologies: Item, named

Named grid areas

``` 
.grid-container &gt; {
	.grid-template-areas:
	'header header header header header header'
	'menu main main main right right'
	'menu footer footer footer footer footer';
	.grid-container &gt; header {
		grid-area: header;
	}
	.grid-container &gt; footer {
		grid-area: footer;
	}
	.grid-container &gt; main {
		grid-area: main;
	}
	.grid-container &gt; aside {
		grid-area: right;
	}
}
```

# Grid gaps

``` 
grid-row-gap
grid-column-gap
```

# Shorthands

All of the following can take two inputs for two distinct values, or one input, for two identical values. When two arguments are given for `grid-gap` , the order is `row-gap` then `column-gap` . When two arguments are given for `place` attributes, the order is `align` then `justify` . In both cases, the order is top/bottom then left/right.

``` 
grid-gap: A combination of grid-row-gap and grid-column gap.
place-items: A combination of align-items and justify-items.
place-content: A combination of align-content and justify-content.
place-self: A combination of align-self and justify-self.
```

# Aligning: Container

The following properties may be asserted upon the grid container in order to align grid items:

To control alignment of columns within container

``` 
justify-content: space-around | space-between | center | start | end
```

To control alignment of rows within container

``` 
align-content: space-around | space-between | center | start | end
```

To control horizontal positioning of items within cell areas (i.e. How the remaining space to the left and right is treated.)

``` 
justify-items: stretch | center | start | end
```

To control vertical positioning of items within cell areas (i.e. How the remaining space to the top and bottom is treated.)

``` 
align-items: stretch | center | start | end
```

# Aligning: Item

To control horizontal positioning of an item within a cell area

``` 
justify-self: stretch | center | start | end
```

To control vertical positioning of an item within a cell area

``` 
align-self: stretch | center | start | end
```

# Notes

* Grid containers may be specified with either `display: grid;` or `display: inline-grid; `.
* Grid items may be designed to overlap.
* It is permissible to specify item sizes indirectly on the grid container with a property such as `grid-template-columns: auto auto auto; `, and then go on to override only a few select items with item rules, such as `grid-column` and `grid-row`.
* Some useful grid examples exist at: https://gridbyexample.com/examples
