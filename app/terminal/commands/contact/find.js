import startCase from 'lodash/startCase.js';

export default {
	signature: {
		key: { type: Number, required: false },
	},
	fn: async function get({ deps, args }) {
		const { contact } = deps.models;
		const {
			key: contactKey
		} = args;
		let foundContact = await contact.find(contactKey);
		if (foundContact) {
			const lines = [];
			lines.push(`Name: ${startCase(foundContact.forename)} ${startCase(foundContact.surname)}`);
			foundContact.dob && lines.push(`DOB: ${foundContact.dob}`);
			foundContact.email && lines.push(`Email: ${foundContact.email}`);
			foundContact.tel && lines.push(`Tel: ${foundContact.tel}`);
			if (foundContact.address) {
				lines.push([
					' ',
					'Address:',
					foundContact.address.line1,
					foundContact.address.line2,
					foundContact.address.line3,
					foundContact.address.city,
					foundContact.address.state,
					foundContact.address.postcode,
				].filter(Boolean).join('\n'));
			}
			return { formattedData: lines.join('\n') };
		}
		return {};
	}
};