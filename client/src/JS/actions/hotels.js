import axios from 'axios'


export const createHotel=async(token,data)=>
await axios.post(`${process.env.REACT_APP_API}/create-hotel`,data,
{headers:{
    authorization:`Bearer ${token}`,
}
})

export const allHotels=async()=>
await axios.get(`${process.env.REACT_APP_API}/hotels`)

export const diffDays=(from,to)=>{
    //day en ms :24hr*60mn*60s*1000
    const day=24*60*60*1000;
    const start =new Date(from)
    const end =new Date(to)
    const difference=Math.round(Math.abs((start-end)/day))
    return difference ;
}

export const sellerHotels= async (token) =>
await axios.get(`${process.env.REACT_APP_API}/seller-hotels`,{
    headers: {
        authorization:`Bearer ${token}`,
    }
})

export const deleteHotel=async (token,hotelId)=>
await axios.delete(`${process.env.REACT_APP_API}/delete-hotel/${hotelId}`,{
    headers: {
        authorization:`Bearer ${token}`,
    }
});

export const read=async (hotelId)=>
await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);

export const updateHotel=async(token,data,hotelId)=>
await axios.put(`${process.env.REACT_APP_API}/update-hotel/${hotelId}`,data,
{headers:{
    authorization:`Bearer ${token}`,
}
})