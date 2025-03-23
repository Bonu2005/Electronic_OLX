import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma:PrismaService){}
 async create(createLikeDto: CreateLikeDto,req:Request,ID:string) {
    let {id}=req['user']
    try {
      let find = await this.prisma.like.findFirst({where:{userId:id,productId:createLikeDto.productId}})
      if(find||ID==undefined){
        let removed = await this.prisma.like.delete({where:{id}})
        return removed
      }
      let created = await this.prisma.like.create({data:{...createLikeDto,userId:id}})
      return created
    } catch (error) {
      return {error}
    }
  }

 async findAll() {
   try {
     let find = await this.prisma.like.findMany()
     return find
   } catch (error) {
    return {error}
   }
  }

 async findOne(id: string) {
    try {
      let find = await this.prisma.like.findUnique({where:{id}})
      if(!find){
         throw new NotFoundException('No data')
      }
      return find
    } catch (error) {
     return {error}
    }
  }
}
