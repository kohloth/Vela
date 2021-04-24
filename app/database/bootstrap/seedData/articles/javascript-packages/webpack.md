# Info

* Webpack is a powerful tool for loading any asset. However, at its core, it is a javascript asset loader. Therefore, it supports loading javascript natively, without the need to use any addon loaders or plugins.
* The value of the `mode` variable can be used to conditionally serve different configurations from within an application's `webpack.config.js` file. However, its worth noting that the value of this variable also changes the way that webpack natively loads things, irrespective of the config file. For example, when it is set to `production`, minification takes place.
* Some webpack loaders rely on the correct configuration of the `output.publicPath` attribute. This is usually `dist/`.

		
# Configurations

## Simple JS

```
const path = require('path');

module.exports = {
	entry: './src/index.js',
	devtool: 'eval-source-map',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	}
};
```

## Loading SASS

```
const path = require('path');

module.exports = {
	entry: ['./src/index.js', './src/libs/sass/app.scss'],
	mode: 'development',
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.(sass|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.ts$/,
				use: 'ts-loader'
			}
		]
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	}
};
```

## Writing SASS and CSS into a file

SCSS and CSS can be written to disk. Note that this should only really be done during a production build.

```
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: ['./src/index.js', './src/libs/sass/app.scss'],
	mode: 'development',
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.(sass|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.ts$/,
				use: 'ts-loader'
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin()
	],
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	}
};
```

				
			
# Splitting JS and SCSS into separate output bundles
				

Code can be split into bundles. This act is an act of piping the compiled code into several files, as opposed to one, huge monolithic file. Bundle splitting brings two key advantages:

* The all-important initial page load becomes substantially faster, as it only loads that which is required to render the initial page.
* Changes to source code that only affects one of ten compiled bundles only requires users to re-download one tenth of the application.

Bundling can be done with both JS and CSS. Note that due to an undesirable aspect of webpack, the configuration below causes a JS file to be generated for each CSS file - or at least, it would do, if it were not for the FixStyleOnlyEntriesPlugin that was employed in this configuration to circumvent the issue.

```
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const mode = process.env.NODE_ENV;

module.exports = {
	entry: {
		main: './src/index.js',
		aux: './src/aux.js',
		app: './src/libs/sass/app.scss',
		theme: './src/libs/sass/theme.scss'
	},
	devtool: 'eval-source-map',
	mode: process.env.NODE_ENV || 'production',
	module: {
		rules: [
			{
				test: /\.(sass|scss|css)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							filename: '[name].[hash].css',
							hmr: mode === 'development',
						}
					},
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.ts$/,
				use: 'ts-loader'
			}
		]
	},
	plugins: [
		new FixStyleOnlyEntriesPlugin(),
		new MiniCssExtractPlugin()
	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
};
```

# Code splitting / Lazy loading of modules
				
In addition to performance gains attained through the practice of bundle splitting, performance gains may also be had by code splitting. Essentially, this practice boils down to the use of the `import()` function that webpack supplies. This allows files to be loaded on-demand. Neccessarily, the use of this syntax in the application code causes webpack to automatically generate separate output bundles.

This can be used to implement the Google PRPL pattern. (Push, render, pre-cache, lazy-load.) This can be translated as: Block and load critical stuff, paint, load stuff that is likely to be used, load stuff that was unlikely to be used and therefore not yet loaded when demand arises.

```
const path = require('path');

module.exports = {
	entry: './src/index.js',
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.(css)$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	output: {
		filename: 'main.js',
		publicPath: 'dist/',
		path: path.resolve(__dirname, 'dist')
	}
};
```

```
let button = document.createElement('button');
button.innerHTML = 'Load big data';
document.body.appendChild(button);

button.addEventListener('click', e => {
	let p = document.createElement('p');
	p.innerHTML = 'Please wait. Loading...';
	button.setAttribute('disabled', true);
	document.body.appendChild(p);
	import('./bigData.js').then(bigDataModule => {
		button.removeAttribute('disabled');
		p.innerHTML = `Success: ${bigDataModule.default}`;
	});
});
```

				
			
## Loading images

The best way to load images is by means of the `url-loader`. This will base-64 encode images into the main output JS bundle file when the images are no larger than the specified `limit` attribute. When images are too large, the `url-loader` defers to the `file-loader`, which just returns a public-folder-oriented path to the file. Both can then be used interchangably in CSS and HTML markup (and javascript). Note that both loaders must be installed. (`npm i -D url-loader file-loader`)
```
const path = require('path');

module.exports = {
	entry: './src/index.js',
	devtool: 'eval-source-map',
	mode: 'none',
	module: {
		rules: [
			{
				test: /\.(css)$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 1000,
					},
				}
			}
		]
	},
	output: {
		filename: 'main.js',
		publicPath: 'dist/',
		path: path.resolve(__dirname, 'dist')
	}
};
```

```
import shipImg from './images/ship.jpg';
import flagUk from './images/flag-uk.png';
import flagUs from './images/flag-us.png';
import flagFr from './images/flag-fr.png';

let syncImgs = [shipImg, flagUk, flagUs, flagFr];
syncImgs.forEach(src => {
	let img = document.createElement('img');
	img.setAttribute('src', src);
	document.body.appendChild(img);
});

let button = document.createElement('button');
button.innerHTML = 'Load more images';
document.body.appendChild(button);
button.addEventListener('click', e => {
	button.setAttribute('disabled', true);
	Promise.all([
		import('./images/dragons.png'),
		import('./images/bird.jpg')
	]).then(images => {
		button.removeAttribute('disabled');
		images.forEach(module => {
			let img = document.createElement('img');
			img.setAttribute('src', module.default);
			document.body.appendChild(img);
		});
	});
});
```

# Loading source maps and mode-contingent conifguration
				
The example below demonstrates one of the ways to use a configuration that varies in accordance with the build `mode` variable. To make the code below run in production, use `npx webpack --mode production`. For development, use `npx webpack --mode development`.
				
```
const path = require('path');

module.exports = (env, argv) => {

	const baseConfig = {
		entry: './src/index.js',
		module: {
			rules: [
				{
					test: /\.(css)$/,
					use: ['style-loader', 'css-loader']
				}
			]
		},
		output: {
			filename: 'main.js',
			publicPath: 'dist/',
			path: path.resolve(__dirname, 'dist')
		}
	};

	let output;
	const mode = argv.mode;
	switch (mode) {
		case 'development':
			output = {
				...baseConfig,
				mode,
				devtool: 'eval-source-map',
			};
			break;
		case 'production':
			output = {
				...baseConfig,
				mode,
				devtool: 'source-map',
			};
			break;
		default:
			throw new Error(`Invalid compilation mode: "${mode}"`);
	}
	return output;
};
```

# Dev + prod

Webpack can be run in one of three modes: production, development, none. The former two values cause virtual configuration parameters to take effect. The latter opts out of any such configuration parameters.

Specifying at command line

```
webpack --mode=production
```

Specifying within config

```
module.exports = {
	mode: 'production'
};
```

More information regarding the exact nature of default optimisations can be found <a href="https://webpack.js.org/configuration/mode/">here.
In addition, separate, concrete webpack configuration objects should be used for production and development. This may be done by means of listening to the `mode` variable within a single config file, and outputting different configuration parameters accordingly, or creating altogether separate config files. However, a third option is the most orthodox - to create a base config file, and then a production file and a development file, which each extend the base config file by means of the `webpack-merge` plugin.

The files are convetionally known as:

```
webpack.common.js
webpack.dev.js
webpack.prod.js
```

The files may contain code such as the following.

`webpack.common.js`

```
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	plugins: [
		// new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Production'
		})
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};
```

`webpack.dev.js`

```
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	}
});
```

`webpack.prod.js`

```
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
});
```

The config file to use can be communicated in the form of an argument to the `webpack` command. The `package.json` file may then take the following form:

```
// ...
"scripts": {
	"start": "webpack-dev-server --config webpack.dev.js",
	"build": "webpack --config webpack.prod.js"
},
// ...
```

To access the mode from a JS module that is controlled by webpack:

```
if (process.env.NODE_ENV !== 'production') {
	console.log('Looks like we are in development mode!');
}
```

# Webpack dev server
		
When developing, using the webpack dev server can be advantageous for the following reasons:

* Files will be accessed in accordance to the `http` protocol, and not the `file` protocol.
* The `dist` code will be within memory.
* Hot module reloading can be used.

To use webpack dev server, install it using `npm i -D webpack-dev-server`, and then change your node scripts object:

```
// ...from this...
webpack src/index.js dist/bundle.js

// ... to this.
webpack-dev-server --entry ./src/index.js --output-filename ./dist/bundle.js
```

The behaviour of the dev server service can be configured from within the webpack config file. For example:

```
module.exports = {
	//...
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	}
};
```

# Splitting
		
# Bundle splitting
	
Bundle splitting is done to help reduce file transmission sizes when a user already has cached app code. Downloading one tenth of a codebase because one file has changed since the last time the user accessed the site is preferable to downloading the whole codebase all over again.

To automatically separate your vendor code into one chunk (`vendors-main.js`), the following configuration code is used:

```
const path = require('path');
module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
	},
	optimization: {
		splitChunks: {
		chunks: 'all',
		},
	},
};
```

To separete vendor code into individual files, the following configuration code can be used:

```
const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	plugins: [
		new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

						// npm package names are URL-safe, but some servers don't like @ symbols
						return `npm.${packageName.replace('@', '')}`;
					},
				},
			},
		},
	},
};
```

Actual application code can be split into chucnks by means of specifying multiple entry points:

```
module.exports = {
	entry: {
		main: path.resolve(__dirname, 'src/index.js'),
		ProductList: path.resolve(__dirname, 'src/ProductList/ProductList.js'),
		ProductPage: path.resolve(__dirname, 'src/ProductPage/ProductPage.js'),
		Icon: path.resolve(__dirname, 'src/Icon/Icon.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash:8].js',
	},
	plugins: [
		new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

						// npm package names are URL-safe, but some servers don't like @ symbols
						return `npm.${packageName.replace('@', '')}`;
					},
				},
			},
		},
	},
};
```

## Code splitting
	
Code splitting is used to lazy load modules only when they are needed. It looks like this:

`polyfills.js`

```
require('whatwg-fetch');
require('intl');
require('url-polyfill');
require('core-js/web/dom-collections');
require('core-js/es6/map');
require('core-js/es6/string');
require('core-js/es6/array');
require('core-js/es6/object');
```

`app.js`

```
if (
	'fetch' in window &&
	'Intl' in window &&
	'URL' in window &&
	'Map' in window &&
	'forEach' in NodeList.prototype &&
	'startsWith' in String.prototype &&
	'endsWith' in String.prototype &&
	'includes' in String.prototype &&
	'includes' in Array.prototype &&
	'assign' in Object &&
	'entries' in Object &&
	'keys' in Object
) {
	render();
} else {
	import('./polyfills').then(render);
}
```

Achieving a similar effect in React may be done like so:

```
import React from 'react';

class AdminPageLoader extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			AdminPage: null,
		}
	}

	componentDidMount() {
		import('./AdminPage').then(module => {
			this.setState({ AdminPage: module.default });
		});
	}

	render() {
		const { AdminPage } = this.state;

		return AdminPage
			? <AdminPage {...this.props} />
			: Loading...;
	}
}

export default AdminPageLoader;
```

However, it is more orthodox to do this using `react-loadable`.

```
import Loadable from 'react-loadable';
const LoadableHello = Loadable({
	loader: () => import('./Hello'),
	loading() {
		return Loading...
	}
});
```

# Advanced techniques

## Using web workers
	
		As the web worker constructor function takes the path of a standalone javascript file as an argument, the concept of web workers within a bundled program is foolhardy. However, web workers can be set up within a webpack project by either of the following:
		
			* Create a separate bundle for the webworker
			* Use a webpack loader that is designed to load workers, such as `worker-loader`.
		
		When using the latter, the web worker javascript file can be loaded by specifying the file and the worker loader itself as an inline directive, using: `import Worker from "worker-loader!./worker";`.
	

## Cache busting
	
Webpack can generate a file hash out of the box to prevent browsers from caching files that have changed. However, in order to get this to work as desired, some additional configuration is required to ensure that the otherwise constant hash of the main file is not preyed on by the webpack runtime code, or autoincrementing module IDs. The code below demonstrates a full  cache-busting configuration.

```
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	plugins: [
		// new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Caching'
		}),
		new webpack.HashedModuleIdsPlugin() // Uses hashes for module IDs, not numerical IDs
	],
	output: {
		filename: '[name].[contenthash].js', // Add contenthash to filename
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		runtimeChunk: 'single', // Ensure that webpack runtime is separate from main entry point bundle.
		splitChunks: {
			cacheGroups: {
				vendor: { // Tie all assets from the node_modules directory into one bundle.
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	}
};
```

# References

[Hackernoon article](https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758)




