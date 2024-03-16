import { UserServiceMock } from "./UserServiceMock";
import { AppError, User } from "../user";
beforeAll(async () => { });
afterAll(async () => { });
describe("User Logic Layer", () => {
    const userData = {
        username: "wildananugrah",
        password: "p@ssw0rd",
    };
    it("should registering a user", async () => {
        try {
            const userService = new UserServiceMock();
            const user = new User(userService);
            const _user = await user.register(userData.username, userData.password);
            if (_user === undefined)
                fail();
            expect(_user.username).toBe(userData.username);
            expect(_user.password).toBe(userData.password);
        }
        catch (error) {
            console.error(error);
            fail();
        }
    });
    it("should logging in a user", async () => {
        try {
            const userService = new UserServiceMock();
            const user = new User(userService);
            const _user = await user.login(userData.username, userData.password);
            if (_user === undefined)
                fail();
            expect(_user.username).toBe(userData.username);
            expect(_user.password).toBe(userData.password);
        }
        catch (error) {
            console.error(error);
            fail();
        }
    });
    it("should logging in a user failed", async () => {
        try {
            const userService = new UserServiceMock();
            const user = new User(userService);
            const _user = await user.login("wildan", userData.password + "F");
            if (_user === undefined)
                fail();
            expect(_user.username).toBe(userData.username);
            expect(_user.password).toBe(userData.password);
        }
        catch (error) {
            expect(error instanceof AppError).toBeTruthy();
            if (error instanceof AppError) {
                expect(error.code).toBe("E01");
                expect(error.message).toBe("Can not login user!");
            }
        }
    });
});
