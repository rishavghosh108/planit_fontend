'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import cards from './cards/page';
import { useRouter } from 'next/navigation';
import { setEvent } from '@/app/store/slices/eventSlice';


const VendorPage = () => {
  const dispatch = useDispatch()
  const route = useRouter()
  const [eventData,setEventData] = useState([])
  useEffect(()=>{
    const getEvent = async()=>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events`)
        console.log('eventresponse',response.data.data)
        setEventData(response.data.data)
        dispatch(setEvent(response.data.data))
      } 
    getEvent()
    },[])
    console.log('event',eventData)

  const vendors = [
    'Beauty',
    'Bridal Salons',
    'Caterers',
    'Florists',
    'Officiants',
    'Transportation',
    'Rentals',
    'Venues',
    'Videographers',
    'Wedding Planners',
    'View all'
  ]
  console.log('vendor',eventData)
  const params = useParams();
  console.log('params',params)
  // const event = params?.event?.toString() || 'default'; 
  // const image = `/${event.toLowerCase()}.jpg`;
  const currentEvent = eventData.find((event) => event.id == params.id);

  return (
    <>
    {currentEvent? (
    <main className="p-8 space-y-8 min-h-screen bg-cover flex flex-col"
    style={{ backgroundImage: `url(${currentEvent.file_path})` }}
    >
      {/* Top banner */}
      <div className="bg-gray-400 max-w-lg min-w-2xl text-center m-auto p-4 font-bold text-lg text-black rounded-lg">
        Let's plan your {currentEvent.event_type.toLowerCase()} starting with our checklist
      </div>

      {/* Invitation buttons */}
      <div className="flex flex-col items-center space-y-4">
        <Link href={`/dashboard/${params.id}/cards`} className="bg-gray-300 px-6 py-2 text-lg text-black cursor-pointer rounded-lg">
          Generate digital invitation card
        </Link>
        <button className="bg-gray-300 px-6 py-2 text-lg text-black cursor-pointer rounded-lg">
          Import a guest list
        </button>
      </div>

      {/* Vendor grid */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-300">Build your vendor team</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {vendors.map((vendor, idx) => (
            <div
              key={idx}
              className="bg-[#fff6f0] p-6 rounded-2xl font-semibold text-lg shadow-sm cursor-pointer hover:shadow-md transition text-gray-500"
            >
              {vendor}
            </div>
          ))}
        </div>
      </section>
    </main>)

   : null}
  </>
   )

}

export default VendorPage