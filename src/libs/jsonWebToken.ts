import jwt, { Secret } from "jsonwebtoken";

class JsonWebToken {
  create(data: object | string | Buffer) {
    const secretOrPrivateKey = process.env.JWT_SECRET as Secret;
    return jwt.sign(data, secretOrPrivateKey, { expiresIn: "7d" });
  }
}

export default new JsonWebToken();
