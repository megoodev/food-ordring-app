import { getCategory } from "@/server/db/category"
import CategoryItem from "./CategoryItem"


const CategoriesList = async () => {
  const categories = await getCategory()
  return (
    <div>
      {categories.length == 0 ? (
        <p className="text-gray-300 text-center font-semibold mb-68">No categories found</p>
      ) : (
        categories.map((category, index) => (
          <div key={category.id} className="mb-5">
            <CategoryItem  category={category} index={index + 1}/>
          </div>
        ))
      )}

    </div>
  )
}

export default CategoriesList