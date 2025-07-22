import Form from "@/components/form/Form"
import { getUser } from "@/server/db/users"
import { User } from "@prisma/client"


const page = async ({params}: {params: Promise<{ userId: string }>}) => {
  const {userId} = await params 
  const user = await getUser(userId)
  return (
    <main>
      <div className="container py-10">
        <h1 className="text-2xl font-bold text-primary text-center">Edit User</h1>
        <Form user={user as User} />
      </div>
    </main>
  )
}

export default page