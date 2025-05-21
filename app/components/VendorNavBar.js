'use client'

import axios from "axios";
import { MdAccountCircle } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function VendorNavbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTimeout(() => {
          setOpen(false);
        }, 100);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const logOut = async () => {
    const response = await axios.get(`${process.env.NEXT_API_URL}/logout`);
    console.log("logout response", response);
    if (response.status === 200) {
      toast.success(response.data.message);
      router.push('/login');
    }
  };

  const navItems = [
    { name: 'My Business', href: '/vendors/my-business' },
    { name: 'Create Events', href: '/dashboard/CreateEvents' },
    { name: 'Event Details', href: '/dashboard/EventDetails' },
    
  ];

  return (
    <div className="bg-white w-full">
      <nav className="bg-white shadow-xs p-1">
        <div className="flex items-center justify-between">
          <Image src="/images/planIt.png" alt="home image" width={70} height={50} />

          <div className="hidden md:flex space-x-3 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition ${
                  pathname === item.href
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-700 hover:bg-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Account dropdown with relative wrapper */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="px-5 cursor-pointer text-lg font-bold text-center rounded-xl transition text-gray-700"
                onClick={() => setOpen(!open)}
              >
                <MdAccountCircle size={30} />
              </button>

              {open && (
                <div
                  className="absolute right-0 mt-2 text-center w-36 font-bold text-sm text-gray-700 bg-white rounded shadow-lg z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-300">
                    Profile
                  </Link>
                  <Link href="/dashboard/myCards" className="block px-4 py-2 hover:bg-gray-300">
                    My Cards
                  </Link>
                  <button
                    onClick={logOut}
                    className="w-full block px-4 py-2 text-center hover:bg-gray-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
