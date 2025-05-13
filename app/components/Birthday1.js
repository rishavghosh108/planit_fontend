import DeleteMyCards from "./DeleteMyCards";
import EditableText from "./EditableText";
import saveMyCards from "./SaveMyCards";

export default function Birthday1({id,router,fields,handleDelete,handleShare}) {
  return (
    <div className={`${!fields ?"min-h-screen mt-20 flex flex-col  items-center justify-center bg-[#f7f3f0] p-4" : "min-h-screen flex flex-col  items-center justify-center bg-[#f7f3f0] p-4"}`}>
    <div className="relative bg-[#fffaf6] w-[370px] h-[512px] shadow-2xl rounded-lg border border-[#ebdcd2] overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/birthdaybg.jpg"
          alt="Confetti Background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Card Content */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10 text-center px-6 py-8">
        <div className="mb-3">
          <EditableText
            id="birthday-title"
            defaultText="BIRTHDAY"
            className="text-4xl font-normal text-[#3dcedb] tracking-wide yeseva-one-regular"
            field= {fields}
          />
          <EditableText
            id="birthday-subtitle"
            defaultText="Party"
            className="text-6xl italic text-[#ec7171] windsong-regular pl-[50px] mt-[-13px]"
            field= {fields}
          />
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-1 mb-4">
          <span className="w-1.5 h-1.5 bg-[#fbbf24] rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-[#ec4899] rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-[#38bdf8] rounded-full"></span>
        </div>

        {/* Main Text */}
        <EditableText
          id="birthday-name-age"
          defaultText={`${fields? fields['birthday-name-age']: "JOHN IS \nTURNING TEN!"}`}
          className="text-lg font-medium text-[#580303] mb-10 noto-sans-mono-font leading-[1.5] whitespace-pre-line"
          field= {fields}

        />

        {/* Details */}
        <EditableText
          id="birthday-details-1"
          defaultText={`${fields? fields['birthday-details-1']: "saturday, may 2nd\nat four o'clock"}`}
          className="text-sm text-[#580303] leading-snug mb-4 roboto-mono-font font-semibold whitespace-pre-line"
          field= {fields}
            
        />
        <EditableText
          id="birthday-details-2"
          defaultText={`${fields? fields['birthday-details-2'] : "1602 hill street\napartment 154\nappletree, iowa"}`}
          className="text-sm text-[#580303] leading-snug mb-4 roboto-mono-font font-semibold whitespace-pre-line"
          field= {fields}             
        />
        <EditableText
          id="birthday-rsvp"
          defaultText={`${fields? fields['birthday-rsvp']: "rsvp to:\njane@gmail.com"}`}
          className="text-sm text-[#580303] leading-snug mb-2 roboto-mono-font font-semibold whitespace-pre-line"
          field = {fields}             
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
