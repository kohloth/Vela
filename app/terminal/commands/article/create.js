import { parse, startOfDay } from 'date-fns';

export default {
	signature: {
		body: { type: String, required: true },
		title: { type: String, required: true },
		keywords: { type: String, required: false },
		createdAt: { type: String, required: false },
		updatedAt: { type: String, required: false },
	},
	fn: function create({ deps, args }) {
		const { article } = deps.models;
		const { body, title, keywords, createdAt, updatedAt } = args;
		article.create({ body, title, keywords: (keywords || '').split(','), createdAt, updatedAt });
		return {};
	}
};