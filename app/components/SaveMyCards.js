import axios from "axios"
import toast from "react-hot-toast";

const saveMyCards = async (id,router) => {
    let weddingTitle = localStorage
    const authorizationToken = localStorage.getItem('authorization')
    const weddingData = JSON.stringify(weddingTitle);
    const parseData = JSON.parse(weddingData);
    let cardsArray = []
    cardsArray = [parseData]
    console.log('cardsArray', cardsArray);
    const fields = cardsArray.map(({ cards, authorization, ...rest }) => ({
        ...rest,
        cardId: id
    }));

     await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/save-card`, { fields: fields[0] }, {
        withCredentials: true,
        headers: {
            'authorization': `${authorizationToken}`,
            'Content-Type': 'application/json',

        }
    }).then((response)=>{
        console.log('saveCards',response);
        if(response.data.status == true){
            for(let key in fields[0]){
                localStorage.removeItem(`${key}`)
               
            }
            toast.success(response.data.message)
            router.push('/dashboard')
        }
        
    })





};

export default saveMyCards;