export interface IJWTService {
    create(data: any, expired: number): Promise<any>;
    refresh(token: string, expired: number): Promise<any>;
    validate(token: string): Promise<any>;
}
export declare class JWTService implements IJWTService {
    privateKey: string | undefined;
    certificate: string | undefined;
    constructor({ privateKey, certificate, }: {
        privateKey: string;
        certificate: string;
    });
    create(data: any, expired: number): Promise<any>;
    refresh(token: string, expired: number): Promise<any>;
    validate(token: string): Promise<any>;
}
