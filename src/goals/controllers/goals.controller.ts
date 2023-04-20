import { Body, Controller, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { API_HEADER_X_AUTHORIZATION } from '../../auth/auth.constants';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { IdDto } from '../../common/dtos/id.dto';
import { CreateGoalDto } from '../dtos/create-goal.dto';
import { GoalTemplateDto } from '../dtos/goal-template.dto';
import { GoalDto } from '../dtos/goal.dto';
import { UpdateGoalDto } from '../dtos/update-goal.dto';
import { GoalsService } from '../services/goals.service';

@ApiTags('Goals (v1)')
@Controller('/api/v1/goals')
export class GoalsController {
  constructor(private readonly _goalsService: GoalsService) {}

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Post()
  async create(@Body() createGoalDto: CreateGoalDto, @Req() req: Request): Promise<GoalDto> {
    const goal = await this._goalsService.save({
      ...createGoalDto,
      enteredAt: new Date(),
      userId: req.user.id,
    });

    return plainToClass(GoalDto, goal);
  }

  @Get()
  async viewAll(): Promise<GoalDto[]> {
    const goals = await this._goalsService.findAll();

    return goals.map((goal) => {
      return plainToClass(GoalDto, goal);
    });
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Get('/:id')
  async view(@Query() idDto: IdDto, @Req() req: Request): Promise<GoalDto> {
    const goal = await this._goalsService.findOneForUser(idDto.id, req.user.id);

    return plainToClass(GoalDto, goal);
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Patch('/:id')
  async update(@Query() idDto: IdDto, @Body() updateGoalDto: UpdateGoalDto, @Req() req: Request): Promise<GoalDto> {
    const goal = await this._goalsService.findOneForUser(idDto.id, req.user.id);
    if (!goal) {
      throw new Error('Goal not found');
    }

    const savedGoal = await this._goalsService.save(updateGoalDto);

    return plainToClass(GoalDto, savedGoal);
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Patch('/:id')
  async delete(@Query() idDto: IdDto, @Req() req: Request): Promise<{ message: string }> {
    const goal = await this._goalsService.findOneForUser(idDto.id, req.user.id);
    if (!goal) {
      throw new Error('Goal not found');
    }

    await this._goalsService.delete(idDto.id);

    return { message: 'The goal was successfully deleted' };
  }

  @Get('/templates')
  async templates(): Promise<GoalTemplateDto[]> {
    const templates = await this._goalsService.getAllTemplates();

    return templates.map((template) => {
      return plainToClass(GoalTemplateDto, template);
    });
  }
}
