
# Information

## General

* Initially created Ryan Dahl in 2009. Available for all platforms by 2011.
* New stable releases occur every 6 months. All releases with even numbers are LTS releases, with a maintainence phase duration of 30 months.

## Features

* Based around importable and exportable modules.
* Exhibits high throughput concurrency by running system calls (file IO, database requests etc) in parallel to the javascript runtime, on a separate thread.
* The nodejs javascript runtime is a continual process that makes use of an event loop. Therefore, it is ideal for realtime apps. Can be programmed in an event-centric fashion.

## Uses

* Task runner
* CLI application
* Web server
* Sockets server
* Chat rooms
* Browser games
* Streaming
* RESI APIs
* Robotics

## CLI

### CLI usage

#### Info
	
```
// Print version
node -v

// Man page
man node

// Help page
node -h

// Print engine options
node --v8-options
```

#### Basic usage

```
// Begin REPL
node

// Exit REPL
.exit

// Run command
node -e "console.log(2+2)"

// Run command, print the result
node -p "2+2"

// Run script
node ./myscript.js
```

#### Nvm CLI usage

```
// Help page
nvm

// Get nvm version
nvm --version

// Get currently used node version
nvm current

// Get path to currently used node version
nvm which current

// List installed versions
nvm ls

// Install node version, where version is:
x.x.x | 4 | stable
nvm install 

// Use node version
nvm use 

// Run script with particular version of node
nvm run  ./app.js
```

### Npm CLI usage

#### Info

```
// Show mini usage info page
npm

// Show fuller usage info page
npm -l

// Show usage info section for 
npm  -h

// Show version
npm version
```

#### Setting up

```
// Create package.json file
npm init

// Create package.json file, carelessly
npm init --yes
```

#### Adding and removing

```
// Install package, save to package.json as dependancy
npm i <package name>

// Install package, save to package.json as dev dependancy
npm i -D <package name>

// Install package, save to package.json as optional dependancy
npm i -O <package name>

// Install package, do not save to package.json
npm i --no-save <package name>

// Install package globally
npm i -g <package name>

// Uninstall package: Remove from node_modules directory
// and package.json deps, devdeps and opdeps
npm uninstall <package name>

// Remove package from node_modules but do not remove it from package.json
npm uninstall <package name> --no-save

// Remove package from global registry
npm -g uninstall <package name>
```

#### Managing

```
// Install packages listed in package.json deps, devdeps and opdeps
npm install

// Install packages listed in package.json deps and opdeps
npm install --only=prod

// Install packages listed in package.json devdeps
npm install --only=dev

// Remove all packages from node_modules
rm -rf ./node_modules

// Remove packages from node_modules,
// that are not in package.json, and are not deps
npm prune

// Check for known vulnerabilities
npm audit

// Check for vulnerabilities, and fix them
npm audit fix
```

#### Querying

```
// Show list of installed packages, and their dependencies
npm ls

// Show list of installed packages
npm ls -ps

// Find out the dependencies of a package
npm install -g npm-remote-ls
npm-remote-ls bower

// Execute command in package subdirectory
npm explore underscore -- ls
cd `npm explore underscore -- pwd`

// View documents in browser
npm docs <package name>

// View list of known bugs in browser
npm bugs <package name>
```

## NPM package.json

```
// Some valid licence values
{ "license": "ISC" }
{ "license": "(MIT OR Apache-2.0)" }
{ "license": "UNLICENSED" }

// Prevent any inadvertent "npm publish" commands from
// publishing package.
"private": true
```

# Javascript cookbook

## Path

```
// All uses of the variable "path" in the following code assume that it
// has a value that is derived from the expression immediately below.
const path = require('path');

// Get delimiter
path.delimiter // : or ;

// Get separator
path.sep

// Get filepath
path.dirname('/var/www/vhosts/myfile.txt'); // /var/www/vhosts

// Get filename
path.basename('/var/www/vhosts/myfile.txt'); // myfile.txt

// Get file extension
path.extname('myfile.html') // .html
path.extname('myfile.txt').slice(1); // txt

// Get file path info
path.parse('/home/user/dir/file.txt');
// Returns:
// { root: '/',
//	 dir: '/home/user/dir',
//	 base: 'file.txt',
//	 ext: '.txt',
//	 name: 'file' }

// Convert path parts into a path string
path.format({
	root: '/ignored',
	dir: '/home/user/dir',
	base: 'file.txt'
}); // '/home/user/dir/file.txt'

// Convert path to absolute path. If no root segment exists, returns
// absolute path based on current working directory.
path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// -> '/home/myself/node/wwwroot/static_files/gif/image.gif'

// Normalise path: Resolve .. and ., and remove extra separators.
path.normalize('/foo/bar//baz/asdf/quux/..'); // '/foo/bar/baz/asdf'

// Joins parts of a path, then normalise
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'); // '/foo/bar/baz/asdf'

// Deduce if path is absolute
path.isAbsolute('/foo/bar'); // true
```

## Files

### Notes

* In all `fs` methods, the last argument is always the callback. The first variable passed into the callback is always an error variable.
* As always, it is unwise to use sync functions over async counterparts, as they will needlessly block further processing while waiting for OS-level operations to complete.
* `fs.exists()` is depreceated, and `fs.stat()` or `fs.access` should be used instead.
* Although it may seem prudent, using `fs.access()` to check a file's accessibility before using `fs.open()`, `fs.readFile()`, `fs.writeFile()` and so on can cause errant behaviour due to race conditions. Instead, one must simply use the function they desire immediately, and anticipate errors through detecting the presence of a non-fasly `err` value within the callback function.
* When working with filepaths, always try to use absolute paths, as relative paths will be relative to where the script was executed from (i.e. with the `node ./myprogram/bits/myscript.js` command. The global variables `__dirname` and `__filename` can help with this.
* `fs.writeFile()` is a high-level easy-to-use method for writing a JS text var to a place on the filesystem. In contrast, `fs.open()` and `fs.write()` are more granular, and may be faster in some circumstances.
* Promise support syntax for `fs` operations is stable as of node version 12.5.0.
* `fs-extra` is a noteworthy replacement for the default `fs` module. It adds some additional high-level helper methods, and shadows all other `fs` methods while ensuring promise support.

### Reading a file

```
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '../manip-files/foo.txt');

fs.readFile(dirPath, (err, data) => {
	if (err) throw err;
	console.log(data); // buffer
});
fs.readFile(dirPath, {encoding: 'utf8'}, (err, data) => {
	if (err) throw err;
	console.log(data); // 'Hello world!'
});
fs.readFile(dirPath, 'utf8', (err, data) => {
	if (err) throw err;
	console.log(data); // 'Hello world!'
});
```

### Creating a file and writing to it
	
NB: `fs.writeFile()` will overwrite existing files.
```
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '../manip-files/foo.txt');
const options = {encoding: 'utf8', mode: 0o775};
console.log(dirPath);
fs.writeFile(dirPath, 'Hello world!', options, (err) => {
	if (err) throw err;
	console.log('File created!');
});
```

### Appending text to a file
	
The file will be created if it doesn't already exist.
```
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '../manip-files/foo.txt');
const options = {encoding: 'utf8', mode: 0o775};
fs.appendFile(dirPath, 'Hello world!\r\n', options, (err) => {
	if (err) throw err;
	console.log('File was appended to!');
});
```

### Deleting a file
	
```
fs.unlink('path/file.txt', (err) => {
	if (err) throw err;
	console.log('path/file.txt was deleted');
});
```

Does not work on a directory - empty or otherwise.

# Moving or renaming a file

```
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '../manip-files/foo.txt');
fs.rename(dirPath, path.join(dirPath.slice(0, -7), 'bar.txt'), (err) => {
	if (err) throw err;
	console.log('File moved!');
});
```

### Copying a file

NB: The file at the destination path is overwritten if it already exists.
```
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '../manip-files/foo.txt');
const destPath = path.join(__dirname, '../manip-files/copy.txt');
fs.copyFile(dirPath, destPath, (err) => {
	if (err) throw err;
	console.log('File copied!');
});
```

### Making a directory

```
const fs = require('fs');
const path = require('path');
const mkdirOptions = { recursive: true, mode: 0o755 };
const dirPath = path.join(__dirname, '../manip-files/foo/bar/baz');
fs.mkdir(dirPath, mkdirOptions, (err) => {
	if (err) throw err;
});
```

### Deleting a directory

Does not work when a directory is not empty / cannot work recursively.
```
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '../manip-files/stuff/foo');
fs.rmdir(dirPath, (err) => {
	if (err) throw err;
	console.log('Directory removed!');
});
```

### Deleting a directory, recursive

```
const fs = require('fs-extra');
const path = require('path');
const dirPath = path.join(__dirname, '../manip-files/foo');
if (!dirPath.includes('manip-files')) throw new Error('Unsafe operation!');
fs.remove(dirPath, err => {
	if (err) throw err;
	console.log('Directory removed!')
})
```

### Emptying a directory, recursive

Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.
```
const fs = require('fs-extra');
const path = require('path');
const dirPath = path.join(__dirname, '../manip-files/foo');
if (!dirPath.includes('manip-files')) throw new Error('Unsafe operation!');
fs.emptyDir(dirPath, err => {
	if (err) throw err;
	console.log('Directory emptied!')
})
```

### Working with files manually

```
fs.open('/open/some/file.txt', 'r', (err, fd) => {
	if (err) throw err;
	fs.close(fd, (err) => {
		if (err) throw err;
	});
});
```

## DBs

## Basic MySQL setup

```
const mysql = require('mysql');

let connection;
const credentials = {
	host: 'localhost',
	user: 'x',
	password: 'x',
	database: 'dbname'
};

function setUpDbConnection() {
	if (!connection) {
		return new Promise((resolve, reject) => {
			connection = mysql.createConnection(credentials);
			connection.connect(err => {
				if (err) reject(err);
				resolve();
			});
		});
	} else {
		return Promise.resolve();
	}
};

function dbQuery() {
	let sql = arguments[0];
	let params = arguments.length === 2 ? arguments[1] : null;
	return new Promise((resolve, reject) => {
		function respond(err, rows) {
			if (err) reject(err);
			resolve(rows);
		}
		setUpDbConnection().then(() => {
			if (params) {
				connection.query(sql, params, respond);
			} else {
				connection.query(sql, respond);
			}
		});
	});
}; 

// Usage of

dbQuery('SELECT * FROM slots where id >= 30').then(rows => {
	console.log(rows);
});

dbQuery('SELECT * FROM slots where id >= ?', [30]).then(rows => {
	console.log(rows);
});
```

## HTTP actions

The node HTTP library is quite low-level, and is not ideally suited to the expression of distinct HTTP requests - the kind that are common to most web applications. Therefore, using a npm package library such as `request`, or `request-promise-native` is preferred.

### HTTP request using native API

```
const https = require('https');
https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
	let data = '';

	// A chunk of data has been recieved.
	resp.on('data', (chunk) => {
		data += chunk;
	});

	// The whole response has been received. Print out the result.
	resp.on('end', () => {
		console.log(JSON.parse(data).explanation);
	});

}).on("error", (err) => {
	console.log("Error: " + err.message);
});
```

### Simple HTTP get

```
const rpn = require('request-promise-native');
rpn('http://www.google.com')
	.then(function (htmlString) {
		// Process html...
	})
	.catch(function (err) {
		// Crawling failed...
	});
```

### HTTP get with transform

```
var cheerio = require('cheerio'); // Basically jQuery for node.js

var options = {
	uri: 'http://www.google.com',
	transform: function (body) {
		return cheerio.load(body);
	}
};

rpn(options)
	.then(function ($) {
		// Process html like you would with jQuery...
	})
	.catch(function (err) {
		// Crawling failed or Cheerio choked...
	});
```

### HTTP get JSON

```
var options = {
	uri: 'https://api.github.com/user/repos',
	qs: {
		access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
	},
	headers: {
		'User-Agent': 'Request-Promise'
	},
	json: true // Automatically parses the JSON string in the response
};

rpn(options)
	.then(function (repos) {
		console.log('User has %d repos', repos.length);
	})
	.catch(function (err) {
		// API call failed...
	});
```

### Post JSON to retrieve JSON

```
var options = {
	method: 'POST',
	uri: 'http://api.posttestserver.com/post',
	body: {
		some: 'payload'
	},
	json: true // Automatically stringifies the body to JSON
};

rpn(options)
	.then(function (parsedBody) {
		// POST succeeded...
	})
	.catch(function (err) {
		// POST failed...
	});
```

## Web server

### Native web server

```
var http = require('http');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('Hello World! You requested page: ' + req.url);
	res.end();
}).listen(8080);
```

### Express web server

```
const path = require('path');
const express = require('express');
const app = express();
const ejs = require('ejs');
const port = 3000;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
	let data = {
		names: ['Hedge', 'Gigi', 'Marx', 'Lola']
	};
	res.render('main', data);
});
app.post('/', function (req, res) {
	let username = req.body.username;
	let password = req.body.password;
	res.send('POST request to the homepage')
});
app.get('/user/:userId', function (req, res) {
	res.send(req.params)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

```
<% include header.ejs %>
# Welcome
<%= names.join(', ') %>
<% include footer.ejs %>
```

Note that includes are relative to the template with the include statement.

## Preprocessing web code

### Compilling SCSS
	
#### In JS code

```
const sass = require('node-sass');
const path = require('path');
const fs = require('fs');
const options = {};
sass.render({
	file: path.join(__dirname, './style.scss'),
	options
}, function(err, result) {
	if (err) throw err;
	console.log(result.css.toString());
	fs.writeFile(path.join(__dirname, './style.css'), result.css, err => {
		if (err) throw err;
		console.log('CSS file written!');
	});
});
```

#### From the command line

General usage pattern is: `node-sass [options] &lt;input.scss&gt; [output.css]`
```
npm install -g node-sass
node-sass my-styles.scss my-styles.css // Compile single
node-sass my-sass-folder/ -o my-css-folder/ // Compile multiple
node-sass -w sass/ -o css/ // Watch multiple and compile on change
```