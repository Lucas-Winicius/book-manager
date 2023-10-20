import { Router } from "express";
import homeRoutes from "./home";
import userRoutes from "./user";

const routes = Router();

routes.use(homeRoutes);
routes.use(userRoutes);

export default routes;
