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
const UserRoleTrxService_1 = require("../UserRoleTrxService");
const db_config_1 = require("./db.config");
const UserService_1 = require("../UserService");
const RoleService_1 = require("../RoleService");
const RoleAttributeService_1 = require("../RoleAttributeService");
const UserAttributeService_1 = require("../UserAttributeService");
const config = {
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
};
const pool = new pg_1.Pool(config);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () { }));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.end();
}));
describe("Set and Get User Attribuets", () => {
    let userId = "";
    let roleId = "";
    const userData = {
        username: "wildananugrah",
        password: "p@ssw0rd",
    };
    const roleData = {
        roleName: "ADMIN",
    };
    let roleAttributeData = {
        roleId: "",
        appName: "testApp",
        attributeName: ["READ", "WRITE"],
    };
    let roleAttributeData1 = {
        roleId: "",
        appName: "testApp1",
        attributeName: ["READ", "WRITE"],
    };
    let roleAttributeData2 = {
        roleId: "",
        appName: "testApp2",
        attributeName: ["READ", "WRITE"],
    };
    let userAttributeData = {
        userId: "",
        appName: "testApp3",
        attributeName: ["READ"],
    };
    it("it should create a role", () => __awaiter(void 0, void 0, void 0, function* () {
        const roleService = new RoleService_1.RoleService(yield pool.connect());
        const dbRole = yield roleService.insert(roleData);
        if (dbRole === undefined)
            fail();
        expect(dbRole.roleName).toBe(roleData.roleName);
        roleId = dbRole.id;
    }));
    it("it should create a role attribute", () => __awaiter(void 0, void 0, void 0, function* () {
        const roleAttributeService = new RoleAttributeService_1.RoleAttributeService(yield pool.connect());
        if (roleId === undefined)
            throw new Error("RoleId is undefined");
        roleAttributeData.roleId = roleId;
        const dbRoleAttribute = yield roleAttributeService.insert(roleAttributeData);
        if (dbRoleAttribute === undefined)
            fail();
        expect(dbRoleAttribute.roleId).toBe(roleAttributeData.roleId);
        expect(dbRoleAttribute.appName).toBe(roleAttributeData.appName);
        roleAttributeData.attributeName.map((attribute, index) => {
            expect(dbRoleAttribute.attributeName[index]).toBe(attribute);
        });
    }));
    it("it should create a role attribute 1", () => __awaiter(void 0, void 0, void 0, function* () {
        const roleAttributeService = new RoleAttributeService_1.RoleAttributeService(yield pool.connect());
        if (roleId === undefined)
            throw new Error("RoleId is undefined");
        roleAttributeData1.roleId = roleId;
        const dbRoleAttribute = yield roleAttributeService.insert(roleAttributeData1);
        if (dbRoleAttribute === undefined)
            fail();
        expect(dbRoleAttribute.roleId).toBe(roleAttributeData1.roleId);
        expect(dbRoleAttribute.appName).toBe(roleAttributeData1.appName);
        roleAttributeData1.attributeName.map((attribute, index) => {
            expect(dbRoleAttribute.attributeName[index]).toBe(attribute);
        });
    }));
    it("it should create a role attribute 2", () => __awaiter(void 0, void 0, void 0, function* () {
        const roleAttributeService = new RoleAttributeService_1.RoleAttributeService(yield pool.connect());
        if (roleId === undefined)
            throw new Error("RoleId is undefined");
        roleAttributeData2.roleId = roleId;
        const dbRoleAttribute = yield roleAttributeService.insert(roleAttributeData2);
        if (dbRoleAttribute === undefined)
            fail();
        expect(dbRoleAttribute.roleId).toBe(roleAttributeData2.roleId);
        expect(dbRoleAttribute.appName).toBe(roleAttributeData2.appName);
        roleAttributeData2.attributeName.map((attribute, index) => {
            expect(dbRoleAttribute.attributeName[index]).toBe(attribute);
        });
    }));
    it("should be logged in a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = new UserService_1.UserService(yield pool.connect());
        const user = yield userService.login(userData);
        if (user === undefined)
            fail();
        expect(typeof user.id).toBe("string");
        expect(user.username).toBe(userData.username);
        expect(user.password).toBe(userData.password);
        userId = user.id;
    }));
    it("it should create a user attribute", () => __awaiter(void 0, void 0, void 0, function* () {
        const userAttributeService = new UserAttributeService_1.UserAttributeService(yield pool.connect());
        if (userId === undefined)
            throw new Error("userid is undefined");
        userAttributeData.userId = userId;
        const dbUserAttribute = yield userAttributeService.insert(userAttributeData);
        if (dbUserAttribute === undefined)
            throw new Error(`Can not insert user attribute`);
        expect(dbUserAttribute.userId).toBe(userAttributeData.userId);
        expect(dbUserAttribute.appName).toBe(userAttributeData.appName);
        dbUserAttribute.attributeName.map((attributeName, index) => {
            expect(attributeName).toBe(userAttributeData.attributeName[index]);
        });
    }));
    it("should get user attributes", () => __awaiter(void 0, void 0, void 0, function* () {
        if (userId === undefined)
            throw new Error("userId must be defined");
        const userRoleService = new UserRoleTrxService_1.UserRoleTrxService(yield pool.connect());
        const userAttributes = yield userRoleService.list(userId);
        console.log(userAttributes);
    }));
});
