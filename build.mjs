import dts from 'bun-plugin-dts';

await Bun.build({
	entrypoints: ['./src/index.ts'],
	outdir: './lib',
	target: 'browser',
	sourcemap: "external",
	minify: false,
	plugins: [
		dts(),
	],
	external: ["react"],
});