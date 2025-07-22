import { Routes } from "@/app/constants/enums"
import BasteHeading from "../mainHeading"


const About = () => {
  return (
    <section className='section-gap' id={Routes.ABOUT}>
      <div className='container text-center'>
        <BasteHeading title={'Our Story'} description={'About US'} />
        <div className='text-gray-400 max-w-md mx-auto mt-4 flex flex-col gap-4'>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facilis sit reprehenderit accusantium fugiat, sequi praesentium consectetur doloremque obcaecati asperiores ipsum numquam eum repellat modi repellendus expedita provident atque voluptate?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis sit, laborum asperiores dolores accusamus, laudantium iusto aliquam dolor sapiente exercitationem praesentium vel illo ea, deleniti magni laboriosam. Accusantium, odio sequi.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis sit, laborum asperiores dolores accusamus, laudantium iusto aliquam dolor sapiente exercitationem praesentium vel illo ea, deleniti magni laboriosam. Accusantium, odio sequi.</p>
        </div>
      </div>
    </section>
  )
}

export default About