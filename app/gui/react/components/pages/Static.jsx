import React from 'react';
import config from '../../../../../config.js';
import './Static.scss';

export default function Static() {
	return (
		<div className="static">
			<iframe src={`http://localhost:${config.staticHtmlPort}/${config.staticHtmlUrl}`} />
		</div>
	);
}