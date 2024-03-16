export class HealthCheck {
    client;
    constructor(client) {
        this.client = client;
    }
    async test() {
        try {
            await this.client.query("SELECT 1 as healtcheck");
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
        finally {
            this.client.release();
        }
    }
}
