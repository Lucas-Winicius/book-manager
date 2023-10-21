import { Request, Response } from "express";
import User from "../../database/User";

async function PROFILE(req: Request, res: Response) {
  const { userHex } = req.body.user;
  console.log(userHex);
  const user = await User.getFirst(userHex);

  res.status(user.status).json(user);
}

export default PROFILE;
