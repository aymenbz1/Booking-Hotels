import React from 'react'
import {read} from "../../JS/actions/hotels"
import {useSelector} from'react-redux'
import {useStore} from 'react-redux'
import {useState,useEffect} from "react"
import {diffDays} from '../../JS/actions/hotels'
import {moment} from 'moment'
import Reservation from './Reservation'
import './ViewHotel.css'


// const {option}=Select;

const ViewHotel=({match,history})=>{
//state to store  one hotel as response :    
const[hotel,setHotel]=useState({})
const [image,setImage]=useState("")

const {auth}= useSelector((state)=>({...state}));
// const {token}=auth

useEffect(()=>{
    loadSellerHotel()
    },[]);

    const loadSellerHotel=async()=>{
        let res = await read (match.params.hotelId);
        // console.log(res)
        setHotel(res.data)
        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`)
        console.log(res)
    }

    const handleClick= (e)=>{
      e.preventDefault()
      if (!auth) history.push('/login')
       history.push('/booking')
       
    }

    return <>
    <div className="name container-fluid p-5 text-center">
        <h2>{hotel.title}</h2>
    </div>
    <div className="cent container-fluid">
        <div className="row">
            <div className="col-md-6">
                <br/>
                <div className='wrap'>

                <div className='image'>
                <img src={image} alt={hotel.title} className="img img-fluid m-2"/>
                </div>

                <div className="a container-fluid">
                    <br/>
                    <b>{hotel.content}</b>
                    <p className="alert alert-info mt-3">${hotel.price}</p>
                    </div>

                    </div>
                    <p className='card-text'>
                  {/* <span className='float-right text-primary'>
                      for {diffDays(hotel.from,hotel.to)}{""}
                      {diffDays(hotel.from,hotel.to)<=1?"day":"days"}
                  </span> */}
                  </p>

                  {/* <p>From<br/>{" "}{moment(new Date(hotel.from))}</p> */}
                  {/* <p>To <br/>{" "}{moment(new Date(hotel.to)).format("MMMM Do YYYY ,h:mm:ss a")}</p> */}
                <div className='btn'>
                 <button onClick={handleClick} className="bout btn btn-block btn-lg btn-primary mt-3">
                   {auth && auth.token? "Book Now" :"Login to Book"}
                   </button>
                    
                   </div>
            </div>
        </div>
    </div>
    </>

}
export default ViewHotel;