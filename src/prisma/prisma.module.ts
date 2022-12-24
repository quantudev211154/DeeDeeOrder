import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//Global module must export a serive or orther same
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
