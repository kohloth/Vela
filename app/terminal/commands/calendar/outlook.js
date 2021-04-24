import { subDays, addDays, isBefore, format, isSameDay, setYear, getYear } from 'date-fns';
import startCase from 'lodash/startCase.js';

export default {
	signature: {},
	fn: async function outlook({ deps }) {
		const { contact } = deps.models;
		const contacts = (await contact.get()).filter(con => !!con.dob);
		const now = new Date();
		const nowMinus7 = subDays(now, 7);
		const nowPlus7 = addDays(now, 7);
		let iDate = new Date(nowMinus7);
		let rows = [];
		while (isBefore(iDate, nowPlus7)) {
			const cells = [];
			cells.push(format(iDate, 'dd-MM-yyyy'));
			if (isSameDay(iDate, now)) cells[0] += ' *';
			contacts.forEach(contact => {
				const contactsBirthday = setYear(new Date(contact.dob), getYear(now));
				if (isSameDay(iDate, contactsBirthday)) {
					cells.push(`${startCase(contact.forename)} ${startCase(contact.surname)}'s Birthday`);
				}
			});
			rows.push(cells.join(' '));
			iDate = addDays(iDate, 1);
		}
		return { formattedData: rows.join('\n') }
	}
};