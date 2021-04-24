# Information

* For a decade or two, web apps have been making AJAX requests to third-party domains - to obtain images, weather information, customer records and such. However, the permission of this begets security risks. When cross origin requests occur, a web server may be being expoited for it's services, or a user may not be comfortable with their browser interacting with third-party servers. To remedy this problem, the CORS policy standard was developed, and became a W3C recommendation in 2014.
* The new rules and restrictions for making requests to third-party servers are as follows:
	* If a clientside script that is hosted at mainsite.com makes an AJAX request for a resource that exists at thirdpartysite.com, the request will not complete, unless the server at thirdpartysite.com includes an `Access-Control-Allow-Origin` header, with a value that matches the request origin - either literally, with a value of `http://mainwebsite.com`, or generally, with a wildcard value of `*`.
	* Further, if the request made is not a simple request (as per the complex request identification algorithm detailed below), then the browser will first make a "preflight" AJAX request to the server, with a request method of `OPTIONS`, to obtain more information regarding what is allowed. However, it will skip doing this if it has already done so recently - in this scenario, the relevant data is already cached.

# Complex request algorithm

An AJAX request requires a preflight check if one has not yet been performed, and any of the following are true:

* The request method is something other than `GET` `POST` or `HEAD`.
* Headers exist that are not basic headers set by the browser, or within this list: `Accept`, `Accept-Language`, `Content-Language`, `Content-type`, `DPR`, `Downlink`, `Save-Data`, `Viewport-Width`, `Width`.
* The `Content-Type` header is something other than `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`.

A few other constrains exist, but these are uncommonly met.

# Preflight requests

A preflight request might look like this:
```
OPTIONS /resource/foo 
Access-Control-Request-Method: DELETE 
Access-Control-Request-Headers: origin, x-requested-with
Origin: https://foo.bar.org
```

A preflight response might look like the following. Note that only a single value may be used in the `Allow-Origin` header.
```
HTTP/1.1 204 No Content
Connection: keep-alive
Access-Control-Allow-Origin: https://foo.bar.org
Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE
Access-Control-Allow-Headers: X-PINGARUNER
Access-Control-Max-Age: 86400
```

The constraint of a single `Allow-Origin` value can be circumvented with code such as the following:
<textarea class="com-code-snippet" data-lang="php">
$http_origin = $_SERVER['HTTP_ORIGIN'];
if ($http_origin == "http://www.domain1.com" || $http_origin == "http://www.domain2.com" || $http_origin == "http://www.domain3.com")
{  
	header("Access-Control-Allow-Origin: $http_origin");
}
```