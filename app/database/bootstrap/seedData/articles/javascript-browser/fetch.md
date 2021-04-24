# Information

* The Promise returned from fetch() returns a `response` object.
* The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if anything prevented the request from completing.
* By default, fetch won't send or receive any cookies from the server.
* If desired, instead of passing a url and a config object to the `fetch` method, a `Request` object may be passed instead. This can be advantageous in situtations when you want to replay the request -  however, note that the request object must be cloned before it's used (`let myRequestCopy = myRequest.clone()`), as request objects are designed to become unusable once they have been used once.

# Get JSON

```
fetch('http://example.com/movies.json')
.then(function(response) {
	return response.json();
})
.then(function(myJson) {
	console.log(JSON.stringify(myJson));
});
```

It may be prudent to add an accept JSON header to the above.

```
fetch(url, { headers: {
	'accept': 'application/json'
}});
```

# Get HTML

```
fetch(url, { headers: {
	'accept': 'text/html'
}})
.then(function(response) {
	return response.text();
})
.then(function(myHtmlString) {
	myDiv.innerHTML = myHtmlString;
});
```

# Posting data

```
var url = 'https://example.com/profile';
var data = {username: 'example'};

fetch(url, {
	method: 'POST', // or 'PUT', 'DELETE', 'PATCH' etc
	body: JSON.stringify(data), // Can be string or object
	headers: {
		'Content-Type': 'application/json'
	}
})
.then(response => {
	if (!response.ok) return Promise.reject(new Error(`HTTP Error ${response.status}`));
	console.log('Success:', JSON.stringify(response.json()))
})
.catch(error => console.error('Error:', error));
```

# Posting files

```
var formData = new FormData();
var fileField = document.querySelector('input[type="file"]');

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
	method: 'PUT',
body: formData
})
.catch(error => console.error('Error:', error))
.then(response => {
	if (!response.ok) return Promise.reject(new Error(`HTTP Error ${response.status}`));
	console.log('Success:', JSON.stringify(response.json()))
})
```

# Fetch options list

```
return fetch(url, {
	method: 'POST', // *GET, POST, PUT, DELETE, etc.
	mode: 'cors', // no-cors, cors, *same-origin
	cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	credentials: 'same-origin', // include, *same-origin, omit
	headers: {
		'Content-Type': 'application/json',
		// 'Content-Type': 'application/x-www-form-urlencoded',
	},
	redirect: 'follow', // manual, *follow, error
	referrer: 'no-referrer', // no-referrer, *client
	body: JSON.stringify(data), // body data type must match "Content-Type" header
})
```