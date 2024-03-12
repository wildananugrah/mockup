import { PoolClient } from "pg";
export interface IUser {
    id?: string;
    username: string;
    password: string;
}
export interface IUserService {
    register(user: IUser, client: PoolClient): Promise<IUser | undefined>;
    login(user: IUser, client: PoolClient): Promise<IUser | undefined>;
    truncate(client: PoolClient): Promise<void>;
}
export declare class UserService implements IUserService {
    tblName: string;
    truncateTableQuery: string;
    selectByUsernameAndPassword: string;
    insertUser: string;
    truncate(client: PoolClient): Promise<void>;
    register(user: IUser, client: PoolClient): Promise<IUser | undefined>;
    login(user: IUser, client: PoolClient): Promise<IUser | undefined>;
}
