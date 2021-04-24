import selfBootstrap from './commands/self/bootstrap.js';
import selfDump from './commands/self/dump.js';
import selfRestore from './commands/self/restore.js';
import selfList from './commands/self/list.js';
import selfStartGui from './commands/self/startgui.js';
import selfStopGui from './commands/self/stopgui.js';
import articleCreate from './commands/article/create.js';
import articleRemove from './commands/article/remove.js';
import articleGet from './commands/article/get.js';
import articleFind from './commands/article/find.js';
import articleUpdate from './commands/article/update.js';
import contactCreate from './commands/contact/create.js';
import contactRemove from './commands/contact/remove.js';
import contactGet from './commands/contact/get.js';
import contactUpdate from './commands/contact/update.js';
import contactFind from './commands/contact/find.js';
import calendarOutlook from './commands/calendar/outlook.js';
import passphraseCreate from './commands/passphrase/create.js';
import passphraseUpdate from './commands/passphrase/update.js';
import passphraseGet from './commands/passphrase/get.js';
import passphraseRemove from './commands/passphrase/remove.js';

export default {
	self: {
		bootstrap: selfBootstrap,
		dump: selfDump,
		restore: selfRestore,
		list: selfList,
		startgui: selfStartGui,
		stopgui: selfStopGui,
	},
	article: {
		create: articleCreate,
		remove: articleRemove,
		get: articleGet,
		update: articleUpdate,
		find: articleFind,
	},
	contact: {
		create: contactCreate,
		remove: contactRemove,
		get: contactGet,
		update: contactUpdate,
		find: contactFind,
	},
	passphrase: {
		create: passphraseCreate,
		get: passphraseGet,
		remove: passphraseRemove,
		update: passphraseUpdate,
	},
	calendar: {
		outlook: calendarOutlook,
	}
};