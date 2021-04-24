export default {
	signature: {
		key: { type: Number, required: true },
		body: { type: String, required: false },
		title: { type: String, required: false },
		keywords: { type: String, required: false },
		createdAt: { type: String, required: false },
		updatedAt: { type: String, required: false },
	},
	fn: function create({ deps, args }) {
		const { article } = deps.models;
		const { key: articleKey, body, title, keywords: keywordsIn, updatedAt, createdAt } = args;
		const keywords = keywordsIn ? keywordsIn.split(',').map(kw => kw.trim()) : null;
		article.update(articleKey, { body, title, keywords, updatedAt, createdAt });
		return {};
	}
};