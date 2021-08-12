import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiOkResponse({
    description: 'Retrieved users successfully',
    type: UserDto,
  })
  @ApiParam({
    name: 'search',
    required: false,
    description: 'search by name or email',
  })
  @ApiParam({
    name: 'page',
    required: false,
  })
  @ApiParam({
    name: 'limit',
    required: false,
  })
  @Get()
  async getAll(@Query() query) {
    const { search, page, limit } = query;
    return await this.usersService.getAll(search, page, limit);
  }
}
