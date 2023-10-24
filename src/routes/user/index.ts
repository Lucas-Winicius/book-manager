import { Router } from "express";
import Authentication from "../../middlewares/Authentication";
import POST from "./POST";
import PROFILE from "./Profile";
import GET from "./GET";
import DELETE from "./DELETE";

const userRoutes = Router();

userRoutes.post("/user", POST);
userRoutes.get("/user", GET);
userRoutes.get("/user/profile", Authentication, PROFILE);
userRoutes.delete("/user", Authentication, DELETE);

export default userRoutes;
