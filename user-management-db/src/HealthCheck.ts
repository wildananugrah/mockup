import { PoolClient } from "pg";

export class HealthCheck {
  client: PoolClient;
  constructor(client: PoolClient) {
    this.client = client;
  }
  async test(): Promise<boolean> {
    try {
      await this.client.query("SELECT 1 as healtcheck");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      this.client.release();
    }
  }
}
