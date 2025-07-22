'use client'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DeleteCategories } from '../_actions/category'
import { toast } from 'sonner'

type DeleteCategoryResponse =
  | { status: number; data: { message: string }; error?: undefined; Status?: undefined }
  | { error: string; Status: number; status?: undefined; data?: undefined };

const DeleteCategory = ({ id }: { id: string }) => {
  const [state, setState] = useState<DeleteCategoryResponse | undefined>(undefined)
  const handleDelete = async (id: string) => {
    const res = await DeleteCategories(id)
    setState(res)
  }
  useEffect(() => {
    if (state?.status === 200) {
      toast.success(state.data.message)
    } else if (state?.error) {
      toast.error(state.error)
    }
  }, [state, state?.status, state?.error])
  return (
    <Button onClick={() => handleDelete(id)} className='rounded-xl' variant={'destructive'} size='icon'>
      <Trash />
    </Button>
  )
}

export default DeleteCategory