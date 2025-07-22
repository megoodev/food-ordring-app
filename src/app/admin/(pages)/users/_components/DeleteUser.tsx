'use client'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { removeUser } from '../_actions/users'
import { toast } from 'react-hot-toast'

const DeleteUser = ({ id }: { id: string }) => {
  const [state, setState] = useState<{
    message?: string | null;
    error?: string | null;
    status?: number | null;
  }>({
    message: "",
    error: "",
    status: null,
  })
  const handleDelete = async (id: string) => {
    const res = await removeUser(id)
    setState({
      message: res.data?.message,
      error: res?.error,
      status: res?.status,
    })
  }
  useEffect(() => {
    if (state?.status === 200) {
      toast.success(state?.message as string || "User deleted successfully")
    } else if (state?.error) {
      toast.error(state.error)
    }
  }, [state, state?.status, state?.error])
  return (
    <Button onClick={() => handleDelete(id)} className='rounded-xl flex-1 md:flex-0'><span className='md:hidden'>Delete</span><TrashIcon/></Button>
  )
}

export default DeleteUser



