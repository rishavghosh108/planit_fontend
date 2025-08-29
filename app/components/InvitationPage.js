'use client'
import { useEffect } from "react";
import EditableText from "./EditableText";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { saveCards } from "../store/slices/eventSlice";
import Wedding1 from "./Wedding1";
import Birthday1 from "./Birthday1";

export default function Invitation() {
  const dispatch = useDispatch()
  const router = useRouter()
  const existedCards = useSelector((state)=>state.user.cards)
  console.log('existed card',existedCards);
  
  useEffect(()=>{
    const editCards = localStorage.getItem('cards')
    console.log('editCards',editCards);
    
    dispatch(saveCards(JSON.parse(editCards)))
  },[existedCards])
  const params = useParams()
  console.log('cardparams',params)
  let cards = useSelector((state)=>state.user.cards)
  console.log('cardDetails',cards);
  
  let events = useSelector((state) => state.user.events)
  console.log('events', events[0])
  let authorizationToken = ""
  useEffect(() => {
    authorizationToken = localStorage.getItem('authorization');
  }, [])
  


  return (
    <>
  {cards
    .filter(card => card.id == params.cid && card.event_id == params.id)
    .map(card => {
      if (card.id == 1) return <Wedding1 key={card.id} id={card.id} router={router} />;
      if (card.id == 2) return <Birthday1 key={card.id} id={card.id} router={router} />;
      return null;
    })
  }
</>
  
  );
}