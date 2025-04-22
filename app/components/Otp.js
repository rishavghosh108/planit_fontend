'use client'
import React from 'react'
import  Link  from 'next/link'
import axios from 'axios'
import * as Yup from "yup"
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
const initialValues = {
    email_or_phone:""
}
export default function otp() {
    const router = useRouter()
    const emailVerifySchema = Yup.object({
        otp:Yup.string().test(
            '',
            'Must be a valid email or 10-digit phone number',
          value =>
            /\S+@\S+\.\S+/.test(value) || /^\d{10}$/.test(value)
    ).required("email or mobile is required"),
    })
   const {values,errors,handleSubmit,handleChange,handleBlur,touched} = useFormik({
    initialValues:initialValues,
    validationSchema:emailVerifySchema,
    onSubmit:async(values)=>{
      const response = await axios.post('http://192.168.1.68:8000/system/forgot-password-verify',values)
      console.log("verify",response)
      if(response.status == 200){
        router.push('/forgotPassword/resetPassword')
      }
    }

   })
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email or Phone</label>
          <input
            type="number"
            name="otp"
            value={values.otp}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="you@example.com"
          />
          {
            errors.email && touched.email ? (<p className='text-red-500'>{errors.email}</p>):""
          }
        </div>        
        {/* Submit */}
         <div className='flex justify-around'>
        <Link href={'/login'}
          className="w-30 cursor-pointer py-3 text-center bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
        >
          Resend Otp
        </Link>
        <button
          type="submit"
          className="w-30 cursor-pointer py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Verify Otp
        </button>
        </div>
      </form>

      {/* Footer */}
      <p className='text-center font-bold text-sm text-gray-600 mt-6'><Link className="text-blue-600 hover:underline" href={'/login'}>Login with Mobile Number</Link></p>
     
    </div>
  </div>
  )
}
