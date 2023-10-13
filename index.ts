import express from "express";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
