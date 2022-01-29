import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/decorate/public.decorate';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Get(':address')
  async getNonce(@Param('address') address: string): Promise<any>{
    let nonce = await this.authService.getNonce(address);
    return {nonce: nonce};
  }
  @Public()
  @Post('/signin')
  async signIn(@Body() data: SignInDTO): Promise<any> {
    return await this.authService.signIn(data);
  }
}
