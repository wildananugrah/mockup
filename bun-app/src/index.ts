import { serve } from "bun";
import { routes } from "./routes";
import type { _IRoute } from "./interfaces/_route.interface";
import { pool } from "./configs/database";
import { appEnv, appHost, appPort } from "./configs/common.config";

async function _routes(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const queryParams = url.searchParams;
  const headers = req.headers;

  return req.text().then(async (body) => {
    let param: _IRoute = {
      method: req.method.toUpperCase(),
      query: queryParams,
      headers: headers,
      dbPool: pool,
    };
    console.log(body);
    if (
      !["GET", "DELETE", "HEAD", "OPTIONS"].includes(req.method.toUpperCase())
    )
      param.body = JSON.parse(body);
    return await routes[url.pathname](param);
  });
}

serve({
  port: appPort,
  hostname: appHost,
  fetch: _routes,
});
console.log(
  `Server running on http://${appHost}:${appPort} in ${appEnv} environment`
);
