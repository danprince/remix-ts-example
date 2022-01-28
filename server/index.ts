import path from "path";
import express from "express";
import remix from "@remix-run/express";
import { hello } from "~/shared/helpers";

console.log("server", hello());

const app = express();

const remixHandler = remix.createRequestHandler({
  build: require("../build")
});

app.use(express.static(path.join(__dirname, "../public")));

app.all("*", remixHandler);

app.listen(4000);
