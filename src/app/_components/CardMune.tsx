
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AddToCart from "./AddToCart"
import Image from "next/image"
import { FormatCurrency } from "@/lib/Formatters"

const CardMune = () => {
  return (
    <Card className="w-[350px] bg-accent hover:bg-transparent transition-all duration-300">
      <CardHeader>
        <div className="relative !w-48 !h-48 mx-auto">
          <Image alt="pizza" src={'/assets/images/pizza.png'} fill className="object-cover" />
        </div>

      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-3">
          <CardTitle>Margrita Pizza</CardTitle>
          <span>{FormatCurrency(12.5)}</span>
        </div>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <AddToCart />
      </CardFooter>
    </Card>
  )
}

export default CardMune