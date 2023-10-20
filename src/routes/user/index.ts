import { Router } from "express";
import POST from "./POST";

const userRoutes = Router();

userRoutes.post("/user", POST);

export default userRoutes;
