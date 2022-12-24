import { Controller, Post, Get } from '@nestjs/common';
import V1 from 'src/constant/api.constant';

@Controller(`${V1}restaurants`)
export class RestaurantController {}
