import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { ActionDto } from '../dtos/action.dto';
import { ActionsService } from '../services/actions.service';

@ApiTags('Actions (API v1)')
@Controller('/api/v1/actions')
export class ActionsController {
  constructor(private readonly _actionsService: ActionsService) {}

  @Get('/')
  async list(): Promise<ActionDto[]> {
    const actions = await this._actionsService.findAll();

    return actions.map((action) => {
      return plainToClass(ActionDto, action);
    });
  }
}
