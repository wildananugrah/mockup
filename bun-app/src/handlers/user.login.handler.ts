import { UserService } from "user-management-db/UserService";
import type { _IRoute } from "../interfaces/_route.interface";
import type { MethodHandler } from "../interfaces/methodHandler.interface";
import { JWTService } from "jwt-service";
import { certificate, privateKey } from "../configs/jwt.config";

export async function handlePost(_param: _IRoute): Promise<Response> {
  try {
    const { username, password } = _param.body;
    const user = await new UserService(await _param.dbPool.connect()).login({
      username,
      password,
    });
    const token = await new JWTService({
      privateKey: privateKey,
      certificate: certificate,
    }).create(user, 3600);
    return new Response(JSON.stringify(token), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
const methodHandlers: MethodHandler = {
  POST: handlePost,
};
export async function userLoginHandler(_param: _IRoute) {
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
