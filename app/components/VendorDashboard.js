'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const VendorProfile = () => {
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

  const [mainImage, setMainImage] = useState(vendor.images[0]);

  return (
    <div href={'/vendor-details'} className="min-h-screen w-full bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto p-6 grid gap-6 bg-cyan-100 shadow-md rounded-4xl text-black">
        <div className="flex items-center space-x-4">
          <Image
            src={vendor.logo}
            alt="Vendor Logo"
            width={76}
            height={46}
            className="rounded-4xl border"
            quality={100}
          />
          <h1 className="text-2xl font-bold">{vendor.name}</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
        <Link href={'/vendor-details'}>
          <div className="relative w-full h-64 rounded-lg overflow-hidden border">
            <Image
              src={mainImage}
              alt="Main"
              fill
              className="object-cover"
              priority
              quality={100}
            />
          </div>
          </Link>
          <div className="flex space-x-2 overflow-x-auto">
            {vendor.images.map((img, idx) => (
              <div
                key={idx}
                className={`relative w-24 h-24 border rounded-lg cursor-pointer ${
                  mainImage === img ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover rounded-lg"
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
            ⭐ {vendor.rating} / 5
          </span>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
