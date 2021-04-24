import create from './create.js';

export default {
	signature: {
		...create.signature,
		key: { type: Number, required: true }
	},
	fn: function update({ deps, args }) {
		const { contact } = deps.models;

		const {
			key: contactKey,
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
		contact.update(contactKey, {
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