import { IJWTService, IToken, IUser } from "interfaces";
export declare class JWTServiceMock implements IJWTService {
    create(data: any, expired: number): Promise<IToken>;
    refresh(token: string, expired: number): Promise<IToken>;
    validate(token: string): Promise<IUser>;
}
