import express from 'express';
import formidable from 'express-formidable'

const router=express.Router();

//controller:
import {create,hotels,image,sellerHotels,remove,read,update,searchListings } from "../controllers/hotel"
//middleware :
import {requireSignin,hotelOwner} from "../middelware/index"

//same path in client actions :
router.post('/create-hotel',requireSignin,formidable(),create);
router.get('/hotels',hotels)
router.get('/hotel/image/:hotelId',image)
router.get('/seller-hotels',requireSignin,sellerHotels)
router.delete('/delete-hotel/:hotelId',requireSignin,hotelOwner,remove)
router.get("/hotel/:hotelId",read)
router.put("/update-hotel/:hotelId",requireSignin,hotelOwner,formidable(),update)
router.post("/search-listings",searchListings)
 module.exports=router; 