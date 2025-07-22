import { cache } from "@/lib/cache";
import { db } from "@/lib/db";

export const getCategory = cache(() => {
  const category = db.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return category
}, ['category'], { revalidate: 3600 });