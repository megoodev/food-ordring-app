'use client'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { FormatCurrency } from "@/lib/Formatters"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Extra, ProductSizes, Size } from "@prisma/client"
import { productWithRelation } from "@/lib/types/types"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hoox"
import { addCartItem, removeCartItem, removeItemFromCart, selectItemsState } from "../redux/features/cart/cartSlice"
import Link from "next/link"




const AddToCart = ({ product }: { product: productWithRelation }) => {

  const dispatch = useAppDispatch()
  const cart = useAppSelector(selectItemsState)
  const defaultSize = cart.find((item) => item.id === product.id)?.size || product.sizes.find((size) => size.name === ProductSizes.SMALL) as Size

  const [selectedSize, setselectedSize] = useState<Size>(defaultSize as Size)
  const defaultExtras = cart.find((item) => item.id === product.id)?.extras || []
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras)
  let totalPrice = product.basePrice

  if (selectedSize) {
    totalPrice += selectedSize.price
  }
  if (selectedExtras.length > 0) {
    totalPrice += selectedExtras.reduce((acc, extra) => acc + extra.price, 0)
  }
  const handleAddToCart = () => {
    dispatch(addCartItem({
      name: product.name,
      id: product.id,
      image: product.image,
      basePrice: product.basePrice,
      size: selectedSize,
      extras: selectedExtras,
    }))
  }
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart))
  }, [cart])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-4xl  mx-auto cursor-pointer">Add To Cart</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[600px]  overflow-y-auto">
        <DialogHeader>
          <div className="relative !w-48 !h-48 mx-auto">
            <Image alt="pizza" src={product.image} fill className="object-cover" />
          </div>
          <div className="text-center">
            <DialogTitle className="mb-3">{product.name}</DialogTitle>
            <DialogDescription>
              {product.description}
            </DialogDescription>
          </div>

        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">
            <Label htmlFor="Size" className="text-center mb-3 text-lg font-semibold">
              Sizes
            </Label>
          </div>
          <ProductSize product={product} sizes={product.sizes} selectedSize={selectedSize} setSelectedSize={setselectedSize} />
          <div className="flex justify-center">
            <Label htmlFor="Extra" className="text-center mb-3 text-lg font-semibold">
              Exters
            </Label>
          </div>
          <ProductExtra extras={product.extras} selectedExtras={selectedExtras} setSelectedExtras={setSelectedExtras} />
        </div>
        <DialogFooter>
          <div className="flex justify-between w-full flex-col gap-2">
            {
              cart.find((item) => item.id === product.id) && (
                <div className="flex items-center gap-2 w-full justify-center">
                  <Button onClick={() => dispatch(removeCartItem({ id: product.id }))} variant='outline' className="w-fit h-fit rounded-md cursor-pointer" type="submit">-</Button>
                  <span>{cart.find((item) => item.id === product.id)?.quantity || 1}</span>
                  <Button onClick={() => dispatch(addCartItem({
                    name: product.name,
                    id: product.id,
                    image: product.image,
                    basePrice: product.basePrice,
                    size: selectedSize,
                    extras: selectedExtras,
                    quantity: (cart.find((item) => item.id === product.id)?.quantity || 1) + 1
                  }))} variant='outline' className="w-fit h-fit rounded-md cursor-pointer" type="submit">+</Button>
                </div>
              )
            }
            {
              cart.find((item) => item.id === product.id) ? <div className="flex justify-center items-center gap-2">
                <Button onClick={() => dispatch(removeItemFromCart(product.id))} variant='link' className="rounded-md cursor-pointer" type="submit">Remove</Button>
                <Link href='/cart'>
                  <Button variant='link' className="rounded-md cursor-pointer" type="submit">Checkout</Button>
                </Link>
              </div> :
                <Button onClick={handleAddToCart} className="w-full rounded-4xl cursor-pointer" type="submit">Pay Now {FormatCurrency(totalPrice * (cart.find((item) => item.id === product.id)?.quantity || 1))}</Button>
            }
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddToCart


const ProductExtra = ({ extras, selectedExtras, setSelectedExtras }: { extras: Extra[], selectedExtras: Extra[], setSelectedExtras: (extras: Extra[]) => void }) => {
  const handleExtraClick = (extra: Extra) => {
    if (selectedExtras.find((item) => item.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((item) => item.id !== extra.id))
    } else {
      setSelectedExtras([...selectedExtras, extra])
    }
  }
  return (
    <div className="border mb-1 p-2">
      {extras.map((extra) => (
        <div key={extra.id} className="flex items-center space-x-2 border p-2.5 rounded-sm">
          <Checkbox id={extra.id} checked={Boolean(selectedExtras.find((item) => item.id === extra.id))} onClick={() => handleExtraClick(extra)} />
          <Label htmlFor={extra.id}>{extra.name} {FormatCurrency(extra?.price)}</Label>
        </div>
      ))}
    </div>
  )
}
const ProductSize = ({ product, sizes, selectedSize, setSelectedSize }: { product: productWithRelation, sizes: Size[], selectedSize: Size, setSelectedSize: (size: Size) => void }) => {
  return (
    <RadioGroup >

      {sizes.map((size) => (
        <div key={size.id} className="flex items-center space-x-2 border p-2.5 rounded-sm">
          <RadioGroupItem value={selectedSize?.name} checked={selectedSize?.name === size?.name} onClick={() => setSelectedSize(size)} id={size?.name} />
          <Label htmlFor={size?.name}>{size?.name} {FormatCurrency(size?.price + product.basePrice)}</Label>
        </div>
      ))}
    </RadioGroup >

  )
}
