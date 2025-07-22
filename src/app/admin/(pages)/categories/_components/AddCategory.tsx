'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ValidationError } from "next/dist/compiled/amphtml-validator"
import { useActionState, useEffect } from "react"
import { AddCategories } from "../_actions/category"
import { toast } from 'react-hot-toast'

const AddCategory = () => {
  type InitialStateType = {
    message?: string | null;
    error?: ValidationError;
    status?: number | null;
  };
  const initialState: InitialStateType = {
    message: null,
    error: {},
    status: null,
  };

  const [state, action, pending] = useActionState(AddCategories, initialState)

  useEffect(()=> {
    if(state.status && state.status === 201){
      toast.success(state?.message as string || "Category added successfully");
    }
  }, [state.status]);
  return (
    <section className="py-10 mb-5 flex-col container ">
      <div className="mb-10 ">
        <h2 className="text-primary text-center font-semibold text-2xl">Add New Category</h2>
      </div>

      <form action={action} className="w-[625px] mx-auto">
        <div className="flex gap-5" >
          <div className="w-full flex gap-1">
            <Label  className="w-[140px]">
              Category Name:
            </Label>
            <Input type="text" name="name"/>
          </div>
          <Button disabled={pending} className="rounded-xl w-[100px]" type="submit">{pending? 'loading...':'create'}</Button>
        </div>
        {state &&state.error && state?.error?.name && (
          <p className="text-destructive ms-28  text-sm font-medium">
            {state.error.name}
          </p>
        )}
      </form>
      {/* Additional form fields can be added here */}
    </section>
  )
}

export default AddCategory