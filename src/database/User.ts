import SearchParams from "../@types/SearchTypes";
import UserType from "../@types/UserType";
import cacheDatabase from "../libs/cacheDatabase";
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

      cacheDatabase.setEx(
        `user:${createdUser.id}`,
        7200,
        JSON.stringify(createdUser),
      );

      return response;
    } catch (e) {
      const response = error({
        data: e,
      });

      return response;
    }
  }

  async get(params: SearchParams, sensiveInfo?: boolean) {
    const cacheUser = await cacheDatabase.get(`user:${params.id}`);

    if (cacheUser) {
      const { pass, ...user } = JSON.parse(cacheUser);

      const response = success({
        status: 200,
        message: "User discovered! 🎉",
        data: sensiveInfo ? { user, pass } : user,
      });

      return response;
    }

    const user = await database.user.findFirst({ where: params });

    if (user) {
      cacheDatabase.setEx(`user:${user.id}`, 3600, JSON.stringify(user));

      const { pass, ...defragmented } = user;

      const response = success({
        status: 200,
        message: "User discovered! 🎉",
        data: sensiveInfo ? { defragmented, pass } : defragmented,
      });

      return response;
    }

    const response = error({
      status: 404,
      message: "User seems to be hiding in the digital wilderness. 🕵️‍♂️",
    });

    return response;
  }
}

export default new User();
