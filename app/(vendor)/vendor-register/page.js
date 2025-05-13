'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const initialValues = {
  businessName: "",
  category: "",
  businessLogo: "",
  businessImage: [],
  description: "",
  location: ""
};

const VendorRegistration = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [logoPreview, setLogoPreview] = useState(null);
  const [businessImages, setBusinessImages] = useState([]);
  const [location, setLocation] = useState('');

  const VendorRegistrationSchema = Yup.object({
    businessName: Yup.string().required("Business name is required"),
    category: Yup.string().required('Business Category is required'),
    location: Yup.string().required('Location is required')
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: VendorRegistrationSchema,

    onSubmit: async () => {
      console.log('business logo', values.businessLogo.name);
            console.log('formik values', values);

      const formData = new FormData();
      formData.append('businessName', values.businessName);
      formData.append('category', values.category);
      formData.append('description', values.description);
      formData.append('location', values.location);
      formData.append('businessLogo', values.businessLogo);
      values.businessImage.forEach((file) => {
        formData.append('businessImage[]', file);
      });
      const user_token = localStorage.getItem('authorization');
      console.log('vendor authorization', user_token);
      await axios.post(
        'http://192.168.1.37:8000/system/store_vendors',
        formData,
        {
          withCredentials: true,
          headers: {
            'authorization': `${user_token}`,
          },
        }
      ).then((response) => {
        console.log('vendor-register', response);
      }).catch((error) => {
        console.log('error', error);

      });
    }
  });

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
          params: {
            key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
            q: query,
            limit: 5,
            language: 'en',
            countrycode: 'in',
          },
        });

        const results = response.data.results.map((result) => ({
          formatted: result.formatted,
          geometry: result.geometry,
        }));

        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (place) => {
    setQuery(place.formatted);
    setSuggestions([]);
    console.log('Selected coordinates:', place.geometry);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file))
      values.businessLogo = file;
    };
  };

  const handleBusinessImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setBusinessImages(prev => {
      const updated = [...prev, ...newImages]
      values.businessImage = updated.map(img => img.file)
      return updated
    });
    e.target.value = '';
  };

  const removeLogo = () => {
    setLogoPreview(null);
    values.businessLogo = null
  };

  const removeBusinessImage = (indexToRemove) => {
    setBusinessImages(prev =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center text-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Vendor Registration</h2>
        <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700">Vendor Business Name</label>
            <input type="text" onChange={handleChange} onBlur={handleBlur} name="businessName" required className="mt-1 p-2 w-full rounded-lg border-gray-300 shadow-sm" />
            {touched.businessName && errors.businessName ? <p className='text-sm text-red-500'>{errors.businessName}</p> : ""}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category" onChange={handleChange} onBlur={handleBlur} required className="mt-1 px-2 py-1 w-full rounded-lg border-gray-300 shadow-sm">
              <option value="">-- Select Category --</option>
              <option value="catering">Catering</option>
              <option value="photographer">Photographer</option>
              <option value="Dj">Dj</option>
              <option value="flower-decorator">Flower Decorator</option>
            </select>
            {(touched.category && errors.category) ? <p className='text-sm text-red-500'>{errors.category}</p> : ""}
          </div>

          <div className="flex items-start gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Vendor Logo</label>
              <input
                name='businessLogo'
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                onBlur={handleBlur}
                className="mt-1 block w-full text-sm file:py-2 file:px-4 file:rounded-lg file:bg-indigo-50 file:text-indigo-700"
              />
            </div>
            {logoPreview && (
              <div className="relative">
                <img src={logoPreview} alt="Vendor Logo" className="w-28 h-28 object-cover rounded-md mt-6" />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute top-[-8px] right-[-8px] bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  title="Remove Logo"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Business Images</label>
            <div className="flex gap-4 flex-wrap items-center">
              <input
                name='businessImage'
                type="file"
                accept="image/*"
                multiple
                onChange={handleBusinessImagesChange}
                onBlur={handleBlur}
                className="text-sm file:py-2 file:px-4 file:rounded-lg file:bg-indigo-50 file:text-indigo-700"
              />
              {businessImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.url}
                    alt={`Business ${index}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeBusinessImage(index)}
                    className="absolute top-[-8px] right-[-8px] bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea onChange={handleChange} onBlur={handleBlur} name='description' className="mt-1 p-3 overflow-hidden w-full rounded-lg border-gray-300 shadow-sm"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vendor Location</label>
            <input
              name='location'
              type="text"
              className="mt-1 p-2 w-full rounded-lg border-gray-300 shadow-sm"
              placeholder="Enter a location"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                handleChange(e)
              }}
              onBlur={handleBlur}
            />
            {suggestions.length > 0 && (
              <ul className="absolute w-sm rounded-lg bg-white z-10 "
              >
                {suggestions.map((place, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(place)}
                    className="p-2 cursor-pointer w-sm hover:scale-105 transition duration-200"
                    style={{ boxShadow: '-4px -4px 10px rgba(0, 0, 0, 0.2)' }}

                  >
                    {place.formatted}
                  </li>
                ))}
              </ul>
            )}
            {(touched.location && errors.location) ? <p className='text-sm text-red-500'>{errors.location}</p> : ""}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            Register Vendor
          </button>
        </form>
      </div>
    </div>
  )
}

export default VendorRegistration;
