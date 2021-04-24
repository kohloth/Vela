import React from 'react';
import MarkdownIt from 'markdown-it';

import './Mark.scss';

const md = new MarkdownIt();

export default function Mark({ text = '' }) {
	if (text.trim().indexOf('<') === 0) {
		return <div className="mark" dangerouslySetInnerHTML={{ __html: text }} />
	} else {
		const parsedText = md.render(text);
		return <div className="mark" dangerouslySetInnerHTML={{ __html: parsedText }}></div>
	}
}