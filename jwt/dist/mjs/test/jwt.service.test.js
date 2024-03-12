import { JWTService } from "../index";
describe("JWT Service", () => {
    const data = {
        name: "Wildan Anugrah",
        age: 33,
    };
    const expired = 3600;
    let token = "";
    it("should create token", async () => {
        let jwtService = new JWTService({
            privateKey: "./keys/key.key",
            certificate: "./keys/certificate.crt",
        });
        const result = await jwtService.create(data, expired);
        expect(typeof result?.token).toBe("string");
        token = result?.token;
        expect(result?.expired).toBe(expired);
    });
    it("should validate token", async () => {
        let jwtService = new JWTService({
            privateKey: "./keys/key.key",
            certificate: "./keys/certificate.crt",
        });
        const result = await jwtService.validate(token);
        expect(result?.name).toBe(data.name);
        expect(result?.age).toBe(data.age);
    });
    it("should refresh token", async () => {
        let jwtService = new JWTService({
            privateKey: "./keys/key.key",
            certificate: "./keys/certificate.crt",
        });
        const result = await jwtService.refresh(token, expired);
        expect(typeof result?.token).toBe("string");
        token = result?.token;
        expect(result?.expired).toBe(expired);
    });
    it("should validate token again", async () => {
        let jwtService = new JWTService({
            privateKey: "./keys/key.key",
            certificate: "./keys/certificate.crt",
        });
        const result = await jwtService.validate(token);
        expect(result?.name).toBe(data.name);
        expect(result?.age).toBe(data.age);
    });
});
