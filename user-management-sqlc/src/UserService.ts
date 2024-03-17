import { PoolClient } from "pg";

// interface Client {
//   query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
// }

export const deleteAllRoleAttributeQuery = `-- name: DeleteAllRoleAttribute :exec
delete from tbl_mst_role_attribute`;

export async function deleteAllRoleAttribute(
  client: PoolClient
): Promise<void> {
  await client.query({
    text: deleteAllRoleAttributeQuery,
    values: [],
    rowMode: "array",
  });
  client.release();
}

export const deleteAllUserAttributeQuery = `-- name: DeleteAllUserAttribute :exec
delete from tbl_mst_user_attribute`;

export async function deleteAllUserAttribute(
  client: PoolClient
): Promise<void> {
  await client.query({
    text: deleteAllUserAttributeQuery,
    values: [],
    rowMode: "array",
  });
  client.release();
}

export const deleteAllTrxUserRoleQuery = `-- name: DeleteAllTrxUserRole :exec
delete from tbl_trx_user_role`;

export async function deleteAllTrxUserRole(client: PoolClient): Promise<void> {
  await client.query({
    text: deleteAllTrxUserRoleQuery,
    values: [],
    rowMode: "array",
  });
  client.release();
}

export const deleteAllRoleQuery = `-- name: DeleteAllRole :exec
delete from tbl_mst_role`;

export async function deleteAllRole(client: PoolClient): Promise<void> {
  await client.query({
    text: deleteAllRoleQuery,
    values: [],
    rowMode: "array",
  });
  client.release();
}

export const deleteAllUserQuery = `-- name: DeleteAllUser :exec
delete from tbl_mst_user`;

export async function deleteAllUser(client: PoolClient): Promise<void> {
  await client.query({
    text: deleteAllUserQuery,
    values: [],
    rowMode: "array",
  });
  client.release();
}

export const createUserQuery = `-- name: CreateUser :one
INSERT INTO tbl_mst_user(username, password)
VALUES($1, $2) RETURNING user_id, username, password, created_at, updated_at`;

export interface CreateUserArgs {
  username: string;
  password: string;
}

export interface CreateUserRow {
  userId: string;
  username: string;
  password: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export async function createUser(
  client: PoolClient,
  args: CreateUserArgs
): Promise<CreateUserRow | null> {
  const result = await client.query({
    text: createUserQuery,
    values: [args.username, args.password],
    rowMode: "array",
  });
  client.release();
  if (result.rows.length !== 1) {
    return null;
  }
  const row = result.rows[0];
  return {
    userId: row[0],
    username: row[1],
    password: row[2],
    createdAt: row[3],
    updatedAt: row[4],
  };
}

export const selectUserByUsernameQuery = `-- name: SelectUserByUsername :one
SELECT user_id, username, password FROM tbl_mst_user
WHERE username = $1`;

export interface SelectUserByUsernameArgs {
  username: string;
}

export interface SelectUserByUsernameRow {
  userId: string;
  username: string;
  password: string;
}

export async function selectUserByUsername(
  client: PoolClient,
  args: SelectUserByUsernameArgs
): Promise<SelectUserByUsernameRow | null> {
  const result = await client.query({
    text: selectUserByUsernameQuery,
    values: [args.username],
    rowMode: "array",
  });
  client.release();
  if (result.rows.length !== 1) {
    return null;
  }
  const row = result.rows[0];
  return {
    userId: row[0],
    username: row[1],
    password: row[2],
  };
}

export const updateUsernameQuery = `-- name: UpdateUsername :one
UPDATE tbl_mst_user SET username = $1
WHERE user_id= $2
RETURNING user_id, username, password, created_at, updated_at`;

export interface UpdateUsernameArgs {
  username: string;
  userId: string;
}

export interface UpdateUsernameRow {
  userId: string;
  username: string;
  password: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export async function updateUsername(
  client: PoolClient,
  args: UpdateUsernameArgs
): Promise<UpdateUsernameRow | null> {
  const result = await client.query({
    text: updateUsernameQuery,
    values: [args.username, args.userId],
    rowMode: "array",
  });
  client.release();
  if (result.rows.length !== 1) {
    return null;
  }
  const row = result.rows[0];
  return {
    userId: row[0],
    username: row[1],
    password: row[2],
    createdAt: row[3],
    updatedAt: row[4],
  };
}

export const deleteUserByIdQuery = `-- name: DeleteUserById :exec
DELETE FROM tbl_mst_user WHERE user_id=$1`;

export interface DeleteUserByIdArgs {
  userId: string;
}

export async function deleteUserById(
  client: PoolClient,
  args: DeleteUserByIdArgs
): Promise<void> {
  await client.query({
    text: deleteUserByIdQuery,
    values: [args.userId],
    rowMode: "array",
  });
  client.release();
}
