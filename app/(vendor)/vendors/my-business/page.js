'use client'
import MyBusinessCard from '@/app/components/MyBusinessVendor'
import VendorCard from '@/app/components/VendorCard'
import { asyncThunkCreator } from '@reduxjs/toolkit'
import axios from 'axios'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function page() {
    const [authorizationToken,setAuthorizationToken] = useState('')
    const [vendors,setVendors] = useState([])
    useEffect(()=>{
        const token = localStorage.getItem('authorization')
         setAuthorizationToken(token)
        const getBusineesByUser = async()=>{
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL_SYSTEM}/show_myBusiness`,{
                 headers: {
                      Authorization: `Bearer ${token}`, // Recommended format for tokens
                      'Content-Type': 'application/json',
                     },
            }).then((response)=>{
                if(response.status == 200){
                console.log('single user response',response);
                setVendors(response.data.vendor)
                }
                
            }).catch((error)=>{
                console.log('error',error);
                
            })
        }
        getBusineesByUser()
    },[])

    const editBusinessByUser = ()=>{

    }
    console.log('authorization',authorizationToken);
    
    const deleteBusinessByUser = async(vendorId)=>{
       await axios.post(`${process.env.NEXT_PUBLIC_API_URL_SYSTEM}/vendorDelete/${vendorId}`,{},{
        headers:{
             Authorization: `Bearer ${authorizationToken}`,
            'Content-Type': 'application/json',
        }
       }).then((response)=>{
        if(response.status == 200){
            toast.success(response.data.message)
            setVendors((prev)=> prev.filter((singleVendor)=> singleVendor.id != vendorId))
        }
         
       }).catch((error)=>{
        console.log('error',error);
        
       })

    }
  return (
        <>
        {vendors.length != 0? 
         ( <div className="grid grid-cols-1 min-h-screen md:grid-cols-3 gap-6 px-4 py-8 bg-gray-100 ">
            {vendors.map((vendor) => (
                <MyBusinessCard key={vendor.id} vendor={vendor} deleteBusinessByUser={deleteBusinessByUser}/>
            ))}
          </div>) : (<div className='min-h-screen bg-gray-100'><h1 className='text-black text-2xl text-center'>You haven't save any business yet</h1></div>)

        }
        </>
  )
}
