import { SetMetadata } from "@nestjs/common"
import { UserType } from "@prisma/client"

export const TypesKey = 'type'

export const Types = (...types:UserType[])=>SetMetadata(TypesKey,types)
console.log(Types);
