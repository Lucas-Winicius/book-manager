import { Request, Response } from "express";

function GET(req: Request, res: Response) {
  res.send("OK");
}

export default GET;
