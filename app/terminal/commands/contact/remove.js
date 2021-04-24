export default {
	signature: {
		key: { type: Number, required: true }
	},
	fn: function remove({ deps, args }) {
		const { contact } = deps.models;
		const { key } = args;
		contact.remove(key);
		return {};
	}
};