import { UserService } from "user-service";
import { JWTService } from "jwt-service";
import { certificate, privateKey } from "../configs/jwt.config.js";

export async function registerController({ username, password }, client) {
    try {
        const userService = new UserService();
        const user = await userService.register({ username: username, password: password }, client);
        const jwtService = new JWTService({ privateKey: privateKey, certificate: certificate });
        const token = await jwtService.create(user, 3600);
        return {
            statusCode: 200,
            message: "Registration succeed",
            content: {
                user, token: token.token
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function loginController({ username, password }, client) {
    try {
        const userService = new UserService();
        const user = await userService.login({ username: username, password: password }, client);
        const jwtService = new JWTService({ privateKey: privateKey, certificate: certificate });
        const token = await jwtService.create(user, 3600);
        return {
            statusCode: 200,
            message: "Login succeed",
            content: {
                user, token: token.token
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
}