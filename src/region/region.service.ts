import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
 constructor(private prisma:PrismaService){}
  async create(createRegionDto: CreateRegionDto) {
     try {
       let created = await this.prisma.region.createMany({data:[createRegionDto]})
       return created
     } catch (error) {
       return {error}
     }
   }
 
  async findAll() {
     try {
       let find = await this.prisma.region.findMany()
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
       let find = await this.prisma.region.findUnique({where:{id}})
       if(!find){
         throw new NotFoundException('No data')
       }
       return find
     } catch (error) {
         return {error}
     }
   }
 
  async update(id: string, updateregionDto: UpdateRegionDto) {
     try {
       let find = await this.prisma.region.findUnique({where:{id}})
       if(!find){
         throw new NotFoundException('No data')
       }
       let updated = await this.prisma.region.update({where:{id},data:updateregionDto})
       return updated
     } catch (error) {
       return {error}
     }
   }
 
  async remove(id: string) {
     try {
       let find = await this.prisma.region.findUnique({where:{id}})
       if(!find){
          throw new NotFoundException('No data')
       }
       let updated = await this.prisma.region.delete({where:{id}})
       return updated
     } catch (error) {
       return {error}
     }
   }
}
