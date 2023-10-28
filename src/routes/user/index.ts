import { Router } from "express";
import POST from "./POST";

const userMethods = Router();

userMethods.post("/user", POST);

export default userMethods;
