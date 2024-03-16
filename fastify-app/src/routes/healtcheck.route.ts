import { HealthCheck } from "user-management-db/HealthCheck";

const routes = async (app: any, options: any) => {
  app.route({
    method: "GET",
    url: "/_/healthcheck",
    handler: async (req: any, res: any) => {
      const db = await new HealthCheck(await app.dbPool.connect()).test();
      return res.status(200).send({ app: true, db });
    },
  });
};

export default routes;
