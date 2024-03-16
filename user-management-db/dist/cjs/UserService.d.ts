import { IUser, IUserService } from "user-management/src/interfaces";
import { PoolClient } from "pg";
export declare class UserService implements IUserService {
    tblName: string;
    deleteAllRecordsQuery: string;
    selectByUsernameAndPassword: string;
    insertUser: string;
    client: PoolClient;
    constructor(client: PoolClient);
    truncate(): Promise<void>;
    register(user: IUser): Promise<IUser | undefined>;
    login(user: IUser): Promise<IUser | undefined>;
}
