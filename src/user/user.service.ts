import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/database/models/user.model';

@Injectable()
export class UserService {
  async findAll() {
    return await User.findAll({
      raw: true,
    });
  }

  async findOne(id: number) {
    return await User.findOne({
      where: {
        id: id,
      },
      raw: true,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await User.update(
      {
        ...updateUserDto,
      },
      {
        where: {
          id: id,
        },
      },
    );
  }

  async remove(id: number) {
    await User.destroy({
      where: {
        id: id,
      },
    });
  }
}
