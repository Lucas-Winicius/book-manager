import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./src/routes/router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
