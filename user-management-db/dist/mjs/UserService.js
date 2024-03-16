export class UserService {
    tblName = "tbl_mst_user";
    deleteAllRecordsQuery = `DELETE FROM ${this.tblName}`;
    selectByUsernameAndPassword = `SELECT * FROM ${this.tblName} WHERE username=$1 and password=$2`; // TODO: it supposed to be included user attributes.
    insertUser = `INSERT INTO ${this.tblName} (username, password) VALUES ($1, $2) RETURNING *`;
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
                throw new Error(`Error in creating todo: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
    async register(user) {
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
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in creating todo: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
    async login(user) {
        try {
            const dbResult = await this.client.query(this.selectByUsernameAndPassword, [user.username, user.password]);
            return {
                id: dbResult.rows[0].id,
                username: dbResult.rows[0].username,
                password: dbResult.rows[0].password,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in creating todo: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
}
