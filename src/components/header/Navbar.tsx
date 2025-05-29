'use client'
import { Pages, Routes } from "@/app/constants/enums"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Menu, XIcon } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const links = [
    { id: crypto.randomUUID(), title: 'Menu', href: Routes.MENU },
    { id: crypto.randomUUID(), title: 'About', href: Routes.ABOUT },
    { id: crypto.randomUUID(), title: 'Contact', href: Routes.CONTACT },
    { id: crypto.randomUUID(), title: 'login', href: `${Routes.AUTH}/${Pages.LOGIN}` },

  ]
  const [open, setOpen] = useState(false)
  return (

    <div className="flex items-center justify-center">
      <ul className={`absolute space-y-3 p-25 lg:p-0  bg-accent lg:bg-transparent  lg:static top-0 w-full  h-[100vh] lg:w-fit lg:h-fit  gap-5 items-center justify-center lg:flex ${!open ? '-left-[1000px]': 'left-0'} `}>
        <Button onClick={() => setOpen(!open)} className="lg:hidden cursor-pointer absolute top-10 right-25" variant={'ghost'}><XIcon /></Button>

        {links.map(link => (
          <li className="border-b-1 lg:border-0 " key={link.id}>
            <Link className={`${link.href === `${Routes.AUTH}/${Pages.LOGIN}` ? `${buttonVariants({ size: 'lg' })} rounded-lg w-full lg:w-fit` : 'hover:text-primary duration-200 transition-colors font-semibold'} font-semibold`} href={`/${link.href}`}>
              {link.title}
            </Link>
          </li>
        ))
        }
      </ul >
      <Button onClick={()=> setOpen(!open)} className="lg:hidden cursor-pointer" variant={'secondary'}><Menu /></Button>
    </div>
  )
}

export default Navbar