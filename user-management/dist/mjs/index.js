export class UserService {
    tblName = "app_mst_user";
    truncateTableQuery = `TRUNCATE TABLE ${this.tblName}`;
    selectByUsernameAndPassword = `SELECT * FROM ${this.tblName} WHERE username=$1 and password=$2`;
    insertUser = `INSERT INTO ${this.tblName} (username, password) VALUES ($1, $2) RETURNING *`;
    async truncate(client) {
        try {
            await client.query(this.truncateTableQuery, []);
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in creating todo: ${error.message}`);
        }
        finally {
            client.release();
        }
    }
    async register(user, client) {
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
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in creating todo: ${error.message}`);
        }
        finally {
            client.release();
        }
    }
    async login(user, client) {
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
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error)
                throw new Error(`Error in creating todo: ${error.message}`);
        }
        finally {
            client.release();
        }
    }
}
