import { parse, startOfDay } from 'date-fns';

export default function sanitiseInput(fields, inputData) {
	const safeData = {};
	Object.entries(fields).forEach(([fieldKey, fieldType]) => {
		if (inputData[fieldKey] === null) return null;
		if (typeof inputData[fieldKey] !== 'undefined') {
			if (fieldType === Date) {
				if (!inputData[fieldKey]) {
					safeData[fieldKey] = null;
				} else if (inputData[fieldKey] instanceof Date && !isNaN(inputData[fieldKey])) {
					safeData[fieldKey] = inputData[fieldKey];
				} else if (typeof inputData[fieldKey] === 'string') {
					safeData[fieldKey] = parse(inputData[fieldKey], 'dd-MM-yyyy', startOfDay(new Date()));
				}
			} else if (fieldType === String) {
				safeData[fieldKey] = inputData[fieldKey] ? String(inputData[fieldKey]) : null;
			} else if (fieldType === Number) {
				safeData[fieldKey] = Number(inputData[fieldKey]);
			} else if (fieldType === Boolean) {
				safeData[fieldKey] = Boolean(inputData[fieldKey]);
			} else if (Array.isArray(fieldType)) {
				safeData[fieldKey] = inputData[fieldKey].map(d => (
					sanitiseInput({ arrayItem: fieldType[0] }, { arrayItem: d }).arrayItem
				));
			} else if (typeof fieldType === 'object') {
				safeData[fieldKey] = sanitiseInput(fields[fieldKey], inputData[fieldKey]);
			} else {
				throw new Error(`Invalid field type in model definition: "${fieldKey}", "${fieldType}", "${inputData[fieldKey]}"`);
			}
		}
	});
	return safeData;
}