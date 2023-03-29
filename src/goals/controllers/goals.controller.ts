import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { GoalTemplateDto } from '../dtos/goal-template.dto';
import { GoalDto } from '../dtos/goal.dto';
import { GoalsService } from '../services/goals.service';

@ApiTags('Goals (API v1)')
@Controller('/api/v1/goals')
export class GoalsController {
  constructor(private readonly _goalsService: GoalsService) {}

  @Get('/')
  async index(): Promise<GoalDto[]> {
    const goals = await this._goalsService.findAll();

    return goals.map((goal) => {
      return plainToClass(GoalDto, goal);
    });
  }

  @Get('/templates')
  async templates(): Promise<GoalTemplateDto[]> {
    const templates = await this._goalsService.getAllTemplates();

    return templates.map((template) => {
      return plainToClass(GoalTemplateDto, template);
    });
  }
}
