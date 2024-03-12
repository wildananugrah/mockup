import Pool from "pg-pool"
import { UserService } from 'user-service';
import { dbConnectionTimeout, dbDatabase, dbIdleTimeout, dbMaxUses, dbPass, dbPoolMax, dbPoolMin, dbPort, dbUser, dbhost } from '../configs/db.config.js';
import { loginController, registerController } from "../controllers/user.controller.js";

var pool = new Pool({
    host: dbhost,
    database: dbDatabase,
    port: dbPort,
    user: dbUser,
    password: dbPass,
    ssl: false,
    min: dbPoolMin,
    max: dbPoolMax,
    idleTimeoutMillis: dbIdleTimeout,
    connectionTimeoutMillis: dbConnectionTimeout,
    maxUses: dbMaxUses,
})
const data = {
    username: "wildananugrah",
    password: "p@ssw0rd!"
}
beforeAll(async () => {
    const userService = new UserService();
    userService.truncate(await pool.connect());
});
afterAll(async () => {
    pool.end();
});
describe("User", () => {
    it("should be registered a user", async () => {
        const register = await registerController(data, await pool.connect())
        expect(register.statusCode).toBe(200);
        expect(register.message).toBe("Registration succeed");
        expect(register.content.user.username).toBe(data.username);
        expect(register.content.user.password).toBe(data.password);
        expect(typeof register.content.token).toBe("string");

    });
    it("should be logged in a user", async () => {
        const register = await loginController(data, await pool.connect())
        expect(register.statusCode).toBe(200);
        expect(register.message).toBe("Login succeed");
        expect(register.content.user.username).toBe(data.username);
        expect(register.content.user.password).toBe(data.password);
        expect(typeof register.content.token).toBe("string");

    });
});