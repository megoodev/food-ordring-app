'use client'
import Link from 'next/link'
import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { Routes } from '@/app/constants/enums'
import { useAppSelector } from '@/app/redux/hoox'
import { selectItemsState } from '@/app/redux/features/cart/cartSlice'

const Cart = () => {
  const cart = useAppSelector(selectItemsState)
  const totalProduct = cart.reduce((acc, item) => acc + (item?.quantity || 1), 0)
  return (
    <Link href={`/${Routes.CART}`}>
      <span className='relative'>
        <ShoppingCart  className='z-50 text-2xl'/>
        <span className='absolute z-5 lg:-top-2 -top-2 lg:-right-2 right-[89%] -rotate-25 lg:rotate-0 bg-primary text-white rounded-xl lg:rounded-full w-4 h-4 lg:w-5 lg:h-5  flex items-center justify-center'>
          {totalProduct}
        </span>
      </span>
    </Link>
  )
}

export default Cart