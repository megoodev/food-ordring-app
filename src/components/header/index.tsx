import Link from "next/link"
import Navbar from "./Navbar"
import { Routes } from "@/app/constants/enums"
import Cart from "./Cart"
import AuthButton from "./AuthButton"
import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth"

const Header = async () => {
  const intialSession = await getServerSession(authOptions)
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md shadow-md rounded-b-2xl transition-all">
      <div className="container flex justify-between items-center py-4">
        <Link className="flex items-center gap-2 font-extrabold text-2xl tracking-tight italic mr-5 text-primary" href={Routes.ROOT}>
          <span className="inline-block text-2xl">🍕</span>
          Pizza
        </Link>
        <Navbar intialSession={intialSession}  />
        <div className="hidden lg:flex flex-1 items-center justify-end gap-4">
          <AuthButton intialSession={intialSession}  />
          <Cart />
        </div>
      </div>
    </header>
  )
}

export default Header