import { JWTService } from "jwt-service";
import { UserService } from "user-management-db/UserService";
import { AppError, User } from "user-management/user";
import { certificate, privateKey } from "../configs/jwt.config";

const routes = async (app: any, options: any) => {
  app.route({
    method: "POST",
    url: "/api/users/register",
    handler: async (req: any, res: any) => {
      try {
        const userService = new UserService(await app.dbPool.connect());
        const jwtService = new JWTService({
          privateKey: privateKey,
          certificate: certificate,
        });
        const user = new User(userService, jwtService);
        const { username, password } = req.body;
        return res.status(200).send(await user.register(username, password));
      } catch (error: any) {
        if (error instanceof AppError) {
          return res
            .status(400)
            .send({ code: error.code, message: error.message });
        }
        return res.status(500).send({ code: 500, message: error.message });
      }
    },
  });
  app.route({
    method: "POST",
    url: "/api/users/login",
    handler: async (req: any, res: any) => {
      try {
        const userService = new UserService(await app.dbPool.connect());
        const jwtService = new JWTService({
          privateKey: privateKey,
          certificate: certificate,
        });
        const user = new User(userService, jwtService);
        const { username, password } = req.body;
        return res.status(200).send(await user.login(username, password));
      } catch (error: any) {
        if (error instanceof AppError) {
          return res
            .status(400)
            .send({ code: error.code, message: error.message });
        }
        return res.status(500).send({ code: 500, message: error.message });
      }
    },
  });
  app.route({
    method: "GET",
    url: "/api/users/info",
    handler: async (req: any, res: any) => {
      try {
        const jwtService = new JWTService({
          privateKey: privateKey,
          certificate: certificate,
        });
        const token = req.headers.authorization.split(" ")[1];
        const encodedToken = await jwtService.validate(token);
        delete encodedToken.iat;
        delete encodedToken.exp;
        return res.status(200).send(encodedToken);
      } catch (error: any) {
        if (error instanceof AppError) {
          return res
            .status(400)
            .send({ code: error.code, message: error.message });
        }
        return res.status(500).send({ code: 500, message: error.message });
      }
    },
  });
};

export default routes;
