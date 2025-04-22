'use client'
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DashboardNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const logOut=async()=>{
    const response = await axios.get('http://192.168.1.37:8000/system/logout')
    console.log("logout response",response)
    if(response.status == 200){
      toast.success(response.data.message)
      router.push('/login')
    }

  }
  const navItems = [
    {name:'My Events',href:'/dashboard/MyEvents'},
    {name:'Create Events',href:'/dashboard/CreateEvents'},
    {name:'Event Details',href:'/dashboard/EventDetails'},
    {name:'Checklist',href:'/dashboard/Checklist'},
    {name:' Budget Assistant',href:'/dashboard/BudgetAssistant'},
    {name:' Invitation',href:'/dashboard/Invitation'},
    {name:' Notes',href:'/dashboard/Notes'},
    {name:' Find Planners',href:'/dashboard/FindPlanners'},
  ]
  return (
    <div className="bg-white">
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
              className={`px-4 py-2 text-sm font-bold rounded-xl transition ${
                pathname === item.href
                  ? 'bg-pink-500 text-white'
                  : 'text-gray-700 hover:bg-pink-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button className="px-4 cursor-pointer py-2 text-sm font-bold rounded-xl transition text-gray-700" onClick={logOut}>My Account</button>
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
    </nav>
    
    </div>
  )
}
