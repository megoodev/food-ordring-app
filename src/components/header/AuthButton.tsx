'use client'

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"
import Link from "next/link"
import { Pages, Routes } from "@/app/constants/enums"
import useClientSession from "@/hooks/useClientSession"
import { Session } from "next-auth"

const AuthButton = ({ intialSession }: { intialSession : Session | null}) => {
  const Session = useClientSession({ intialSession })

  return <div> 
    {Session.data?.user && <div> <Button className="rounded-xl lg:w-fit w-full" onClick={()=> signOut()}>Sign Out</Button></div>}
    {!Session.data?.user && (
      <div className="flex gap-2 items-center flex-col lg:flex-row">
        <Button className="rounded-xl lg:w-fit w-full" variant="secondary">
          <Link href={`/${Routes.AUTH}/${Pages.LOGIN}`}>Login</Link>
        </Button>
        <Link href={`/${Routes.AUTH}/${Pages.LOGIN}`}></Link>
          <Button className="rounded-xl lg:w-fit w-full">
            <Link href={`/${Routes.AUTH}/${Pages.Register}`}>Register</Link>
          </Button>
      </div>
    )}
    </div>
}

export default AuthButton