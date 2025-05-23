import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

export default function VendorCard({ vendor }) {
  const [flipped, setFlipped] = useState(0)
  const [doubleFlipped, setDoubleFlipped] = useState(false);
  // 335cc5
  const [mainImage, setMainImage] = useState(vendor.business_images[0]?.business_image);
  return (
    <>
      <div key={vendor.id} className=''>
        <div className="w-[450px] h-[500px] max-w-lg mx-auto p-4 flex flex-wrap gap-2  shadow-md rounded-4xl text-black hover:scale-105 transition duration-200 bg-slate-300 hover:bg-slate-400">
          <div className="flex items-center space-x-4">
            <Image
              src={vendor.business_logo}
              alt="Vendor Logo"
              width={76}
              height={46}
              className="rounded-4xl border"
              quality={100}
            />
            <h1 className="text-2xl font-bold">{vendor.business_name}</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Link href={`vendors/vendor-details/${vendor.id}`}>
              <div className={`relative w-50 h-64 rounded-lg overflow-hidden perspective`}>
                {mainImage ? <Image
                  src={mainImage}
                  alt="Main"
                  fill
                  className={`object-cover transition-transform duration-[750ms] border  preserve-3d`}
                  style={{
          transform: `rotateY(${flipped}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 750ms',
        }}
                  priority
                  quality={100}
                /> : null}
              </div>
            </Link>
            <div className="flex flex-wrap space-x-2 space-y-3">
              {vendor.business_images.map((img) => (
                <div
                  key={img.id}
                  className={`relative w-20 h-20 border rounded-lg cursor-pointer ${mainImage === img.business_image ? 'ring-4 ring-lime-500' : ''
                    }`}
                  onClick={() => {
                    const audio = new Audio('/pubg_sound.mp3');
                   audio.play().catch((err) => {
                     console.warn('Autoplay error:', err);
                      });
                    const nextRotation = flipped+360;
                    setFlipped(nextRotation)
                    setTimeout(() => {
                      // setFlipped(true);
                      setMainImage(img.business_image);
                      // setDoubleFlipped(true);
                    }, 250);
                  }}
                >
                  <Image
                    src={img.business_image}
                    alt={`Thumbnail ${img.id + 1}`}
                    fill
                    className="object-cover rounded-lg "
                    quality={100}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{vendor.category}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{vendor.location}</span>
            <span className="ml-auto text-yellow-500 font-semibold text-base">
              ⭐ 4 / 5
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
