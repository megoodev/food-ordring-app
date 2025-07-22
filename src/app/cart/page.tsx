'use client'
import { selectItemsState } from '../redux/features/cart/cartSlice'
import { useAppSelector } from '../redux/hoox'
import CartItems from './_components/CartItems'
import { FormatCurrency } from '@/lib/Formatters'
import CheckoutForm from './_components/CheckoutForm'

const PageCart = () => {
  const cart = useAppSelector(selectItemsState)
  const subtotal = cart.reduce((acc, item) => acc + (item.basePrice + (item?.size?.price || 0) + (item.extras || []).reduce((acc, extra) => acc + (extra?.price || 0), 0)) * (item?.quantity || 1), 0)
  const tax = subtotal * 0.1
  const deliveryFee = 5
  const total = subtotal + 10 + tax + deliveryFee
  return (
    <main>
      <div className='container h-[75.5vh] mb-10 py-10'>
        <h1 className='text-2xl font-bold text-center my-8'>Cart</h1>
        {cart.length > 0 ? (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 grid-rows-1'>

            <div className='col-span-1'>
              <div className='col-span-1'>
                <CartItems items={cart} />
                <hr className='my-4' />
                <div className='flex justify-end gap-2 flex-col  border rounded-xl shadow-lg p-5'>
                  <p className='text-lg font-bold'>Subtotal: {FormatCurrency(subtotal)}</p>
                  <p className='text-lg font-bold'>Delivery Fee: {FormatCurrency(deliveryFee)}</p>
                  <p className='text-lg font-bold'>Tax: {FormatCurrency(tax)}</p>
                  <p className='text-lg font-bold'>Total: {FormatCurrency(total)}</p>
                </div>
              </div>

            </div>
            <div className='col-span-1 border p-5 shadow-lg mb-10'>
              <h2 className='text-lg font-bold mb-5'>Checkout</h2>
              <div className='flex flex-col gap-2'>
                <CheckoutForm total={total} />
              </div>
            </div>
          </div>
        ) : (
          <div className='col-span-1'>
            <h2 className='text-lg font-bold text-center text-accent'>there is no items in your cart</h2>
          </div>
        )}
      </div>
    </main>
  )
}

export default PageCart