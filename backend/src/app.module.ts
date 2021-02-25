import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsModule } from './ws/ws.module';
import { UsersService } from './users/users.service';
import { LockService } from './test/lock.service';

@Module({
  imports: [
    WsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, LockService, UsersService],
  exports: [AppService, LockService, UsersService],
})
export class AppModule {}
