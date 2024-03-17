import { UserService } from "user-management-db/UserService";
import type { _IRoute } from "../interfaces/_route.interface";
import type { MethodHandler } from "../interfaces/methodHandler.interface";
import { certificate, privateKey } from "../configs/jwt.config";
import { JWTService } from "jwt-service";
import { AppError, User } from "user-management/user";
import { UserRoleTrxService } from "user-management-db/UserRoleTrxService";

export async function handlePost(_param: _IRoute): Promise<Response> {
  try {
    const { username, password } = _param.body;
    const userService = new UserService(await _param.dbPool.connect());
    const jwtService = new JWTService({
      privateKey: privateKey,
      certificate: certificate,
    });
    const userRoleTrxService = new UserRoleTrxService(
      await _param.dbPool.connect()
    );
    const user = new User(userService, userRoleTrxService, jwtService);
    return new Response(
      JSON.stringify(await user.register(username, password)),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error(error);
    if (error instanceof AppError)
      return new Response(
        JSON.stringify({ message: error.message, code: error.code }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );

    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
const methodHandlers: MethodHandler = {
  POST: handlePost,
};
export async function userRegisterHandler(_param: _IRoute) {
  const { method } = _param;
  if (method && Object.prototype.hasOwnProperty.call(methodHandlers, method)) {
    const handle = methodHandlers[method];
    return handle(_param);
  }

  return new Response(
    JSON.stringify({ message: `Service 1 response unknown method` }),
    { status: 400 }
  );
}
