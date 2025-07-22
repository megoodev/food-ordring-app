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
      <div className='container element-center py-10'>

        {users.map((user: User) => (
          <div key={user.id} className='container flex justify-between items-center w-full p-5 border bg-white rounded-xl  py-5'>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <div className='flex gap-2'>
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