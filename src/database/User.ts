import UserType from "../@types/UserType";
import prisma from "../libs/prisma";
import { success } from "../libs/responses";

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
      data
    });
  }
}

export default new User();
