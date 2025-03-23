import { CtType } from "@prisma/client"

export class CreateCategoryDto {
    nameUz:string
    nameRu:string
    type:CtType
}
