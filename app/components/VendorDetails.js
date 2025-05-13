'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function VendorDetails() {
    const [currentIndex,setCurrentIndex] = useState(0)
    const [hovering,setHovering] = useState(false)
    const vendor = {
        logo: '/images/catering-logo.jpg',
        name: 'Catering',
        images: [
          '/images/catering-image1.jpg',
          '/images/catering-image4.jpeg',
          '/images/catering-image3.jpg',
        ],
        category: 'Catering',
        location: 'Kolkata, India',
        rating: 4.5,
      };

      useEffect(()=>{
        if(!hovering || vendor.images.length <= 1) return;
        const interval = setInterval(()=>{
            setCurrentIndex((prev)=>(prev+1) % vendor.images.length)
        },1500)
        return ()=>clearInterval(interval)
      },[hovering,vendor.images.length])
    return (
    <div className='min-h-screen bg-gray-200'>
          <h1 className='text-black text-4xl text-center pt-8 font-bold'>Vendor Details</h1>
        <div className="flex justify-center items-center min-h-screen bg-gray-200 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl w-full flex flex-col items-center gap-10">
          
          <div  className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
            {/* <Image
              src={vendor.logo}
              alt="Logo"
              width={107}
              height={56}
              className="rounded-full border p-1 bg-white shadow"
            /> */}
            <div >
            <div className="relative w-[367px] h-[197px] overflow-hidden rounded-xl shadow-md cursor-pointer" onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>{setHovering(false);setCurrentIndex(0)}}>
              <Image
                src={vendor.images[currentIndex]}
                alt="Main"
                width={367}
                height={167}
                className="object-cover transition-opacity duration-700 ease-in-out"
                quality={100}
              />
              </div>
              <div className="flex justify-between mt-4 text-gray-700 font-medium">
                <p>Business Name: <span className="font-semibold text-black">Catering</span></p>
                <p>Category: <span className="font-semibold text-black">Caterer</span></p>
              </div>
            </div>
          </div>
      
          <div className="w-full ml-40  text-gray-600 space-y-2">
            <p><span className="font-semibold text-gray-800">Description:</span> Delicious, custom catering for all events.</p>
            <p><span className="font-semibold text-gray-800">Location:</span>Kolkata,India</p>
          </div>
      
          <div className="w-full flex justify-center">
            <button className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
      </div>
    )
}
