'use server'

import { Pages, Routes } from "@/app/constants/enums"
import { db } from "@/lib/db"
import { CategorySchema, updateCategorySchema } from "@/validations/category"
import { revalidatePath } from "next/cache"

export const AddCategories = async (prevState: unknown, formData: FormData) => {

  const result = CategorySchema().safeParse(Object.fromEntries(formData.entries()))

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    }
  }
  const data = result.data;
  try {
    await db.category.create({
      data,
    })
    revalidatePath(`/${Routes.ADMIN}/${Pages.CATEGORIES}`)
    revalidatePath(`/${Routes.MENU}`)
    return { status: 201, message: 'Category created successfully' }
  }
  catch (error) {
    console.error(error)
    return { error: 'internal server erorr', Status: 500 }
  }
}
export const DeleteCategories = async (id: string) => {
  try {
    await db.category.delete({
      where: { id },
    })
    revalidatePath(`/${Routes.ADMIN}/${Pages.CATEGORIES}`)
    revalidatePath(`/${Routes.MENU}`)
    return { status: 200, data: { message: 'Category deleted successfully' } }
  } catch (error) {
    console.error(error)
    return { error: 'internal server erorr', Status: 500 }
  }
}

export const editCategories = async (id: string, prevState: unknown, formData: FormData) => {
  const result = updateCategorySchema().safeParse(Object.fromEntries(formData.entries()))



  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    }
  }

  const data = result.data;
  try {
    await db.category.update({
      where: {
        id
      }, data: {
        name: data.categoryName
      }
    })
    revalidatePath(`/${Routes.ADMIN}/${Pages.CATEGORIES}`)
    revalidatePath(`/${Routes.MENU}`)
    return { status: 200, message: 'Category updated successfully' }
  } catch (error) {
    console.error(error)
    return { error: 'internal server erorr', Status: 500 }
  }

}