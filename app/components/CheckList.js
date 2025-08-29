'use client'
import axios from 'axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function CheckList() {
    const [checklists, setChecklists] = useState([])
    const [selectedItem, setSelectItem] = useState([])
    const [ritual,setRitual] = useState('')
    const [itinerary,setItinerary] = useState([])
    const params = useParams()
    useEffect(() => {
        const getCheckList = async () => {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL_SYSTEM}/events/${params.id}/checklists`).then((response) => {
                if (response.data.status == true) {
                    setChecklists(response.data.checklists)
                }
            })
        }
        getCheckList()
    }, [])
    const selectChecklist = (id) => {
        setSelectItem((prev) =>
            prev.includes(id) ? prev.filter((itemid) => itemid != id) : [...prev, id]
        )
    }
    const selectAllCheckList = () => {
        if (checklists.length === selectedItem.length) {
            setSelectItem([])
        }
        else {
            setSelectItem(checklists.map((checklist) => checklist.id))
        }

    }

    const saveRitual = (e)=>{
        setRitual(e.target.value)
    }
    const generateTask = async()=>{
       await axios.post(`${process.env.NEXT_PUBLIC_API_URL_SYSTEM}/events/${params.id}/generate-itinerary`,{ritual:ritual,selected_checklist_ids:selectedItem}).then((response)=>{
        console.log('itinirary',response);
        setItinerary(response.data.itinerary)
       })
    }
    console.log('checklist', selectedItem);
    console.log('ritual', ritual);
    console.log('itinerary', itinerary);




    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center flex-col gap-9">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Checklist</h2>
            <label className='font-semibold text-gray-900 text-xl'>
            <select value={ritual} onChange={saveRitual} required className="text-black  font-semibold px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500">
                <option value="" disabled>Select Your Ritual</option>
                <option value="bengali">Bengali Hindu</option>
                <option value="tamil">Tamil Hindu</option>
                <option value="marwari">Marwari</option>
                <option value="gujrati">Gujrati Hindu</option>
            </select>
            </label>
            <label htmlFor='allChecklist' className='text-black text-xl'>
                <input type='checkbox' name='allChecklist' id='allChecklist' className='mr-1' onChange={selectAllCheckList} checked={selectedItem.length > 0 && selectedItem.length === checklists.length} />
                Select all
            </label>
            <div>
                <ul className="flex justify-center flex-wrap gap-6">
                    {checklists.map((checklist) => {
                        const isSelected = selectedItem.includes(checklist.id)
                        return (
                            <li
                                key={checklist.id}
                                onClick={() => selectChecklist(checklist.id)}
                                className={`flex justify-center text-center font-medium items-center gap-3  px-6 py-4 rounded-xl shadow-md hover:shadow-lg hover:bg-green-300 transition cursor-pointer w-64 text-lg text-gray-800 hover:scale-105 duration-200 ${isSelected ? 'bg-green-300 ' : 'bg-slate-300'}`}
                            >
                                {checklist.title}
                            </li>)
                    }
                    )}
                </ul>
            </div>

            <button onClick={generateTask} className='w-sm text-center flex justify-center items-center rounded-3xl hover:bg-blue-500 cursor-pointer h-12  text-gray-800 text-xl  bg-blue-400'>Generate Task</button>
        </div>

    )
}
