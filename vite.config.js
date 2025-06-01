// FILE: vite.config.js

import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {quasar, transformAssetUrls} from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
	base: "/delivery-maps/dist/",

	plugins: [
		vue({
			template: {transformAssetUrls}
		}),

		quasar({
			sassVariables: fileURLToPath(
				new URL('./src/quasar-variables.sass', import.meta.url)
			)
		})
	],

	config: {
		dark: true
	}
});
