import { IUser, IUserService } from "interfaces";

export class UserServiceMock implements IUserService {
  async register(user: IUser): Promise<IUser | undefined> {
    return {
      id: "1234567890123456",
      username: "wildananugrah",
      password: "p@ssw0rd",
    };
  }
  async login(user: IUser): Promise<IUser | undefined> {
    if (user.username === "wildan") return undefined;
    console.log(user);
    return {
      id: "1234567890123456",
      username: "wildananugrah",
      password: "p@ssw0rd",
    };
  }
  truncate(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
