import { Router } from "express";

const routes = Router();

routes.all("/", (req, res) => res.send("OK"));

export default routes;
