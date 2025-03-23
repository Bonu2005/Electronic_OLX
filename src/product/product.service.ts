import { Injectable, NotFoundException } from '@nestjs/common';
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
 
  async findAll() {
     try {
       let find = await this.prisma.product.findMany()
       if(find.length==0){
        throw new NotFoundException('No data')
       }
       return find
     } catch (error) {
         return error
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
