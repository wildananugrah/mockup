import { IRoleAttribute, IRoleAttributeService } from "interfaces";
import { PoolClient } from "pg";
export declare class RoleAttributeService implements IRoleAttributeService {
    tblName: string;
    deleteAllRecordsQuery: string;
    insertRoleQuery: string;
    selectAllRecordsQuery: string;
    selectByIdRecordsQuery: string;
    updateRoleQuery: string;
    deleteByIdRecordsQuery: string;
    client: PoolClient;
    constructor(client: PoolClient);
    truncate(): Promise<void>;
    insert(roleAttribute: IRoleAttribute): Promise<IRoleAttribute | undefined>;
    list(roleId: string): Promise<IRoleAttribute[] | undefined>;
    detail(id: string): Promise<IRoleAttribute | undefined>;
    update(roleAttribute: IRoleAttribute, id: string): Promise<IRoleAttribute | undefined>;
    delete(id: string): Promise<IRoleAttribute | undefined>;
}
