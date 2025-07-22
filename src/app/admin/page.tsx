import Form from '@/components/form/Form'
import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <div className='container element-center py-10' >
        <div className='w-full'>
          {session?.user && <Form user={session.user}/>}
        </div>
      </div>
    </main>
  )
}

export default page

