import { CONFIG } from "./shared/config";
import express from "express";
import { User } from "./db";
import { apiRouter } from "./routes";
import { standardResponse } from "./middlewares/standardResponse";
import { commentOnPost } from "./shared/utils/comment_bot";
import { voteOnPoll } from "./shared/utils/vote_bot";
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

app.get("/", (req, res) => {
  res.send("Hello from Typescript + Express Server");
});

const PORT = CONFIG.PORT;

app.listen(PORT, () => {
  console.log(`[⚡] Server started at port: ${PORT}`);
  console.log(`Local: http://localhost:${PORT}/`);
});
