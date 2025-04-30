'use client'
import axios from "axios";
import { MdAccountCircle } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function DashboardNavbar() {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTimeout(() => {
          setOpen(false);
        },100)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const router = useRouter()
  const pathname = usePathname()
  const logOut = async () => {
    const response = await axios.get(`${process.env.NEXT_API_URL}/logout`)
    console.log("logout response", response)
    if (response.status == 200) {
      toast.success(response.data.message)
      router.push('/login')
    }

  }
  const navItems = [
    { name: 'My Events', href: '/dashboard/MyEvents' },
    { name: 'Create Events', href: '/dashboard/CreateEvents' },
    { name: 'Event Details', href: '/dashboard/EventDetails' },
    { name: 'Checklist', href: '/dashboard/Checklist' },
    { name: ' Budget Assistant', href: '/dashboard/BudgetAssistant' },
    { name: ' Invitation', href: '/dashboard/Invitation' },
    { name: ' Notes', href: '/dashboard/Notes' },
    { name: ' Find Planners', href: '/dashboard/FindPlanners' },
  ]
  return (
    <div className="bg-white absolute top-0 right-0 w-full">
      <nav className="bg-white shadow-xs p-1">
        <div className="flex  items-center justify-between">
          {/* <h1 className="text-2xl font-bold text-pink-600">User Dashboard</h1> */}
          <Image src={'/planIt.png'} alt="home image" width={70} height={50} />
          {/* 
        <button
          className="md:hidden p-2 rounded-lg bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button> */}

          <div className="hidden md:flex space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition ${pathname === item.href
                  ? 'bg-pink-500 text-white'
                  : 'text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <div>
            <button className="px-5 cursor-pointer text-lg font-bold text-center rounded-xl transition text-gray-700" ref={dropdownRef} onClick={() => setOpen(!open)}><MdAccountCircle size={30} />
            </button>
            
           </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* {menuOpen && (
        <div className="mt-4 md:hidden flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition ${
                pathname === item.href
                  ? 'bg-pink-500 text-white'
                  : 'text-gray-700 hover:bg-pink-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )} */}
     
      {open && (
              <div className="absolute right-0 text-center w-30 font-bold text-sm text-gray-700 bg-white  rounded shadow-lg z-50" onClick={(e)=>e.stopPropagation()}>
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-300">
                  Profile
                </Link>
                <Link href='/dashboard/myCards' className=" cursor-pointer block px-4 py-2 hover:bg-gray-300">
                  My Cards
                </Link>
                <button onClick={logOut} className=" w-full cursor-pointer block px-4 py-2 hover:bg-gray-300">
                  Logout
                </button>
              </div>
            )}
         </nav>

    </div>
  )
}
