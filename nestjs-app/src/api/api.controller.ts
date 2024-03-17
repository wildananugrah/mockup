import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Injectable,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { DB_PG } from 'src/config/common.config';
import { RefreshTokenDto, UserRequestDto } from 'src/dto/user.dto';
import { UserService } from 'user-management-db/UserService';
import { UserRoleTrxService } from 'user-management-db/UserRoleTrxService';
import { User, AppError } from 'user-management/user';
import { JWTService } from 'jwt-service';
import { certificate, privateKey } from 'src/config/jwt.config';

@Controller('api')
@Injectable()
export class ApiController {
  constructor(@Inject(DB_PG) private conn: any) {}
  @Get('_/healthcheck')
  async getHealthCheck(@Res() res: Response): Promise<any> {
    try {
      const client = await this.conn.connect();
      await client.query('SELECT 1 as healthcheck');
      res.status(200).json({ app: true, db: true });
    } catch (error: any) {
      res.status(500).json({ app: false, db: false, message: error.message });
    }
  }

  @Post('users/register')
  async postRegister(
    @Body() userRequest: UserRequestDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const userService = new UserService(await this.conn.connect());
      const jwtService = new JWTService({
        privateKey: privateKey,
        certificate: './keys/certificate.crt',
      });
      const userRoleTrxService = new UserRoleTrxService(
        await this.conn.connect(),
      );
      const user = new User(userService, userRoleTrxService, jwtService);
      return res
        .status(200)
        .send(await user.register(userRequest.username, userRequest.password));
    } catch (error: any) {
      if (error instanceof AppError) {
        return res
          .status(400)
          .send({ code: error.code, message: error.message });
      }
      return res.status(500).send({ code: 500, message: error.message });
    }
  }

  @Post('users/login')
  async postLogin(
    @Body() userRequest: UserRequestDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const userService = new UserService(await this.conn.connect());
      const jwtService = new JWTService({
        privateKey: privateKey,
        certificate: certificate,
      });
      const userRoleTrxService = new UserRoleTrxService(
        await this.conn.connect(),
      );
      const user = new User(userService, userRoleTrxService, jwtService);
      return res
        .status(200)
        .send(await user.login(userRequest.username, userRequest.password));
    } catch (error: any) {
      if (error instanceof AppError) {
        return res
          .status(400)
          .send({ code: error.code, message: error.message });
      }
      return res.status(500).send({ code: 500, message: error.message });
    }
  }

  @Get('users/info')
  async getUserInfo(
    @Body() userRequest: UserRequestDto,
    @Headers() headers,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const jwtService = new JWTService({
        privateKey: privateKey,
        certificate: './keys/certificate.crt',
      });
      const token = headers.authorization.split(' ')[1];
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
  }

  @Put('token')
  async refreshToken(
    @Body() userRequest: RefreshTokenDto,
    @Headers() headers,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const jwtService = new JWTService({
        privateKey: privateKey,
        certificate: './keys/certificate.crt',
      });
      const token = await jwtService.refresh(
        userRequest.token,
        userRequest.expired,
      );
      return res.status(200).send(token);
    } catch (error: any) {
      if (error instanceof AppError) {
        return res
          .status(400)
          .send({ code: error.code, message: error.message });
      }
      return res.status(500).send({ code: 500, message: error.message });
    }
  }
}
