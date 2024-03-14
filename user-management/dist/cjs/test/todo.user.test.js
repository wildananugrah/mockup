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
const pg_1 = require("pg");
const db_config_1 = require("./db.config");
const index_1 = require("../index");
const pool = new pg_1.Pool({
    host: db_config_1.dbhost,
    database: db_config_1.dbDatabase,
    port: db_config_1.dbPort,
    user: db_config_1.dbUser,
    password: db_config_1.dbPass,
    ssl: false,
    min: db_config_1.dbPoolMin,
    max: db_config_1.dbPoolMax,
    idleTimeoutMillis: db_config_1.dbIdleTimeout,
    connectionTimeoutMillis: db_config_1.dbConnectionTimeout,
    maxUses: db_config_1.dbMaxUses,
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Starting truncate table...");
    console.log(`dbUser: ${db_config_1.dbUser} dbPass: ${db_config_1.dbPass}`);
    const userService = new index_1.UserService();
    yield userService.truncate(yield pool.connect());
}));
afterAll(() => {
    pool.end();
});
describe("User Service", () => {
    let todoId = "";
    const data = {
        username: "wildananugrah",
        password: "P@ssw0rd!",
    };
    it("should be registered new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = new index_1.UserService();
        const user = yield userService.register(data, yield pool.connect());
        if (user === undefined)
            fail();
        expect(user.username).toBe(data.username);
        expect(user.password).toBe(data.password);
    }));
    it("should be logged in a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = new index_1.UserService();
        const user = yield userService.login(data, yield pool.connect());
        if (user === undefined)
            fail();
        expect(user.username).toBe(data.username);
        expect(user.password).toBe(data.password);
    }));
});
