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
const UserServiceMock_1 = require("./UserServiceMock");
const user_1 = require("../user");
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
            const user = new user_1.User(userService);
            const _user = yield user.register(userData.username, userData.password);
            if (_user === undefined)
                fail();
            expect(_user.username).toBe(userData.username);
            expect(_user.password).toBe(userData.password);
        }
        catch (error) {
            console.error(error);
            fail();
        }
    }));
    it("should logging in a user", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userService = new UserServiceMock_1.UserServiceMock();
            const user = new user_1.User(userService);
            const _user = yield user.login(userData.username, userData.password);
            if (_user === undefined)
                fail();
            expect(_user.username).toBe(userData.username);
            expect(_user.password).toBe(userData.password);
        }
        catch (error) {
            console.error(error);
            fail();
        }
    }));
    it("should logging in a user failed", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userService = new UserServiceMock_1.UserServiceMock();
            const user = new user_1.User(userService);
            const _user = yield user.login("wildan", userData.password + "F");
            if (_user === undefined)
                fail();
            expect(_user.username).toBe(userData.username);
            expect(_user.password).toBe(userData.password);
        }
        catch (error) {
            expect(error instanceof user_1.AppError).toBeTruthy();
            if (error instanceof user_1.AppError) {
                expect(error.code).toBe("E01");
                expect(error.message).toBe("Can not login user!");
            }
        }
    }));
});
