import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { DB_PG } from 'src/config/common.config';

const dbProvider = {
  provide: DB_PG,
  useFactory: async (configService: ConfigService) => {
    return new Pool({
      host: configService.get<string>('DB_HOST', 'localhost'),
      database: configService.get<string>('DB_DATABASE', 'postgres'),
      port: configService.get<number>('DB_PORT', 50000),
      user: configService.get<string>('DB_USER', 'pg'),
      password: configService.get<string>('DB_PASS', 'p0stgr3s'),
      ssl: configService.get<boolean>('DB_SSL', false),
      min: configService.get<number>('DB_POOL_MIN', 5),
      max: configService.get<number>('DB_POOL_MAX', 10),
      idleTimeoutMillis: configService.get<number>('DB_IDLE_TIMEOUT', 1000),
      connectionTimeoutMillis: configService.get<number>(
        'DB_CONNECTION_TIMEOUT',
        1000,
      ),
      // The 'pg' Pool does not have a 'maxUses' option by default,
      // so you might need custom handling if you intend to use this parameter.
    });
  },
  inject: [ConfigService], //
};

@Module({
  imports: [ConfigModule],
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
