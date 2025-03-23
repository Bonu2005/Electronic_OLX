import { PrStatus } from "@prisma/client"

export class CreateProductDto {
nameUz:string
nameRu:string
price:number
colorId:string
description:string
prStatus:PrStatus
location:string
isNegotiable:boolean
count:number
categoryId:string
image:string
discount:number
viewCount:number
}
