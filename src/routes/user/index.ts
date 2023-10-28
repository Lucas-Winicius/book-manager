import { Router } from "express";
import POST from "./POST";
import Profile from "./Profile";
import Authentication from "../../middlewares/Authentication";

const userMethods = Router();

userMethods.post("/user", POST);
userMethods.get("/user/profile", Authentication, Profile);

export default userMethods;
