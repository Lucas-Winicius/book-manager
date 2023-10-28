import { NextFunction, Request, Response } from "express";
import jsonWebToken from "../libs/tokenGenerator";
import { error } from "../libs/responses";

function Authentication(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1] || "";
  const user = jsonWebToken.verify(token);

  if (!user) {
    const response = error({
      status: 401,
      message: `Access to this resource is unauthorized. Please ensure you have the necessary permissions and credentials to access this content. If you believe this is in error, please contact our support team for assistance.`,
    });

    return res.status(response.status).json(response);
  }

  req.body.user = user;

  next();
}

export default Authentication;
