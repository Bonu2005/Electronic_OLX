import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma:PrismaService){}
 async create(createCommentDto: CreateCommentDto,req:Request) {
    let {id}= req["user"]
    try {
      let created=await this.prisma.comments.create({data:{...createCommentDto,userId:id}})
      return created
    } catch (error) {
      return {error}
    }
  }

 async findAll() {
   try {
    let find = await this.prisma.comments.findMany()
    if(find.length==0){
      throw new NotFoundException('No data')
    } 
    return find
   } catch (error) {
     return {error}
   }
  }

 async findOne(id: string) {
   try {
    let find = await this.prisma.comments.findUnique({where:{id}})
    if(!find){
      throw new NotFoundException('No data')
    } 
    return find
   } catch (error) {
    return {error}
   }
  }

 async update(id: string, updateCommentDto: UpdateCommentDto) {
   try {
    let find = await this.prisma.comments.findUnique({where:{id}})
    if(!find){
      throw new NotFoundException('No data')
    } 
    let updated = await this.prisma.comments.update({where:{id},data:updateCommentDto})
    return updated
   } catch (error) {
    return {error}
   }
  }

 async remove(id: string) {
    try {
      let find = await this.prisma.comments.findUnique({where:{id}})
      if(!find){
        throw new NotFoundException('No data')
      } 
      let removed = await this.prisma.comments.delete({where:{id}})
      return removed
     } catch (error) {
      return {error}
     }
  }
}
