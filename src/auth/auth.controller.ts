import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  Req,
  Body,
  Res,
  Get,
  SetMetadata,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Roles } from './roles/decorator/roles.decorator';
import { RoleGuard } from './roles/guards/role.guard';
import { Role } from './roles/role.enum';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request, @Res({passthrough: true}) res: Response) {
    const jwt = await this.authService.login(request.user)
    res.setHeader("Authorization", jwt.access_token);
    return {  
      statusCode: "200",
      user: request.user
    };
    //response.setHeader
    //return this.authService.login(request.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDTO) {
    return this.authService.register(createUserDto);
  }

  @Get("test")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.USER)
  async test(@Req() req){
    const user = req.user;
    return {
        statusCode: "200",
        message: "Hello " + user.email,
        user: req.user
    }
  }
}
