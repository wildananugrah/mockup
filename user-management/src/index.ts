import { PoolClient } from "pg";

export interface IUser {
  id?: string;
  username: string;
  password: string;
}
export interface IUserService {
  register(user: IUser, client: PoolClient): Promise<IUser | undefined>;
  login(user: IUser, client: PoolClient): Promise<IUser | undefined>;
  truncate(client: PoolClient): Promise<void>;
}

export class UserService implements IUserService {
  tblName: string = "app_mst_user";
  truncateTableQuery: string = `TRUNCATE TABLE ${this.tblName}`;
  selectByUsernameAndPassword: string = `SELECT * FROM ${this.tblName} WHERE username=$1 and password=$2`;
  insertUser: string = `INSERT INTO ${this.tblName} (username, password) VALUES ($1, $2) RETURNING *`;
  async truncate(client: PoolClient): Promise<void> {
    try {
      await client.query(this.truncateTableQuery, []);
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in creating todo: ${error.message}`);
    } finally {
      client.release();
    }
  }
  async register(user: IUser, client: PoolClient): Promise<IUser | undefined> {
    try {
      const dbResult = await client.query(this.insertUser, [
        user.username,
        user.password,
      ]);
      return {
        id: dbResult.rows[0].id,
        username: dbResult.rows[0].username,
        password: dbResult.rows[0].password,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in creating todo: ${error.message}`);
    } finally {
      client.release();
    }
  }
  async login(user: IUser, client: PoolClient): Promise<IUser | undefined> {
    try {
      const dbResult = await client.query(this.selectByUsernameAndPassword, [
        user.username,
        user.password,
      ]);
      return {
        id: dbResult.rows[0].id,
        username: dbResult.rows[0].username,
        password: dbResult.rows[0].password,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in creating todo: ${error.message}`);
    } finally {
      client.release();
    }
  }
}
