export type User = {
  userName: string;
  email: string;
  role: UserRole;
};

export type UserAuth = {
  email: string;
  password: string;
};

export type UserRegister = {
  username: string;
  email: string;
  password: string;
};

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
