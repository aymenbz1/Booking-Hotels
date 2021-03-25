import mongoose from 'mongoose'

const Schema=mongoose.Schema
const {ObjectId}=mongoose.Schema
//objectId make document unique :

const hotelSchema= new Schema({
    title:{
        type:String,
        required:"Title is required",
    },
    content:{
        type:String,
        required:"Content is required",
        maxlength:1000,
  },
  location:{
    type:String, 
},
price:{
    type:Number,
    required:"Price is required",
    trim:true,
},
postedBy:{
    type:ObjectId,
    ref:"User",
},
image:{
    data:Buffer,
    contentType:String,
},
from :{
    type:Date
},
to:{
    type:Date
},
bed : {
    type:Number,
},
},{timestamps: true}
);

//timestamps option tells mongoose to assign createdAt and updatedAt fields to your schema. The type assigned is Date
// trim will help in removing the white spaces present 

export default mongoose.model('Hotel',hotelSchema)