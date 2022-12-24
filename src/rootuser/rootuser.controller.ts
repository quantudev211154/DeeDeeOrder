import { Body, Controller, Post } from '@nestjs/common';
import V1 from 'src/constant/api.constant';
import { CreateRootUserDto } from './dto';
import { RootuserService } from './rootuser.service';

@Controller(`${V1}root`)
export class RootuserController {
  constructor(private rootuserService: RootuserService) {}

  @Post('/register')
  createRootUser(@Body() dto: CreateRootUserDto) {
    return this.rootuserService.createRootUser(dto);
  }
}
