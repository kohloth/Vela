import React from 'react';
import './FormGroup.scss';

export default function FormGroup({
	children,
	label
}) {
	return (
		<div className="form-group">
			<label className="form-group__label">{label}</label>
			<div className="form-group__control">{children}</div>
		</div>
	)
}