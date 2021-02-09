import { Param } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentSession, Session } from './session';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('REST :: EMPTY GET :: Hello world');
    return this.appService.getHello();
  }

  @Get('session')
  getSession(): Session {
    console.log(`REST :: GET :: SESSION :: ${CurrentSession}`);
    return CurrentSession;
  }

  @Get('start-album-session')
  startAlbumSession(): void {
    console.log('REST :: GET :: START ALBUM SESSION');
    this.appService.startAlbumSession();
  }

  @Get('stop-album-session')
  stopAlbumSession(): void {
    console.log('REST :: GET :: STOP ALBUM SESSION');
    this.appService.stopAlbumSession();
  }

  @Get('apply-filter/:filterName')
  applyFilter(@Param('filterName') filterName: string): void {
    console.log(`REST :: GET :: APPLY FILTER :: ${filterName}`);
    this.appService.applyFilter(filterName);
  }
}
