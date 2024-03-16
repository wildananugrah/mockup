import { PoolClient } from "pg";
export declare class HealthCheck {
    client: PoolClient;
    constructor(client: PoolClient);
    test(): Promise<boolean>;
}
