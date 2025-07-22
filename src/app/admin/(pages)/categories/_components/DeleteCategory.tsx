'use client'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DeleteCategories } from '../_actions/category'
import { toast } from 'react-hot-toast'
import { ValidationError } from 'next/dist/compiled/amphtml-validator'



const DeleteCategory = ({ id }: { id: string }) => {
  const [state, setState] = useState<{
    message?: string | null;
    error?: ValidationError;
    status?: number | null;
  }>()



  const handleDelete = async (id: string) => {
    const res = await DeleteCategories(id)
    setState(res)
  }
  useEffect(() => {
    if (state?.status === 200) {
      toast.success(state?.message as string || "Category deleted successfully")
    }
  }, [state?.status, state?.message])
  return (
    <Button onClick={() => handleDelete(id)} className='rounded-xl' variant={'destructive'} size='icon'>
      <Trash />
    </Button>
  )
}

export default DeleteCategory