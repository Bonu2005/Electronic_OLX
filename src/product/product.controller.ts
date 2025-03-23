import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/access.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto,@Req() req:Request) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Query("page") page?:string,@Query("pageSize") pageSize?:string,@Query("order") order?:any,@Query("orderBy") orderBy?:string) {
    return this.productService.findAll(page,pageSize,order,orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@Req() req:Request) {
    return this.productService.update(id, updateProductDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@Req() req:Request) {
    return this.productService.remove(id);
  }
}
