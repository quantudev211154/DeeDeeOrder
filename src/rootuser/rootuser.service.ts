import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRootUserDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class RootuserService {
  constructor(private prisma: PrismaService) {}

  async createRootUser(dto: CreateRootUserDto) {
    const usernameDuplicated = await this.prisma.rootUser.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (usernameDuplicated)
      throw new ForbiddenException('This username is used');

    try {
      const hashedPassword = await argon.hash(dto.password);

      const rootUser = await this.prisma.rootUser.create({
        data: {
          ...dto,
          password: hashedPassword,
        },
      });

      delete rootUser.password;

      return rootUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('Credential taken');
      }

      throw error;
    }
  }
}
