import { Param } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentSession, Session } from './session';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('session')
  getSession(): Session {
    return CurrentSession;
  }

  @Get('start-album-session')
  startAlbumSession(): void {
    this.appService.startAlbumSession();
  }

  @Get('stop-album-session')
  stopAlbumSession(): void {
    this.appService.stopAlbumSession();
  }

  @Get('apply-filter/:filterName')
  applyFilter(@Param('filterName') filterName: string): void {
    this.appService.applyFilter(filterName);
  }
}
