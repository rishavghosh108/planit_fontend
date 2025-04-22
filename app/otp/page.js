'use client'
import React from 'react'
import  Link  from 'next/link'
import axios from 'axios'
import * as Yup from "yup"
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
const initialValues = {
    otp:""
}
export default function otp() {
    const router = useRouter()
    const otpVerifySchema = Yup.object({
        otp:Yup.number().required("otp is required"),
    })
   const {values,errors,handleSubmit,handleChange,handleBlur,touched} = useFormik({
    initialValues:initialValues,
    validationSchema:otpVerifySchema,
    onSubmit:async(values)=>{
        console.log('value',values)
      const response = await axios.post('http://192.168.1.68:8000/system/verify',values,{withCredentials:true})
      console.log("verify",response)
      if(response.status == 200){
       
      }
    }

   })
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Otp Verification</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2"></label>
          <input
            type="number"
            name="otp"
            value={values.otp}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder=""
          />
          {
            errors.otp && touched.otp ? (<p className='text-red-500'>{errors.otp}</p>):""
          }
        </div>        
        {/* Submit */}
         <div className='flex justify-around'>
        <Link href={'/login'}
          className="w-30 cursor-pointer py-3 text-center bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
        >
          Resend
        </Link>
        <button
          type="submit"
          className="w-30 cursor-pointer py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Verify
        </button>
        </div>
      </form>

      {/* Footer */}
     
    </div>
  </div>
  )
}
