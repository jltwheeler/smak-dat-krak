const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["./src/main.ts"],
    bundle: true,
    minify: true,
    platform: "node",
    sourcemap: true,
    target: "node16",
    external: ["aws-sdk"],
    define: { "require.resolve": undefined },
    treeShaking: true,
    outdir: "dist",
  })
  .catch(() => process.exit(1));
