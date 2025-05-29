
import { db } from "@/lib/db"
import CardMune from "./CardMune"
const Menu = async() => {
  const products = await db.product.findMany()
  console.log(products)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
      <CardMune />
      <CardMune />
      <CardMune />
    </div>
  )
}

export default Menu