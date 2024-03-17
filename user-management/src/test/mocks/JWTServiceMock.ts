import { IJWTService, IToken, IUser } from "interfaces";

export class JWTServiceMock implements IJWTService {
  async create(data: any, expired: number): Promise<IToken> {
    return {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      expired: 3600,
    };
  }
  async refresh(token: string, expired: number): Promise<IToken> {
    return {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      expired: 3600,
    };
  }
  async validate(token: string): Promise<IUser> {
    return {
      id: "1234567890123456",
      username: "wildananugrah",
      password: "p@ssw0rd",
    };
  }
}
