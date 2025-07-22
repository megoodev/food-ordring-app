import { cache } from "@/lib/cache";
import { db } from "@/lib/db";
import { User } from "@prisma/client";


export const getUsers = cache(
  async (email: string): Promise<User[]> => {
    const users = await db.user.findMany({
      where: {
        email: {
          not: email
        }
      }
    });
    return users;
  },
  ["users"],
  { revalidate: 3600 }
)

export const getUser = cache(
  (userId: string) => {
    const user = db.user.findUnique({ where: { id: userId } });
    return user;
  },
  ['user'],
  { revalidate: 3600 }
);