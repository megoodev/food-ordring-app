'use client'

import FormFields from "@/app/_components/form-fields/form-fields"
import { Pages, Routes } from "@/app/constants/enums"
import { Button } from "@/components/ui/button"
import useFormFields from "@/hooks/useFormFields"
import { IFormField } from "@/lib/types/app"
import { signUp } from "@/server/_action/auth"
import { ValidationErrors } from "@/validations/auth"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const Form = () => {
  const router = useRouter()
  const { getFormFaileds } = useFormFields({ slug: Pages.Register })
  interface intialType {
    status?: number | null,
    error?: ValidationErrors,
    message?: string | null,
    formData?: FormData | null
  }
  const intialState: intialType = {
    status: null,
    error: {},
    message: '',
    formData: null,
  }
  
  const [state, action, pending] = useActionState(signUp, intialState)
  useEffect(() => {
    if (state.status && state.message) {
      toast.success(state.message);
    }
    if (state.status === 201) {
      router.replace(`/${Routes.AUTH}/${Pages.LOGIN}`);
    }
  }, [ router, state.message, state.status]);
  return (
    <form action={action}>
      {getFormFaileds().map((feild: IFormField) => {
        const fieldValue = state.formData?.get(feild.name) as string

        return (
          <div key={feild.id}  className="mb-3" >
            <FormFields {...feild} error={state.error} defaultValue={fieldValue} />
          </div>
        )
      })
}
<Button type="submit" disabled={pending} className="w-full rounded-xl cursor-pointer">{pending ? 'Loading...' : 'Sign UP'}</Button>
    </form >
  )
}

export default Form