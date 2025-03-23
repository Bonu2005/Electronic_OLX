import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sendOtp')
  sendOtp(@Body('email') email: string) {
    return this.authService.sendOtp(email);
  }

  @Post("verify")
  verify(@Body('email') email: string,@Body('otp') otp: string,) {
    return this.authService.verify(email,otp);
  }

  @Post()
  register(@Body() createAuthDto:CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post()
  login(@Body('email') email: string,@Body('password') password: string,@Body('ip') ip: string) {
    return this.authService.login(email, password,ip);
  }

  @Post()
  refreshToken(@Req() req:Request) {
    return this.authService.refreshToken(req);
  }
  @Post("me")
  me(@Body('ip') ip: string,@Req() req:Request) {
    return this.authService.me(ip,req);
  }

}
