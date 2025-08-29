'use client'

import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { saveCards } from '@/app/store/slices/eventSlice'
import { useDispatch, useSelector } from 'react-redux'


export default function cards(data) {
  const dispatch = useDispatch()
  const [cards, setCards] = useState([])
  const params = useParams()
  console.log(params, "params")
  // const storedData = useSelector((state)=>state.user.cards)
  // console.log('storedData',storedData)
  useEffect(() => {
    const cardDetails = async (id) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/${params.id}/cards`)
      setCards(response.data.data)
      console.log('data', response.data.data[0]);

      localStorage.setItem('cards', JSON.stringify(response.data.data[0]))

      dispatch(saveCards(response.data.data[0]))

    }
    cardDetails()
  }, [])
  console.log('cards', cards)
  useEffect(() => {
    const keepKeys = ['cards', 'authorization'];

    for (let i = 0; i < localStorage.length;) {
      const key = localStorage.key(i);
      if (!keepKeys.includes(key)) {
        localStorage.removeItem(key);
      } else {
        i++;
      }
    }
  }, [])
  return (
    <div className="bg-white text-center pt-20 h-screen">
      <h1 className="text-3xl text-gray-700 font-bold mb-2">Find your picture perfect Invitation card</h1>
      <p className="text-sm text-gray-600 mb-8">pick a card customize it on your own way</p>

      <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div>
          <div className="bg-gray-300 w-full h-64">
            {cards.length > 0 ?
              cards.map((card) =>
                <Link key={card.id} href={`/dashboard/${params.id}/cards/edit/${card.id}`} className="block group hover:scale-105 transition">
                  {card.file_path ? <Image
                    src={card.file_path}
                    alt={card.title}
                    width={300}
                    height={200}
                    key={card.id}

                  />
                    : null}
                </Link>)
              : ""}
          </div>
          <p className="mt-2 font-semibold">{cards.title}</p>
        </div>
        {/* <div>
      <div className="bg-gray-300 w-full h-64">
        <Link href="" className="block group hover:scale-105 transition">
          <img
              src={''}
              alt="magic gold"
              className="w-full h-40 object-cover rounded mb-2"
          />
        </Link>
      </div>
      <p className="mt-2 font-semibold">magic gold</p>
    </div>
    <div>
      <div className="bg-gray-300 w-full h-64">
        <Link href="" className="block group hover:scale-105 transition">
          <img
              src={''}
              alt="levendor mist"
              className="w-full h-40 object-cover rounded mb-2"
          />
        </Link>
      </div>
      <p className="mt-2 font-semibold">levendor mist</p>
    </div>
    <div>
      <div className="bg-gray-300 w-full h-64">
        <Link href="" className="block group hover:scale-105 transition">
          <img
              src={''}
              alt="magic gold"
              className="w-full h-40 object-cover rounded mb-2"
          />
        </Link>
      </div>
      <p className="mt-2 font-semibold">magic gold</p>
    </div>
    <div>
      <div className="bg-gray-300 w-full h-64">
        <Link href="" className="block group hover:scale-105 transition">
          <img
              src={''}
              alt="Wood Wills"
              className="w-full h-40 object-cover rounded mb-2"
          />
        </Link>
      </div>
      <p className="mt-2 font-semibold">Wood Wills</p>
    </div>
    <div>
      <div className="bg-gray-300 w-full h-64">
        <Link href="" className="block group hover:scale-105 transition">
          <img
              src={''}
              alt="magic gold"
              className="w-full h-40 object-cover rounded mb-2"
          />
        </Link>
      </div>
      <p className="mt-2 font-semibold">magic gold</p>
    </div>
    <div>
      <div className="bg-gray-300 w-full h-64">
        <Link href="" className="block group hover:scale-105 transition">
          <img
              src={''}
              alt="levendor mist"
              className="w-full h-40 object-cover rounded mb-2"
          />
        </Link>
      </div>
      <p className="mt-2 font-semibold">levendor mist</p>
    </div>
    <div>
      <div className="bg-gray-300 w-full h-64">
        <Link href="" className="block group hover:scale-105 transition">
          <img
              src={''}
              alt="Wood Wills"
              className="w-full h-40 object-cover rounded mb-2"
          />
        </Link>
      </div>
      <p className="mt-2 font-semibold">Wood Wills</p>
    </div> */}
      </div>

      <div className="flex justify-center mt-12">
        <button className="bg-gray-300 px-6 py-2 rounded">More...</button>
      </div>
    </div>
  )
}
