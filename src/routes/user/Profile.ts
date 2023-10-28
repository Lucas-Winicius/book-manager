import { Request, Response } from "express";
import User from "../../database/User";

async function Profile(req: Request, res: Response) {
  const id = req.body.user.id;
  const user = await User.get({ id }, true);

  return res.status(user.status).json(user);
}

export default Profile;
