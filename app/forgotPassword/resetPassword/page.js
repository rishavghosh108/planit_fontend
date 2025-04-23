'use client'
import React from 'react'
import  Link  from 'next/link'
import axios from 'axios'
import * as Yup from "yup"
import { useFormik } from 'formik'
const initialValues = {
   otp:"",
   password:"",
   confirm_password:""
}
export default function page() {
    const emailVerifySchema = Yup.object({
        otp:Yup.number().required('otp is required'),
        password:Yup.string().min(6).required("password is required"),
        confirm_password:Yup.string().oneOf([Yup.ref('password'),null],"password must match").min(6).required("confirm password is required")
    })
   const {values,errors,handleSubmit,handleChange,handleBlur,touched} = useFormik({
    initialValues:initialValues,
    validationSchema:emailVerifySchema,
    onSubmit:async(values)=>{
      const response = await axios.post(`${process.env.NEXT_API_URL}/forgot-password-reset`,values)
      console.log("verify",response)
    }

   })
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="••••••••"
          />
          {
            errors.password && touched.password ? (<p className='text-red-500'>{errors.password}</p>):""
          }
        </div>  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="••••••••"
          />
          {
            errors.confirm_password && touched.confirm_password ? (<p className='text-red-500'>{errors.confirm_password}</p>):""
          }
        </div>       
        {/* Submit */}
         <div className='flex justify-around'>
        <Link href={'/login'}
          className="w-30 cursor-pointer py-3 text-center bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="w-30 cursor-pointer py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save
        </button>
        </div>
      </form>

      {/* Footer */}
      <p className='text-center font-bold text-sm text-gray-600 mt-6'><Link className="text-blue-600 hover:underline" href={'/login'}>Login with Mobile Number</Link></p>
     
    </div>
  </div>
  )
}
