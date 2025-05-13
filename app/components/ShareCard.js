'use client'

import Birthday1 from '@/app/components/Birthday1'
import Wedding1 from '@/app/components/Wedding1'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ShareCard() {
  const params = useParams()
  const [cardData, setCardData] = useState(null)

  useEffect(() => {
    const cardShare = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/card-share/${params.id}`)
        if (response.status === 200) {
          setCardData(response.data)
        }
      } catch (error) {
        console.error('Error fetching card:', error)
      }
    }

    cardShare()
  }, [params.id])

//   if (!cardData) return <div>Loading...</div>

  return (
    <>
      {cardData?.card_id === 1 && <Wedding1 fields={cardData.fields} />}
      {cardData?.card_id === 2 && <Birthday1 fields={cardData.fields} />}
    </>
  )
}
