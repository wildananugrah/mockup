export const INVALID_LOGIN_CODE = "UM404";
export const INVALID_LOGIN_MESSAGE = "Username / password is invalid!";
export const REGISTER_FAILED_CODE = "UM400";
export const REGISTER_FAILED_MESSAGE = "System can not register the user!";
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
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(username, password) {
        const user = await this.userService.login({
            username: username,
            password: password,
        });
        if (user === undefined)
            throw new AppError(INVALID_LOGIN_CODE, INVALID_LOGIN_MESSAGE);
        return await this.jwtService.create(user, 3600);
    }
    async register(username, password) {
        const user = await this.userService.register({
            username: username,
            password: password,
        });
        if (user === undefined)
            throw new AppError(REGISTER_FAILED_CODE, REGISTER_FAILED_MESSAGE);
        return await this.jwtService.create(user, 3600);
    }
    async validateToken(token) {
        return await this.jwtService.validate(token);
    }
    async refreshToken(token, expired) {
        return await this.jwtService.refresh(token, expired);
    }
}
