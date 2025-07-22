"use server";

import { db } from "@/lib/db";
import { loginSchema, signUpSchema } from "@/validations/auth";
import { compare, hash } from "bcrypt";

export const login = async (credentials: Record<"email" | "password", string>) => {
 
  const result = loginSchema().safeParse(credentials);
  
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email
      }
    })
    if (!user) {
      return { message: 'user not found', status: 401 }
    }
    const hashedPassword = user.password;
    const isValidPassword = await compare(
      result.data.password,
      hashedPassword
    );
    if (!isValidPassword) {
      return {
        message: 'incorrect password',
        status: 401,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      status: 200,
      message: 'you have successfully logged in',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: 'internal server error',
    };
  }
}
export const signUp = async (prevState: unknown, formData: FormData)=> {
  const result = signUpSchema().safeParse(
    Object.fromEntries(formData.entries())
  )
  if(result.success === false){
    return {
      error: result.error.formErrors.fieldErrors,
      formData,
    }
  }
  try {
    const user = await db.user.findUnique(({
      where: {
        email: result.data.email
      }
    }))
    if (user) {
      return {
        status: 409,
        message: 'User Already Exist',
        formData
      }
    }
    const hashedPassword = await hash(result.data.password, 10)
    const createdUser = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword
      }
    })
    return {
      status: 201,
      message: 'Account created',
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      message: 'internal server error'
    }
  }
}