import { PoolClient } from "pg";
import {
  IRoleAttribute,
  IRoleAttributeService,
} from "user-management/src/interfaces";
export class RoleAttributeService implements IRoleAttributeService {
  tblName: string = "tbl_mst_role_attribute";
  deleteAllRecordsQuery: string = `DELETE FROM ${this.tblName}`;
  insertRoleQuery: string = `INSERT INTO ${this.tblName}(role_id, app_name, attribute_name) VALUES($1, $2, $3) RETURNING *`;
  selectAllRecordsQuery: string = `SELECT role_id, app_name, attribute_name FROM ${this.tblName} WHERE role_id = $1`;
  selectByIdRecordsQuery: string = `SELECT role_id, app_name, attribute_name FROM ${this.tblName} WHERE role_attribute_id = $1`;
  updateRoleQuery: string = `UPDATE ${this.tblName} SET app_name = $1, attribute_name = $2 WHERE role_attribute_id = $3 RETURNING *`;
  deleteByIdRecordsQuery: string = `DELETE FROM ${this.tblName} WHERE role_attribute_id = $1 RETURNING *`;
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
        throw new Error(`Error in truncating role attribute: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async insert(
    roleAttribute: IRoleAttribute
  ): Promise<IRoleAttribute | undefined> {
    try {
      console.log(roleAttribute.attributeName);
      const dbResult = await this.client.query(this.insertRoleQuery, [
        roleAttribute.roleId,
        roleAttribute.appName,
        roleAttribute.attributeName,
      ]);
      console.log(dbResult.rows[0]);
      return {
        id: dbResult.rows[0].role_attribute_id,
        roleId: dbResult.rows[0].role_id,
        appName: dbResult.rows[0].app_name,
        attributeName: dbResult.rows[0].attribute_name,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in inserting role attribute: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async list(roleId: string): Promise<IRoleAttribute[] | undefined> {
    try {
      const dbResult = await this.client.query(this.selectAllRecordsQuery, [
        roleId,
      ]);
      if (dbResult.rows.length <= 0) return undefined;
      return dbResult.rows.map((row) => ({
        id: row.role_attribute_id,
        roleId: row.role_id,
        appName: row.app_name,
        attributeName: row.attribute_name,
      }));
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in retrieving role attribute: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async detail(id: string): Promise<IRoleAttribute | undefined> {
    try {
      const dbResult = await this.client.query(this.selectByIdRecordsQuery, [
        id,
      ]);
      if (dbResult.rows.length === 0) return undefined;
      return {
        id: dbResult.rows[0].role_attribute_id,
        roleId: dbResult.rows[0].role_id,
        appName: dbResult.rows[0].app_name,
        attributeName: dbResult.rows[0].attribute_name,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(
          `Error in retrieving role attribute detail: ${error.message}`
        );
    } finally {
      this.client.release();
    }
  }
  async update(
    roleAttribute: IRoleAttribute,
    id: string
  ): Promise<IRoleAttribute | undefined> {
    try {
      const dbResult = await this.client.query(this.updateRoleQuery, [
        roleAttribute.appName,
        roleAttribute.attributeName,
        id,
      ]);
      if (dbResult.rows.length === 0) return undefined;
      return {
        id: dbResult.rows[0].role_attribute_id,
        roleId: dbResult.rows[0].role_id,
        appName: dbResult.rows[0].app_name,
        attributeName: dbResult.rows[0].attribute_name,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in updating role attribute: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async delete(id: string): Promise<IRoleAttribute | undefined> {
    try {
      const dbResult = await this.client.query(this.deleteByIdRecordsQuery, [
        id,
      ]);
      if (dbResult.rows.length === 0) return undefined;
      return {
        id: dbResult.rows[0].role_attribute_id,
        roleId: dbResult.rows[0].role_id,
        appName: dbResult.rows[0].app_name,
        attributeName: dbResult.rows[0].attribute_name,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in deleting role attribute: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
}
