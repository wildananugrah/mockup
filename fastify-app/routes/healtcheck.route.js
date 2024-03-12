import { healthCheckHandler } from "../handlers/healthcheck.handler.js";

const routes = async (app, options) => {
    app.route({
        method: 'GET',
        url: '/_/healthcheck',
        handler: healthCheckHandler
    });

};

export default routes;