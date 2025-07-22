import BasteHeading from "@/components/mainHeading"
import Menu from "./Menu"
import { getBeastSellarys } from "@/server/db/Product"
import { productWithRelation } from "@/lib/types/types"


const BestSellers = async () => {
  const products = await getBeastSellarys(3)
  return (
    <section>
      <div className="container my-10">
        <div className="text-center">
          <BasteHeading title={'CHECK OUT'} description={'Our Best Sellers'} />
        </div>

          <Menu products={products as productWithRelation[]}/>

      </div>

    </section>
  )
}

export default BestSellers