import type { _IRoute } from "./_route.interface";

export type MethodHandler = {
  [key: string]: (_param: _IRoute) => Promise<Response>;
};
