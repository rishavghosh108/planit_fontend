'use client';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setVerificationToken } from '../store/slices/eventSlice';

const initialValues = {
  name: '',
  mobile_no: '',
  email: '',
  password: '',
  role_id: ''
};

export default function Register() {
  const dispatch = useDispatch();
  const [serverErrors, setServerErrors] = useState(null);
  const router = useRouter();

  const signupSchema = YUP.object({
    name: YUP.string().required('Please enter your name').min(3),
    mobile_no: YUP.string().required('Mobile number is required').min(10),
    email: YUP.string().required('Email is required').email().test(
      'email',
      'must be a valid email',
       value=> /\S+@\S+\.\S+/.test(value)
    ),
    password: YUP.string().min(6).required('Password is required'),
    role_id: YUP.string().required('Role selection is required')
  });

  const { errors, values, handleBlur, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, values, { withCredentials: true });
        if (response.status === 200) {
          const token = response.headers.verification;
          dispatch(setVerificationToken(token));
          localStorage.setItem('verification', token);
          toast.success('Sign up successful!');
          router.push('/otp');
        }
      } catch (error) {
        if (error.response?.status === 422) {
          setServerErrors(error.response.data.errors);
        } else {
          console.error('Error:', error.message);
        }
      }
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center py-8 px-4">
      <div className="bg-white text-black rounded-3xl shadow-2xl p-10 w-md max-w-xl">
        {/* <div className="flex justify-center mb-4">
          <Image src="/PlanIt.png" alt="PlanIt Logo" width={140} height={40} />
        </div> */}
        <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 w-full px-4 py-3 border text-black rounded-xl focus:outline-none focus:ring-2 ${touched.name && errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              placeholder="Enter your name"
            />
            {touched.name && errors.name && <p className="text-red-600 text-sm mt-1 absolute w-sm text-center">{errors.name}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobile_no" className="text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              id="mobile_no"
              name="mobile_no"
              value={values.mobile_no}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 w-full px-4  py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 ${touched.mobile_no && errors.mobile_no? 'border-red-500 focus:ring-red-500' :'border-gray-300 focus:ring-blue-500'}`}
              placeholder="9876543210"
            />
            {touched.mobile_no && errors.mobile_no && <p className="text-red-600 mt-1 absolute w-sm text-center text-sm">{errors.mobile_no}</p>}
            {serverErrors?.mobile_no && <p className="text-red-600 mt-1">{serverErrors.mobile_no[0]}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 ${touched.email && errors.email? 'border-red-500 focus:ring-red-500': 'border-gray-300 focus:ring-blue-500'}`}
              placeholder="you@example.com"
            />
            {touched.email && errors.email && <p className="text-red-600 mt-1 text-sm absolute w-sm text-center">{errors.email}</p>}
            {serverErrors?.email && <p className="text-red-600 mt-1">{serverErrors.email[0]}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 ${touched.password && errors.password? 'border-red-500 focus:ring-red-500':' border-gray-300 focus:ring-blue-500'}`}
              placeholder="Create a strong password"
            />
            {touched.password && errors.password && <p className="text-red-600 mt-1 absolute text-sm  w-sm text-center">{errors.password}</p>}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role_id" className="text-sm font-medium text-gray-700">Register As</label>
            <select
              id="role_id"
              name="role_id"
              value={values.role_id}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option value="">Select Role</option>
              <option value="1">User</option>
              <option value="2">Planner</option>
            </select>
            {touched.role_id && errors.role_id && <p className="text-red-600 mt-1">{errors.role_id}</p>}
            {serverErrors?.role_id && <p className="text-red-600 mt-1">{serverErrors.role_id[0]}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}
