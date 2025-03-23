import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ViewService {
  constructor(private prisma:PrismaService){}
 async create(createViewDto: CreateViewDto,req:Request) {
   try {
   let {id}=req['user']
   let created = await this.prisma.view.create({data:{userId:id,productId:createViewDto.productId}})
   return created
   } catch (error) {
    return {error}
   }
  }

 async findAll() {
   try {
    let find = await this.prisma.view.findMany()
    return find
   } catch (error) {
    return {error}
   }
  }

  async findOne(id: string) {
    try {
      let find = await this.prisma.view.findUnique({where:{id}})
      if(!find){
        throw new NotFoundException('No data')
      }
      return find
     } catch (error) {
      return {error}
     }
  }


}
