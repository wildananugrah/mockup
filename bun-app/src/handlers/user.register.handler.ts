import { UserService } from "user-management-db/UserService";
import type { _IRoute } from "../interfaces/_route.interface";
import type { MethodHandler } from "../interfaces/methodHandler.interface";

export async function handlePost(_param: _IRoute): Promise<Response> {
  try {
    const { username, password } = _param.body;
    const user = await new UserService(await _param.dbPool.connect()).register({
      username,
      password,
    });
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify(error.message), {
      status: 200,
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
