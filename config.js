import path from 'path';
import getDirname from 'es-dirname'

const dirname = getDirname();

export default {
	guiPort: 4000,
	apiPort: 4001,
	staticHtmlPort: 4002,
	staticHtmlUrl: 'static-html',
	staticHtmlPath: path.resolve(dirname, './content'),
	dbUrl: "http://localhost:8529",
	dbName: "vela",
	dbUsername: 'root',
	dbPassword: '',
}
