import { readFileSync } from 'fs';
import { resolve } from 'path';
import set from 'lodash/set.js';

function isValidDate(d) {
	return d instanceof Date && !isNaN(d);
}

function coerce(arg) {

	// Explicit: File
	if (typeof arg === 'string' && arg.startsWith('file:')) {
		const filePath = arg.substring(5);
		const fullFilePath = filePath.startsWith('/') ? filePath : resolve(process.cwd(), filePath);
		const value = readFileSync(fullFilePath).toString().trim();
		return coerce(value);
	}

	// Explicit: Return string
	if (typeof arg === 'string' && arg.startsWith('string:')) {
		return arg.substring(7);
	}

	// Return boolean
	if (arg === 'true') return true;
	if (arg === 'false') return false;

	// Return date
	if (/(.*)-[0-9]{4}/.test(arg)) {
		const d = new Date(arg);
		if (isValidDate(d)) return d;
	}

	// Return number
	const n = Number(arg);
	if (n || n === 0) return n;

	// Return string
	return arg.toString();
}

export default function parseArgs(argsArrayIn) {

	// Make module and fn vars
	const argsArr = argsArrayIn.slice(2);
	const firstArg = argsArr.shift();
	if (!firstArg) {
		return {
			errors: [],
			module: 'self',
			fn: 'list',
			args: {},
			options: {},
		};
	}
	if (!firstArg || !firstArg.length || firstArg.indexOf(':') < 0) {
		return { error: 'The input command is malformed. Both a module name and a function name must be passed as the first argument. i.e. "article:create".' };
	}
	const [module, fn] = firstArg.split(':');

	// Make args object vars
	let argsObj = {};
	argsArrayIn.slice(1).forEach(stringArg => {
		let modifiedArg = stringArg;
		if (modifiedArg.substring(0, 2) === '--') {
			modifiedArg = modifiedArg.substring(2);
		}
		let eqPosition = modifiedArg.indexOf('=');
		if (eqPosition > 0 && eqPosition < modifiedArg.length - 1) {
			modifiedArg = modifiedArg.split('=');
			set(argsObj, modifiedArg[0], coerce(modifiedArg[1]));
		} else {
			set(argsObj, modifiedArg, true);
		}
	});

	if (Object.keys(argsObj).includes('args')) {
		const filePath = argsObj.args;
		const fullFilePath = filePath.startsWith('/') ? filePath : resolve(process.cwd(), filePath);
		const value = readFileSync(fullFilePath).toString().trim();
		argsObj = JSON.parse(value);
	}

	const optionArgs = ['format'];
	const options = {};
	Object.entries(argsObj).forEach(([argKey, argVal]) => {
		if (optionArgs.includes(argKey)) {
			delete argsObj[argKey];
			options[argKey] = argVal;
		}
	});

	return {
		errors: [],
		module,
		fn,
		args: argsObj,
		options,
	};
}