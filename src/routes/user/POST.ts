import { Request, Response } from "express";
import validations from "../../libs/validations";
import { error } from "../../libs/responses";
import treatments from "../../libs/treatments";
import User from "../../database/User";
import jsonWebToken from "../../libs/jsonWebToken";

async function POST(req: Request, res: Response) {
  const body = req.body;
  const errors = validations.user(body);

  if (errors.length) {
    const errorResponse = error({
      status: 400,
      message: `Bad Request: The server could not understand or process the request due to invalid syntax or missing parameters.`,
      data: errors,
    });

    return res.status(errorResponse.status).json(errorResponse);
  }

  const sanitizedUser = treatments.user(body, body.ADM_CODE);
  const createdUser = await User.create(sanitizedUser);
  const userToken = jsonWebToken.create(createdUser.data);

  res.status(createdUser.status).json({ createdUser, userToken });
}

export default POST;
