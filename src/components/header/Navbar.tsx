'use client'
import {  Routes, UserRole } from "@/app/constants/enums"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, XIcon } from "lucide-react"
import { useState } from "react"
import Cart from "./Cart"
import AuthButton from "./AuthButton"
import { Session } from "next-auth"
import useClientSession from "@/hooks/useClientSession"


const Navbar = ({ intialSession }: { intialSession : Session | null}) => {
  const links = [
    { id: crypto.randomUUID(), title: 'Menu', href: Routes.MENU },
    { id: crypto.randomUUID(), title: 'About', href: Routes.ABOUT },
    { id: crypto.randomUUID(), title: 'Contact', href: Routes.CONTACT },
  ]
  const [open, setOpen] = useState(false)
  const session = useClientSession({ intialSession })
  return (
    <nav className="relative">
      {/* Mobile menu backdrop */}
      {open && (
        <div className="fixed inset-0  lg:hidden bg-black/30 h-screen w-screen z-10" onClick={() => setOpen(false)} />
      )}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <Button onClick={() => setOpen(!open)} className="lg:hidden cursor-pointer " variant={'secondary'} aria-label="Open menu">
          <Menu />
        </Button>
        {/* Nav links */}
        <ul className={`fixed lg:static z-50 top-0 left-0 h-screen w-3/4 max-w-xs bg-white  shadow-lg p-8 flex flex-col gap-6 transition-transform duration-300 lg:transition-none lg:flex-row lg:items-center lg:bg-transparent lg:shadow-none lg:p-0 lg:w-auto lg:h-auto ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          {/* Close button inside mobile menu */}
          <li className="lg:hidden flex justify-end mb-4">
            <Button onClick={() => setOpen(false)} variant="ghost" aria-label="Close menu"><XIcon /></Button>
          </li>
          {links.map(link => (
            <li key={link.id}>
              <Link onClick={() => setOpen(false)} className={ ' w-full lg:w-fit rounded-fullfont-semibold px-2 py-1 hover:text-primary duration-200 transition-colors'} href={`/${link.href}`}>
                {link.title}
              </Link>
            </li>
          ))}
          {session.data?.user && session.data?.user.role === UserRole.ADMIN && (
            <li>
              <Link onClick={() => setOpen(false)} className={' w-full lg:w-fit rounded-fullfont-semibold px-2 py-1 hover:text-primary duration-200 transition-colors'} href={`/${Routes.ADMIN}`}>
                Admin
              </Link>
            </li>
          )}
          {session.data?.user && session.data?.user.role !== UserRole.ADMIN && (
            <li >
              <Link onClick={() => setOpen(false)} className={' w-full lg:w-fit rounded-fullfont-semibold px-2 py-1 hover:text-primary duration-200 transition-colors'} href={`/${Routes.PROFILE}`}>
                Profile
              </Link>
            </li>
          )}
          <li className="lg:hidden flex flex-col gap-4">
            <Cart />
            <AuthButton intialSession={intialSession} />
          </li>
        </ul>
        
      </div>
    </nav>
  )
}

export default Navbar