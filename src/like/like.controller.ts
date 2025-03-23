import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/access.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}
  @UseGuards(AuthGuard)
  @Post(':ID')
  create(@Body() createLikeDto: CreateLikeDto,@Req() req:Request,@Param('ID') ID: string) {
    return this.likeService.create(createLikeDto,req,ID);
  }

  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Req() req:Request) {
    return this.likeService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Get()
  myLikes(@Req() req:Request) {
    return this.likeService.myLikes(req);
  }

}
