import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma:PrismaService){}
  async create(createProductDto: CreateProductDto) {
     try {
       let created = await this.prisma.product.createMany({data:[createProductDto]})
       return created
     } catch (error) {
       return {error}
     }
   }
 
   async findAll(
    page?: string,
    pageSize?: string,
    order: 'ASC' | 'DESC' = 'ASC', 
    orderBy: string = 'id',
  ) {
    try {
      const pageNum = Number(page) || 1;
      const take = Number(pageSize) || 10;
      const skip = (pageNum - 1) * take;

     
      if (order !== 'ASC' && order !== 'DESC') {
        throw new BadRequestException('Invalid order parameter. Use "asc" or "desc".');
      }
      const validOrderByFields = ['colorId', 'name', 'price', 'createdAt']; 
      if (!validOrderByFields.includes(orderBy)) {
        throw new BadRequestException(`Invalid orderBy parameter. Use one of: ${validOrderByFields.join(', ')}`);
      }
      const products = await this.prisma.product.findMany({
        skip,
        take,
        orderBy: { [orderBy]: order },
        where:{isConfirm:"ACTIVE"}
      });

      if (products.length === 0) {
        throw new NotFoundException('No data');
      }

      return products;
    } catch (error) {
      throw error; 
    }
  }
 
  async findOne(id: string) {
     try {
       let find = await this.prisma.product.findUnique({where:{id}})
       if(!find){
        throw new NotFoundException('No data')
       }
       return find
     } catch (error) {
         return {error}
     }
   }
 
  async update(id: string, updateProductDto: UpdateProductDto) {
     try {
       let find = await this.prisma.product.findUnique({where:{id}})
       if(!find){
   throw new NotFoundException('No data')
       }
       let updated = await this.prisma.product.update({where:{id},data:updateProductDto})
       return updated
     } catch (error) {
       return {error}
     }
   }
 
  async remove(id: string) {
     try {
       let find = await this.prisma.product.findUnique({where:{id}})
       if(!find){
        throw new NotFoundException('No data')
       }
       let updated = await this.prisma.product.delete({where:{id}})
       return updated
     } catch (error) {
       return {error}
     }
   }
}
