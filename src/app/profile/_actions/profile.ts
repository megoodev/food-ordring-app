'use server'
import { Pages, Routes } from "@/app/constants/enums"
import { db } from "@/lib/db"
import { updateProfileSchema } from "@/validations/profile"
import { revalidatePath } from "next/cache"


export const updateProfile = async (isAdmin: boolean, prevState: unknown, formData: FormData) => {

  const result = updateProfileSchema().safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return { error: result.error.formErrors.fieldErrors, formData }
  }

  const data = result.data;
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile?.size)
    ? await uploadImage(imageFile)
    : undefined;
  try {
    const user = await db.user.findUnique({
      where: {
        email: data.email
      }
    })
    if (!user) {
      return {
        message: 'not authorized',
        state: 401
      }
    }

    await db.user.update({
      where: {
        email: data.email
      },
      data: {
        ...data,
        image: imageUrl ?? user.image,
        role: isAdmin ? 'ADMIN' : 'USER', // Only update role if admin
      }
    })
    revalidatePath(`/${Routes.PROFILE}`);
    revalidatePath(`/${Routes.ADMIN}`);
    revalidatePath(`/${Routes.ADMIN}/${Pages.USERS}`);
    revalidatePath(
      `/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`
    );

    return {
      message: 'Profile updated successfully',
      status: 200,
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      message: 'Internal server 5155'
    }
  }

}


const uploadImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathName", `profile_images`);
  try {
    const response = await fetch(
      "http://localhost:3000/api/uploads",
      {
        method: "POST",
        body: formData,
      }
    );
    const image = (await response.json()) as { url: string };
    return image.url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
  }
}