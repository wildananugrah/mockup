// TODO: there shuold be a selectByUsername query then validate the password in app;
// not in query! because the username should be unqiue it helps the system to search the username easily.
// TODO: it supposed to be included user attributes.
export class UserService {
    tblName = "tbl_mst_user";
    deleteAllRecordsQuery = `DELETE FROM ${this.tblName}`;
    selectByUsername = `SELECT * FROM ${this.tblName} WHERE username=$1`;
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
                id: dbResult.rows[0].user_id,
                username: dbResult.rows[0].username,
                password: dbResult.rows[0].password,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in creating user: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
    async login(user) {
        try {
            const dbResult = await this.client.query(this.selectByUsername, [
                user.username,
            ]);
            if (dbResult.rows.length === 0)
                return undefined;
            return {
                id: dbResult.rows[0].user_id,
                username: dbResult.rows[0].username,
                password: dbResult.rows[0].password,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in retrieving user: ${error.message}`);
        }
        finally {
            this.client.release();
        }
    }
}
