import start from '../../../gui/start.js';

export default {
	signature: {},
	fn: async function startgui({ deps, args }) {
		start({ deps });
		return {};
	}
};