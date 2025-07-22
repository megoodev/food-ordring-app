import Form from '@/components/form/Form'
import { authOptions } from '@/server/auth'
import { getServerSession, Session } from 'next-auth'
import React from 'react'

const page = async() => {
  const session = await getServerSession(authOptions)
  
  return (
    <main>
      <div className='container element-center py-10' >
        <div className='w-full'>
          <div className='element-center'>
            <h1 className='text-3xl font-bold italic'>Profile</h1>
          </div>

          <Form user={session?.user as Session['user']} />

        </div>
      </div>
    </main>
  )
}

export default page