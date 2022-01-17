import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  Req,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request) {
    return this.authService.login(request.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDTO) {
    return this.authService.register(createUserDto);
  }
}
