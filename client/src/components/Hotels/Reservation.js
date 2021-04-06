import React from 'react'
import {useSelector} from'react-redux'
import {useState,useEffect} from "react"
import {DatePicker,Select} from'antd';
import moment from 'moment';
import { toast } from 'react-toastify';

import './Reservation.css'

const Reservation = ({history}) => {

    const {auth}= useSelector((state)=>({...state}));
    const {token}=auth

     const [values ,setValues]=useState({
        title: "",
        content:"",
        location:"",
        image:"",
        price:"",
        from:"",
        to:"",
        bed:"",
   })
   const [firstName, setFirstName] = useState("")
   const [lastName, setLastName] = useState("")
   const [email, setEmail] = useState("")

     const handleChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
      }

      const handleClick= (e)=>{
        e.preventDefault()
         history.push('/')
         toast("Booking sucess")
      }
   

    return (
        <>
         <div class="container"><div class=" text-center mt-5 ">
        <h1>Bootstrap Contact Form</h1>
    </div>
    <div class="row ">
        <div class="col-lg-7 mx-auto">
            <div class="card mt-2 mx-auto p-4 bg-light">
                <div class="card-body bg-light">
                    <div class="container">
                        <form id="contact-form" role="form">
                            <div class="controls">

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group"> <label for="form_name">Firstname *</label> <input id="form_name" type="text" name="name" class="form-control" placeholder="Please enter your firstname *" value={firstName} required="required" data-error="Firstname is required."  onChange={(e)=>setFirstName(e.target.value)}/> </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group"> <label for="form_lastname">Lastname *</label> <input id="form_lastname" type="text" name="surname" class="form-control" placeholder="Please enter your lastname *" value={lastName}  required="required" data-error="Lastname is required." onChange={(e)=>setLastName(e.target.value)}/> </div>
                                    </div>
                                </div>
                                      
                                <div class="row">
                                    <div class="col-md-6">
                                    <DatePicker 
       placeholder="From date"
        className="form-control m-2" 
        onChange={(date,dateString)=> setValues({...values,from:dateString})}
        disabledDate={(current)=>current && current.valueOf()<moment().subtract(1,"days")
       }
        />
       
       <DatePicker 
       placeholder="To date"
        className="form-control m-2" 
        onChange={(date,dateString)=> setValues({...values,to:dateString})}
        disabledDate={(current)=>current && current.valueOf()<moment().subtract(1,"days")
       }
        />
                                  
                                  </div>
                                  </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group"> <label for="form_email">Email *</label> <input id="form_email" type="email" name="email" value={email} class="form-control" placeholder="Please enter your email *" required="required" data-error="Valid email is required." onChange={(e)=>setEmail(e.target.value)}/> </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group"> <label for="form_need">Please specify your need *</label> <select id="form_need" name="need" class="form-control" required="required" data-error="Please specify your need.">
                                                <option value="" selected disabled>--Select Your Option--</option>
                                                <option>Only Breakfast</option>
                                                <option> half-board option</option>
                                                <option>All Inclusive Soft</option>
                                                <option>All Inclusive </option>
                                                
                                            </select> 
                                            </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group"> <label for="form_message">Special Requests</label> <textarea id="form_message" name="message" class="form-control" placeholder="You can always make a special request after your booking is complete!." rows="4" required="required" data-error="Please, leave us a message."></textarea> </div>
                                    </div>
                                    <div class="col-md-12"> <input type="submit" class="btn btn-success btn-send pt-2 btn-block " value="Book" onClick={handleClick} disabled={!firstName ||!lastName || !email}/> </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        </div> 
    </div>
</div> 


        </>
    )
}
        {/* <h2 className="addHotel">Book Hotel</h2>
        <form>
          <label>First name</label>
          <input type="text" name="name" onChange={handleChange} required />

          <label>Last name</label>
          <input type="text" name="rating" onChange={handleChange} required />

          <label>Email</label>
          <input type="text" name="date" onChange={handleChange} required />

          <label>Movie Image</label>
          <input type="url" name="image" onChange={handleChange} required />
          <label>Movie Summary</label>
          <textarea
            type="text"
            name="description"
            onChange={handleChange}
            required
          />
        </form>
        <button
          className="Modal-btn"
        //   onClick={() => {
        
           
        //   }}
        >
          Submit
        </button> */}
    


export default Reservation
