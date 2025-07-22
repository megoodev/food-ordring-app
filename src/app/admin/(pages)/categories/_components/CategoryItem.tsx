import { Category } from '@prisma/client'
import EditCategory from './EditCategory'
import DeleteCategory from './DeleteCategory'

const CategoryItem = ({ category,index }: {category: Category, index: number}) => {
  return (
    <div className='w-[625px] mx-auto p-5 border bg-white rounded-xl flex justify-between items-center mb-5'>
      <h3> 
        {index}. {category.name}
      </h3>
      <div className='flex items-center gap-2'>
        <EditCategory category={category} />
        <DeleteCategory id={category.id} />
      </div>
    </div>
  )
}

export default CategoryItem