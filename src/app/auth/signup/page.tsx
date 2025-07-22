import { Pages, Routes } from '@/app/constants/enums'
import Link from 'next/link'

import React from 'react'
import Form from './_components/Form'

const page = () => {
  return (
    <main>
      <div className="py-44 bg-gray-50 md:py-40 element-center">
        <div className="element-center container">
          <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
            <h2 className="font-semibold text-2xl text-black text-center mb-4">Reister</h2>
            <Form />
            <p className="element-center text-md font-semibold space-x-2 my-2">
              <span className="text-gray-400  ">Do you have an account</span>
              <Link href={`/${Routes.AUTH}/${Pages.LOGIN}`}> Sign In</Link>
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}

export default page