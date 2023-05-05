import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from  "jsonwebtoken";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  async findMe(@Headers("authorization") auth: string) {
    return await this.userService.findMe(this.getId(auth));
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("shops")
  async findSellers() {
    return await this.userService.findSellers();
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("me")
  async update(@Headers("authorization") auth: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(this.getId(auth), updateUserDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("me")
  async remove(@Headers("authorization") auth: string) {
    return await this.userService.remove(this.getId(auth));
  }

  getId(auth: string): number {
    const token: string = auth.split(" ")[1];
    const decodedToken = jwt.decode(token);
    const id = decodedToken.sub;
    return (+id);
  }

}
