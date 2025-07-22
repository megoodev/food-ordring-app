
import Hero from './_components/hero'
import BestSellers from './_components/BestSellers'
import About from '@/components/about/About'
import Contact from '@/components/contact/contact'

const Home = async () => {
  return (
    <main className="container max-w-7xl mx-auto py-10 flex flex-col gap-10">
      <section className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 animate-fade-up animate-once animate-duration-700 animate-ease-out">
        <Hero />
      </section>
      <section className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 animate-fade-up animate-once animate-duration-700 animate-ease-out">
        <BestSellers />
      </section>
      <section className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 animate-fade-up animate-once animate-duration-700 animate-ease-out">
        <About />
      </section>
      <section className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 animate-fade-up animate-once animate-duration-700 animate-ease-out">
        <Contact />
      </section>
    </main>
  )
}

export default Home