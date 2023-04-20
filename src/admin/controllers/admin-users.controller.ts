import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Pagination } from 'nestjs-typeorm-paginate';

import { API_HEADER_X_AUTHORIZATION } from '../../auth/auth.constants';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { IdDto } from '../../common/dtos/id.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { UserDto } from '../../users/dtos/user.dto';
import { UsersService } from '../../users/services/users.service';

@ApiTags('Admin - Users (v1)')
@Controller('/api/v1/admin/users')
export class AdminUsersController {
  constructor(private readonly _usersService: UsersService) {}

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AdminGuard)
  @Get()
  async viewAll(@Query() paginationDto: PaginationDto): Promise<Pagination<UserDto>> {
    const { items, ...pagination } = await this._usersService.paginate(paginationDto);

    return {
      ...pagination,
      items: items.map((item) => {
        return plainToClass(UserDto, item);
      }),
    };
  }

  @ApiHeader(API_HEADER_X_AUTHORIZATION)
  @UseGuards(AdminGuard)
  @Get('/:id')
  async view(@Query() idDto: IdDto): Promise<UserDto> {
    const user = await this._usersService.findOneById(idDto.id);

    return plainToClass(UserDto, user);
  }
}
