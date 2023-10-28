import { Request, Response } from "express";
import validations from "../../libs/validations";
import { error } from "../../libs/responses";
import treatments from "../../libs/treatments";
import User from "../../database/User";
import tokenGenerator from "../../libs/tokenGenerator";

async function POST(req: Request, res: Response) {
  const body = req.body;
  const errors = validations.user(body);

  if (errors.length) {
    const errorRes = error({
      data: errors,
    });

    return res.status(errorRes.status).json(errorRes);
  }

  const sanitizedBody = treatments.user(body, body.admin);
  const user = await User.create(sanitizedBody);

  if ("data" in user) {
    console.log(user);
    const userToken = tokenGenerator.create(user.data);
    return res
      .cookie("UserAuthentication", userToken, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      })
      .status(user.status)
      .json({ user, userToken });
  }

  res.status(user.status).json(user);
}

export default POST;
