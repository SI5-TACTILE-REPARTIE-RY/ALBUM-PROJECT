import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsModule } from './ws/ws.module';
import { UsersService } from './users/users.service';
import { LockService } from './test/lock.service';
import { FiltersService } from './filters/filters.service';
import { FiltersController } from './filters/filters.controller';
import { FiltersModule } from './filters/filters.module';

@Module({
  imports: [
    WsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    FiltersModule,
  ],
  controllers: [AppController, FiltersController],
  providers: [AppService, LockService, UsersService, FiltersService],
  exports: [AppService, LockService, UsersService],
})
export class AppModule {}
