'use client'
import { Category } from '@prisma/client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EditIcon } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { ValidationError } from 'next/dist/compiled/amphtml-validator'
import { editCategories } from '../_actions/category'
import { toast } from 'sonner'

const EditCategory = ({ category }: { category: Category }) => {
  type InitialStateType = {
    message?: string | null;
    error?: ValidationError;
    status?: number | null;
  };
  const initialState: InitialStateType = {
    message: "",
    error: {},
    status: null,
  };
  const [state, action, pending] = useActionState(editCategories.bind(null, category.id), initialState)
  useEffect(()=> {
    toast.success(state?.message)
  },[state, state?.message])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Change Category Name
          </DialogTitle>
        </DialogHeader>
        <form action={action} className="pt-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="category-name">
              name
            </Label>
            <div className="flex-1 relative">
              <Input
                type="text"
                id="categoryName"
                name="categoryName"
                defaultValue={category.name}
                placeholder={"Enter category name"}
              />
              {state.error?.categoryName && (
                <p className="text-sm text-destructive absolute top-12">
                  {state.error?.categoryName}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="mt-10">
            <DialogClose asChild>
              <Button type="submit" disabled={pending}>
                {pending ? 'Loading...' : "Save"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditCategory