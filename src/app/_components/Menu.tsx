import { productWithRelation } from "@/lib/types/types"
import CardMune from "./CardMune"
const Menu = async ({ products }: { products: productWithRelation[] }) => {


  return (
    <div className="flex flex-wrap gap-5 justify-evenly mt-5 section-gap">

      {products.map((product) => {
        return (
          <CardMune key={product.id} product={product} />
        )
      })}
    </div>
  )
}

export default Menu