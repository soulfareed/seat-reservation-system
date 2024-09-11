import express, { Request, Response } from "express";
// import router from "./routes";
import bodyParser from "body-parser";
// import { bundlerModuleNameResolver } from "typescript";
import router from "./routes";

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log("server is running");
});
