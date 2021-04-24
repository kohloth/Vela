import Bundler from 'parcel-bundler';
import { resolve } from 'path';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import get from 'lodash/get.js';
import { ArrayCursor } from 'arangojs/cursor.js';
import config from '../../config.js';
import serveIndex from 'serve-index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start backend server to handle db queries
async function startApiServer({ deps }) {

	const models = deps.models;
	const app = express();
	app.use(bodyParser.json());
	app.use(cors());

	app.get('/', (req, res) => {
		res.send('This is the vela GUI API server');
	});

	app.post('/', async (req, res) => {
		const { operationName, args } = req.body;
		const operation = get(models, operationName);
		let result;
		if (Array.isArray(args)) {
			result = await operation(...args);
		} else {
			result = await operation(args);
		}
		if (result instanceof ArrayCursor) {
			res.send({ data: 'OK' });
		} else {
			res.send({ data: result });
		}
	});

	app.listen(config.apiPort, () => {
		console.log(`Vela GUI API server listening at http://localhost:${config.apiPort}`);
	});

}

// Start backend server to serve static files
async function startStaticServer() {
	const app = express();
	app.use(bodyParser.json());
	app.use(cors());
	app.use(`/${config.staticHtmlUrl}`, express.static(config.staticHtmlPath), serveIndex(config.staticHtmlPath, {
		icons: true,
		hidden: true,
		stylesheet: path.resolve(__dirname, './directory.css'),
	}));
	app.listen(config.staticHtmlPort, () => {
		console.log(`Vela static files server serving files in ${config.staticHtmlPath} at http://localhost:${config.staticHtmlPort}/${config.staticHtmlUrl}`);
	});
}

// Start parcel server to compile and serve client files
async function startClient() {
	const entryFiles = resolve(__dirname, './index.html');
	const options = {};
	const bundler = new Bundler(entryFiles, options);
	await bundler.serve(config.guiPort);
}

export default async function start({ deps } = {}) {
	await startApiServer({ deps });
	await startStaticServer();
	startClient();
}