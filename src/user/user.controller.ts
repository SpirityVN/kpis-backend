import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  @Get()
  @ApiBearerAuth()
  findAll(): string {
    return 'This action returns all cats';
  }
}