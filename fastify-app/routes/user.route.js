import { loginHandler, registerHandler } from "../handlers/user.handler.js";

const routes = async (app, options) => {
    app.route({
        method: 'POST',
        url: '/api/users/register',
        handler: registerHandler
    });
    app.route({
        method: 'POST',
        url: '/api/users/login',
        handler: loginHandler
    });

};

export default routes;