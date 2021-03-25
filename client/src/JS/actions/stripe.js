import axios from 'axios'


export const createConnectAccount=async(token)=>
await axios.post(`${process.env.REACT_APP_API}/create-connect-account`,{},
 {
    headers:{
        authorization:`Bearer ${token}`,
    } 
 }
)

//send the token when request to backend:
//second take body and third the header :
export const getAccountStatus=async(token)=>
await axios.post(`${process.env.REACT_APP_API}/get-account-status`,{},
{headers:{
    authorization:`Bearer ${token}`,
}
}
)


export const getAccountBalance=async(token)=>
await axios.post(`${process.env.REACT_APP_API}/get-account-balance`,{},
{headers:{
    authorization:`Bearer ${token}`,
}
}
)

export const currencyFormatter = data =>{

    return(data/100).toLocaleString(data.currency,{
      style:'currency',
      currency: data.currency,
    })
  }


  
export const payoutSetting=async(token)=>
await axios.post(`${process.env.REACT_APP_API}/payout-setting`,{},
{headers:{
    authorization:`Bearer ${token}`,
}
}
)