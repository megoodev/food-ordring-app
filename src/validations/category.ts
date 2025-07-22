import z from 'zod';



export const CategorySchema = () => {
  return z.object({
    name: z.string().trim().min(1, { message: 'Name is required' }),

  });
}

export const updateCategorySchema = () => {
  return z.object({
    categoryName: z.string().trim().min(1, 'Name is required'),

  });
}