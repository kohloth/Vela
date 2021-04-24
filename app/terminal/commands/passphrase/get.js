export default {
	signature: {
		filterKey: { type: Number, required: false },
		filterTitle: { type: String, required: false },
		select: { type: String, required: false },
		skip: { type: Number, required: false },
		take: { type: Number, required: false },
	},
	fn: async function get({ deps, args }) {
		const { passphrase } = deps.models;
		const {
			filterKey,
			filterTitle,
			select,
			skip,
			take,
		} = args;
		const filters = {
			filterKey,
			filterTitle,
		};
		let selectArr = (select || '').split(',').filter(Boolean);
		if (!selectArr.length) selectArr = undefined;
		let data = await passphrase.get({ filters, select: selectArr, skip, take });
		return { data };
	}
};