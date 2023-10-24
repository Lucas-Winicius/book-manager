import { Request, Response } from "express";
import User from "../../database/User";

async function GET(req: Request, res: Response) {
  const term = req.query.t as string;
  const mode = req.query.mode as string;

  if (mode === "single") {
    const user = await User.getFirst(term);

    return res.status(user.status).json(user);
  }

  const users = await User.getMany(term);

  return res.status(users.status).json(users);
}

export default GET;
