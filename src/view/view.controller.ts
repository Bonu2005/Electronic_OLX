import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ViewService } from './view.service';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { Request } from 'express';

@Controller('view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Post()
  create(@Body() createViewDto: CreateViewDto,@Req() req:Request) {
    return this.viewService.create(createViewDto,req);
  }

  @Get()
  findAll() {
    return this.viewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewService.findOne(id);
  }



}
