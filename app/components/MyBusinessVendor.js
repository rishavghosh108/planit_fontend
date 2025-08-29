import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { IoAddSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";



export default function MyBusinessCard({ vendor, deleteBusinessByUser }) {
  const [uploading, setUploading] = useState(false)
  const uploadId = `upload-${vendor.id}`
  const [businessImages, setBusinessImages] = useState([])
  const [showBusinessImage, setShowBusinessImage] = useState(null)
  const [mainImage, setMainImage] = useState(vendor.business_images[0]?.business_image);
  useEffect(() => {
    setBusinessImages([...vendor.business_images])
  }, [vendor.business_images])
  const handleRemoveImage = async (id) => {
    console.log('remove image', id);
    const confirm = window.confirm('Are you sure you want to delete this image?')
     if(!confirm){
      return
     }
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL_SYSTEM}/singleImgDelete/${vendor.id}/${id}`).then((response) => {
      if (response.status == 200) {
        toast.success(response.data.message)
        const indexToDelete = businessImages.findIndex((img) => img.id === id);
        const updatedImages = businessImages.filter((img) => img.id !== id);
        let nextMainImage = '';
        if (updatedImages.length > 0) {
          if (indexToDelete < updatedImages.length) {
            nextMainImage = updatedImages[indexToDelete].business_image;
          } else {
            nextMainImage = updatedImages[updatedImages.length - 1].business_image;
          }
        }
        setBusinessImages(updatedImages);
        setMainImage(nextMainImage);
      }

    })
  }
  const handleShowBusinessImage = async (e) => {
    setUploading(true)
    const file = e.target.files[0]
    if (file) {
      setShowBusinessImage(URL.createObjectURL(file))
      const formData = new FormData()
      formData.append('businessImage', file)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL_SYSTEM}/addImage/${vendor.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then((response) => {
        console.log('single image add', response);

        if (response.status == 201) {
          toast.success(response.data.message)
          setBusinessImages((prev) => [...prev, { id: response.data.uploaded_images.id, business_image: response.data.uploaded_images.business_image }])
          setMainImage(response.data.uploaded_images.business_image)
          setUploading(false)
        }
      })
        .catch((error) => {
          console.log('error', error);

        }).finally(() => {
          setShowBusinessImage(null)
          e.target.value = ""
        })
    }
  }

  return (
    <>
      <div key={vendor.id} className=''>
        <div className=" w-[480px] h-[590px] max-w-lg mx-auto p-6 grid gap-4 space-y-1 bg-sky-300 hover:bg-sky-400 shadow-md rounded-4xl text-black hover:scale-105 transition duration-200">
          <div className="flex items-center space-x-4 overflow-hidden">
            <Image
              src={vendor.business_logo}
              alt="Vendor Logo"
              width={76}
              height={46}
              className="rounded-4xl border object-cover"
              quality={100}
            />
            <h1 className="text-2xl font-bold">{vendor.business_name}</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Link href={`vendor-details/${vendor.id}`}>
              <div className="relative w-full h-64 rounded-lg overflow-hidden border">
                {mainImage ? <Image
                  src={mainImage}
                  alt="Main"
                  fill
                  className="object-cover"
                  priority
                  quality={100}
                /> : null}
              </div>
            </Link>
            <div className="flex flex-wrap space-x-2 space-y-3">
              {businessImages.map((img) => (
                <div
                  key={img.id}
                  className={`relative w-24 h-24 border rounded-lg cursor-pointer ${mainImage === img.business_image ? 'ring-2 ring-blue-500' : ''
                    }`}
                  onClick={() => setMainImage(img.business_image)}
                >
                  <div className="group">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img.id)}
                      className="absolute top-1 z-50 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center shadow-md transition opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto "
                      title="Remove Image"
                    >
                        <RiDeleteBinLine />
                    </button>
                    <div className=''>
                      <div className='relative w-24 h-24 rounded-lg overflow-hidden shadow-md group'>
                        <Image
                          src={img.business_image}
                          alt={`Thumbnail ${img.id + 1}`}
                          fill
                          className="object-cover transition-transform duration-200 group-hover:scale-105"
                          quality={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>


              ))}
              <div>
                {showBusinessImage ? (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md group">
                    <Image
                      src={showBusinessImage}
                      alt="business_image"
                      fill
                      className={`${uploading ? 'blur-sm' : ""} object-cover transition-transform duration-200 group-hover:scale-105`}
                      quality={100}
                    />
                    {
                      uploading && (
                        <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50 z-50">
                          <p className="text-white font-bold select-none">Uploading...</p>
                        </div>
                      )}
                  </div>
                ) : (
                  <div>
                    {businessImages.length < 6 &&
                    (<>
                    <label
                      htmlFor={uploadId}
                      className="flex cursor-pointer w-24 h-24 rounded-lg overflow-hidden shadow-md group bg-gray-500"
                    >
                      <IoAddSharp className="w-20 h-15 m-auto items-center text-white" />
                    </label>
                    <input
                      id={uploadId}
                      type="file"
                      name="businessImage"
                      placeholder="Add New Image"
                      accept="image/*"
                      onChange={handleShowBusinessImage}
                      className="hidden"
                    />
                    </>)
                    }
                  </div>
                )}
              </div>

            </div>

          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{vendor.category}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{vendor.location}</span>
            <span className="ml-auto text-yellow-500 font-semibold text-base">
              ⭐ 4 / 5
            </span>
          </div>
          <div className='mt-4 w-sm flex justify-around m-auto'>
          <Link href={`/vendors/my-business/update/${vendor.id}`} className='text-white text-xl  w-30 rounded-xl text-center bg-blue-500 hover:bg-blue-600 cursor-pointer'>Edit</Link>
          <button onClick={() => deleteBusinessByUser(vendor.id)} className='text-white text-xl  bg-red-500 w-30 rounded-xl hover:bg-red-600 cursor-pointer'>Delete</button>
        </div>
        </div>
        
      </div>
    </>
  )
}
