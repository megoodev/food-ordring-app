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
const AddToCart = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-4xl mx-auto cursor-pointer">Add To Cart</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  overflow-y-auto">
        <DialogHeader>
          <div className="relative !w-48 !h-48 mx-auto">
            <Image alt="pizza" src={'/assets/images/pizza.png'} fill className="object-cover" />
          </div>
          <div className="text-center">
            <DialogTitle className="mb-3">ayhaga</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </div>

        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">
            <Label htmlFor="Size" className="text-center mb-3 text-lg font-semibold">
              Sizes
            </Label>
          </div>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2 border p-2.5 rounded-sm">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">small {FormatCurrency(12.5)}</Label>
            </div>
          </RadioGroup>
          <div className="flex justify-center">
            <Label htmlFor="Extra" className="text-center mb-3 text-lg font-semibold">
              Exters
            </Label>
          </div>
          <div className="border mb-3 p-2">
            <Label htmlFor="name" className="text-right">
              <Checkbox />
              Onion {FormatCurrency(2)}
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full rounded-4xl cursor-pointer" type="submit">Pay Now {FormatCurrency(12.5)}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddToCart