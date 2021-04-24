export default {
	signature: {
		aux: { type: String, required: false },
		title: { type: String, required: false },
		phrase: { type: String, required: false },
		address: { type: String, required: false },
		username: { type: String, required: false },
	},
	fn: function create({ deps, args }) {
		const { passphrase } = deps.models;
		const { aux, title, phrase, address, username } = args;
		passphrase.create({ aux, title, phrase, address, username });
		return {};
	}
};