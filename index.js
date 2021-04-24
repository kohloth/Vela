import parseArgs from './app/terminal/inputUtils/parseArgs.js';
import commands from './app/terminal/commands.js';
import getInputErrors from './app/terminal/inputUtils/getInputErrors.js';

import { models, db } from './singletons.js'; 

// #############################################
// Routes
// #############################################

const args = parseArgs(process.argv);

let command;
const error = (() => {
	if (args.error) return args.error;

	if (!commands[args.module]) {
		return `A module called "${args.module}" does not exist.`;
	}

	if (!commands[args.module][args.fn]) {
		return `The module "${args.module}" does not have a function named "${args.fn}".`;
	}

	command = commands[args.module][args.fn];
	const validationErrors = Object.entries(getInputErrors(command.signature, args.args));
	if (validationErrors.length) {
		return `The following input data errors are present:\n${validationErrors.map(err => err.join(': ')).join('\n')}`;
	}
})();

if (error) {
	console.log(error);
} else {
	(async () => {
		const result = await command.fn({
			deps: { db, models, commands },
			args: args.args,
		});
		if (result.formattedData) {
			console.log(result.formattedData);
		}
		if (result.data) {
			let format = 'json';
			if (Array.isArray(result.data)) format = 'table';
			if (args.options.format) format = args.options.format;
			switch (format) {
				case 'table':
					console.table(result.data);
					break;
				case 'json':
					console.log(result.data);
					break;
				default:
					console.log(`Invalid output format: "${format}"`);
			}
		}
	})();
}
