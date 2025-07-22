
import { z } from "zod";

export const updateProfileSchema = () => {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'name required' }),
    email: z.string().trim().email({
      message: 'invalid email',
    }),
    phone: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          return /^\+?[1-9]\d{1,14}$/.test(value);
        },
        {
          message: 'enter a valid phone number',
        }
      ),
    streetAddress: z.string().optional(),
    postalCode: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          return /^\d{5,10}$/.test(value);
        },
        {
          message:' enter a valid postal code (5-10 digits)',
        }
      ),
    city: z.string().optional(),
    country: z.string().optional(),
    image: z.custom((val) => val instanceof File).optional(),
  });
};