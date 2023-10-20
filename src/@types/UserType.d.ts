type UserType = {
  id?: string;
  name: string;
  nick: string;
  pass: string;
  favorites: string[];
  admin: boolean;
  deleted: boolean;
  userHex: string;
  createdAt?: string;
  updatedAt?: string;
};

export default UserType;
