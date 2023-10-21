import { Router } from "express";
import POST from "./POST";
import PROFILE from "./Profile";
import Authentication from "../../middlewares/Authentication";

const userRoutes = Router();

userRoutes.post("/user", POST);
userRoutes.get("/user/profile", Authentication, PROFILE);

export default userRoutes;
