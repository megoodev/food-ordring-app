import { getUsers } from '@/server/db/users'
import React from 'react'
import EditUser from './_components/EditUser'
import DeleteUser from './_components/DeleteUser'
import { getServerSession } from 'next-auth'
import { User } from '@prisma/client'

const usersPage = async () => {
  const session = await getServerSession()
  const users = (await getUsers(session?.user?.email as string)) as User[];

  return (
    <main>
      <div className='container element-center py-10 flex flex-col gap-5'>

        {users.map((user: User) => (
          <div key={user.id} className='container w-[800px] max-w-[99%] flex-col  md:flex-row flex md:justify-between items-start gap-2 md:items-center p-5 border bg-white rounded-xl  py-5'>
            <h3 className='text-md font-light'><span className='md:hidden inline-block w-[50px] font-bold'>Name: </span>{user.name}</h3>
            <p className='text-md font-light'><span className='md:hidden inline-block w-[50px] font-bold'>Email: </span>{user.email}</p>
            <p className='text-md font-light'><span className='md:hidden inline-block w-[50px] font-bold'>Role: </span>{user.role}</p>
            <div className='flex gap-2 justify-between w-full md:w-fit'>
              <EditUser id={user.id} />
              <DeleteUser id={user.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default usersPage