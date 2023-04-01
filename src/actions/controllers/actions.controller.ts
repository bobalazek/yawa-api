import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { API_HEADER_X_AUTHORIZATION } from 'src/auth/auth.constants';

import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { ActionTemplateDto } from '../dtos/action-template.dto';
import { ActionDto } from '../dtos/action.dto';
import { CreateActionDto } from '../dtos/create-action.dto';
import { UpdateActionDto } from '../dtos/update-action.dto';
import { ActionsService } from '../services/actions.service';

@ApiTags('Actions (API v1)')
@Controller('/api/v1/actions')
export class ActionsController {
  constructor(private readonly _actionsService: ActionsService) {}

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Post()
  async create(@Body() createActioDto: CreateActionDto, @Req() req: Request): Promise<ActionDto> {
    // TODO: validation

    const action = await this._actionsService.save({ ...createActioDto, userId: req.user.id });

    return plainToClass(ActionDto, action);
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Get()
  async readAll(@Req() req: Request): Promise<ActionDto[]> {
    const actions = await this._actionsService.findAllForUser(req.user.id);

    return actions.map((action) => {
      return plainToClass(ActionDto, action);
    });
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Get('/:id')
  async read(@Param('id') id: string, @Req() req: Request): Promise<ActionDto> {
    const action = await this._actionsService.findOneForUser(id, req.user.id);

    return plainToClass(ActionDto, action);
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateActionDto: UpdateActionDto,
    @Req() req: Request
  ): Promise<ActionDto> {
    const action = await this._actionsService.findOneForUser(id, req.user.id);
    if (!action || action.userId !== req.user.id) {
      throw new Error('Action not found');
    }

    // TODO: validation

    const savedAction = await this._actionsService.save(updateActionDto);

    return plainToClass(ActionDto, savedAction);
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AuthenticatedGuard)
  @Patch('/:id')
  async delete(@Param('id') id: string, @Req() req: Request): Promise<{ message: string }> {
    const action = await this._actionsService.findOneForUser(id, req.user.id);
    if (!action || action.userId !== req.user.id) {
      throw new Error('Action not found');
    }

    await this._actionsService.delete(id);

    return { message: 'The action was successfully deleted' };
  }

  @Get('/templates')
  async templates(): Promise<ActionTemplateDto[]> {
    const templates = await this._actionsService.getAllTemplates();

    return templates.map((template) => {
      return plainToClass(ActionTemplateDto, template);
    });
  }
}
