import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import ResourcesContext from '../../contexts/resourcesContext.js';
import { format } from 'date-fns';
import { useParams, useHistory } from 'react-router-dom';
import FormGroup from '../modules/FormGroup.jsx';
import './PassphraseEdit.scss';
import set from 'lodash/set.js';
import get from 'lodash/get.js';
import startCase from 'lodash/startCase.js';
import flat from 'flat';

const dateFormat = 'dd-MM-yyyy';

export default function PassphraseEdit() {

	const { makeApiRequest } = useContext(ResourcesContext);

	const history = useHistory();

	let { passphraseKey: passphraseKeyParam } = useParams();

	const [passphraseKey, setPassphraseKey] = useState(passphraseKeyParam || '');

	const [passphraseProps, setPassphraseProps] = useState({
		title: '',
		username: '',
		phrase: '',
		address: '',
		aux: '',
	});

	const setPassphraseProp = useCallback((key, val) => {
		setPassphraseProps(oldPassphrase => {
			const newPassphrase = JSON.parse(JSON.stringify(oldPassphrase));
			set(newPassphrase, key, val);
			return newPassphrase;
		});
	}, [setPassphraseProps]);

	const flatPassphrase = useMemo(() => flat(passphraseProps || {}), [passphraseProps]);

	const reload = useCallback(() => {
		if (!passphraseKeyParam) return;
		(async () => {
			const res = await makeApiRequest('passphrase.find', { args: [passphraseKey] });
			const { data } = res;
			console.log(data);
			Object.keys(flatPassphrase).forEach(passphrasePropKey => {
				let val = get(data, passphrasePropKey, '');
				setPassphraseProp(passphrasePropKey, val || '');
			});
			if (!data) return;

		})();
	}, [
		setPassphraseProp,
		passphraseKeyParam,
		makeApiRequest,
	]);

	useEffect(() => {
		reload();
	}, []);

	const savePassphrase = useCallback(async () => {
		let methodName = 'passphrase.create';
		let args = passphraseProps;
		if (passphraseKey) {
			methodName = 'passphrase.update';
			args = [passphraseKey, args];
		}
		const result = await makeApiRequest(methodName, { args });
		if (!passphraseKey) {
			history.push(`/passphrase-edit/${result.data.lastInsertKey}`);
			setTimeout(() => {
				reload();
			}, 500);
		}
	}, [
		passphraseKey,
		passphraseProps,
	]);

	return (
		<form className="passphrase-edit">
			{Object.entries(flatPassphrase).map(([key, val]) => (
				<FormGroup key={key} label={key.split('.').map(startCase).join(': ')}>
					<input
						className="passphrase-edit__form-group-control"
						type="text"
						value={val}
						onChange={event => setPassphraseProp(key, event.target.value)}
					/>
				</FormGroup>
			))}
			<button className="passphrase-edit__save-button" onClick={event => {
				event.preventDefault();
				savePassphrase();
			}}>Save</button>
		</form>
	);
}