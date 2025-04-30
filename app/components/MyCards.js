'use client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Invitation from './InvitationPage'
import SavedCards from './SavedCards'
import Wedding1 from './Wedding1'
import Birthday1 from './Birthday1'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
export default  function MyCards() {
  const router = useRouter()
    console.log('hi this is from my cards')
    const [cards,setCards] = useState([])
    useEffect(()=>{
        const authorizationToken = localStorage.getItem('authorization')
        const getMyCards = async()=>{
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/my-cards`,{
            headers:{
                'authorization':`${authorizationToken}`,
                'Content-Type': 'application/json', 
            }
        }).then((response)=>{
           console.log("my card response",response);
           setCards(response.data.cards)
           
            
        }).catch((error)=>{
            console.log('error',error);
            
        })
    }
    getMyCards()
    },[setCards])

    const handleDelete = async(cardId)=>{
      await axios.post(`http://192.168.1.37:8000/system/card-delete/${cardId}`).then((response)=>{
        if(response.data.success == true){
            toast.success(response.data.message)
            setCards((prevCards) => prevCards.filter(card => card.card_detail_id != cardId));
        }
    }
   )
    }

    console.log('mycard response  hello cards',cards);
    
  return (
    <div className="min-h-screen bg-gray-50  px-6">
    <h1 className="text-3xl font-bold mb-8 text-pink-600 text-center">My Saved Cards</h1>

    {cards.length === 0 ? (
      <div className="text-center text-gray-500 text-lg">
        You haven’t saved any cards yet.
      </div>
    ) : (
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cursor-pointer h-[620px]">
        {cards.map((card) => {
          if (card.card_id == 1)
            return (
              <div
                key={card.card_id}
                className="bg-white rounded-2xl shadow-md  hover:shadow-2xl border border-gray-100 transition duration-300 overflow-hidden"
              >
                <Wedding1 fields={card.fields} handleDelete={()=>handleDelete(card.card_detail_id)} />
              </div>
            );
          if (card.card_id == 2)
            return (
              <div
                key={card.card_id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 transition duration-300 overflow-hidden"
              >
                <Birthday1 fields={card.fields} handleDelete={()=>handleDelete(card.card_detail_id)}/>
              </div>
            );
        })}
      </div>
    )}
  </div>
  )
}
