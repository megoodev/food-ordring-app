import BasteHeading from "@/components/mainHeading"
import Menu from "./Menu"


const BestSellers = () => {
  return (
    <section>
      <div className="container my-10">
        <div className="text-center">
          <BasteHeading title={'CHECK OUT'} description={'Our Best Sellers'} />
        </div>
        <Menu />
      </div>

    </section>
  )
}

export default BestSellers