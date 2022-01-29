import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty({
    default: 'epvh1o2qnao@temporary-mail.net',
  })
  publicAddress: string;
  @ApiProperty({
    default: 'epvh1o2qnao@temporary-mail.net',
  })
  nonce: number;
  @ApiProperty({
    default: '',
  })
  signature: string;
}
