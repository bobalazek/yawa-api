import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { ActionTemplateDto } from '../dtos/action-template.dto';
import { ActionDto } from '../dtos/action.dto';
import { ActionsService } from '../services/actions.service';

@ApiTags('Actions (API v1)')
@Controller('/api/v1/actions')
export class ActionsController {
  constructor(private readonly _actionsService: ActionsService) {}

  @Get('/')
  async index(): Promise<ActionDto[]> {
    const actions = await this._actionsService.findAll();

    return actions.map((action) => {
      return plainToClass(ActionDto, action);
    });
  }

  @Get('/templates')
  async templates(): Promise<ActionTemplateDto[]> {
    const templates = await this._actionsService.getAllTemplates();

    return templates.map((template) => {
      return plainToClass(ActionTemplateDto, template);
    });
  }
}
