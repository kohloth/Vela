export default {
	signature: {
		forename: { type: String, required: false },
		surname: { type: String, required: false },
		dob: { type: String, required: false },
		email: { type: String, required: false },
		tel: { type: String, required: false },
		city: { type: String, required: false },
		address: {
			state: { type: String, required: false },
			postcode: { type: String, required: false },
			line1: { type: String, required: false },
			line2: { type: String, required: false },
			line3: { type: String, required: false },
		}
	},
	fn: function create({ deps, args }) {
		const { contact } = deps.models;
		const {
			forename,
			surname,
			dob,
			email,
			tel,
			address: {
				city,
				state,
				postcode,
				line1,
				line2,
				line3
			} = {},
		} = args;
		contact.create({
			forename,
			surname,
			dob,
			email,
			tel,
			address: {
				city,
				state,
				postcode,
				line1,
				line2,
				line3
			},
		});
		return {};
	}
};