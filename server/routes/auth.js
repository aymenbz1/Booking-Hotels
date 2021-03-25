// const express=require("express")
import express from 'express';
const router=express.Router();
import {register} from "../controllers/auth"
import {login} from "../controllers/auth"


// router.get(('/:message'),showMessage);
router.post('/register',register);
router.post('/login',login)
 module.exports=router; 