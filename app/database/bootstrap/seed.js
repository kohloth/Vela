import { aql } from 'arangojs';
import articleData from './seedData/articles.js';
import contactData from './seedData/contacts.js';
import passphraseData from './seedData/passphrases.js';

export default async function (db) {

	await db.query(aql`
		FOR article IN articles
			REMOVE article IN articles
	`);
	await db.query(aql`
		FOR article IN ${articleData}
			INSERT article IN articles
	`);

	await db.query(aql`
		FOR contact IN contacts
			REMOVE contact IN contacts
	`);
	await db.query(aql`
		FOR contact IN ${contactData}
			INSERT contact IN contacts
	`);

	await db.query(aql`
		FOR passphrase IN passphrases
			REMOVE passphrase IN passphrases
	`);
	await db.query(aql`
		FOR passphrase IN ${passphraseData}
			INSERT passphrase IN passphrases
	`);
}