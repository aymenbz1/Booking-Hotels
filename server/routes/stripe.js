// const express=require("express")
import express from 'express';
const router=express.Router();
import {createConnectAccount} from "../controllers/stripe"
import {getAccountStatus,getAccountBalance,payoutSetting} from "../controllers/stripe"
//middelware :
import {requireSignin} from "../middelware"

// router.get(('/:message'),showMessage);
router.post('/create-connect-account', requireSignin , createConnectAccount);
router.post('/get-account-status', requireSignin , getAccountStatus);              
router.post('/get-account-balance', requireSignin , getAccountBalance);  
router.post('/payout-setting', requireSignin , payoutSetting)      

 module.exports=router; 