import signatureToString from '../../outputUtils/signatureToString.js';

export default {
	signature: {},
	fn: function list({ deps }) {
		const { commands } = deps;
		const moduleKeys = Object.keys(commands);
		const lines = [];
		let indent = 0;
		function pushToLine(text) {
			lines.push('--'.repeat(indent) + text);
		}
		moduleKeys.forEach(moduleKey => {
			lines.push(moduleKey);
			indent++;
			const fnKeys = Object.keys(commands[moduleKey]);
			fnKeys.forEach(fnKey => {
				pushToLine(`${fnKey}(${signatureToString(commands[moduleKey][fnKey].signature)})`);
			});
			indent--;
		});
		return { formattedData: lines.join('\n') }; 
	}
};