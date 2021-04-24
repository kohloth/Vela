import { execSync } from 'child_process';
import { format } from 'date-fns';
import { resolve } from 'path';

export default {
	signature: {
		outputPath: { type: String, required: false },
		password: { type: String, required: true }
	},
	fn: async function dump({ deps, args }) {
		const { outputPath = '/home/kohl/Desktop/bay/backup/vela', password } = args;
		const dateStr = format(new Date(), 'yyyy-MM-dd_HH-mm-ss')
		const fullOutputPath = outputPath.startsWith('/') ? outputPath : resolve(process.cwd(), outputPath);
		const cmd = `arangodump --output-directory "${fullOutputPath}/vela_${dateStr}" --server.database vela --server.password=${password} --overwrite true`;
		console.log(cmd);
		const stdout = execSync(cmd);
		return {
			formattedData: 'Done'
		};
	}
};