'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import VendorCard from './VendorCard';

const VendorProfile = () => {
  const [vendors, setVendors] = useState([])

  useEffect(() => {
    const getAllVendorDetails = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL_SYSTEM}/vendors`).then((response) => {
        console.log('all vendors', response);
        setVendors(response.data.data)
      })
    }
    getAllVendorDetails()
  }, [])
  

  return (
    <>
      <div className="grid grid-cols-1 min-h-screen md:grid-cols-3 gap-6 px-4 py-8 bg-gray-100 ">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>

    </>
  );
};

export default VendorProfile;
