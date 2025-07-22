

import * as z from 'zod'


export const loginSchema = () => {
  return z.object({
    email: z.string().trim().email({message: 'valid email'}),
    password: z.string()
    .min(6, { message: 'min length 6 character' })
    .max(40 ,{ message: 'max length 40 character' })
  })
}

export const signUpSchema = ()=> {
  return z.object({
    name: z.string().trim().min(1, {message: 'name required'}),
    email: z.string().trim().email({ message: 'valid email' }),
    password: z.string()
      .min(6, { message: 'min length 6 character' })
      .max(40, { message: 'max length 40 character' }),
      confirmPassword: z.string()
      .min(6, { message: 'min length 6 character' })
      .max(40, { message: 'max length 40 character' })
  }).refine((data) => data.password === data.confirmPassword,{
    message: 'password  not matched',
    path: ["confirmPassword"]
  })
}
export type ValidationErrors =
  | {
    [key: string]: string[];
  }
  | undefined;