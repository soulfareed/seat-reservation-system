import express from "express";
// import router from "./routes";
import bodyParser from "body-parser";
// import { bundlerModuleNameResolver } from "typescript";
import seatRoutes from "./routes";

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use("/api", seatRoutes);

app.listen(PORT, () => {
  console.log("server is running on http://localhost:${PORT}");
});
