import { Router } from "express";
import homeRoutes from "./home";

const routes = Router();

routes.use(homeRoutes);

export default routes;
