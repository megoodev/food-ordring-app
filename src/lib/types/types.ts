import { Prisma } from "@prisma/client";
export type productWithRelation = Prisma.ProductGetPayload<{
  include: {
    sizes: true,
    extras: true
  }
}>
export type categoryWithRelation = Prisma.CategoryGetPayload<{
  include:{
    product:{
      include: {
        sizes: true,
        extras:true,
      }
    }
  }
}>