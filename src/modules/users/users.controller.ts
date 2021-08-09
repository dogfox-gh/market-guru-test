import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  async getAll(@Query() query) {
    const { search, page, limit } = query;
    return await this.usersService.getAll(search, page, limit);
  }
}
