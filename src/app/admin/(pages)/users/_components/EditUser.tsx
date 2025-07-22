'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Edit2Icon } from 'lucide-react'
import { Pages, Routes } from '@/app/constants/enums'

const EditUser = ({ id }: { id: string }) => {
  const router = useRouter()
  return (
    <Button variant='outline' className='rounded-xl flex-1 md:flex-0' onClick={()=> router.push(`/${Routes.ADMIN}/${Pages.USERS}/${id}/${Pages.EDIT}`)}><span className='md:hidden'>Edit</span><Edit2Icon/></Button>
  )
}

export default EditUser