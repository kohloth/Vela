import renderMarkup from '../../outputUtils/renderMarkup.js';

export default {
	signature: {
		key: { type: Number, required: false },
	},
	fn: async function get({ deps, args }) {
		const { article } = deps.models;
		const {
			key: articleKey
		} = args;
		let foundArticle = await article.find(articleKey);
		if (foundArticle) {
			const lines = [];
			lines.push(`Title: ${foundArticle.title}`);
			lines.push(`Created: ${foundArticle.createdAt}`);
			if (foundArticle.updatedAt) lines.push(`Last updated: ${foundArticle.updatedAt}`);
			if (foundArticle.keywords) lines.push(`Keywords: ${(foundArticle.keywords || []).join(', ')}`);
			lines.push('');
			lines.push(renderMarkup(foundArticle.body)
				.split('\n')
				.map(ln => ln.trim())
				.join('\n'));
			return { formattedData: lines.join('\n') };
		}
		return {};
	}
};