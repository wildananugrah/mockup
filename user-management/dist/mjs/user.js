export class AppError extends Error {
    message;
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
export class User {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async login(username, password) {
        const user = await this.userService.login({
            username: username,
            password: password,
        });
        if (user === undefined)
            throw new AppError("E01", "Can not login user!");
        return user;
    }
    async register(username, password) {
        const user = await this.userService.register({
            username: username,
            password: password,
        });
        if (user === undefined)
            throw new Error("Can not login user!");
        return user;
    }
}
