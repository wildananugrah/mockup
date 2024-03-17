import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { DbModule } from './db/db.postgres';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DbModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {}
