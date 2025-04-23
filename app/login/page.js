'use client';
import { useFormik } from 'formik';
import * as Yup from "yup"
import React, { use, useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import getEventDetails from '../components/GetEventDetails';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/slices/eventSlice';
// import { useRouter } from 'next/router';


const initialValues = {
    email:"",
    password:""
}
export default function page() {
  let token = ''
  const dispatch = useDispatch()
    const router = useRouter()
   const loginSchema = Yup.object({
    email:Yup.string().test(
      'email-or-phone',
          'Must be a valid email or 10-digit phone number',
          value =>
            /\S+@\S+\.\S+/.test(value) || /^\d{10}$/.test(value)
    ).required("email or mobile is required"),
    password:Yup.string().required("password is required")
   })
    const{errors,values,handleBlur,handleChange,handleSubmit,touched} = useFormik({
        initialValues:initialValues,
        validationSchema:loginSchema,
        onSubmit:async (values)=>{
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`,values,{withCredentials:true}).
          then(response=>{
            console.log('response',response);
            //   router.push('/')
            if (response.status == 200) {
              token = response.headers['verification'];
              
              // Object.entries(response.headers).forEach(([key, value]) => {
              //   console.log(`${key}: ${value}`);
              //   if(key == 'verification'){
              //     token = value;
              //   }
              // });
              dispatch(setToken(token))
              localStorage.setItem('verification',token)
              toast.success("signin Scuuesful!")
              router.push('/otp')
    
            }
          })
          .catch(error => {
            if (error.response) {  
              toast.error(error.response.data.message)
            }
             else {
              console.log('Something else went wrong:', error.message);
            }
          })
         
        }
    })
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to your Account</h2>
    
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email or Phone</label>
                <input
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter email or phone no"
                />
                {errors.email && touched.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
               
              </div>
    
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="••••••••"
                />
                {errors.password && touched.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>
    
              {/* Submit */}
              <button
                type="submit"
                className="w-full cursor-pointer py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Sign In
              </button>
            </form>
    
            {/* Footer */}
            <p className='text-center text-sm text-gray-600 mt-6'><Link className="text-blue-600 hover:underline" href={'/login'}>Login with Mobile Number</Link></p>
            <p className="text-center text-sm text-gray-600 mt-6">
              <span>Don&apos;t have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:underline">Register</Link></span>
              <span className='ml-6'>
                <Link className="text-blue-600 hover:underline" href={'/forgotPassword'}>Forgot Password</Link>
                </span>
            </p>
          </div>
        </div>
      );
}
