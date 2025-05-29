import Link from "next/link"
import Navbar from "./Navbar"
import { Routes } from "@/app/constants/enums"

const Header = () => {
  return (
    <header>
      <div className="container flex justify-between items-center py-4">
        <Link className="font-semibold" href={Routes.ROOT}>🍕 Pizza</Link>
        <Navbar />
      </div>
    </header>
  )
}

export default Header