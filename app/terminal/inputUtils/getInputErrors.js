import get from 'lodash/get.js';
import flatKeysForSignature from '../../utils/flatKeysForSignature.js';

export default function getInputErrors(signature, inputData) {
	const keys = flatKeysForSignature(signature);
	let invalids = {};
	keys.forEach(argKey => {
		const providedData = get(inputData, argKey);
		const expectedType = get(signature, argKey);
		if (typeof providedData === 'undefined' && expectedType.required) {
			invalids[argKey] = 'This parameter must be supplied.';
		}
		if (typeof providedData !== 'undefined' && providedData.constructor.name !== expectedType.type.name) {
			invalids[argKey] = `This parameter must be of type "${expectedType.type.name}"`;
		}
	});
	return invalids;
}