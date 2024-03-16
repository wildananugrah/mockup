export class UserServiceMock {
    async register(user) {
        return {
            id: "1234567890123456",
            username: "wildananugrah",
            password: "p@ssw0rd",
        };
    }
    async login(user) {
        if (user.username === "wildan")
            return undefined;
        console.log(user);
        return {
            id: "1234567890123456",
            username: "wildananugrah",
            password: "p@ssw0rd",
        };
    }
    truncate() {
        throw new Error("Method not implemented.");
    }
}
