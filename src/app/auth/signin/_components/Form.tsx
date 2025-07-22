'use client'
import FormFields from '@/app/_components/form-fields/form-fields'
import { Pages, Routes } from '@/app/constants/enums'
import { Button } from '@/components/ui/button'
import useFormFields from '@/hooks/useFormFields'
import { IFormField } from '@/lib/types/app'
import { FormEvent, useRef, useState } from 'react'
import { signIn } from "next-auth/react";
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
const Form = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState()
  const { getFormFaileds } = useFormFields({ slug: Pages.LOGIN })
  const router = useRouter()



  const onsubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return
    const formData = new FormData(formRef.current)
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      if (res?.error) {

        const validationError = JSON.parse(res?.error).validationError;
        setError(validationError);
  
        const responseError = JSON.parse(res?.error).responseError;
        if (responseError) {
          toast.error(responseError)
        }
      }
      if (res?.ok) {
        router.replace(`/${Routes.PROFILE}`)
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form onSubmit={onsubmit} ref={formRef}>
      {getFormFaileds().map((failed: IFormField) => (
        <div key={failed.name} className='my-5'>
          <FormFields {...failed} error={error} />
        </div>
      ))}
      <Button className="cursor-pointer w-full">Login</Button>
    </form>
  )
}

export default Form