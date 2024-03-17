import {
  IJWTService,
  IToken,
  IUser,
  IUserLogic,
  IUserRoleTrxService,
  IUserService,
} from "interfaces";
export const INVALID_USERNAME_CODE: string = "UM404";
export const INVALID_USERNAME_MESSAGE: string = "Username is invalid!";
export const INVALID_PASSWORD_CODE: string = "UM400";
export const INVALID_PASSWORD_MESSAGE: string = "Password is invalid!";
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
  userRoleTrxService: IUserRoleTrxService;
  constructor(
    userService: IUserService,
    userRoleTrxService: IUserRoleTrxService,
    jwtService: IJWTService
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
    this.userRoleTrxService = userRoleTrxService;
  }
  async login(username: string, password: string): Promise<IToken | undefined> {
    const user = await this.userService.login({
      username: username,
      password: password,
    });
    if (user === undefined || user.id === undefined)
      throw new AppError(INVALID_USERNAME_CODE, INVALID_USERNAME_MESSAGE);
    if (user.password !== password)
      throw new AppError(INVALID_PASSWORD_CODE, INVALID_PASSWORD_MESSAGE);
    const userRole = await this.userRoleTrxService.list(user.id);
    return await this.jwtService.create({ user, userRole }, 3600);
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
