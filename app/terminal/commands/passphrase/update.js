import create from './create.js';

export default {
	signature: {
		...create.signature,
		key: { type: Number, required: true }
	},
	fn: function update({ deps, args }) {
		const { passphrase } = deps.models;
		const { aux, title, phrase, address, username, key: passphraseKey } = args;
		passphrase.update(passphraseKey, { aux, title, phrase, address, username });
		return {};
	}
};