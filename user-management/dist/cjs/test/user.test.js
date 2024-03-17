"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserServiceMock_1 = require("./mocks/UserServiceMock");
const user_1 = require("../user");
const JWTServiceMock_1 = require("./mocks/JWTServiceMock");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () { }));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () { }));
describe("User Logic Layer", () => {
    const userData = {
        username: "wildananugrah",
        password: "p@ssw0rd",
    };
    it("should registering a user", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userService = new UserServiceMock_1.UserServiceMock();
            const jwtService = new JWTServiceMock_1.JWTServiceMock();
            const userLogic = new user_1.User(userService, jwtService);
            const result = yield userLogic.register(userData.username, userData.password);
            if (result === undefined)
                fail();
            expect(typeof result.token).toBe("string");
            expect(typeof result.expired).toBe("number");
        }
        catch (error) {
            console.error(error);
            fail();
        }
    }));
    it("should logging in a user", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userService = new UserServiceMock_1.UserServiceMock();
            const jwtService = new JWTServiceMock_1.JWTServiceMock();
            const userLogic = new user_1.User(userService, jwtService);
            const result = yield userLogic.login(userData.username, userData.password);
            if (result === undefined)
                fail();
            expect(typeof result.token).toBe("string");
            expect(typeof result.expired).toBe("number");
        }
        catch (error) {
            console.error(error);
            fail();
        }
    }));
    it("should logging in a user failed", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userService = new UserServiceMock_1.UserServiceMock();
            const jwtService = new JWTServiceMock_1.JWTServiceMock();
            const userLogic = new user_1.User(userService, jwtService);
            const result = yield userLogic.login("wildan", userData.password);
            if (result === undefined)
                fail();
            expect(typeof result.token).toBe("string");
            expect(typeof result.expired).toBe("number");
        }
        catch (error) {
            console.error(error);
            expect(error).toBeInstanceOf(user_1.AppError);
            if (error instanceof user_1.AppError) {
                expect(error.code).toBe(user_1.INVALID_LOGIN_CODE);
                expect(error.message).toBe(user_1.INVALID_LOGIN_MESSAGE);
            }
        }
    }));
});
