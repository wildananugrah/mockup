import { PoolClient } from "pg";
import {
  IUserAttribute,
  IUserRoleTrx,
  IUserRoleTrxService,
} from "user-management/src/interfaces";

export class UserRoleTrxService implements IUserRoleTrxService {
  tblName: string = "tbl_trx_user_role";
  deleteAllRecordsQuery: string = `
  delete from tbl_trx_user_role
  `;
  insertIntoQuery: string = `
    insert into tbl_trx_user_role (user_id , role_id)
    values($1, $2) returning *;
  `;
  selectUserAttribute: string = `
    select * from (select 
        tmra.role_attribute_id, 
        tmra.app_name, 
        tmra.attribute_name,
        tmra.created_at,
        tmu.user_id
    from tbl_trx_user_role ttur
    join tbl_mst_role tmr on ttur.role_id = tmr.role_id
    join tbl_mst_role_attribute tmra on tmra.role_id  = tmr.role_id 
    join tbl_mst_user tmu on ttur.user_id = tmu.user_id
    union
    select 
        tmua.user_attribute_id role_attribute_id, 
        tmua.app_name, 
        tmua.attribute_name, 
        tmua.created_at,
        tmu.user_id
    from tbl_mst_user_attribute tmua
    join tbl_mst_user tmu on tmu.user_id = tmua.user_id) as a 
    where a.user_id=$1
    order by a.created_at asc
  `;
  deleteQuery: string = `
  delete from tbl_trx_user_role where role_attribute_id = $1
  `;
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
        throw new Error(`Error in truncating user attribute: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async insert(userRole: IUserRoleTrx): Promise<IUserRoleTrx | undefined> {
    try {
      const dbResult = await this.client.query(this.insertIntoQuery, [
        userRole.userId,
        userRole.roleId,
      ]);
      return {
        id: dbResult.rows[0].user_role_id,
        userId: dbResult.rows[0].user_id,
        roleId: dbResult.rows[0].role_id,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in inserting user attribute: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async list(userId: string): Promise<IUserAttribute[] | undefined> {
    try {
      const dbResult = await this.client.query(this.selectUserAttribute, [
        userId,
      ]);
      if (dbResult.rows.length <= 0) return undefined;
      return dbResult.rows.map((row) => ({
        id: row.role_attribute_id,
        userId: row.user_id,
        appName: row.app_name,
        attributeName: row.attribute_name,
      }));
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in retrieving user attribute: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.client.query(this.deleteQuery, [id]);
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in truncating user attribute: ${error.message}`);
    } finally {
      this.client.release();
    }
  }
}
