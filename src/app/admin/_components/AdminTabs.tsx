'use client'
import { Pages, Routes } from "@/app/constants/enums"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
const AdminTabs = () => {
  const AdminLinks = [
    { name: Routes.ADMIN, path: `/${Routes.ADMIN}` },
    { name: Pages.CATEGORIES, path: `/${Routes.ADMIN}/${Pages.CATEGORIES}` },
    { name: Pages.MENU_ITEMS, path: `/${Routes.ADMIN}/${Pages.MENU_ITEMS}` },
    { name: Pages.USERS, path: `/${Routes.ADMIN}/${Pages.USERS}` },
    { name: Pages.ORDERS, path: `/${Routes.ADMIN}/${Pages.ORDERS}` },
  ]
  return (
    <div className="element-center mt-5 pt-5">
      <ul className=" container flex gap-4 w-full flex-col md:flex-row lg:gap-8 justify-center items-center">
        {AdminLinks.map((link) => (
          <li key={link.name} className="w-full md:w-fit">
            <Link className={`${buttonVariants({ variant: 'outline' })} hover:text-white w-full`} href={link.path} >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminTabs