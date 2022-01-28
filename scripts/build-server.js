#!/usr/bin/env node

let path = require("path");
let esbuild = require("esbuild");
let pkg = require("../package.json");

/**
 * @type {esbuild.BuildOptions}
 */
exports.config = {
  bundle: true,
  entryPoints: [path.join(__dirname, "../server/index.ts")],
  platform: "node",
  target: "node14",
  outfile: path.join(__dirname, "../build/server.js"),
  external: [
    // Don't bundle any node_modules
    ...Object.keys(pkg.dependencies),
    // Don't rebundle Remix's output
    "./build",
  ]
};

if (require.main === module) {
  esbuild.buildSync(exports.config);
}
