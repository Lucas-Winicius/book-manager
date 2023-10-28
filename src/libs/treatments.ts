import UserType from "../@types/UserType";

class Treatments {
  sanitizeString(text: string): string {
    const sanitized = text.replace(/[^A-Za-z0-9_-]/g, "");
    return sanitized.toLowerCase();
  }

  user(data: UserType, adm_code?: string): UserType {
    return {
      name: data.name,
      nick: this.sanitizeString(data.nick),
      pass: data.pass,
      favorites: [],
      likes: [],
      admin: adm_code === process.env.ADMIN_CODE,
      deleted: false,
    };
  }
}

export default new Treatments();
