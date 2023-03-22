import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Areas (API v1)')
@Controller('/api/v1/areas')
export class AreasController {
  @Get('/')
  async list(): Promise<unknown[]> {
    // TODO

    return [];
  }
}
