import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	css: {
	    preprocessorOptions: {
	      scss: {
		api: 'modern-compiler' // or "modern"
	      }
	    }
	},
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});