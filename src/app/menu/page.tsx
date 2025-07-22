import { getProductsByCategory } from "@/server/db/Product"
import Menu from "../_components/Menu"


const page = async () => {
  const categorieis = await getProductsByCategory()
  return (
    <main className="container max-w-7xl mx-auto py-10 flex flex-col gap-10">
      {categorieis.map((category) => (
        <section className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 animate-fade-up animate-once animate-duration-700 animate-ease-out" key={category.name}>
          <h1 className="text-center text-primary text-3xl font-bold mt-8 mb-6">{category.name}</h1>
          <Menu products={category.product} />
        </section>
      ))}
    </main>
  )
}

export default page