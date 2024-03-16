export class RoleService {
    tblName = "tbl_mst_role";
    deleteAllRecordsQuery = `DELETE FROM ${this.tblName}`;
    insertRoleQuery = `INSERT INTO ${this.tblName}(role_name) VALUES($1) RETURNING *`;
    selectAllRecordsQuery = `SELECT role_id, role_name FROM ${this.tblName}`;
    selectByIdRecordsQuery = `SELECT role_id, role_name FROM ${this.tblName} WHERE role_id = $1`;
    updateRoleQuery = `UPDATE ${this.tblName} SET role_name = $1 WHERE role_id = $2 RETURNING *`;
    deleteByIdRecordsQuery = `DELETE FROM ${this.tblName} WHERE role_id = $1 RETURNING *`;
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
                throw new Error(`Error in truncating role: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
    async insert(role) {
        try {
            const dbResult = await this.client.query(this.insertRoleQuery, [
                role.roleName,
            ]);
            return {
                id: dbResult.rows[0].role_id,
                roleName: dbResult.rows[0].role_name,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in inserting role: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
    async list() {
        try {
            const dbResult = await this.client.query(this.selectAllRecordsQuery, []);
            return dbResult.rows.map((row) => ({
                id: row.role_id,
                roleName: row.role_name,
            }));
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in retrieving role: ${error.message}`);
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
                id: dbResult.rows[0].role_id,
                roleName: dbResult.rows[0].role_name,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in retrieving role detail: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
    async update(role, id) {
        try {
            const dbResult = await this.client.query(this.updateRoleQuery, [
                role.roleName,
                id,
            ]);
            if (dbResult.rows.length === 0)
                return undefined;
            return {
                id: dbResult.rows[0].role_id,
                roleName: dbResult.rows[0].role_name,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in updating role: ${error.message}`);
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
                id: dbResult.rows[0].role_id,
                roleName: dbResult.rows[0].role_name,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in deleting role: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
}
