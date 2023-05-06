import { Controller, Get, Body, Patch, Delete, UseGuards, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { IdFromJwt } from 'src/middleware/middleware.id';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  async findMe(@IdFromJwt() id: number) {
    return await this.userService.findMe(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("shops")
  async findSellers() {
    return await this.userService.findSellers();
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("me")
  async update(@IdFromJwt() id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("me")
  async remove(@IdFromJwt() id: number) {
    return await this.userService.remove(id);
  }
}
