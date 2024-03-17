export class UserAttributeService {
    tblName = "tbl_mst_user_attribute";
    deleteAllRecordsQuery = `
  DELETE FROM ${this.tblName}`;
    insertQuery = `
  INSERT INTO ${this.tblName}(user_id, app_name, attribute_name) 
  VALUES($1, $2, $3) RETURNING *`;
    selectAllRecordsQuery = `
  SELECT 
  user_attribute_id, user_id, app_name, attribute_name 
  FROM ${this.tblName} WHERE user_id = $1`;
    selectByIdRecordsQuery = `
  SELECT 
  user_attribute_id, user_id, app_name, attribute_name 
  FROM ${this.tblName} WHERE user_attribute_id = $1`;
    updateQuery = `
  UPDATE ${this.tblName} 
  SET app_name = $1, attribute_name = $2 
  WHERE user_attribute_id = $3 RETURNING *`;
    deleteByIdRecordsQuery = `
  DELETE FROM ${this.tblName} 
  WHERE user_attribute_id = $1 RETURNING *`;
    client;
    constructor(client) {
        this.client = client;
    }
    async truncate() {
        try {
            await this.client.query(this.deleteAllRecordsQuery, []);
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in truncating user attribute: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
    async insert(roleAttribute) {
        try {
            const dbResult = await this.client.query(this.insertQuery, [
                roleAttribute.userId,
                roleAttribute.appName,
                roleAttribute.attributeName,
            ]);
            return {
                id: dbResult.rows[0].user_attribute_id,
                userId: dbResult.rows[0].user_id,
                appName: dbResult.rows[0].app_name,
                attributeName: dbResult.rows[0].attribute_name,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in inserting user attribute: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
    async list(userId) {
        try {
            const dbResult = await this.client.query(this.selectAllRecordsQuery, [
                userId,
            ]);
            if (dbResult.rows.length <= 0)
                return undefined;
            return dbResult.rows.map((row) => ({
                id: row.user_attribute_id,
                userId: row.user_id,
                appName: row.app_name,
                attributeName: row.attribute_name,
            }));
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in retrieving user attribute: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
    async detail(id) {
        try {
            const dbResult = await this.client.query(this.selectByIdRecordsQuery, [
                id,
            ]);
            if (dbResult.rows.length === 0)
                return undefined;
            return {
                id: dbResult.rows[0].user_attribute_id,
                userId: dbResult.rows[0].user_id,
                appName: dbResult.rows[0].app_name,
                attributeName: dbResult.rows[0].attribute_name,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in retrieving user attribute detail: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
    async update(roleAttribute, id) {
        try {
            const dbResult = await this.client.query(this.updateQuery, [
                roleAttribute.appName,
                roleAttribute.attributeName,
                id,
            ]);
            if (dbResult.rows.length === 0)
                return undefined;
            return {
                id: dbResult.rows[0].user_attribute_id,
                userId: dbResult.rows[0].user_id,
                appName: dbResult.rows[0].app_name,
                attributeName: dbResult.rows[0].attribute_name,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in updating user attribute: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
    async delete(id) {
        try {
            const dbResult = await this.client.query(this.deleteByIdRecordsQuery, [
                id,
            ]);
            if (dbResult.rows.length === 0)
                return undefined;
            return {
                id: dbResult.rows[0].user_attribute_id,
                userId: dbResult.rows[0].user_id,
                appName: dbResult.rows[0].app_name,
                attributeName: dbResult.rows[0].attribute_name,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in deleting user attribute: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
}
