import { Database } from 'arangojs';

import getModels from './app/database/models.js';
import config from './config.js';

export const db = new Database({
	url: config.dbUrl,
	databaseName: config.dbName,
	auth: {
		username: config.dbUsername,
		password: config.dbPassword
	},
});

export const models = getModels({ db });