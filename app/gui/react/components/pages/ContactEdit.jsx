import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import ResourcesContext from '../../contexts/resourcesContext.js';
import { format } from 'date-fns';
import { useParams, useHistory } from 'react-router-dom';
import FormGroup from '../modules/FormGroup.jsx';
import './ContactEdit.scss';
import set from 'lodash/set.js';
import get from 'lodash/get.js';
import startCase from 'lodash/startCase.js';
import flat from 'flat';

const dateFormat = 'dd-MM-yyyy';

export default function ContactEdit() {

	const { makeApiRequest } = useContext(ResourcesContext);

	const history = useHistory();

	let { contactKey: contactKeyParam } = useParams();

	const [contactKey, setContactKey] = useState(contactKeyParam || '');

	const [contactProps, setContactProps] = useState({
		forename: '',
		surname: '',
		email: '',
		tel: '',
		dob: '',
		address: {
			line1: '',
			line2: '',
			line3: '',
			city: '',
			state: '',
			postcode: '',
		}
	});

	const setContactProp = useCallback((key, val) => {
		setContactProps(oldContact => {
			const newContact = JSON.parse(JSON.stringify(oldContact));
			set(newContact, key, val);
			return newContact;
		});
	}, [setContactProps]);

	const flatContact = useMemo(() => flat(contactProps || {}), [contactProps]);

	const reload = useCallback(() => {
		if (!contactKeyParam) return;
		(async () => {
			const res = await makeApiRequest('contact.find', { args: [contactKey] });
			const { data } = res;
			console.log(data);
			Object.keys(flatContact).forEach(contactPropKey => {
				let val = get(data, contactPropKey, '');
				if (contactPropKey === 'dob' && val) {
					val = format(new Date(val), 'dd-MM-yyyy');
				}
				setContactProp(contactPropKey, val || '');
			});
			if (!data) return;

		})();
	}, [
		setContactProp,
		contactKeyParam,
		makeApiRequest,
	]);

	useEffect(() => {
		reload();
	}, []);

	const saveContact = useCallback(async () => {
		let methodName = 'contact.create';
		let args = contactProps;
		if (contactKey) {
			methodName = 'contact.update';
			args = [contactKey, args];
		}
		const result = await makeApiRequest(methodName, { args });
		if (!contactKey) {
			history.push(`/contact-edit/${result.data.lastInsertKey}`);
			setTimeout(() => {
				reload();
			}, 500);
		}
	}, [
		contactKey,
		contactProps,
	]);

	return (
		<form className="contact-edit">
			{Object.entries(flatContact).map(([key, val]) => (
				<FormGroup key={key} label={key.split('.').map(startCase).join(': ')}>
					<input
						className="contact-edit__form-group-control"
						type="text"
						value={val}
						onChange={event => setContactProp(key, event.target.value)}
					/>
				</FormGroup>
			))}
			<button className="contact-edit__save-button" onClick={event => {
				event.preventDefault();
				saveContact();
			}}>Save</button>
		</form>
	);
}