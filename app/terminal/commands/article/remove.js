export default {
	signature: {
		key: { type: Number, required: true }
	},
	fn: function remove({ deps, args }) {
		const { article } = deps.models;
		const { key } = args;
		article.remove(key);
		return {};
	}
};