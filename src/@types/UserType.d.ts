type UserType = {
  id?: string;
  name: string;
  nick: string;
  pass: string;
  favorites: string[];
  likes: string[];
  admin: boolean;
  deleted: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export default UserType;
