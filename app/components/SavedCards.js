import { useRouter } from 'next/navigation';
import React from 'react'
import Wedding1 from './Wedding1';
import Birthday1 from './Birthday1';

export default function SavedCards({cards}) {
    const router = useRouter()
  return (
    <>
     {cards
       .map(card => {
         if (card.card_id == 1) return <Wedding1 key={card.card_id} id={card.card_id} router={router} fields={card.fields} />;
         if (card.card_id == 2) return <Birthday1 key={card.card_id} id={card.card_id} router={router} fields={card.fields} />;
         return null;
       })
     }
   </>
  )
}
