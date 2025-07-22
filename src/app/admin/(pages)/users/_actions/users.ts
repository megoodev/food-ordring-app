'use server'

import { Pages, Routes } from "@/app/constants/enums";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";


export const removeUser = async (id: string) => {
    try {
        await db.user.delete({ where: { id } })
        revalidatePath(`/${Routes.ADMIN}/${Pages.USERS}`)
        revalidatePath(`/${Routes.MENU}`)
        return { status: 200, data: { message: 'User deleted successfully' } }
    } catch (error) {
        console.error(error)
        return { error: 'internal server erorr', Status: 500 }
    }
}