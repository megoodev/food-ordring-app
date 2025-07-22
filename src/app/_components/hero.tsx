import { buttonVariants } from "@/components/ui/button"
import { ArrowRightCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <section>
      <div className="container grid grid-cols-1 lg:grid-cols-2 my-5 gap-16">
        <div className="py-10">
          <h1 className="font-semibold text-3xl">Slice into Happiness</h1>
          <p className="font-semibold mt-3">Craving Pizza? We&apos;ve got you covered with fresh ingredients, endless flavors, and the fastest delivery. Your perfect slice is just a tap away!</p>
          <div className="mt-5 flex gap-5 items-center">
            <Link href={'/'} className={`${buttonVariants({ size: 'lg' })} rounded-4xl cursor-pointer`} >ORDER NOW <ArrowRightCircle /></Link>
            <Link href={'/'} className=" cursor-pointer flex gap-2 items-center" >Learn More  <ArrowRightCircle /></Link>
          </div>
        </div>
        <div className="relative">
          <Image src={'/assets/images/pizza.png'} className="object-contain" alt="pizza" fill loading="eager" priority></Image>
        </div>
      </div>
    </section>
  )
}

export default Hero