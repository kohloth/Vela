import React from 'react';
import pyramid from '../../../images/pyramid.gif';
import './Home.scss';

export default function Home() {
	return (
		<div className="home">
			<img src={pyramid} />
		</div>
	);
}