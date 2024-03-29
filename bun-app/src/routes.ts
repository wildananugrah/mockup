import { healthcheckDBHandler } from "./handlers/healthcheck.handler";
import { jwtHandler } from "./handlers/jwt.handler";
import { system1Handler } from "./handlers/system1.handler";
import { system2Handler } from "./handlers/system2.handler";
import { system3Handler } from "./handlers/system3.handler";
import { userLoginHandler } from "./handlers/user.login.handler";
import { userRegisterHandler } from "./handlers/user.register.handler";
import type { _IRoute } from "./interfaces/_route.interface";
import type { MethodHandler } from "./interfaces/methodHandler.interface";

export const routes: MethodHandler = {
  "/_/system/service1": async (_param: _IRoute): Promise<Response> => {
    return await system1Handler(_param);
  },
  "/_/system/service2": async (_param: _IRoute): Promise<Response> => {
    return await system2Handler(_param);
  },
  "/_/system/service3": async (_param: _IRoute): Promise<Response> => {
    return await system3Handler(_param);
  },
  "/_/healthCheck": async (_param: _IRoute): Promise<Response> => {
    return await healthcheckDBHandler(_param);
  },
  "/api/users/register": async (_param: _IRoute): Promise<Response> => {
    return await userRegisterHandler(_param);
  },
  "/api/users/login": async (_param: _IRoute): Promise<Response> => {
    return await userLoginHandler(_param);
  },
  "/api/users/info": async (_param: _IRoute): Promise<Response> => {
    return await jwtHandler(_param);
  },
  "/api/token": async (_param: _IRoute): Promise<Response> => {
    return await jwtHandler(_param);
  },
};
