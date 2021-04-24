# Information

* "MIME type" is an abbreviation of Multipurpose Internet Mail Extensions. This specification was originally designed to denote mail attachment types as strings. It is now known more generically "media type".
* The IANA is responsible for handling mime type registrations and standards.
* The format for a mime type is `type/subtype;paramkey=paramvalue`. All parts of the mime type are case-insensitive, except for the parameter values, which may be interpreted in a case-sensitive fashion.
* The official mime types are: `application`, `audio`, `example`, `font`, `image`, `message`, `model`, `multipart`, text and `video`.
* The special `multipart` type is a wrapper type that indicates several nested resources, which each may have their own mime type.
* Common examples are:
	* text/plain
	* text/javascript
	* text/css
	* text/html
	* text/xml
	* text/csv
	* image/png
	* image/jpeg
	* image/gif
	* image/webp
	* audio/mpeg
	* audio/ogg
	* multipart/form-data
	* application/pdf
	* application/zip
	* application/json
* The `application` type is typically used when no other type is appropriate. Unofficial types are sometimes used, and an unofficial type is known as a `chemical`. However, this practice is discouraged.
* Proprietary mimetypes belong in the IANA's "vendor tree" of mimetypes. They begin with `vnd.`. For example, `application/vnd.ms-powerpoint`. There is also a personal / vanity tree (`prs.`) and an unregistered tree (`x.`).
* Suffixes can also exist upon the subtype portion of the mimetype. This is done to convey the underlying file structure of the type. For example: `application/vnd.api+json`. Common suffixes include `xml`, `zip` and `gzip`.
* Generic binary data is usually served with a mimetype of `application/octet-stream`.
* When a file is received by the browser, the HTTP response will house a `Content-Type` header. This header is where the mime-type of the file is specified. The mime-type is usually deduced by the server before it is sent. The browser uses the mimetype to decide how to handle the file, so it's presence is important. A browser may be able to deduce the correct mimetype by inspecting the file extension, or some bytes from the file itself. This, however, is less common and not reliable, so it is still important to get it right on the server side.
* A mime type can also be present in the header of a HTTP request. In such a circumstance, the mime type appears in the `Accept` HTTP header, and it represents the client describing the type of file it wants the server to provide. The process that follows is knownas `content negotiation`. The browser will typically set the `Accept` header to something non-generic when fetching html files, images, videos, stylesheets, scripts and so on.