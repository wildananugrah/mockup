import { Pool } from "pg";
import { dbConnectionTimeout, dbDatabase, dbIdleTimeout, dbMaxUses, dbPass, dbPoolMax, dbPoolMin, dbPort, dbUser, dbhost, } from "./db.config";
import { RoleService } from "../impl/RoleService";
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
    const roleService = new RoleService(await pool.connect());
    await roleService.truncate();
});
afterAll(() => {
    pool.end();
});
describe("Role Service", () => {
    let roleId = undefined;
    const data = {
        roleName: "ADMIN",
    };
    const updatedData = {
        roleName: "SUPERADMIN",
    };
    it("it should create a role", async () => {
        const roleService = new RoleService(await pool.connect());
        const dbRole = await roleService.insert(data);
        if (dbRole === undefined)
            fail();
        expect(dbRole.roleName).toBe(data.roleName);
    });
    it("it should select all role", async () => {
        const roleService = new RoleService(await pool.connect());
        const dbRole = await roleService.list();
        if (dbRole === undefined)
            fail();
        expect(dbRole.length > 0).toBe(true);
        dbRole.map((role) => {
            expect(role.roleName).toBe(data.roleName);
            roleId = role.id;
        });
    });
    it("it should update a role", async () => {
        if (roleId === undefined)
            fail();
        const roleService = new RoleService(await pool.connect());
        const dbRole = await roleService.update(updatedData, roleId);
        if (dbRole === undefined)
            fail();
        expect(dbRole.roleName).toBe(updatedData.roleName);
    });
    it("it should select a role by id", async () => {
        if (roleId === undefined)
            fail();
        const roleService = new RoleService(await pool.connect());
        const dbRole = await roleService.detail(roleId);
        if (dbRole === undefined)
            fail();
        expect(dbRole.roleName).toBe(updatedData.roleName);
    });
    it("it should delete a role by id", async () => {
        if (roleId === undefined)
            fail();
        const roleService = new RoleService(await pool.connect());
        await roleService.delete(roleId);
        const roleService2 = new RoleService(await pool.connect());
        const dbRole = await roleService2.detail(roleId);
    });
});
