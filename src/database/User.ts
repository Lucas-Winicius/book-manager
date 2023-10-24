import UserType from "../@types/UserType";
import prisma from "../libs/prisma";
import redis from "../libs/redis";
import { error, success } from "../libs/responses";

class User {
  private queue: UserType[];

  constructor() {
    this.clearQueue();
    this.queue = [];
  }

  clearQueue() {
    const autoFunction = async () => {
      try {
        if (this.queue.length) {
          await prisma.user.createMany({
            data: this.queue,
          });
          this.queue = [];
        }
      } catch (e) {
        console.log();
      }
    };
    setInterval(autoFunction, 5000);
  }

  async create(data: UserType) {
    this.queue.push(data);

    return success({
      status: 202,
      message: "User added to the creation queue.",
      data,
    });
  }

  async getFirst(param: string) {
    const userCache = await redis.get(`user:${param}`);

    if (userCache) {
      const userJson = JSON.parse(userCache);

      const response = success({
        status: 200,
        message: "User found successfully.",
        data: userJson,
      });

      return response;
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: { contains: param } },
          { name: { contains: param, mode: "insensitive" } },
          { nick: { contains: param, mode: "insensitive" } },
          { favorites: { has: param } },
          { userHex: { contains: param } },
        ],
      },
    });

    if (user) {
      redis.setEx(`user:${user.id}`, 3600, JSON.stringify(user));

      const response = success({
        status: 200,
        message: "User found successfully.",
        data: user,
      });

      return response;
    }

    const response = error({
      status: 404,
      message: `User not found. Please check the search criteria and try again.`,
    });

    return response;
  }

  async getMany(param: string) {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { id: { contains: param } },
          { name: { contains: param, mode: "insensitive" } },
          { nick: { contains: param, mode: "insensitive" } },
          { favorites: { has: param } },
          { userHex: { contains: param } },
        ],
      },
    });

    if (users.length) {
      users.forEach((user) =>
        redis.setEx(`user:${user.id}`, 3600, JSON.stringify(user)),
      );

      const response = success({
        status: 200,
        message: "Users found successfully.",
        data: users,
      });

      return response;
    }

    const response = error({
      status: 404,
      message: `User not found. Please check the search criteria and try again.`,
    });

    return response;
  }

  async delete(userHex: string) {
    const deletedUser = await prisma.user.update({
      where: { userHex },
      data: { deleted: true },
    });

    const response = success({
      status: 200,
      message: "user successfully deleted",
      data: deletedUser,
    });

    return response;
  }
}

export default new User();
