import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Request } from 'express';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':ID')
  create(@Body() createLikeDto: CreateLikeDto,@Req() req:Request,@Param('ID') ID: string) {
    return this.likeService.create(createLikeDto,req,ID);
  }

  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likeService.findOne(id);
  }

}
