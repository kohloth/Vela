import migrate from '../../../database/bootstrap/migrate.js';
import seed from '../../../database/bootstrap/seed.js';

export default {
	signature: {},
	fn: async function bootstrap({ deps, args }) {
		const { db } = deps;
		await migrate(db);
		seed(db);
		return {};
	}
};