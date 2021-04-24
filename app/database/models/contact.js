import { aql } from 'arangojs';
import sanitiseInput from "../utils/sanitiseInput.js";

const fields = {
	forename: String,
	surname: String,
	dob: Date,
	email: String,
	tel: String,
	address: {
		city: String,
		state: String,
		postcode: String,
		line1: String,
		line2: String,
		line3: String,
	}
};

export default function (deps) {

	const { db } = deps;

	return {

		async create(contactData) {
			const safeContactData = sanitiseInput(fields, contactData);
			const res = await db.query(aql`
				INSERT ${safeContactData} IN contacts
					LET inserted = NEW RETURN inserted._key
			`);
			return { lastInsertKey: (await res.all())[0] };
		},

		async remove(contactKey) {
			return db.query(aql`
				FOR contact IN contacts
					FILTER contact._key == ${contactKey.toString()}
					REMOVE contact IN contacts
			`);
		},

		async update(contactKey, contactData) {
			const safeContactData = sanitiseInput(fields, contactData);
			console.log({ contactData, safeContactData });
			return db.query(aql`
				FOR contact IN contacts
					FILTER contact._key == ${contactKey.toString()}
					UPDATE contact WITH ${safeContactData} IN contacts
					OPTIONS { keepNull: false }
			`);
		},

		async find(contactKey) {
			const result = await db.query(aql`
				FOR contact IN contacts
					FILTER contact._key == ${contactKey.toString()}
					RETURN contact
			`);
			const all = await result.all();
			if (all.length) {
				return all[0];
			}
		},

		async get({
			filters = {},
			select = ['_key', 'forename', 'surname', 'email', 'tel', 'dob', 'address'],
			skip = 0,
			take = 999999999,
		} = {}) {
			const {
				filterForename,
				filterSurname,
			} = filters;
			const result = await db.query({
				query: `
					FOR contact IN contacts
						FILTER @filterForename == null ? true : CONTAINS(LOWER(contact.forename), LOWER(@filterForename))
						FILTER @filterSurname == null ? true : CONTAINS(LOWER(contact.surname), LOWER(@filterSurname))
						LIMIT @skip, @take
						RETURN contact
				`,
				bindVars: {
					filterForename: filterForename || null,
					filterSurname: filterSurname || null,
					skip,
					take,
				}
			});
			return (await result.all()).map(article => {
				const data = {};
				select.forEach(fieldKey => data[fieldKey] = article[fieldKey]);
				return data;
			});
		},
	};
}