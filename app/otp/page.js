'use client'
import React, { useEffect } from 'react'
import  Link  from 'next/link'
import axios from 'axios'
import * as Yup from "yup"
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { NextRequest,NextResponse } from 'next/server'
import { GetToken } from '../api/verify/route'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { setAuthoRizationToken, setVerificationToken} from '../store/slices/eventSlice'
const initialValues = {
    otp:""
}
export default function otp() {
  // const {token} = GetToken()
  //     console.log('token',token)
  const dispatch = useDispatch()
   useEffect(()=>{
      const token =  localStorage.getItem('verification')
      dispatch(setVerificationToken(token))
     },[])
     const token = useSelector((state)=>state.user.verification)
    console.log('token',token)
    const router = useRouter()
    const otpVerifySchema = Yup.object({
        otp:Yup.number().required("otp is required"),
    })
   const {values,errors,handleSubmit,handleChange,handleBlur,touched} = useFormik({
    initialValues:initialValues,
    validationSchema:otpVerifySchema,
    onSubmit:async(values)=>{
        console.log('value',values)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/verify`,values,{withCredentials:true,
        headers:{
          'verification':`${token}`,
          'Content-Type': 'application/json',
          
      }})
      // console.log("verify",response.headers)
      if(response.status == 200){
        // Object.entries(response.headers).forEach(([key, value]) => {
        //   console.log(`${key}: ${value}`);
        // });
        let authorizationToken = response.headers['authorization'];
         dispatch(setAuthoRizationToken(authorizationToken))
         localStorage.setItem('authorization',authorizationToken)
        toast.success('Otp Verification successful')
        console.log('otp response',response)
        localStorage.removeItem('verification')
        dispatch(setVerificationToken(null))
        router.push('/dashboard')
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
