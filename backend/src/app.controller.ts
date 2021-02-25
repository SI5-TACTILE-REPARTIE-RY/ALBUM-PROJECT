import { Param, Query } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentSession, Session } from './session';

import { UsersService } from './users/users.service';
import { LockService } from './test/lock.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private usersService: UsersService,
    private lockService: LockService,
  ) {}

  @Get()
  getHello(): string {
    console.log('REST :: EMPTY GET :: Hello world');
    return this.appService.getHello();
  }

  @Get('connect')
  getConnection(): string {
    const id = this.usersService.newUser();
    console.log(`REST :: CONNECT :: ${id}`);
    return JSON.stringify(id);
  }

  @Get('disconnect/:id')
  getDisconnection(@Param('id') id: string): void {
    console.log(`REST :: DISCONNECT :: ${id}`);
    this.usersService.removeUser(id);
  }

  @Get('lock/:buttonName/:userId')
  getLock(
    @Param('buttonName') buttonName: string,
    @Param('userId') userId: string,
  ): void {
    console.log(`REST :: LOCK ${buttonName} :: ${userId}`);
    this.lockService.lock(buttonName, userId);
  }

  @Get('unlock/:buttonName/:userId')
  getUnlock(
    @Param('buttonName') buttonName: string,
    @Param('userId') userId: string,
  ): void {
    console.log(`REST :: UNLOCK ${buttonName} :: ${userId}`);
    this.lockService.unlock(buttonName, userId);
  }

  @Get('session')
  getSession(): Session {
    console.log(`REST :: GET :: SESSION :: ${JSON.stringify(CurrentSession)}`);
    return CurrentSession;
  }

  @Get('start-album-session')
  startAlbumSession(): void {
    console.log('REST :: GET :: START ALBUM SESSION');
    this.appService.startAlbumSession();
  }

  @Get('reset-album-session')
  stopAlbumSession(): void {
    console.log('REST :: GET :: RESET ALBUM SESSION');
    this.appService.resetAlbumSession();
  }

  @Get('apply-filter/:filterName')
  applyFilter(@Param('filterName') filterName: string): void {
    console.log(`REST :: GET :: APPLY FILTER :: ${filterName}`);
    this.appService.applyFilter(filterName);
  }

  @Get('vote-finished')
  voteFinished(@Query('photoKept') photoKept: string): void {
    console.log(`REST :: GET :: VOTE FINISHED :: ${photoKept}`);
    this.appService.voteFinished(photoKept === 'true');
  }
}
