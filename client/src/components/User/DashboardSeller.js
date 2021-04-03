import DashboardNav from "../DashboardNav/DashboardNav"
import ConnectNav from "../ConnectNav/ConnectNav"
import {Link} from "react-router-dom"
import {useSelector} from 'react-redux'
import {useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import { HomeOutlined } from '@ant-design/icons'
import{createConnectAccount} from "../../JS/actions/stripe"
import {sellerHotels,deleteHotel} from '../../JS/actions/hotels'
import SmallCard from "../cards/SmallCard"
import './dashboard.css'


const DashboardSeller = () => {
 const {auth}=useSelector((state)=>({...state}));
 //Loading setup stripe button process :
 const [loading, setLoading] = useState(false)
 const [hotels, setHotels] = useState([]);

 useEffect(()=>{
   loadSellersHotels()
 },[])
 
 //loadSellers hotels func :
 const loadSellersHotels=async()=>{
   let {data}= await sellerHotels(auth.token)
   setHotels(data);
 }

//Handleclick func :
 const handleClick=async ()=>{
  setLoading(true);
  try{

    let res = await createConnectAccount(auth.token);
    console.log(res); //get login Link
    window.location.href =(res.data);
  }
  catch(err){
    console.log(err)
    toast.error('stripe connected failed')
    setLoading(false)     
  }

  }
 
//handle delete : and pass it as props in small card
const handleHotelDelete=async(hotelId)=>{
  if(!window.confirm("are you sure?")) return;
  deleteHotel(auth.token,hotelId).then((res)=>{
    toast.success("Hotel Deleted");
    loadSellersHotels()
  })
}

    //if seller connected to stripe :

    const connected=()=>(
         <div className="container-fluid">
          <div className="row">
              <div className="col-md-10">
               <h2>Your Hotels</h2>
              </div>
              <div className="col-md-2">
                  <Link to="/hotels/new" className="btn btn-primary">
                      Add New Hotel
                    </Link>
                 </div>     
              </div>
              <div className="row">
                {hotels.map(h=>
                 <SmallCard key={h._id} h={h} 
                 showViewMoreButton={false} 
                 owner={true}
                 handleHotelDelete={handleHotelDelete}
                 />)} 
                  
                 
        </div>
        </div>
    )
//if seller is notconnected to stripe :
    const notConnected=()=>(
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-6 offset-md-3 text center">
            <div className="p-5 pointer">
              <HomeOutlined className="h1"/>
              <h4>Setup payouts to post hotel room</h4>
              <p className="lead">Mern partners with stripe to transfer earnings to your bank account</p>
              <button disabled={loading} 
              onClick={handleClick} 
              className='btn btn-primary mb-3'>{loading?"Processing..." :"Setup Stripe"}</button>
              <p className="text-muted"><small>You'll be redirected to stripe to complete process</small></p>
            </div>
            </div>
            </div>
        </div>

    )
    return (
      <>
        <div className="aym container-fluid  p-4">
          <ConnectNav/>
        </div>

        <div className="container-fluid p-4">
            <DashboardNav/>
            </div>
        {auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled?
        connected()
         :notConnected()}


      </>
      
    );
  };
  
  export default DashboardSeller;