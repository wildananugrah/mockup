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
exports.User = exports.AppError = void 0;
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
    constructor(userService) {
        this.userService = userService;
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.login({
                username: username,
                password: password,
            });
            if (user === undefined)
                throw new AppError("E01", "Can not login user!");
            return user;
        });
    }
    register(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.register({
                username: username,
                password: password,
            });
            if (user === undefined)
                throw new Error("Can not login user!");
            return user;
        });
    }
}
exports.User = User;
