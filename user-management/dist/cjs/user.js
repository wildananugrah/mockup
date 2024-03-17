"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.AppError = exports.REGISTER_FAILED_MESSAGE = exports.REGISTER_FAILED_CODE = exports.INVALID_LOGIN_MESSAGE = exports.INVALID_LOGIN_CODE = void 0;
exports.INVALID_LOGIN_CODE = "UM404";
exports.INVALID_LOGIN_MESSAGE = "Username / password is invalid!";
exports.REGISTER_FAILED_CODE = "UM400";
exports.REGISTER_FAILED_MESSAGE = "System can not register the user!";
class AppError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
class User {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.login({
                username: username,
                password: password,
            });
            if (user === undefined)
                throw new AppError(exports.INVALID_LOGIN_CODE, exports.INVALID_LOGIN_MESSAGE);
            return yield this.jwtService.create(user, 3600);
        });
    }
    register(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.register({
                username: username,
                password: password,
            });
            if (user === undefined)
                throw new AppError(exports.REGISTER_FAILED_CODE, exports.REGISTER_FAILED_MESSAGE);
            return yield this.jwtService.create(user, 3600);
        });
    }
    validateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jwtService.validate(token);
        });
    }
    refreshToken(token, expired) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jwtService.refresh(token, expired);
        });
    }
}
exports.User = User;
