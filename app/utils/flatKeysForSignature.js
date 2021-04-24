import flatKeys from './flatKeys.js';
import uniq from 'lodash/uniq.js'
export default function flatKeysForSignature(signature) {
	const keys = flatKeys(signature, { includeStubs: false });
	return uniq(keys.map(key => key.split('.').slice(0, -1).join('.')));
}