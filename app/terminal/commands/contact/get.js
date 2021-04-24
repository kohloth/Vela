export default {
	signature: {
		restrinctingForename: { type: String, required: false },
		filterSurname: { type: String, required: false },
		select: { type: String, required: false },
	},
	fn: async function get({ deps, args }) {
		const { contact } = deps.models;
		const {
			filterForename,
			filterSurname,
			select,
			skip,
			take,
		} = args;
		const filters = {
			filterForename,
			filterSurname,
		};
		let selectArr = (select || '').split(',').filter(Boolean);
		if (!selectArr.length) selectArr = undefined;
		const data = await contact.get({ filters, select: selectArr, skip, take });
		return { data };
	}
};