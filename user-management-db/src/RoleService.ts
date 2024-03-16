import { IRole, IRoleService } from "user-management/src/interfaces";
import { PoolClient } from "pg";

export class RoleService implements IRoleService {
  tblName: string = "tbl_mst_role";
  deleteAllRecordsQuery: string = `DELETE FROM ${this.tblName}`;
  insertRoleQuery: string = `INSERT INTO ${this.tblName}(role_name) VALUES($1) RETURNING *`;
  selectAllRecordsQuery: string = `SELECT role_id, role_name FROM ${this.tblName}`;
  selectByIdRecordsQuery: string = `SELECT role_id, role_name FROM ${this.tblName} WHERE role_id = $1`;
  updateRoleQuery: string = `UPDATE ${this.tblName} SET role_name = $1 WHERE role_id = $2 RETURNING *`;
  deleteByIdRecordsQuery: string = `DELETE FROM ${this.tblName} WHERE role_id = $1 RETURNING *`;
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
        throw new Error(`Error in truncating role: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async insert(role: IRole): Promise<IRole | undefined> {
    try {
      const dbResult = await this.client.query(this.insertRoleQuery, [
        role.roleName,
      ]);
      return {
        id: dbResult.rows[0].role_id,
        roleName: dbResult.rows[0].role_name,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in inserting role: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async list(): Promise<IRole[] | undefined> {
    try {
      const dbResult = await this.client.query(this.selectAllRecordsQuery, []);
      return dbResult.rows.map((row) => ({
        id: row.role_id,
        roleName: row.role_name,
      }));
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in retrieving role: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async detail(id: string): Promise<IRole | undefined> {
    try {
      const dbResult = await this.client.query(this.selectByIdRecordsQuery, [
        id,
      ]);
      if (dbResult.rows.length === 0) return undefined;
      return {
        id: dbResult.rows[0].role_id,
        roleName: dbResult.rows[0].role_name,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in retrieving role detail: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async update(role: IRole, id: string): Promise<IRole | undefined> {
    try {
      const dbResult = await this.client.query(this.updateRoleQuery, [
        role.roleName,
        id,
      ]);
      if (dbResult.rows.length === 0) return undefined;
      return {
        id: dbResult.rows[0].role_id,
        roleName: dbResult.rows[0].role_name,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in updating role: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async delete(id: string): Promise<IRole | undefined> {
    try {
      const dbResult = await this.client.query(this.deleteByIdRecordsQuery, [
        id,
      ]);
      if (dbResult.rows.length === 0) return undefined;
      return {
        id: dbResult.rows[0].role_id,
        roleName: dbResult.rows[0].role_name,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in deleting role: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
}
