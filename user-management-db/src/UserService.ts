import { IUser, IUserService } from "user-management/src/interfaces";
import { PoolClient } from "pg";

// TODO: there shuold be a selectByUsername query then validate the password in app;
// not in query! because the username should be unqiue it helps the system to search the username easily.

// TODO: it supposed to be included user attributes.

export class UserService implements IUserService {
  tblName: string = "tbl_mst_user";
  deleteAllRecordsQuery: string = `DELETE FROM ${this.tblName}`;
  selectByUsernameAndPassword: string = `SELECT * FROM ${this.tblName} WHERE username=$1 and password=$2`;
  insertUser: string = `INSERT INTO ${this.tblName} (username, password) VALUES ($1, $2) RETURNING *`;
  client: PoolClient;
  constructor(client: PoolClient) {
    this.client = client;
  }
  async truncate(): Promise<void> {
    try {
      await this.client.query(this.deleteAllRecordsQuery, []);
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in creating todo: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async register(user: IUser): Promise<IUser | undefined> {
    try {
      const dbResult = await this.client.query(this.insertUser, [
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
        throw new Error(`Error in creating user: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async login(user: IUser): Promise<IUser | undefined> {
    try {
      const dbResult = await this.client.query(
        this.selectByUsernameAndPassword,
        [user.username, user.password]
      );
      if (dbResult.rows.length === 0) return undefined;
      return {
        id: dbResult.rows[0].id,
        username: dbResult.rows[0].username,
        password: dbResult.rows[0].password,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in retrieving user: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
}
