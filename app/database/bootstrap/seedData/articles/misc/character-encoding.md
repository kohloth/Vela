# History

Fundamentally, computers store data as (binary) numbers and not letters. Therefore, each letter in a body of natural language text is represented by a number. In order to communicate effectively, there must be a standard that dictates which numbers signify which letters. To this end, in the 1960s, the American Standards Association created a 7-bit encoding called the American Standard Code for Information Interchange: ASCII. As a 7-bit standard, it allows for 127 possible values, from 0000000 to 1111111. The standard gives room for upper and lower alphanumeric characters, digits, and punctuation, with some room left spare. In 1968, President Lyndon Johnson made it official - all computers mmust use and understand ASCII.

The new microprocessors of the 1970s preferred to work with 8 bits, not 7. This increased the size of the character page from 127 to 255. This meant that 128 places were spare, and initially, these spare slots were never standardised. Various countries used the spare slots for their own alphabets. To make things more stable, in the late 1990s, 15 different 8 bit standardised "character sets" (AKA "code pages") were codified. They are known by the names ISO-8859-1 up to ISO-8859-16 (number 10 was abandoned). They cover many different alphabets such as Hebrew, Turkish, and Thai. In a webpage, it is possible to specify that the binary numbers stored within a plain text file correspond to a particular ISO standard with a meta tag like this: `<meta charset="ISO-8859-5">`. This solution was expedient, but the following problems existed:

* A client digesting a document needs to know, and explicitly specify which charset should be used to interpret a document.
* There is no easy way to use more than one charset in the same document.
* Languages with more than 255 characters, such as Chinese, could not be displayed within an 8-bit character set.

Therefore, a new standard known as Unicode was developed and adopted. As of present day, Unicode consists of about 110,000 code points. The first 128 are the same as ASCII, which makes it backwards compatible, and the following 128 are largely the same as ISO-8859-1.

Unicode code points are officially represented in hex, and with a prefix. For example: `U+0048`, instead of 72.

The sheer number of characters means that every individual character cannot be depicted within an 8 bit "variable". Even 16 bits is not enough (about 65,000 spaces). While modern browsers are designed in such a way that they can handle 32 bit numbers (thanks to the C++ wide character type), most protocols and other softwares operate on a charaset of 8 bits. Algorithms designed to do this are UTF-16 and UCS2, but UTF-8 is currently the most ubiquitous.

# UTF-8

UTF-8 is able to represent a large number of characters (up to 1,114, 112), and be backwards-compatible with ASCII by dictating that:

* Characters 0 - 127 represent ASCII characters
* Characters 128 - 192 are other characters
* Characters 192 - 247 are shift characters, that modify the meaning of the other characters when they preceed them. (Characters 224 - 239 are in fact, a triple shift).

The use of shift characters is what causes UTF-8 to be known as a "variable width" character encoding. It allows stored strings to take up less space, and be transmitted over 8 bit protocols. However, the downside is that some systems may interpret surrogate pairs as two individual characters.

# Implementation

To ensure that UFF-8 (or any character encoding, for that matter) works correctly, it is important to ensure that all elements of the stack are using the same encoding. This includes the frontend HTML page, the serverside code, the database, and in some cases, the serverside operating system / tools.

```
<!--
	A more general way of specifying the encoding used on the page.
-->
<meta charset="UTF-8">

<!--
	Simulate a response header that sets the mime-type of the resource to text/html,
	while explicitly providing a character set encoding parameter of UTF-8.
-->
<meta http-equiv="Content-type" content="text/html; charset=UTF-8">

<!--
	In HTML5, the two tags above are equivalent, but they can be used together
	if concerns about insanely deep backwards compatability exist. The former,
	shorter tag is more modern, being a part of the HTML5 spec.
-->
```