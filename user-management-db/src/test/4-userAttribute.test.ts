import { Pool } from "pg";
import {
  IUserAttribute,
  IUserAttributeService,
  IUserService,
} from "user-management/src/interfaces";
import { UserAttributeService } from "../UserAttributeService";
import { UserService } from "../UserService";
import {
  dbConnectionTimeout,
  dbDatabase,
  dbIdleTimeout,
  dbMaxUses,
  dbPass,
  dbPoolMax,
  dbPoolMin,
  dbPort,
  dbUser,
  dbhost,
} from "./db.config";

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
  console.log("Starting truncate UserAttribute table...");
  const UserAttribute: IUserAttributeService = new UserAttributeService(
    await pool.connect()
  );
  await UserAttribute.truncate();
  console.log("Starting truncate Role table...");
  const role: IUserService = new UserService(await pool.connect());
  await role.truncate();
});

afterAll(async () => {
  await pool.end();
});

describe("Role Service", () => {
  let UserAttributeId: string | undefined = undefined;
  const userData = {
    username: "wildananugrah",
    password: "p@ssw0rd",
  };
  let data: IUserAttribute = {
    userId: "",
    appName: "testApp",
    attributeName: ["READ", "WRITE"],
  };
  let updatedData: IUserAttribute = {
    userId: "",
    appName: "testAppUpdate",
    attributeName: ["READ"],
  };
  it("it should create a role", async () => {
    const userService: IUserService = new UserService(await pool.connect());
    const dbUser = await userService.register(userData);
    if (dbUser === undefined) fail();
  });
  it("it should create a role attribute", async () => {});
  it("it should select all role attribute", async () => {});
  it("it should update a role", async () => {});
  it("it should select a role by id", async () => {});
  it("it should delete a role by id", async () => {});
});
