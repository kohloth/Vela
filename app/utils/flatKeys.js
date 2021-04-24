import get from 'lodash/get.js';

export default function flatKeys(obj, { includeStubs = true } = {}, prefix = '') {
	const output = Object.entries(obj).reduce((collector, [key, val]) => {
		const newKeys = [...collector, prefix ? `${prefix}.${key}` : key]
		if (Object.prototype.toString.call(val) === '[object Object]') {
			const newPrefix = prefix ? `${prefix}.${key}` : key
			const otherKeys = flatKeys(val, { includeStubs }, newPrefix)
			return [...newKeys, ...otherKeys]
		}
		return newKeys
	}, []);
	if (includeStubs) return output;
	return output.filter(key => typeof get(obj, key) !== 'object');
}