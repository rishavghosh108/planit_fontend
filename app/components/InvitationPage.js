'use client'
import { useEffect } from "react";
import EditableText from "./EditableText";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function WeddingInvitation() {
    
  
       let events = useSelector((state)=>state.user.events)
       console.log('events',events[0])
       
   

  return (
    <>
   {(events[0] && events[0][0].event_type =='wedding')?(<div className="h-screen bg-white w-full pt-15"><div className="relative bg-amber-100  w-[370px] h-[512px] shadow-xl rounded-lg overflow-hidden border border-[#e7d8cc] m-auto ">
      <Image
        src="/toprightimg.png"
        alt="Floral Decoration"
        className="absolute inset-0 w-full h-full object-cover"
        width={370}
        height={512}
      />
      <div className="relative z-10 text-center px-6 py-20 text-[#6b654b] font-serif">
        <EditableText
          id="wedding-intro"
          defaultText={`together with their families \n you're joyfully invited \n to attend the`}
          className="text-[12px] leading-snug text-[#9e824f] roboto-slab-font whitespace-pre-line"
        />

        <EditableText
          id="wedding-title"
          defaultText="Wedding"
          className="text-[42px] font-normal italic text-[#aa9255] mb-1 dancing-script-font"
        />

        <EditableText
          id="wedding-subtitle"
          defaultText="of"
          className="text-sm text-[#aa9255]"
        />

        <EditableText
          id="wedding-names"
          defaultText={`ARIEL JARV &\nMARCUS WRIGHT`}
          className="text-2xl font-[500] leading-7 text-[#b1935d] my-3 winky-rough-font whitespace-pre-line"
        />

        <EditableText
          id="wedding-date"
          defaultText="06.23.2025"
          className="text-[#97824e] tracking-wider font-medium text-sm mb-3 winky-rough-font"
        />

        <EditableText
          id="wedding-location"
          defaultText={`at half past five o'clock in the evening\nSunries Paradise Resort\nCancun, Mexico`}
          className="text-[12px] leading-snug mb-4 text-[#bb9a5d] roboto-slab-font whitespace-pre-line"
        />

        <EditableText
          id="wedding-footer"
          defaultText="reception to follow ceremony"
          className="dancing-script-font text-[#a57a2a] font-medium text-[15px]"
        />
      </div>
    </div>
    </div>):""}
    </>
  );
}