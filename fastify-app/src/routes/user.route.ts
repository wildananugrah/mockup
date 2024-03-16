const routes = async (app: any, options: any) => {
  app.route({
    method: "POST",
    url: "/api/users/register",
    handler: async (req: any, res: any) => {
      return res.status(200).json({ message: "implement register api" });
    },
  });
  app.route({
    method: "POST",
    url: "/api/users/login",
    handler: async (req: any, res: any) => {
      return res.status(200).json({ message: "implement login api" });
    },
  });
};

export default routes;
