import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorService {
  constructor(private prisma:PrismaService){}
 async create(createColorDto: CreateColorDto) {
    try {
      let created = await this.prisma.color.createMany({data:[createColorDto]})
      return created
    } catch (error) {
      return {error}
    }
  }

 async findAll() {
    try {
      let find = await this.prisma.color.findMany()
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
      let find = await this.prisma.color.findUnique({where:{id}})
      if(!find){
        throw new NotFoundException('No data')
      }
      return find
    } catch (error) {
        return {error}
    }
  }

 async update(id: string, updateColorDto: UpdateColorDto) {
    try {
      let find = await this.prisma.color.findUnique({where:{id}})
      if(!find){
        throw new NotFoundException('No data')
      }
      let updated = await this.prisma.color.update({where:{id},data:updateColorDto})
      return updated
    } catch (error) {
      return {error}
    }
  }

 async remove(id: string) {
    try {
      let find = await this.prisma.color.findUnique({where:{id}})
      if(!find){
         throw new NotFoundException('No data')
      }
      let updated = await this.prisma.color.delete({where:{id}})
      return updated
    } catch (error) {
      return {error}
    }
  }
}
