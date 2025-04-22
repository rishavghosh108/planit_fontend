'use client'
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [menuOpen,setMenuOpen] = useState()
  const router = useRouter()
  const pathname = usePathname()
  const logOut=async()=>{
    const response = await axios.get('http://192.168.1.37:8000/system/logout')
    console.log("logout response",response)
    if(response.status == 200){
      toast.success(response.data.message)
      router.push('/login')
    }

  }
  return (
  <div className="bg-white">
      <nav className="bg-white flex justify-end flex-row gap-5 pt-5">
       <Link href={'/login'} className="text-lg px-3 py-1 rounded-md hover:bg-green-600 bg-green-500 font-bold text-black btn cursor-pointer">Login</Link>
       <Link href={'/register'} className="text-black text-lg font-bold mr-5">Are you a Vendor?</Link>
       </nav>
    <div className="relative flex flex-col md:flex-row min-h-screen bg-white p-8 items-center justify-center gap-12">
    {/* Left Section */}
    <div className="max-w-lg">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
        Your free wedding website and so much more.
      </h1>
      <p className="text-gray-600 mb-8">
        Create a wedding website that is uniquely yours, completely customizable, and anticipates all your wedding planning needs.
      </p>
      <div className="flex gap-4">
        <Link href={'/login'} className="bg-purple-800 text-white px-6 py-3 rounded-md font-semibold cursor-pointer">
          Get Started
        </Link>
        <button className="border-2 border-purple-800 text-purple-800 px-6 py-3 rounded-md font-semibold">
          Find an Event
        </button>
      </div>
    </div>
  
    {/* Right Section */}
    <div className="relative flex flex-col items-center w-[500px] ">
  
      {/* Image card */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden relative z-10 w-full">
  
        {/* Couple image */}
        <Image 
          src="/couple.jpeg"
          alt="Happy Couple"
          width={400}
          height={450}
          quality={100}
          className="object-cover w-full h-[550px] filter contrast-125 rounded-t-xl"
        />
  
        {/* Decorative leaves OVERLAY */}
        <Image 
          src="/leaves2.png"
          alt="Decorative leaves overlay"
          width={200}
          height={200}
          className="absolute top-0 left-0 w-full h-[350px] object-cover z-20 pointer-events-none mix-blend-multiply filter opacity-90"
        />
  
        {/* Text content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Rishav & Ranu Mondal</h2>
          <p className="text-gray-600 mt-2 text-sm">SUNDAY, OCTOBER 9, 2022</p>
          <p className="text-gray-600 text-sm">LAS VEGAS, NEVADA</p>
          <p className="mt-4 text-gray-600 text-sm">
            We are so excited and can’t wait to see you. Help us capture our wedding with joy.
          </p>
        </div>
  
      </div>
  
    </div>
  
  </div>
  </div>
  
);
}
