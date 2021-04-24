import { htmlToText } from 'html-to-text';

export default function renderMarkup(markup) {
	if (markup.trim().substring(0, 1) === '<') {
		const text = htmlToText(markup, {
			wordwrap: 130
		});
		return text.replace(/\n{3,}/g, '\n');
	}
	return markup;
}