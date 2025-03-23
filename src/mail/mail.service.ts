import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer"

@Injectable()
export class MailService {
  private transporter:any
  constructor(){
    this.transporter= nodemailer.createTransport({
      service:'icloud',
      auth:{
        user:"booonu@icloud.com",
        pass:"nwxt-abvf-oeiv-avpl"
      }
    })
  }
  async sendMaile(to:string,subject:string,message:string){
    console.log(to);
     
    let messag = this.transporter.sendMail({
    
      from:"booonu@icloud.com",
      to,
      text:message,
      subject
    })
      return messag
  }
}
