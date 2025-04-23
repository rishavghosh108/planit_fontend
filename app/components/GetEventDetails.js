'use client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import VendorPage from '../dashboard/[id]/page'
import { useDispatch } from 'react-redux'
import { setEvent } from '../store/slices/eventSlice'

// const events = [
//   {name:"Birthday",src:'/birthday.jpg'},
//   {name:"Wedding",src:'/wedding.jpg'},
//   {name:"Engagement",src:'/engagement.jpg'},
//   {name:"Corporate",src:'/corporate.jpg'},
// ]

export default function GetEventDetails(){
    const [eventData,setEventData] = useState([])
    const dispatch = useDispatch()
    console.log('env',process.env.NEXT_PUBLIC_API_URL)

    useEffect(()=>{
        const getEvent = async()=>{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events`)
            console.log('eventresponse',response.data.data)
            setEventData(response.data.data)
          } 
        getEvent()
        },[])
        console.log('event',eventData)
       
  return (
    <div className="bg-amber-100 text-black font-bold font-serif h-screen pt-10">

    <div className="flex justify-center">
        <div className="bg-red-100 text-lg px-6 py-4 mt-10 rounded-full text-center">
            Hey What's up! what are you planning for ?
        </div>
    </div>

    
    <div className="max-w-7xl mx-auto mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center rounded-lg">
    {eventData.map((event)=>(
        <div key={event.id}>
            <div className="w-full h-45 bg-gray-300 mb-2 rounded cursor-pointer">
                <Link href={`/dashboard/${event.id}`} className="block group hover:scale-105 transition">
                    <Image src={event.file_path} alt={event.event_type} width={150} height={100} quality={100} className='w-full rounded-lg h-45'/>
                </Link>
            </div>
            <p className="text-lg">{event.event_type}</p>
        </div>
          ))}
        
        {/* <div>
            <div className="w-full h-45 bg-gray-300 mb-2 rounded cursor-pointer">
                <Link href="" className="block group hover:scale-105 transition">
                    <Image src={'/wedding.jpg'} alt='wedding' width={150} height={100} quality={100} className='w-full h-45 rounded-lg'/>
                </Link>
            </div>
            
            <p className="text-lg  font-bold text-gray-800 group-hover:underline">Wedding</p>
        </div>
        <div>
            <div className="w-full h-45 bg-gray-300 mb-2 rounded cursor-pointer">
                <Link href="" className="block group hover:scale-110 transition ">
                   <Image src={'/engagement.jpg'} alt='engagement' width={150} height={100} quality={100} className='w-full h-45 rounded-lg'/>
                </Link>
            </div>
            <p className="text-lg">Engagements</p>
        </div>

        <div>
            <div className="w-full h-45 bg-gray-300 mb-2 rounded cursor-pointer">
                <Link href="" className="block group hover:scale-105 transition ">
                   <Image src={'/corporate.jpg'} alt='corporate' width={150} height={100} quality={100} className='w-full h-45 rounded-lg'/>
                </Link>
            </div>
            <p className="text-lg">Corporate</p>
        </div> */}
    </div>

   
    <div className="flex justify-center mt-6">
        <button className="bg-gray-300 px-6 py-2 rounded cursor-pointer">others</button>
    </div>

</div>
  )
}
