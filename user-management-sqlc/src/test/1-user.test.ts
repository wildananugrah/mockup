import { Pool } from "pg";

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
import {
  CreateUserArgs,
  SelectUserByUsernameRow,
  createUser,
  deleteAllRole,
  deleteAllRoleAttribute,
  deleteAllTrxUserRole,
  deleteAllUser,
  deleteAllUserAttribute,
  selectUserByUsername,
} from "../UserService";

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
  console.log("Starting delete all data...");
  await deleteAllUserAttribute(await pool.connect());
  await deleteAllRoleAttribute(await pool.connect());
  await deleteAllTrxUserRole(await pool.connect());
  await deleteAllRole(await pool.connect());
  await deleteAllUser(await pool.connect());
});

afterAll(async () => {
  await pool.end();
});

describe("User Service", () => {
  let todoId: string | undefined = "";
  const data: CreateUserArgs = {
    username: "wildananugrah",
    password: "P@ssw0rd!",
  };
  it("should be create a user", async () => {
    await createUser(await pool.connect(), data);
  });
  it("should select a user by its username", async () => {
    const dbUser: SelectUserByUsernameRow | null = await selectUserByUsername(
      await pool.connect(),
      { username: data.username }
    );
    if (dbUser === null) throw new Error("User not found");
    expect(dbUser.username).toBe(data.username);
    expect(dbUser.password).toBe(data.password);
    expect(typeof dbUser.userId).toBe("string");
  });
  it("should get all user attributes", async () => {});
});
