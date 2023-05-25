import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    entries: ["./src/index"],
    clean: true,
    outDir: "dist",
    declaration: true,
    rollup: {
        emitCJS: true,
        esbuild: {
            minify: true,
        },
    },
});
