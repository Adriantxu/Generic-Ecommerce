import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/database/models/user.model';

@Injectable()
export class UserService {
  async findMe(id: number) {
    return User.findOne({
      where: {
        id: id,
      },
      attributes: ['name', 'role'],
      raw: true,
    }).then((value) => value);
  }

  async findSellers() {
    return User.findAll({
      where: {
        role: '0',
      },
      attributes: ['name'],
      raw: true,
    }).then((values) => values.map((value) => value.name));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return User.update(
      {
        ...updateUserDto,
      },
      {
        where: {
          id: id,
        },
      },
    ).then((value) => value);
  }

  async remove(id: number) {
    return User.destroy({
      where: {
        id: id,
      },
    }).then(() => {});
  }
}
