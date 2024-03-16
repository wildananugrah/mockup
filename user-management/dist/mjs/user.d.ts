import { IUser, IUserLogic, IUserService } from "interfaces";
export declare class AppError extends Error {
    message: string;
    code: string;
    constructor(code: string, message: string);
}
export declare class User implements IUserLogic {
    userService: IUserService;
    constructor(userService: IUserService);
    login(username: string, password: string): Promise<IUser | undefined>;
    register(username: string, password: string): Promise<IUser | undefined>;
}
