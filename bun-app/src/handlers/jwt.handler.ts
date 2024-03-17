import { AppError } from "user-management/user";
import type { _IRoute } from "../interfaces/_route.interface";
import type { MethodHandler } from "../interfaces/methodHandler.interface";
import { JWTService } from "jwt-service";
import { certificate, privateKey } from "../configs/jwt.config";

export async function handleGet(_param: _IRoute): Promise<Response> {
  try {
    const token = _param.headers.get("authorization").split(" ")[1];
    const jwtService = new JWTService({
      privateKey: privateKey,
      certificate: certificate,
    });
    const encodedToken = await jwtService.validate(token);
    delete encodedToken.iat;
    delete encodedToken.exp;
    return new Response(JSON.stringify(encodedToken), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
export async function handlePut(_param: _IRoute): Promise<Response> {
  const token: string = _param.body.token;
  const expired: number = _param.body.expired;
  const jwtService = new JWTService({
    privateKey: privateKey,
    certificate: certificate,
  });
  try {
    return new Response(
      JSON.stringify(await jwtService.refresh(token, expired)),
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
  GET: handleGet,
  PUT: handlePut,
};
export async function jwtHandler(_param: _IRoute) {
  const { method } = _param;
  if (method && Object.prototype.hasOwnProperty.call(methodHandlers, method)) {
    const handle = methodHandlers[method];
    return handle(_param);
  }
  return new Response(JSON.stringify({ message: `unknown method` }), {
    status: 400,
  });
}
