import { loginController, registerController } from "../controllers/user.controller.js";

export async function loginHandler(req, res) {
    try {
        const { username, password } = req.body;
        const userLogin = await loginController({ username, password }, await this.dbPool.connect());
        return res.code(userLogin.statusCode).send(userLogin);
    } catch (error) {
        return res.code(500).send({ statusCode: 500, message: error.message });
    }
}
export async function registerHandler(req, res) {
    try {
        const { username, password } = req.body;
        const userLogin = await registerController({ username, password }, await this.dbPool.connect());
        return res.code(userLogin.statusCode).send(userLogin);
    } catch (error) {
        return res.code(500).send({ statusCode: 500, message: error.message });
    }
}