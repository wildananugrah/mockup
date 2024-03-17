import { IJWTService, IUserRoleTrxService, IUserService } from "../interfaces";
import { UserServiceMock } from "./mocks/UserServiceMock";
import {
  AppError,
  INVALID_PASSWORD_CODE,
  INVALID_PASSWORD_MESSAGE,
  INVALID_USERNAME_CODE,
  INVALID_USERNAME_MESSAGE,
  User,
} from "../user";
import { JWTServiceMock } from "./mocks/JWTServiceMock";
import { UserRoleTrxServiceMock } from "./mocks/UserRoleTrxServiceMock";

beforeAll(async () => {});

afterAll(async () => {});

describe("User Logic Layer", () => {
  const userData = {
    username: "wildananugrah",
    password: "p@ssw0rd",
  };
  let token: string | undefined = undefined;
  it("should registering a user", async () => {
    try {
      const userService: IUserService = new UserServiceMock();
      const jwtService: IJWTService = new JWTServiceMock();
      const userRoleTrxService: IUserRoleTrxService =
        new UserRoleTrxServiceMock();
      const userLogic = new User(userService, userRoleTrxService, jwtService);
      const result = await userLogic.register(
        userData.username,
        userData.password
      );
      if (result === undefined) fail();
      expect(typeof result.token).toBe("string");
      expect(typeof result.expired).toBe("number");
    } catch (error) {
      console.error(error);
      fail();
    }
  });
  it("should logging in a user", async () => {
    try {
      const userService: IUserService = new UserServiceMock();
      const jwtService: IJWTService = new JWTServiceMock();
      const userRoleTrxService: IUserRoleTrxService =
        new UserRoleTrxServiceMock();
      const userLogic = new User(userService, userRoleTrxService, jwtService);
      const result = await userLogic.login(
        userData.username,
        userData.password
      );
      if (result === undefined) fail();
      expect(typeof result.token).toBe("string");
      expect(typeof result.expired).toBe("number");
      token = result.token;
    } catch (error) {
      console.error(error);
      fail();
    }
  });
  it("should return decoded token", async () => {
    try {
      const userService: IUserService = new UserServiceMock();
      const jwtService: IJWTService = new JWTServiceMock();
      const userRoleTrxService: IUserRoleTrxService =
        new UserRoleTrxServiceMock();
      const userLogic = new User(userService, userRoleTrxService, jwtService);
      if (token === undefined) throw new Error("token is undefined");
      const result = await userLogic.validateToken(token);
      console.log(result);
    } catch (error) {
      console.error(error);
      fail();
    }
  });
  it("should return decoded token", async () => {
    try {
      const userService: IUserService = new UserServiceMock();
      const jwtService: IJWTService = new JWTServiceMock();
      const userRoleTrxService: IUserRoleTrxService =
        new UserRoleTrxServiceMock();
      const userLogic = new User(userService, userRoleTrxService, jwtService);
      if (token === undefined) throw new Error("token is undefined");
      const result = await userLogic.refreshToken(token, 3600);
      console.log(result);
    } catch (error) {
      console.error(error);
      fail();
    }
  });
  it("should logging in a user failed", async () => {
    try {
      const userService: IUserService = new UserServiceMock();
      const jwtService: IJWTService = new JWTServiceMock();
      const userRoleTrxService: IUserRoleTrxService =
        new UserRoleTrxServiceMock();
      const userLogic = new User(userService, userRoleTrxService, jwtService);
      const result = await userLogic.login("wildan", userData.password);
      if (result === undefined) fail();
      expect(typeof result.token).toBe("string");
      expect(typeof result.expired).toBe("number");
    } catch (error: any) {
      console.error(error);
      expect(error).toBeInstanceOf(AppError);
      if (error instanceof AppError) {
        expect(error.code).toBe(INVALID_USERNAME_CODE);
        expect(error.message).toBe(INVALID_USERNAME_MESSAGE);
      }
    }
  });
  it("should logging in a user invalid password", async () => {
    try {
      const userService: IUserService = new UserServiceMock();
      const jwtService: IJWTService = new JWTServiceMock();
      const userRoleTrxService: IUserRoleTrxService =
        new UserRoleTrxServiceMock();
      const userLogic = new User(userService, userRoleTrxService, jwtService);
      const result = await userLogic.login(userData.username, "password");
      if (result === undefined) fail();
      expect(typeof result.token).toBe("string");
      expect(typeof result.expired).toBe("number");
    } catch (error: any) {
      console.error(error);
      expect(error).toBeInstanceOf(AppError);
      if (error instanceof AppError) {
        expect(error.code).toBe(INVALID_PASSWORD_CODE);
        expect(error.message).toBe(INVALID_PASSWORD_MESSAGE);
      }
    }
  });
});
