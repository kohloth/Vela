# Usage rules

1. Place an img tag.
2. Specify an array of images for an image tag. Each array element must contain:
	* An image URL
	* Information about the image size.
	The browser can't image size information itself, as it would have to load the image to do so. The image-size information should be in the form of a total image width or a pixel density. i.e. 320w or 1x, 2x, or 4x, respectively.
3. Specify a fallback image, for browsers that do not support the srcset attribute, inside a standard src attribute.

Like so:

```
<img srcset="
	/wp-content/uploads/flamingo4x.jpg 4025w,
	/wp-content/uploads/flamingo3x.jpg 3019w,
	/wp-content/uploads/flamingo2x.jpg 2013w,
	/wp-content/uploads/flamingo1x.jpg 1006w
	"
	src="/wp-content/uploads/flamingo-fallback.jpg"
>
```

# Loading algorithm

Key principles:

* An (initial or alternative) image is downloaded by the browser when either of the following happens: 1. The page loads, and 2: The browser is resized.
* Following each of these events, if any images exist in the browser cache, that are of a size that is sufficient for the current screen width, then the largest of these images is used. This means that image selection will change as the browser window grows, but not as it shrinks.

Lesser principles:

* A sizes attribute can be added to direct the browser to load images more optimally. This takes the form of: [[media query, image tag size]..., fallback tag size].

Example:

```
<img... srcset=... sizes="
	(min-width: 800px) 600px,
	(min-width: 600px) 400px,
	300px
" ...>
```

* The first media query to match is respected.
* If desired, only the fallback value can be provided. i.e. `<img srcset=... sizes="100px">`
* Adding a sizes attribute, with a value of 'auto' does nothing.
* A browser may download a lower res image if there is poor connectivity.

# Techniques

* Using sizes="1000px" will mean the browser ALWAYS uses the image that is the best match for an img tag size of 1000px, regardless of screen size.
* Using sizes="calc(100vw - 60px)" (where the left and right page margins add up to 30px), should cause the browser to always select an image that exactly matches the img tag size, provided the layout orchestration doesn't change.
* Changing the sizes attribute dynamically, to always contain the literal, pixel value of the image width, in respect to computed CSS layout, can be used to ensure that the image of the correct size is used, without having to hardcode presentational values in the HTML.

# Regarding <picture> and <source> elements

It is ususally said that:

* srcset should be used for image loading optimisation, as it gives the browser control over which images should be loaded.
* `<picture>` and `<source>` should be used for art direction, as the developer has the final say over which images are used.

However, there is a caveat to this.

An `<img>` tag with a srcset attribute will try to load an image if the media query matches, WITHOUT CARING IF IT SUPPORTS AN IMAGE OF THAT FORMAT OR NOT.

This means that:

```
<img srcset="
	/wp-content/uploads/flamingo-lg.webp 1000w,
	/wp-content/uploads/flamingo-sm.webp 500w
	"
	src="/wp-content/uploads/flamingo-lg.jpg"
	sizes="1000px"
>
```

Will render a broken image tag in Safari when the image tag is 1000pw wide, (or the browser otherwise thinks it should load an image that is 1000px wide).

The only way to implement multi-sized lazy-loading images with fallback formats is to use `<picture>` and `<source>` tags along with a srcset attribute.

```
<picture>
	<source type="image/webp" srcset="
	/wp-content/uploads/flamingo-lg.webp 1000w,
	/wp-content/uploads/flamingo-sm.webp 500w
	sizes="1000px"
	" />
	<source type="image/jpeg" srcset="
	/wp-content/uploads/flamingo-lg.jpg 1000w,
	/wp-content/uploads/flamingo-sm.jpg 500w
	sizes="1000px"
	" />
	<img src="/wp-content/uploads/flamingo-fallback.jpg" alt="An Image" />
</picture>

```