import { useRouter } from "next/navigation";
import DeleteMyCards from "./DeleteMyCards";
import EditableText from "./EditableText";
import saveMyCards from "./SaveMyCards";

export default function Wedding1({id,router,fields,handleDelete,handleShare}) {
  //  console.log('wedding1',fields['wedding-date']);


  return (
    <div className={`${!fields ?"min-h-screen mt-20 flex flex-col  items-center justify-center bg-[#f7f3f0] p-4" : "min-h-screen flex flex-col  items-center justify-center bg-[#f7f3f0] p-4"}`}>
      <div className="relative m-auto bg-[#eae4e0] w-[370px] h-[512px] shadow-2xl rounded-lg overflow-hidden border border-[#e7d8cc]">
        {/* Background image */}
        <img
          src="/images/toprightimg.png"
          alt="Floral Decoration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Content on top of image */}
        <div className="relative z-10 text-center px-6 py-20 text-[#6b654b] font-serif">
          <EditableText
            id="wedding-intro"
            defaultText={`${fields ? fields['wedding-intro'] : "together with their families \n you're joyfully invited \n to attend the"}`}
            className="text-[12px] leading-snug text-[#9e824f] roboto-slab-font whitespace-pre-line"
            field= {fields}
          />

          <EditableText
            id="wedding-title"
            defaultText="Wedding"
            className="text-[42px] font-normal italic text-[#aa9255] mb-1 dancing-script-font"
            field= {fields}
          />

          <EditableText
            id="wedding-subtitle"
            defaultText="of"
            className="text-sm text-[#aa9255]"
            field= {fields}
          />

          <EditableText
            id="wedding-names"
            defaultText={`${fields? fields['wedding-names'] : "ARIEL JARVIS &\nMARCUS WRIGHT"}`}
            className="text-2xl font-[500] leading-7 text-[#b1935d] my-3 winky-rough-font whitespace-pre-line"
            field= {fields}
          />

          <EditableText
            id="wedding-date"
            defaultText={`${fields? fields['wedding-date']:"06.23.2025"}`}
            className="text-[#97824e] tracking-wider font-medium text-sm mb-3 winky-rough-font"
            field= {fields}
          />

          <EditableText
            id="wedding-location"
            defaultText={`${fields? fields['wedding-location']: "at half past five o'clock in the evening\nSunrise Paradise Resort\nCancun, Mexico"}`}
            className="text-[12px] leading-snug mb-4 text-[#bb9a5d] roboto-slab-font whitespace-pre-line"
            field= {fields}
          />

          <EditableText
            id="wedding-footer"
            defaultText={`${fields? fields['wedding-footer']: "reception to follow ceremony"}`}
            className="dancing-script-font text-[#a57a2a] font-medium text-[15px]"
            field= {fields}
          />
        </div>
      </div>
      {!fields?<button onClick={()=>saveMyCards(id,router)} className="text-black text-2xl font-bold rounded-xl w-30 ml-5 mb-40 h-10 align-middle text-center cursor-pointer bg-orange-500  hover:bg-orange-600">Save</button>:null}
      <div className="mt-5">
       {handleDelete? <button onClick={handleDelete} className="text-black text-2xl font-bold rounded-xl w-30 ml-5 mb-40 h-10 align-middle text-center cursor-pointer bg-red-500  hover:bg-red-600">Delete</button>:null}
       {handleShare? <button onClick={handleShare} className="text-black text-2xl font-bold rounded-xl w-30 ml-5 mb-40 h-10 align-middle text-center cursor-pointer bg-blue-500  hover:bg-blue-600">Share</button>:null}
       </div>
    </div>
  );
}
