import axios from 'axios';
const data = {
    username: "wildananugrah",
    password: "p@ssw0rd!"
}
const host = "http://0.0.0.0:4000"
describe("User", () => {
    it("should be registered a user", async () => {
        const response = await axios.post(`${host}/api/users/register`, data, { headers: { 'Content-Type': 'application/json' } })
        expect(response.data.statusCode).toBe(200);
        expect(response.data.message).toBe("Registration succeed");
        expect(response.data.content.user.username).toBe(data.username);
        expect(response.data.content.user.password).toBe(data.password);
        expect(typeof response.data.content.token).toBe("string");

    });
    it("should be logged in a user", async () => {
        const response = await axios.post(`${host}/api/users/login`, data, { headers: { 'Content-Type': 'application/json' } })
        expect(response.data.statusCode).toBe(200);
        expect(response.data.message).toBe("Login succeed");
        expect(response.data.content.user.username).toBe(data.username);
        expect(response.data.content.user.password).toBe(data.password);
        expect(typeof response.data.content.token).toBe("string");

    });
});