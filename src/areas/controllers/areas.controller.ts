import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { AreaTemplateDto } from '../dtos/area-template.dto';
import { AreasService } from '../services/areas.service';

@ApiTags('Areas (API v1)')
@Controller('/api/v1/areas')
export class AreasController {
  constructor(private readonly _areasService: AreasService) {}

  @Get('/templates')
  async templates(): Promise<AreaTemplateDto[]> {
    const areaTemplates = await this._areasService.getAllTemplates();

    return areaTemplates.map((areaTemplate) => {
      return plainToClass(AreaTemplateDto, areaTemplate);
    });
  }
}
