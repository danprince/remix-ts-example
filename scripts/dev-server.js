#!/usr/bin/env node

let path = require("path");
let esbuild = require("esbuild");
let nodemon = require("nodemon");
let { config } = require("./build-server");

esbuild.build({
  ...config,
  watch: {
    onRebuild(err) {
      if (err) {
        console.error(`esbuild failed: ${err.message}`);
      } else {
        console.log(`esbuild done`);
      }
    }
  },
});

nodemon({
  script: config.outfile,
  env: {
    // Remix sets NODE_ENV for the client side, we need to set for server
    NODE_ENV: "development",
    // Remix uses some experimental APIs which create a lot of noise.
    // Disable node warnings during dev (we'll still see them during build though).
    NODE_NO_WARNINGS: "1"
  }
});

nodemon.on("restart", (files) => {
  //console.log(`nodemon restarted (changes in ${files.join(", ")})`);
});