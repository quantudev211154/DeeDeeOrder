import { Module } from '@nestjs/common';
import { RootuserController } from './rootuser.controller';
import { RootuserService } from './rootuser.service';

@Module({
  controllers: [RootuserController],
  providers: [RootuserService]
})
export class RootuserModule {}
