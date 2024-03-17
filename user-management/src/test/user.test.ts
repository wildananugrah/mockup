import { IJWTService, IUserService } from "../interfaces";
import { UserServiceMock } from "./mocks/UserServiceMock";
import {
  AppError,
  INVALID_LOGIN_CODE,
  INVALID_LOGIN_MESSAGE,
  User,
} from "../user";
import { JWTServiceMock } from "./mocks/JWTServiceMock";

beforeAll(async () => {});

afterAll(async () => {});

describe("User Logic Layer", () => {
  const userData = {
    username: "wildananugrah",
    password: "p@ssw0rd",
  };
  it("should registering a user", async () => {
    try {
      const userService: IUserService = new UserServiceMock();
      const jwtService: IJWTService = new JWTServiceMock();
      const userLogic = new User(userService, jwtService);
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
      const userLogic = new User(userService, jwtService);
      const result = await userLogic.login(
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
  it("should logging in a user failed", async () => {
    try {
      const userService: IUserService = new UserServiceMock();
      const jwtService: IJWTService = new JWTServiceMock();
      const userLogic = new User(userService, jwtService);
      const result = await userLogic.login("wildan", userData.password);
      if (result === undefined) fail();
      expect(typeof result.token).toBe("string");
      expect(typeof result.expired).toBe("number");
    } catch (error: any) {
      console.error(error);
      expect(error).toBeInstanceOf(AppError);
      if (error instanceof AppError) {
        expect(error.code).toBe(INVALID_LOGIN_CODE);
        expect(error.message).toBe(INVALID_LOGIN_MESSAGE);
      }
    }
  });
});
