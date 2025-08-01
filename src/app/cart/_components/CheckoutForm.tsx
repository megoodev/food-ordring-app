import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormatCurrency } from "@/lib/Formatters"

const CheckoutForm = ({ total }: { total: number }) => {
  return (
    <form className="mb-10">
      <div className='grid gap-4'>
        <div className='grid gap-1'>
          <Label htmlFor='phone' className='text-foreground'>
            Phone
          </Label>
          <Input
            id='phone'
            placeholder='Enter your phone'
            type='text'
            name='phone'
          />
        </div>
        <div className='grid gap-1'>
          <Label htmlFor='address' className='text-foreground'>
            Street address
          </Label>
          <Textarea
            id='address'
            placeholder='Enter your address'
            name='address'
            className='resize-none'
          />
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div className='grid gap-1'>
            <Label htmlFor='postal-code' className='text-foreground'>
              Postal code
            </Label>
            <Input
              type='text'
              id='postal-code'
              placeholder='Enter postal code'
              name='postal-code'
            />
          </div>
          <div className='grid gap-1'>
            <Label htmlFor='city' className='text-foreground'>
              City
            </Label>
            <Input
              type='text'
              id='city'
              placeholder='Enter your City'
              name='city'
            />
          </div>
          <div className='grid gap-1'>
            <Label htmlFor='country' className='text-foreground'>
              Country
            </Label>
            <Input
              type='text'
              id='country'
              placeholder='Enter your country'
              name='country'
            />
          </div>
        </div>
        <Button className='h-10'>Pay {FormatCurrency(total)}</Button>
      </div>
    </form>
  )
}

export default CheckoutForm