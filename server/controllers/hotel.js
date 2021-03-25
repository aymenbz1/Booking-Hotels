import Hotel from '../models/hotel';
import fs from "fs";
export const create=async(req,res)=>{

    try{
        let fields=req.fields 
        let files = req.files

        let hotel = new Hotel(fields);
        //save who posted with his id :
        hotel.postedBy=req.user._id;
         // handle image :read the image synchronously and then save it:
         if(files.image){
             //give the image path
             hotel.image.data=fs.readFileSync(files.image.path);
             hotel.image.contentType=files.image.type;
         }
     hotel.save((err,result)=>{
         if(err){
             console.log('saving hotel err =>',err)
             res.status(400).send('error saving');
         }
         res.json(result);
     });
    
    }
    catch(err){
   console.log(err);
   res.status(400).json({
       err:err.message,
   })
    }
}

export const hotels = async (req,res)=>{
let all = await Hotel.find({})
.limit(24)
.select('-image.data')
.populate("postedBy",'_id name')
.exec();
res.json(all);

}


export const image= async(req,res)=>{
    let hotel=await Hotel.findById(req.params.hotelId).exec();
    if(hotel &&hotel.image&& hotel.image.data!==null){
        res.set("Content-type",hotel.image.contentType);
        return res.send(hotel.image.data);
    }
}

export const sellerHotels =async(req,res)=>{
    let all= await Hotel.find({postedBy:req.user._id})
    .select('-image.data')
    .populate('postedBy','_id name')
    .exec();

   res.send(all) 
}

export const remove=async(req,res)=>{
    let removed =await Hotel.findByIdAndDelete(req.params.hotelId).exec();
    res.json(removed)
};


export const read = async (req,res)=>{
    let hotel = await Hotel.findById(req.params.hotelId)
    .select("-image.data")
    .exec();
    res.json(hotel);
};

export const update = async(req,res)=>{

    try{
        let fields=req.fields;
        let files = req.files;

        let data={...fields};
 //if we recive image :
        if(files.image){
            //give the image path
            image.data=fs.readFileSync(files.image.path);
            image.contentType=files.image.type;
       //if there is image it will be added to this data :
            data.image=image;
        }
let updated = await Hotel.findByIdAndUpdate(req.params.hotelId,data,{
    new:true,
}).select("-image.data")
res.json(updated)
    }

    catch(err){
        console.log(err)
        res.status(400).send('Hotel update failed')
    }
}
