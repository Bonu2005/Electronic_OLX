import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Injectable()
export class OrderService {
  constructor(private prisma:PrismaService,private notification:NotificationGateway){}
 async create(createOrderDto: CreateOrderDto,req:Request) {
   try {
    let {id}= req["user"]
    let created = await this.prisma.order.create({data:{...createOrderDto,userId:id}})
    
    this.notification.sendOrderNotif(created)

    return created
   } catch (error) {
    return {error}
   }
  }

 async findAll() {
  try {
    return await  this.prisma.order.findMany()
  } catch (error) {
    return {error}
  }
  }

 async findOne(id: string) {
    try {
      return await  this.prisma.order.findUnique({where:{id}})
    } catch (error) {
      return {error}
    }
  }

 async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
    let find= await  this.prisma.order.findUnique({where:{id}})
    if(!find){
      return {message:"No data"}
    }
    let updated= await this.prisma.order.update({where:{id},data:updateOrderDto})
    return updated
    } catch (error) {
      return {error}
    }
  }

 async remove(id: string) {
    try {
      let find= await  this.prisma.order.findUnique({where:{id}})
      if(!find){
        return {message:"No data"}
      }
      let removed= await this.prisma.order.delete({where:{id}})
      return removed
      } catch (error) {
        return {error}
      }
  }
}
