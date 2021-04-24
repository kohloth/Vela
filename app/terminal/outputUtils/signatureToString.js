export default function signatureToString(signature) {
	return Object.entries(signature).map(([rawKey, info]) => {
		let key = rawKey;
		if (!info.required) key += '?';
		let type;
		if (info.type) {
			type = info.type?.name;
		} else {
			type = `{ ${signatureToString(info)} }`;
		}
		return `${key}: ${type}`;
	}).join(', ');
}