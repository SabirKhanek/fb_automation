import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Typescript + Express Server");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[⚡] Server started at port: ${PORT}`);
  console.log(`Local: http://localhost:${PORT}/`);
});
