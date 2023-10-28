import jwt, { Secret } from "jsonwebtoken";
import UserType from "../@types/UserType";

class tokenGenerator {
  create(data: object | string | Buffer) {
    const secretOrPrivateKey = process.env.JWT_SECRET as Secret;
    return jwt.sign(data, secretOrPrivateKey, { expiresIn: "7d" });
  }

  verify(token: string){
    try {
      const secretOrPrivateKey = process.env.JWT_SECRET as Secret;
      const decoded = jwt.verify(token, secretOrPrivateKey) as UserType;
      return decoded;
    } catch (err) {
      return null;
    }
  }
}

export default new tokenGenerator();
