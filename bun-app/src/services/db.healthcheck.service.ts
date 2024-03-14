import type { PoolClient } from "pg";

export async function healthCheckDBService(client: PoolClient) {
  try {
    await client.query("SELECT 1 as healtcheck");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    client.release();
  }
}
