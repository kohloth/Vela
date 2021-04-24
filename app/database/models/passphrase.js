import { aql } from 'arangojs';
import sanitiseInput from "../utils/sanitiseInput.js";

const fields = {
	aux: String,
	title: String,
	phrase: String,
	address: String,
	username: String,
};

export default function (deps) {

	const { db } = deps;

	return {

		async create(passphraseData) {
			const safePassphraseData = sanitiseInput(fields, passphraseData);
			const res = await db.query(aql`
				INSERT ${safePassphraseData} IN passphrases
					LET inserted = NEW RETURN inserted._key
			`);
			return { lastInsertKey: (await res.all())[0] };
		},

		async remove(passphraseKey) {
			return db.query(aql`
				FOR passphrase IN passphrases
					FILTER passphrase._key == ${passphraseKey.toString()}
					REMOVE passphrase IN passphrases
			`);
		},

		async update(passphraseKey, passphraseData) {
			const safePassphraseData = sanitiseInput(fields, passphraseData);
			return db.query(aql`
				FOR passphrase IN passphrases
					FILTER passphrase._key == ${passphraseKey.toString()}
					UPDATE passphrase WITH ${safePassphraseData} IN passphrases
			`);
		},

		async find(passphraseKey) {
			const result = await db.query(aql`
				FOR passphrase IN passphrases
					FILTER passphrase._key == ${passphraseKey.toString()}
					RETURN passphrase
			`);
			const all = await result.all();
			if (all.length) {
				return all[0];
			}
		},

		async get({
			filters = {},
			skip = 0,
			take = 999999999,
			select = ['_key', 'aux', 'title', 'phrase', 'address', 'username']
		} = {}) {
			const {
				filterKey,
				filterTitle,
			} = filters;
			const result = await db.query({
				query: `
					FOR passphrase IN passphrases
						FILTER @filterKey == null ? true : passphrase._key == @filterKey
						FILTER @filterTitle == null ? true : CONTAINS(LOWER(passphrase.title), LOWER(@filterTitle))
						LIMIT @skip, @take
						RETURN passphrase
				`,
				bindVars: {
					filterKey: (filterKey || '').toString() || null,
					filterTitle: filterTitle || null,
					skip,
					take,
				}
			});
			return (await result.all()).map(passphrase => {
				const data = {};
				select.forEach(fieldKey => data[fieldKey] = passphrase[fieldKey]);
				return data;
			});
		},
	};
}
