import { Router } from "express";
import GET from "./GET";

const homeRoutes = Router();

homeRoutes.get("/", GET);

export default homeRoutes;
