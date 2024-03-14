import { Pool } from "pg";
import { dbConnectionTimeout, dbDatabase, dbIdleTimeout, dbMaxUses, dbPass, dbPoolMax, dbPoolMin, dbPort, dbUser, dbhost, } from "./db.config";
import { UserService } from "../index";
const pool = new Pool({
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
});
beforeAll(async () => {
    console.log("Starting truncate table...");
    console.log(`dbUser: ${dbUser} dbPass: ${dbPass}`);
    const userService = new UserService();
    await userService.truncate(await pool.connect());
});
afterAll(() => {
    pool.end();
});
describe("User Service", () => {
    let todoId = "";
    const data = {
        username: "wildananugrah",
        password: "P@ssw0rd!",
    };
    it("should be registered new user", async () => {
        const userService = new UserService();
        const user = await userService.register(data, await pool.connect());
        if (user === undefined)
            fail();
        expect(user.username).toBe(data.username);
        expect(user.password).toBe(data.password);
    });
    it("should be logged in a user", async () => {
        const userService = new UserService();
        const user = await userService.login(data, await pool.connect());
        if (user === undefined)
            fail();
        expect(user.username).toBe(data.username);
        expect(user.password).toBe(data.password);
    });
});
