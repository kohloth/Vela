import { execSync } from 'child_process';
import { format } from 'date-fns';
import { resolve } from 'path';

export default {
	signature: {
		inputPath: { type: String, required: false },
		password: { type: String, required: true }
	},
	fn: async function restore({ deps, args }) {
		const { inputPath = '/tmp/dump', password } = args;
		const dateStr = format(new Date(), 'yyyy-MM-dd_HH-mm-ss')
		const fullInputPath = inputPath.startsWith('/') ? inputPath : resolve(process.cwd(), inputPath);
		const cmd = `arangorestore --input-directory "${fullInputPath}" --server.database vela --server.password=${password}`;
		console.log(cmd);``
		const stdout = execSync(cmd);
		return {
			formattedData: 'Done'
		};
	}
};