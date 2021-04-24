import React, { useContext, useEffect, useState, useCallback } from 'react';
import ResourcesContext from '../../contexts/resourcesContext.js';
import { format } from 'date-fns';
import './Contacts.scss';
import { Link } from 'react-router-dom';
import FormGroup from '../modules/FormGroup.jsx';
import debounce from 'lodash/debounce.js';
import startCase from 'lodash/startCase.js';

export default function Contacts() {

	const { makeApiRequest } = useContext(ResourcesContext);

	const [contacts, setContacts] = useState([]);
	const [forenameFilter, setForenameFilter] = useState('');
	const [surnameFilter, setSurnamefilter] = useState('');

	const reload = useCallback(async (surnameFilter, forenameFilter) => {
		const args = { filters: {} };
		if (forenameFilter) args.filters.filterForename = forenameFilter;
		if (surnameFilter) args.filters.filterSurname = surnameFilter;
		const res = await makeApiRequest('contact.get', { args });
		const { data } = res;
		setContacts(data);
	}, [setContacts, makeApiRequest]);

	const debouncedReload = useCallback(debounce((surnameFilter, forenameFilter) => {
		reload(surnameFilter, forenameFilter);
	}, 500), [reload]);

	useEffect(() => {
		debouncedReload(surnameFilter, forenameFilter);
	}, [debouncedReload, surnameFilter, forenameFilter]);

	useEffect(() => {
		reload();
	}, [reload]);

	const removeContact = useCallback(async contactKey => {
		await makeApiRequest('contact.remove', { args: [contactKey] });
		reload(surnameFilter, forenameFilter);
	}, [makeApiRequest, reload]);

	return (
		<div className="contacts">
			<div className="contacts__head">
				<FormGroup label="Filter by forename">
					<input
						className="contacts__head-input"
						type="text"
						value={forenameFilter}
						onChange={event => setForenameFilter(event.target.value)}
					/>
				</FormGroup>
				<FormGroup label="Filter by surname">
					<input
						className="contacts__head-input"
						type="text"
						value={surnameFilter}
						onChange={event => setSurnamefilter(event.target.value)}
					/>
				</FormGroup>
				<Link className="contacts__new-button" to="contact-edit">New contact</Link>
			</div>
			<table className="contacts__main-table-table">
				<thead className="contacts__main-table-thead">
					<tr className="contacts__main-table-tr">
						<th className="contacts__main-table-th">Key</th>
						<th className="contacts__main-table-th">Forename</th>
						<th className="contacts__main-table-th">Surname</th>
						<th className="contacts__main-table-th">DOB</th>
						<th className="contacts__main-table-th">Tel</th>
						<th className="contacts__main-table-th">Email</th>
						<th className="contacts__main-table-th">&nbsp;</th>
					</tr>
				</thead>
				<tbody className="contacts__main-table-tbody">
					{contacts.map(contact => (
						<tr className="contacts__main-table-tr" key={contact._key}>
							<td className="contacts__main-table-td">
								<Link className="contacts__table-row-link" to={`contact-edit/${contact._key}`}>{contact._key}</Link>
							</td>
							<td className="contacts__main-table-td contacts__main-table-td_forename">
								<Link className="contacts__table-row-link" to={`contact-edit/${contact._key}`}>{startCase(contact.forename)}</Link>
							</td>
							<td className="contacts__main-table-td contacts__main-table-td_surname">
								<Link className="contacts__table-row-link" to={`contact-edit/${contact._key}`}>
									{startCase(contact.surname)}
								</Link>
							</td>
							<td className="contacts__main-table-td">
								{contact.dob ? format(new Date(contact.dob), 'dd-MM-yyyy') : ''}
							</td>
							<td className="contacts__main-table-td">
								{contact.tel}
							</td>
							<td className="contacts__main-table-td">
								{contact.email}
							</td>
							<td className="contacts__main-table-td contacts__main-table-td_actions">
								<Link className="contacts__table-row-button" to={`contact-edit/${contact._key}`}>Edit</Link>
								<button className="contacts__table-row-button" onClick={() => removeContact(contact._key)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}