import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
 constructor(private prisma:PrismaService){}
  async create(createCategoryDto:CreateCategoryDto) {
     try {
       let created = await this.prisma.category.createMany({data:[createCategoryDto]})
       return created
     } catch (error) {
       return {error}
     }
   }
 
  async findAll() {
     try {
       let find = await this.prisma.category.findMany()
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
       let find = await this.prisma.category.findUnique({where:{id}})
       if(!find){
        throw new NotFoundException('No data')
       }
       return find
     } catch (error) {
         return {error}
     }
   }
 
  async update(id: string, updateCategoryDto:UpdateCategoryDto) {
     try {
       let find = await this.prisma.category.findUnique({where:{id}})
       if(!find){
        throw new NotFoundException('No data')
       }
       let updated = await this.prisma.category.update({where:{id},data:updateCategoryDto})
       return updated
     } catch (error) {
       return {error}
     }
   }
 
  async remove(id: string) {
     try {
       let find = await this.prisma.category.findUnique({where:{id}})
       if(!find){
        throw new NotFoundException('No data')
       }
       let updated = await this.prisma.category.delete({where:{id}})
       return updated
     } catch (error) {
       return {error}
     }
   }
 }
 

