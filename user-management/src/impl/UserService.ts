import { IUser, IUserService } from "interfaces";
import { PoolClient } from "pg";

export class UserService implements IUserService {
  tblName: string = "tbl_mst_user";
  deleteAllRecordsQuery: string = `DELETE FROM ${this.tblName}`;
  selectByUsernameAndPassword: string = `SELECT * FROM ${this.tblName} WHERE username=$1 and password=$2`; // TODO: it supposed to be included user attributes.
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
        throw new Error(`Error in creating todo: ${error.message}`);
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
      this.client.release();
    }
  }
}
