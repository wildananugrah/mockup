const routes = async (app: any, options: any) => {
  app.route({
    method: "GET",
    url: "/_/healthcheck",
    handler: async (req: any, res: any) => {
      return res.status(200).send({ app: true });
    },
  });
};

export default routes;
