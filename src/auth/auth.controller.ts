import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/register.dto';
import { AuthLoginDto } from './dto/login.dto';
import { validate } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes()
  async signUp(@Body() dto: AuthRegisterDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return this.authService.register(dto);
  }

  @Post('login')
  @UsePipes()
  async login(@Body() dto: AuthLoginDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return this.authService.login(dto);
  }
}
