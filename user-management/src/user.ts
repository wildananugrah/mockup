import { IUser, IUserLogic, IUserService } from "interfaces";
export class AppError extends Error {
  message: string;
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.message = message;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
export class User implements IUserLogic {
  userService: IUserService;
  constructor(userService: IUserService) {
    this.userService = userService;
  }
  async login(username: string, password: string): Promise<IUser | undefined> {
    const user = await this.userService.login({
      username: username,
      password: password,
    });
    if (user === undefined) throw new AppError("E01", "Can not login user!");
    return user;
  }
  async register(
    username: string,
    password: string
  ): Promise<IUser | undefined> {
    const user = await this.userService.register({
      username: username,
      password: password,
    });
    if (user === undefined) throw new Error("Can not login user!");
    return user;
  }
}
