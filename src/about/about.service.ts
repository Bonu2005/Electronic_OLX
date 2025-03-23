import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AboutService {
  constructor(private prisma:PrismaService){}
 async create(createAboutDto: CreateAboutDto) {
    try {
      let created = await this.prisma.about.create({data:createAboutDto})
      return created
    } catch (error) {
       return {error}
    }
  }


  async findOne(id: string) {
   try {
     let find = await this.prisma.about.findUnique({where:{id}})
     if(!find){
      throw new NotFoundException("No data")
     }
     return find
   } catch (error) {
    return {error}
   }
  }

 async update(id: string, updateAboutDto: UpdateAboutDto) {
    try {
      let find = await this.prisma.about.findUnique({where:{id}})
      if(!find){
       throw new NotFoundException("No data")
      }
      let updated = await this.prisma.about.update({where:{id},data:updateAboutDto})
      return updated
    } catch (error) {
     return {error}
    }
  }

  async remove(id: string) {
    try {
      let find = await this.prisma.about.findUnique({where:{id}})
      if(!find){
       throw new NotFoundException("No data")
      }
      let updated = await this.prisma.about.delete({where:{id}})
      return updated
    } catch (error) {
     return {error}
    }
  }
}
