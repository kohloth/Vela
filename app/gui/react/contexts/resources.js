import config from '../../../../config.js';

async function makeApiRequest(operationName, { args }) {
	const apiUrl = `http://localhost:${config.apiPort}`;
	const response = await fetch(apiUrl, {
		method: 'post',
		body: JSON.stringify({
			operationName,
			args,
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!response.ok) return { errors: [response.status] };
	return response.json();
}

export const resources = {
	makeApiRequest,
};