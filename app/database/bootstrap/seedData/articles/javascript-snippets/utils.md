# Object

```
function get(i, k, d) {
	if (typeof d === 'undefined') { d = null; }
	if (!k) return i;
	var s = k.split('.');
	var o = i;
	for (var x=0; x < s.length; x++) {
		if (null !== o && o.hasOwnProperty(s[x])) {
			o = o[s[x]];
		} else {
			return d;
		}
	}
	return o;
}

function set(i, k, v) {
	if (!k) return;
	var s = k.split('.');
	h = i;
	for (var x=0;x < s.length-1; x++) {
		if (h.hasOwnProperty(s[x])) {
			h = h[s[x]];
		} else {
			for (var y = s.length-1;x <= y; y--) {
				w = v;
				v = {};
				v[s[y]] = w;
			}
			h[s[x]] = v[s[x]];
			return;
		}
	}
	h[s[x]] = v;
}

function serialCopy(arr) {
	return JSON.parse(JSON.stringify(arr));
}

function fromEntries(arr) {
	return Object.assign({}, ...Array.from(arr, ([k, v]) => ({[k]: v}) ));
}
```

# Array

```
function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

function uniquify(values, valueIn) {
	var idx = 0;
	var value = valueIn;
	while (values.includes(value)) {
		value = valueIn + idx;
		idx++;
	}
	return value;
}

// Adds v to a if v is not present. Otherwise, removes v from a.
function arrayToggle(a, v) {
	var i = a.indexOf(v);
	if (i === -1)
		a.push(v);
	else
		a.splice(i,1);
};
```

# String

```
function isValidEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function limit(str, max = 30) {
	if (str.length <= max - 3) {
		return str;
	} else {
		return str.substring(0, max - 3) + '...';
	}
}

function getFileExt(filename) {
	var qLoc = filename.indexOf('?');
	if (qLoc > -1) {
		filename = filename.substring(0, qLoc);
	}
	return filename.split('.').pop();
}
function ucFirst(string) {
	if (!isNaN(parseFloat(string)) && isFinite(string)) return string;
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function lcFirst(string) {
	if (!isNaN(parseFloat(string)) && isFinite(string)) return string;
	return string.charAt(0).toLowerCase() + string.slice(1);
}

o.funcs.camelCase = function(s) {
	s = s.replace(/([^a-zA-Z0-9_\- ])|^[_0-9]+/g, "").trim().toLowerCase();
	s = s.replace(/([ -]+)([a-zA-Z0-9])/g, function(a,b,c) {
		return c.toUpperCase();
	});
	s = s.replace(/([0-9]+)([a-zA-Z])/g, function(a,b,c) {
		return b + c.toUpperCase();
	});
	return s;
};

o.funcs.snakeCase = function(s) {
	var o = s.replace(/\.?([A-Z]+)/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "");
	if (arguments.length == 2) {
		o = o.replace(/_/g, arguments[1]);
	}
	return o;
};

function random(length, {
	uppercase = false
} = {}) {
	if (length > 26) throw new Error('Length must be 26 or less.');
	var characters = 'abcdefghijklmnopqrstuvwxyz'.split('');
	var output = '';
	shuffle(characters);
	for (var i = 0; i < length; i++) {
		output += characters[i];
	}
	if (uppercase) output = output.toUpperCase();
	return output;
}

function isJson(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

// Formats a number with commas separating every 3 digits.
// i.e. 1000000 becomes '1,000,000'
function withCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
```

# Date

```
function now() {
	var forcedDate = helpers.forceDate;
	if (forcedDate) return forcedDate;
	var d = new Date();
	if (!config || !config.serverDate) return d;
	var serverDate = helpers.date.sqlToJs(config.serverDate);
	var diff = Math.abs(serverDate.getTime() - d.getTime());
	var hoursDiff = Math.round(diff / 1000 / 60 / 60);
	d.setHours(d.getHours() - hoursDiff);
	// console.log(helpers.date.jsToSql(serverDate, true), helpers.date.jsToSql(d, true));
	return d;
}

function today() {
	var d = helpers.date.now();
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);
	return d;
}

function sqlDateToJs(sqlDate) {
	if (sqlDate.indexOf(':') > -1 && sqlDate.length == 19) {
		var year = sqlDate[0] + sqlDate[1] + sqlDate[2] + sqlDate[3];
		var month = parseInt(sqlDate[5] + sqlDate[6]) - 1;
		var day = sqlDate[8] + sqlDate[9];
		var hours = sqlDate[11] + sqlDate[12];
		var minutes = sqlDate[14] + sqlDate[15];
		var seconds = sqlDate[17] + sqlDate[18];
		var d = new Date(year, month, day, hours, minutes, seconds);
		return d;
	} else {
		var sqlParts = sqlDate.split('-');
		var year = sqlParts[0];
		var month = sqlParts[1] - 1;
		var day = sqlParts[2];
		var d = new Date(year, month, day);
		return d;
	}
}

function jsDateToSql(jsDate, withTime = false) {
	let year = jsDate.getFullYear();
	let month = helpers.string.pad(jsDate.getMonth() + 1, 2);
	let date = helpers.string.pad(jsDate.getDate(), 2);
	if (!withTime) return year + '-' + month + '-' + date;
	let hours = jsDate.getHours();
	let minutes = jsDate.getMinutes();
	let seconds = jsDate.getSeconds();
	return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
}

function jsDateToHuman(jsDateObj) {
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var day = jsDateObj.getDate();
	var monthIndex = jsDateObj.getMonth();
	var year = jsDateObj.getFullYear();
	return day + ' ' + monthNames[monthIndex].toUpperCase() + ' ' + year;
}

function isLeapYear dateObj) {
	var year = dateObj.getFullYear();
	return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
}

function getDaysInMonth(dateObj) {
	var year = dateObj.getFullYear();
	var month = dateObj.getMonth();
	return [31, (helpers.date.isLeapYear(dateObj) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

function addMonths(dateObj, value) {
	var n = dateObj.getDate();
	dateObj.setDate(1);
	dateObj.setMonth(dateObj.getMonth() + value);
	dateObj.setDate(Math.min(n, helpers.date.getDaysInMonth(dateObj)));
	return dateObj;
}
```

# Math

```
function rand(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}
function bytesToMb(bytes) {
	return Math.round(bytes / 1024 / 1024);
}
function corr(d1, d2) {
	let { min, pow, sqrt } = Math
	let add = (a, b) => a + b
	let n = min(d1.length, d2.length)
	if (n === 0) return 0
	[d1, d2] = [d1.slice(0, n), d2.slice(0, n)]
	let [sum1, sum2] = [d1, d2].map(l => l.reduce(add))
	let [pow1, pow2] = [d1, d2].map(l => l.reduce((a, b) => a + pow(b, 2), 0))
	let mulSum = d1.map((n, i) => n * d2[i]).reduce(add)
	let dense = sqrt((pow1 - pow(sum1, 2) / n) * (pow2 - pow(sum2, 2) / n))
	if (dense === 0) return 0;
	return (mulSum - (sum1 * sum2 / n)) / dense
}
console.log(corr([100, 200, 500], [100, 200, 500])); // 1
console.log(corr([100, 200, 500], [-100, -200, -500])); // -1
console.log(corr([100, 200, 500], [-50, -100, -250])); // -1
console.log(corr([1, 2, 3], [1.1, 3, 2.8])); // -0.98411...
console.log(corr([12, 44, 33], [-5, -39, -22])); // -0.814...
console.log(corr([142, 424, 133], [-45, -139, -272])); // -0.125...
console.log(corr([0, 2, 0], [1, 2, 3])); // 0
console.log(corr([null, 2, null], [1, 2, 3])); // 0
```

# Misc

```
function parseBool(data) {
	if (data === 'false' || data === '0' || data === 0) return false;
	if (data === 'true' || data === '1' || data === 1) return true;
	return !!data;
}

function throttle(func, wait, options) {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if (!options) options = {};
	var later = function() {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function() {
		var now = Date.now();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
		args = arguments;
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		}, wait);
		if (callNow) func.apply(context, args);
	};
}
```