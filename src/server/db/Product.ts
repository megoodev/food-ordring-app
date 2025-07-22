import { cache } from "@/lib/cache"
import { db } from "@/lib/db"

export const getBeastSellarys = cache(
  async (limit?: number) => {
    const beastSellry = await db.product.findMany({
      take: limit,
      orderBy: {
        orders: {
          _count: 'desc'
        }
      },
      include: {
        sizes: true,
        extras: true
      },
    });
    return beastSellry;
  },
  ['beast-sellary'],
  { revalidate: 3600 }
);

export const getProductsByCategory = cache(async () => {
  const categories = await db.category.findMany({
    include: {
      product: {
        include:{
          sizes: true,
          extras: true
        }
      },
    },
  });
  return categories;
}, ['products-by-category'], { revalidate: 3600 });