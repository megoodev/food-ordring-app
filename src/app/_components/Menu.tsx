import { productWithRelation } from "@/lib/types/types"
import CardMune from "./CardMune"
const Menu = async ({ products }: { products: productWithRelation[] }) => {


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 overflow-x-auto  gap-10 mt-5 ">

      {products.map((product) => {
        return (
          <CardMune key={product.id} product={product} />
        )
      })}
    </div>
  )
}

export default Menu