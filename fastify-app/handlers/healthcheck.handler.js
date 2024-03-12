import { healthCheck } from "../models/healthcheck.model.js";

export async function healthCheckHandler(req, res) {
    try {
        const dbResult = await healthCheck(this.dbPool);
        return res.code(200).send({ statusCode: 200, app: true, db: dbResult });
    } catch (error) {
        return res.code(500).send({ statusCode: 500, app: false, db: false, message: error.message });
    }
}