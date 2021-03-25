import {LoadingOutlined} from "@ant-design/icons"
import {useEffect} from "react"
import {useSelector,useDispatch} from 'react-redux'
import { updateUserInLocalStorage } from "../../JS/actions/auth"
import {getAccountStatus} from '../../JS/actions/stripe'
const StripeCallback =({history})=>{
//get auth from the state :
const {auth}=useSelector((state)=>({...state}))
const dispatch =useDispatch();

//make request use dispatch , when auth changes run it :
useEffect(() => {
    //execute accountStatus function:
    if (auth &&auth.token) accountStatus()
   
}, [auth])

//function make request to the backend:
const accountStatus=async()=>{
try{
    const res=await getAccountStatus(auth.token)
    // console.log("USER ACCOUNT STATUS STRIPE",res)

updateUserInLocalStorage(res.data,()=>{
    //update user in redux 
dispatch({
     type:"LOGGED_IN_USER",
     payload : res.data,
})
//redirect user to dashboard 
window.location.href="/dashboard/seller"

})

}catch(err){
    console.log(err)
}

}

    return (
        <div className="d-flex justify-content-center p-5">
          <LoadingOutlined className="display-1 p-5 text-danger" />
        </div>
      );


}
export default StripeCallback;