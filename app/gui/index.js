// index.js
import 'regenerator-runtime/runtime'
import React from "react"
import ReactDOM from "react-dom"

import ResourcesContext from './react/contexts/resourcesContext.js';
import { resources } from './react/contexts/resources.js';
import './app.scss';
import App from './react/components/core/App';

ReactDOM.render((
	<ResourcesContext.Provider value={resources}>
		<App />
	</ResourcesContext.Provider>
), document.getElementById("root"))