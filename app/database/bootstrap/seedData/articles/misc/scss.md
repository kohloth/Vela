# SCSS info

```
// Import partial into master
@import '_myfile.scss';

// Mixins
@mixin borderRadius($r) {
	border-radius: $r;
	-moz-border-radius: $r;
	-webkit-border-radius: $r;
	-o-border-radius: $r;
	-ms-border-radius: $r;
}
.box {
	@include borderRadius(10px);
}

// Extend
.green {
	background-color: #006600;
	color: #66ff66;
}
.message {
	@extend: .green;
}

// Functions
@function multi($n1, $n2) {
	@return $n1 * $n2;
}
$r: multi(10, 20);

// Conditionals
@if $n > 5 {
	color: red;
} else {
	color: green;
}

// For loops
@for $i from 1 through 100 {
	.font#{$i} {
		font-size: #{$i}px;
	}
}

// Foreach loops
@each $author in $list {
	.photo#{$author} {
		background: url(avatars/#{$author}.png);
	}
}

// While loops
while $i < 5 {
	$i: $i + 1;
}

// Dynamic class names
.fontSize#{$foo} {
	font-size: #{$foo};
}

// Variables
$foo: 123; // number
$foo: 123px; // number
$foo: 123%; // number
$foo: 'bar'; // string
$foo: false; // bool
$foo: red; // color
$foo: #ff0000; // color
$foo: null; // null
$foo: 1, 2, 3, 4; // list
$foo: 'foo', 'bar', 'baz'; // list
$foo: (bar: 'barzy', baz: 'bazzy'); // map

// Maps
$profiles: (
	bandcamp: #4e9bac,
	delicious: #248cff,
	facebook: #3b5998
);
@each $profile, $bgcolor in $profiles {
	.profileLink#{$profile}:hover {
		background: $bgcolor;
	}
}
```