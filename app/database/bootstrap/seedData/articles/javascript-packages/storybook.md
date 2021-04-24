# Installing

```
npm init
npx -p @storybook/cli sb init
npm i -D @storybook/addon-console @storybook/addon-actions @storybook/addon-backgrounds
```

# Configuring

```
// ~/.storybook/addons.js
import '@storybook/addon-console';
import '@storybook/addon-actions/register';
import '@storybook/addon-backgrounds/register';

// ~/.storybook/config.js
import { configure, addParameters } from '@storybook/react';
addParameters({
	backgrounds: [
		{ name: 'Black', value: '#000000' },
		{ name: 'Grey', value: '#444444' },
		{ name: 'Red', value: '#a74750' },
	],
});
configure(require.context('../stories', true, /\.stories\.tsx$/), module);
```
# Running

```
npm run storybook
npm run build-storybook
```