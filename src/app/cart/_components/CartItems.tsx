'use client'
import { FormatCurrency } from "@/lib/Formatters"
import { CartItem, removeItemFromCart } from "@/app/redux/features/cart/cartSlice"
import { useAppDispatch } from "@/app/redux/hoox"
import { Trash2Icon } from "lucide-react"
import Image from "next/image"

const CartItems = ({ items }: { items: CartItem[] }) => {
  const dispatch = useAppDispatch()
  return (

    <div className="flex flex-col gap-6">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 flex text-center md:text-left flex-col sm:flex-row items-center gap-4 hover:shadow-lg transition-shadow">
          <Image src={item.image} alt={item.name} width={100} height={100} className='rounded-xl w-24 h-24 object-cover border-2 border-primary/20 shadow-sm' />
          <div className='flex flex-col gap-2 flex-1 w-full'>
            <span className='text-lg font-bold text-primary'>{item.name}</span>
            <span className='text-sm text-gray-700'><span className='font-semibold'>Size:</span> {item.size?.name}</span>
            {item.extras?.length && item.extras?.length > 0 ?
              <p className='text-xs text-gray-500'><span className='font-semibold'>Extras:</span> {item.extras?.map((extra) => extra.name).join(', ')}</p>
              : <p className='text-xs text-gray-400'><span className='font-semibold'>Extras:</span> No extras</p>}
            <span className='text-sm'><span className='font-semibold text-gray-700'>Quantity:</span> <span className="text-primary font-bold">{item.quantity || 1}</span></span>
          </div>
          <div className='flex flex-row md:flex-col items-center gap-2 min-w-[100px] '>
            <span className='text-lg font-extrabold text-green-600'>
              {FormatCurrency(
                (item.basePrice + (item?.size?.price || 0) + (item.extras || []).reduce((acc, extra) => acc + (extra.price || 0), 0)) * (item?.quantity || 1)
              )}
            </span>
            <button onClick={() => dispatch(removeItemFromCart(item.id))} className='p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors shadow'>
              <Trash2Icon className='w-6 h-6 text-red-500' />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartItems