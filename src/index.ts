import { CONFIG } from "./shared/config";
import express from "express";
import { apiRouter } from "./routes";
import { standardResponse } from "./middlewares/standardResponse";

import cors from "cors";
const app = express();
// console.log(CONFIG.DEVELOPMENT);
if (CONFIG.DEVELOPMENT) {
  console.log("DEV MODE");
  app.use(cors({ origin: "*" }));
}
app.use(express.json());
app.use(standardResponse);
app.use("/api", apiRouter);

app.use(express.static("public"));
app.get("*", (req, res, next) => {
  if (req.url.startsWith("/api")) next(); // exclude api routes
  try {
    res.sendFile(require("path").join(__dirname, "public", "index.html"));
  } catch (err) {
    next(err);
  }
});

const PORT = CONFIG.PORT;

app.listen(PORT, () => {
  console.log(`[⚡] Server started at port: ${PORT}`);
  console.log(`Local: http://localhost:${PORT}/`);
});
