import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { totp } from 'otplib';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private mail: MailService, private jwt: JwtService) {
    totp.options = { step: 600 }
  }
  async sendOtp(email: string) {
    try {
      let genOtp = totp.generate(`${email}address`)
      await this.mail.sendMaile(email, "Verify your email", genOtp)
      return { message: "verify your accaunt" }
    } catch (error) {
      return { error }
    }

  }

  async verify(email: string, otp: string) {
    try {
      let veri = totp.check(otp, `${email}address`)
      if (!veri) {
        return { message: "Wrong otp" }
      }
      return { message: "Your email verifiyed ✅" }
    } catch (error) {
      return { error }
    }

  }

  async register(createAuthDto: CreateAuthDto) {
    try {
      let { password, email, isConfirm,...data } = createAuthDto
      let find = await this.prisma.user.findUnique({ where: { email } })
      if (find) {
        return { message: "Already exists" }
      }
      let hash = bcrypt.hashSync(password, 10)

      let created = await this.prisma.user.create({ data: { ...data, password: hash, type: "USER", email} })
      return created
    } catch (error) {
      return { error }
    }
  }

  async login(email: string, password: string, ipAddress: string) {
    try {
      let find = await this.prisma.user.findUnique({ where: { email } })
      if (!find) {
        return { message: "Don't exists" }
      }
      let match = bcrypt.compareSync(password, find.password)
      if (!match) {
        return { message: "Wrong credentials" }
      }
      let session = await this.prisma.session.findFirst({ where: { ipAddress, userId: find.id } })
      if (!session) {
        await this.prisma.session.create({ data: { ipAddress, userId: find.id } })
      }
      return { accessToken: this.genereteAccessToken({ id: find.id, type: find.type }), refreshToken: this.genereteRefreshToken({ id: find.id, type: find.type }) }
    } catch(error) {
    return { error }
  }
}
  refreshToken(req: Request) {
    let { id, type } = req['user']
    return { accessToken: this.genereteRefreshToken({ id, type }), refreshToken: this.genereteAccessToken({ id, type }) }
  }
  async me(ipAddress:string,req:Request) {
    try {
      let info = req['user']
      let find = await this.prisma.session.findMany({where:{ipAddress,userId:info.id}})
      if(!find){
        throw new NotFoundException('No data')
      }
       return find
    } catch (error) {
      return {error}
    }
   
  }

  async removeS(id:string){
    let find = await this.prisma.session.findUnique({where:{id}})
    if(!find){
    throw new NotFoundException('No data')
    }
    let remove = await this.prisma.session.delete({where:{id}})
    return remove
    }
  genereteAccessToken(paylod: any) {
    return this.jwt.sign(paylod, {
      secret: "accessToken",
      expiresIn: "15m"
    })
  }
  genereteRefreshToken(paylod: any) {
    return this.jwt.sign(paylod, {
      secret: "refreshToken",
      expiresIn: "7d"
    })
  }
}
