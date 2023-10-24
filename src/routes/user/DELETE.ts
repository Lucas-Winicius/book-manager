import { Request, Response } from "express";
import User from "../../database/User";

async function DELETE(req: Request, res: Response) {
  const { userHex } = req.body.user;
  const user = await User.delete(userHex);

  res.status(user.status).json(user);
}

export default DELETE;
