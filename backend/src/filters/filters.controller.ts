import { Controller, Get, Param } from '@nestjs/common';
import { FiltersService } from './filters.service';

@Controller('filters')
export class FiltersController {
  TAG = 'FILTER CONTROLER';

  constructor(private filterService: FiltersService) {}

  @Get('/:userID/:filterName')
  applyFilter(
    @Param('userID') userID: string,
    @Param('filterName') filterName: string,
  ) {
    console.log(
      `${this.TAG} :: GET :: APPLY FILTER :: ${userID} --> ${filterName}`,
    );
    this.filterService.chooseFilter(userID, filterName);
  }
}
