import {
  IJWTService,
  IToken,
  IUser,
  IUserLogic,
  IUserService,
} from "interfaces";
export const INVALID_LOGIN_CODE: string = "UM404";
export const INVALID_LOGIN_MESSAGE: string = "Username / password is invalid!";
export const REGISTER_FAILED_CODE: string = "UM400";
export const REGISTER_FAILED_MESSAGE: string =
  "System can not register the user!";
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
  jwtService: IJWTService;
  constructor(userService: IUserService, jwtService: IJWTService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }
  async login(username: string, password: string): Promise<IToken | undefined> {
    const user = await this.userService.login({
      username: username,
      password: password,
    });
    if (user === undefined)
      throw new AppError(INVALID_LOGIN_CODE, INVALID_LOGIN_MESSAGE);
    return await this.jwtService.create(user, 3600);
  }
  async register(
    username: string,
    password: string
  ): Promise<IToken | undefined> {
    const user = await this.userService.register({
      username: username,
      password: password,
    });
    if (user === undefined)
      throw new AppError(REGISTER_FAILED_CODE, REGISTER_FAILED_MESSAGE);
    return await this.jwtService.create(user, 3600);
  }
  async validateToken(token: string): Promise<IUser | undefined> {
    return await this.jwtService.validate(token);
  }
  async refreshToken(
    token: string,
    expired: number
  ): Promise<IToken | undefined> {
    return await this.jwtService.refresh(token, expired);
  }
}
