'use client';
import { useFormik } from 'formik'
import * as YUP from 'yup'
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GET } from '../api/verify/route';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/slices/eventSlice';
const initialValues = {
  name: "",
  mobile_no: "",
  email: "",
  password: "",
  role_id: ""
}
export default function register() {
  const dispatch = useDispatch()
  let token = ''
  const [serverErrors, setServerErrors] = useState(null)
  const router = useRouter();
  const signupSchema = YUP.object({
    name: YUP.string().required("please enter name").min(3),
    mobile_no: YUP.string().required('mobile no is required').min(10),
    email: YUP.string().required('email is required').email(),
    password: YUP.string().min(6).required('password is required'),
    role_id: YUP.string().required('role field is required')
  })

  const { errors, values, handleBlur, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, values, { credentials: 'include' }).then(response => {
        
        if (response.status == 200) {
          Object.entries(response.headers).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
            if(key == 'verification'){
              token = value;
            }
          });
          dispatch(setToken(token))
          localStorage.setItem('verification',token)
          toast.success("signUp Scuuesful!")
          router.push('/otp')

        }
      })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            let errors = error.response.data.errors;
            console.log(errors);
            errors ? setServerErrors(errors) : setServerErrors(null)

            console.log(errors.email);
            console.log(errors.mobile_no);
            console.log(errors.role_id);
          } else {
            console.log('Something else went wrong:', error.message);
          }
        })
    }
  })
  
  return (
    <div className="bg-gray-400 flex items-center justify-center">
      <div className="bg-slate-500 p-8 rounded-xl shadow-lg w-full max-w-lg mt-4">
        <Image className='m-auto mb-1' src='/PlanIt.png' alt="planit image" width={150} height={40} />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              errors.name && touched.name ? (<p className='text-red-900 font-bold '>{errors.name}</p>) : ""
            }
          </div>


          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-semibold text-gray-800 mb-2">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile_no"
              value={values.mobile_no}
              placeholder="9876543210"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              onBlur={handleBlur}

            />
            {
              errors.mobile_no && touched.mobile_no ? (<p className='text-red-900 font-bold '>{errors.mobile_no}</p>) : ""
            }
            {
              serverErrors && serverErrors.mobile_no ? (<p className='text-red-900 font-bold'>{serverErrors.mobile_no[0]}</p>) : ""
            }

          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              errors.email && touched.email ? (<p className='text-red-900 font-bold '>{errors.email}</p>) : ""
            }
            {
              serverErrors && serverErrors.email ? (<p className='text-red-900 font-bold'>{serverErrors.email[0]}</p>) : ""
            }

          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {
              errors.password && touched.password ? (<p className='text-red-900 font-bold '>{errors.password}</p>) : ""
            }
          </div>


          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-800 mb-2">Register As</label>
            <select
              id="role"
              name="role_id"
              value={values.role_id}
              onChange={handleChange}
              onBlur={handleBlur}

              className="w-full px-4 py-3 border border-slate-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select role</option>
              <option value="1">User</option>
              <option value="2">Planner</option>
            </select>
            {
              errors.role_id && touched.role_id ? (<p className='text-red-900 font-bold '>{errors.role_id}</p>) : ""
            }
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-800 mt-3">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-400 font-bold text-lg hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}
