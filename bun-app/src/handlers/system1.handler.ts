import type { _IRoute } from "../interfaces/_route.interface";
import type { MethodHandler } from "../interfaces/methodHandler.interface";

const handleGet = async (req: _IRoute): Promise<Response> => {
  return new Response(
    JSON.stringify({ message: `Service 1 response method: ${req.method}` }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const handlePost = async (req: _IRoute): Promise<Response> => {
  return new Response(
    JSON.stringify({ message: `Service 1 response method: ${req.method}` }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const handlePut = async (req: _IRoute): Promise<Response> => {
  return new Response(
    JSON.stringify({ message: `Service 1 response method: ${req.method}` }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const handleDelete = async (req: _IRoute): Promise<Response> => {
  return new Response(
    JSON.stringify({ message: `Service 1 response method: ${req.method}` }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const methodHandlers: MethodHandler = {
  GET: handleGet,
  POST: handlePost,
  PUT: handlePut,
  DELETE: handleDelete,
};
export async function system1Handler(_param: _IRoute) {
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
