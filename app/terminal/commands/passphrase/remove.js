export default {
	signature: {
		key: { type: Number, required: true }
	},
	fn: function remove({ deps, args }) {
		const { passphrase } = deps.models;
		const { key } = args;
		passphrase.remove(key);
		return {};
	}
};