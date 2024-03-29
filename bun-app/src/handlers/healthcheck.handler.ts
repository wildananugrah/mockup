import type { _IRoute } from "../interfaces/_route.interface";
import type { MethodHandler } from "../interfaces/methodHandler.interface";
import { HealthCheck } from "user-management-db/HealthCheck";

export async function handleGet(_param: _IRoute): Promise<Response> {
  try {
    return new Response(
      JSON.stringify({
        app: true,
        db: await new HealthCheck(await _param.dbPool.connect()).test(),
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ app: false, db: false }), {
      status: 200,
    });
  }
}
const methodHandlers: MethodHandler = {
  GET: handleGet,
};
export async function healthcheckDBHandler(_param: _IRoute) {
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
