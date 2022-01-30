import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SignInDTO } from './dto/sign-in.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as ethers from 'ethers';
import { compareString } from 'src/utils';
import { JwtService } from '@nestjs/jwt';

interface VerifyNonce {
  message: any;
  address: string;
  signature: any;
}
@Injectable()
export class AuthService {
  @InjectRepository(UserEntity)
  private readonly userRepo: Repository<UserEntity>;
  constructor(private jwtService: JwtService) {}

  async verifyNonce({ message, address, signature }: VerifyNonce) {
    try {
      const signerAddr = await ethers.utils.verifyMessage(message, signature);
      return compareString(signerAddr, address);
    } catch (e) {
      return false;
    }
  }
  
  async getNonce(address: string): Promise<number> {
    if (!ethers.utils.isAddress(address))
      throw new HttpException('Address Invalid', HttpStatus.BAD_REQUEST);
    let result = await this.userRepo
      .createQueryBuilder('user')
      .where('user.publicAddress = :publicAddress', {
        publicAddress: address,
      })
      .select(['user.nonce'])
      .execute();

    if (!!!result.length) {
      const u = new UserEntity();
      u.nonce = Math.floor(Math.random() * 1000000);
      u.publicAddress = address;
      this.userRepo.save(u);
      return u.nonce;
    }
    return result[0].user_nonce;
  }
  async signIn(data: SignInDTO): Promise<any> {
    let result = await this.userRepo
      .createQueryBuilder('user')
      .where('user.publicAddress = :publicAddress', {
        publicAddress: data.publicAddress,
      })
      .getOne();
    if (result.nonce !== data.nonce)
      throw new HttpException('Nonce Invalid', HttpStatus.BAD_REQUEST);
    if (!ethers.utils.isAddress(data.publicAddress))
      throw new HttpException('Address Invalid', HttpStatus.BAD_REQUEST);
    const msg = `Hi! you will connect to server KPIS.\n\nNonce:\n${data.nonce}`;
    let isSuccess = await this.verifyNonce({
      message: msg,
      address: data.publicAddress,
      signature: data.signature,
    });
    if (isSuccess) {
      result.nonce = Math.floor(Math.random() * 1000000);
      const date = new Date();
      const payload: JwtPayload = {
        iat: date.getTime(),
        sub: result.userId,
      };
      this.userRepo.save(result);
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException('Message invalid', HttpStatus.UNAUTHORIZED);
    }
  }
  validateToken(token: string) {
    //TODO: create function validate here !
  }
}
