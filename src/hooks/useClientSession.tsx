'use client'

import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const useClientSession = ({ intialSession }: { intialSession : Session | null}) => {
  const {data: session, status} = useSession()
  const [defaultSession, setDefaultSession] = useState<Session | null>(null)
  useEffect(()=> {
    if(session) {
      setDefaultSession(session)
    }
  }, [session])
  useEffect(() => {
    if(intialSession) {    
      setDefaultSession(intialSession)
    }}, [intialSession])
    
  return {
    data: defaultSession,
    status: status
  }
}

export default useClientSession