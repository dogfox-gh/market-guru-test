import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
@Injectable()
export class UsersService {

  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

  async create(user: UserDto): Promise<User> {
    // @ts-ignore
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmailOrPhone(emailOrPhone: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: {
        [Op.or]: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async getAll(
    search = '',
    page = 1,
    perPage = 10,
  ): Promise<{ rows: User[]; count: number }> {
    return await this.userRepository.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      },
      offset: (page - 1) * perPage,
      limit: perPage,
    });
  }
}
