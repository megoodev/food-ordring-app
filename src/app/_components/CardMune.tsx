
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import AddToCart from "./AddToCart"
import Image from "next/image"
import { FormatCurrency } from "@/lib/Formatters"
import { productWithRelation } from "@/lib/types/types"

const CardMune = ({ product }: { product: productWithRelation }) => {
  return (
    <Card className="relative bg-white w-full max-w-xs sm:max-w-sm md:max-w-md rounded-3xl shadow-xl border border-gray-100 p-0 flex flex-col items-center overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      {/* Image with colored ring */}
      <div className="bg-white rounded-xl p-1 shadow-md border border-gray-100 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl overflow-hidden">
          <Image alt="pizza" src={product.image} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>
      {/* Floating price badge */}
      <CardContent className="flex-1 flex flex-col justify-between items-center w-full p-6 pt-8">
        <CardTitle className="text-xl font-extrabold text-primary mb-2 text-center w-full">
          <div className="flex items-center justify-evenly gap-2">
            <span className="text-lg font-bold text-primary">{product.name}</span>
            <span className="text-lg font-bold text-green-500">{FormatCurrency(product.basePrice)}</span>
          </div>
        </CardTitle>
        <CardDescription className="line-clamp-2 text-gray-500 text-base mb-4 text-center w-full">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center w-full p-4 pt-0">
        <AddToCart product={product} />
      </CardFooter>
    </Card>
  )
}

export default CardMune