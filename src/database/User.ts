import UserType from "../@types/UserType";
import database from "../libs/database";
import { error, success } from "../libs/responses";

class User {
  async create(data: UserType) {
    try {
      const createdUser = await database.user.create({ data });

      const response = success({
        status: 201,
        message: "User created successfully.",
        data: createdUser,
      });

      return response;
    } catch (e) {
      const response = error({
        data: e,
      });

      return response;
    }
  }
}

export default new User();
