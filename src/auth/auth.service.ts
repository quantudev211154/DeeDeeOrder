import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { Staff } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login({ username, password }: LoginDto) {
    const staff = await this.prisma.staff.findUnique({
      where: {
        username: username,
      },
    });

    if (!staff) throw new ForbiddenException('User is not exist');

    const pwdMatches = await argon.verify(staff.password, password);

    if (!pwdMatches)
      throw new ForbiddenException('Username or password is incorrect');

    return this.createToken('accessToken', staff);
  }

  async register(dto: RegisterDto) {
    const usernameDuplicated = await this.prisma.staff.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (usernameDuplicated)
      throw new ForbiddenException('This username is used');

    const hashedPassword = await argon.hash(dto.password);

    try {
      const staff = await this.prisma.staff.create({
        data: {
          ...dto,
          password: hashedPassword,
          position: dto.position,
        },
      });

      return this.createToken('accessToken', staff);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('Credential taken');
      }

      throw error;
    }
  }

  async createToken(
    type: 'accessToken' | 'refreshToken',
    { id, name, tokenVersion, position, restaurantId }: Staff,
  ) {
    const payload = {
      sub: id,
      name,
      restaurantId,
      position,
      ...(type === 'refreshToken' ? { tokenVersion } : {}),
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: type === 'accessToken' ? '15m' : '3d',
      secret,
    });

    return token;
  }
}
