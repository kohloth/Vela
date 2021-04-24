import buildArticle from './models/article.js';
import buildContact from './models/contact.js';
import buildPassphrase from './models/passphrase.js';
export default function getModels(deps) {
	return {
		article: buildArticle(deps),
		contact: buildContact(deps),
		passphrase: buildPassphrase(deps),
	};
}