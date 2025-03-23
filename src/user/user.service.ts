import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import * as bcrypt from "bcrypt"
@Injectable()
export class UserService {
  constructor(private prisma:PrismaService){}
  async create(createUserDto: CreateUserDto) {
     try {
          let { password, email, isConfirm,...data } = createUserDto
          let find = await this.prisma.user.findUnique({ where: { email } })
          if (find) {
            return { message: "Already exists" }
          }
          let hash = bcrypt.hashSync(password, 10)
    
          let created = await this.prisma.user.create({ data: { ...data, password: hash, type: "ADMIN", email} })
          return created
        } catch (error) {
          return { error }
        }
  }

 async findAll() {
   try {
    let find = await this.prisma.user.findMany()
    return find
   } catch (error) {
    return {error}
   }
  }

 async findOne(id: string) {
    try {
      let find = await this.prisma.user.findUnique({where:{id}})
      if(!find){
     throw new NotFoundException('No data')
      }
      return find
     } catch (error) {
      return {error}
     }
  }

 async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let find = await this.prisma.user.findUnique({where:{id}})
      if(!find){
        throw new NotFoundException('No data')
      }
      let updated = await this.prisma.user.update({where:{id},data:updateUserDto})
      return updated
     } catch (error) {
      return {error}
     }
  }
}
