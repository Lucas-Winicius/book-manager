import { Router } from "express";
import userMethods from "./user";

const routes = Router();

routes.use(userMethods);

export default routes;
