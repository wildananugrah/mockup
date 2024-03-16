import { Pool } from "pg";
import { UserService } from "../impl/UserService";
import { dbConnectionTimeout, dbDatabase, dbIdleTimeout, dbMaxUses, dbPass, dbPoolMax, dbPoolMin, dbPort, dbUser, dbhost, } from "./db.config";
const config = {
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
};
const pool = new Pool(config);
beforeAll(async () => {
    console.log(`Connecting to ${dbhost}:${dbPort} databases...`);
    console.log(config);
    console.log("Starting truncate table...");
    const userService = new UserService(await pool.connect());
    await userService.truncate();
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
        const userService = new UserService(await pool.connect());
        const user = await userService.register(data);
        if (user === undefined)
            fail();
        expect(user.username).toBe(data.username);
        expect(user.password).toBe(data.password);
    });
    it("should be logged in a user", async () => {
        const userService = new UserService(await pool.connect());
        const user = await userService.login(data);
        if (user === undefined)
            fail();
        expect(user.username).toBe(data.username);
        expect(user.password).toBe(data.password);
    });
});
