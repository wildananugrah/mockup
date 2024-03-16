import { JWTService } from "jwt-service";
import { UserService } from "user-management-db/UserService";
import { certificate, privateKey } from "../configs/jwt.config";

const routes = async (app: any, options: any) => {
  app.route({
    method: "POST",
    url: "/api/users/register",
    handler: async (req: any, res: any) => {
      const userService = new UserService(await app.dbPool.connect());
      const { username, password } = req.body;
      const user = await userService.register({ username, password });
      const jwtService = new JWTService({
        privateKey: privateKey,
        certificate: certificate,
      });
      const token = await jwtService.create(user, 3600);
      return res.status(200).send(token);
    },
  });
  app.route({
    method: "POST",
    url: "/api/users/login",
    handler: async (req: any, res: any) => {
      const userService = new UserService(await app.dbPool.connect());
      const { username, password } = req.body;
      const user = await userService.login({ username, password });
      const jwtService = new JWTService({
        privateKey: privateKey,
        certificate: certificate,
      });
      const token = await jwtService.create(user, 3600);
      return res.status(200).send(token);
    },
  });
};

export default routes;
