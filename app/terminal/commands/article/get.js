export default {
	signature: {
		filterKey: { type: Number, required: false },
		filterTitle: { type: String, required: false },
		filterKeywords: { type: String, required: false },
		oldestCreatedDate: { type: Date, required: false },
		newestCreatedDate: { type: Date, required: false },
		select: { type: String, required: false },
		skip: { type: Number, required: false },
		take: { type: Number, required: false },
	},
	fn: async function get({ deps, args }) {
		const { article } = deps.models;
		const {
			filterKey,
			filterKeywords,
			oldestCreatedDate,
			newestCreatedDate,
			filterTitle,
			select,
			skip,
			take,
		} = args;
		const filters = {
			filterKey,
			filterTitle,
			filterKeywords: (filterKeywords || '').split(',').filter(Boolean),
			oldestCreatedDate,
			newestCreatedDate,
		};
		let selectArr = (select || '').split(',').filter(Boolean);
		if (!selectArr.length) selectArr = undefined;
		let data = await article.get({ filters, select: selectArr, skip, take });
		return { data };
	}
};