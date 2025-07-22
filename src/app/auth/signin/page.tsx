import { Pages, Routes } from "@/app/constants/enums"
import Link from "next/link"
import Form from "./_components/Form"

const SigninPage = () => {
  return (
    <main>
      <div className="py-44 bg-gray-50 md:py-40 element-center">
        <div className="element-center container">
          <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
            <h2 className="font-semibold text-2xl text-black text-center mb-4">Welcome Back!</h2>
            <Form />
            <p className="element-center text-md font-semibold space-x-2 my-2">
              <span className="text-gray-400">Don&apos;t have an account</span> 
              <Link href={`/${Routes.AUTH}/${Pages.Register}`}> Sing Up</Link>
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}

export default SigninPage