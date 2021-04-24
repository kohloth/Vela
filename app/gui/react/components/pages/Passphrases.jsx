import React, { useContext, useEffect, useState, useCallback } from 'react';
import ResourcesContext from '../../contexts/resourcesContext.js';
import { format } from 'date-fns';
import './Passphrases.scss';
import { Link } from 'react-router-dom';
import FormGroup from '../modules/FormGroup.jsx';
import debounce from 'lodash/debounce.js';

export default function Passphrases() {

	const { makeApiRequest } = useContext(ResourcesContext);

	const [passphrases, setPassphrases] = useState([]);
	const [titleFilter, setTitleFilter] = useState('');

	const reload = useCallback(async (titleFilter) => {
		const args = { filters: {} };
		if (titleFilter) args.filters.filterTitle = titleFilter;
		const res = await makeApiRequest('passphrase.get', { args });
		const { data } = res;
		setPassphrases(data);
	}, [setPassphrases, makeApiRequest]);

	const debouncedReload = useCallback(debounce(titleFilter => {
		reload(titleFilter);
	}, 500), [reload]);

	useEffect(() => {
		debouncedReload(titleFilter);
	}, [debouncedReload, titleFilter]);

	useEffect(() => {
		reload();
	}, [reload]);

	const removePassphrase = useCallback(async passphraseKey => {
		await makeApiRequest('passphrase.remove', { args: [passphraseKey] });
		reload(titleFilter);
	}, [makeApiRequest, reload]);

	return (
		<div className="passphrases">
			<div className="passphrases__head">
				<FormGroup label="Filter by title">
					<input
						className="passphrases__head-input"
						type="text"
						value={titleFilter}
						onChange={event => setTitleFilter(event.target.value)}
					/>
				</FormGroup>
				<Link className="passphrases__new-button" to="passphrase-edit">New passphrase</Link>
			</div>
			<table className="passphrases__main-table-table">
				<thead className="passphrases__main-table-thead">
					<tr className="passphrases__main-table-tr">
						<th className="passphrases__main-table-th">Key</th>
						<th className="passphrases__main-table-th">Title</th>
						<th className="passphrases__main-table-th">Username</th>
						<th className="passphrases__main-table-th">Phrase</th>
						<th className="passphrases__main-table-th">&nbsp;</th>
					</tr>
				</thead>
				<tbody className="passphrases__main-table-tbody">
					{passphrases.map(passphrase => (
						<tr className="passphrases__main-table-tr" key={passphrase._key}>
							<td className="passphrases__main-table-td">
								<Link className="passphrases__table-row-link" to={`passphrase-edit/${passphrase._key}`}>{passphrase._key}</Link>
							</td>
							<td className="passphrases__main-table-td">
								<Link className="passphrases__table-row-link" to={`passphrase-edit/${passphrase._key}`}>{passphrase.title}</Link>
							</td>
							<td className="passphrases__main-table-td">
								<Link className="passphrases__table-row-link" to={`passphrase-edit/${passphrase._key}`}>{passphrase.username}</Link>
							</td>
							<td className="passphrases__main-table-td">
								<Link className="passphrases__table-row-link" to={`passphrase-edit/${passphrase._key}`}>{passphrase.phrase}</Link>
							</td>
							<td className="passphrases__main-table-td passphrases__main-table-td_actions">
								<Link className="passphrases__table-row-button" to={`passphrase-edit/${passphrase._key}`}>Edit</Link>
								<button className="passphrases__table-row-button" onClick={() => removePassphrase(passphrase._key)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}