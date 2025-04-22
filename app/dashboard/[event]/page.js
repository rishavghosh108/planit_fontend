'use client'

import React from 'react'
import { useParams } from 'next/navigation';


const VendorPage = () => {
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
  const params = useParams();
  const event = params?.event?.toString() || 'default'; 
  const image = `/${event.toLowerCase()}.jpg`;
  return (
    <main className="p-8 space-y-8 min-h-screen bg-cover flex flex-col"
    style={{ backgroundImage: `url(${image})` }}
    >
      {/* Top banner */}
      <div className="bg-gray-400 max-w-lg min-w-2xl text-center m-auto p-4 font-bold text-lg text-black rounded-lg">
        Let's plan your {params.event.toLowerCase()} starting with our checklist
      </div>

      {/* Invitation buttons */}
      <div className="flex flex-col items-center space-y-4">
        <button className="bg-gray-300 px-6 py-2 text-lg text-black cursor-pointer rounded-lg">
          Generate digital invitation card
        </button>
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
    </main>
  )
}

export default VendorPage