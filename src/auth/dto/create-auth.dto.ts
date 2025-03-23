import { PrConfirm, UserType } from "@prisma/client"

export class CreateAuthDto {
    name:string
    email:string
    password:string
    regionId:string
    phone:string
    image:string
    type:UserType
    isConfirm:PrConfirm
}
