import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { AuthGuard } from 'src/guard/access.guard';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createColorDto: CreateColorDto,@Req() req:Request) {
    return this.colorService.create(createColorDto);
  }

  @Get()
  findAll() {
    return this.colorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto,@Req() req:Request) {
    return this.colorService.update(id, updateColorDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@Req() req:Request) {
    return this.colorService.remove(id);
  }
}
