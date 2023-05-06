import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/database/models/user.model';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  async findMe(id: number) {
    return User.findByPk(id, {
      attributes: ['name', 'email', 'role'],
    }).then((value) => value);
  }

  async findSellers() {
    return User.findAll({
      where: {
        role: {
          [Op.eq]: 0,
        },
      },
      raw: true,
      attributes: ['name'],
    }).then((values) => values.map((value) => value.name));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return User.update(
      {
        ...updateUserDto,
      },
      {
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      },
    ).then((value) => value);
  }

  async remove(id: number) {
    return User.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    }).then(() => {});
  }
}
