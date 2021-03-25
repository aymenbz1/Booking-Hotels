// const express=require("express")
// import router from './routes/auth';
import express from 'express';
import fs from "fs";
import cors from "cors"
import mongoose from 'mongoose'
const morgan =require('morgan');
require('dotenv').config();
const app=express();

//db connection :
mongoose.connect(process.env.DATABASE,{
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
         useCreateIndex: true,})
.then(()=>console.log("DB connected"))
.catch((err)=>console.log("DB connection error: ",err))


//middlewares :
app.use(cors());
app.use(morgan('dev'));
app.use(express.json())

//route middleware 
fs.readdirSync('./routes').map((r)=>app.use('/api',require(`./routes/${r}`)))

const port = process.env.PORT || 8000

app.listen(port,()=>console.log(`server is running on port ${port}`))