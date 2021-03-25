import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const Schema=mongoose.Schema


const userSchema=new Schema({
    name:{type:String,
           required:true},
    email:{type:String,
        required:true},
    password:{type:String,
        required:true},
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  }, 
  { timestamps: true }   
)

userSchema.pre("save", function (next) {
// hashing should be done only in 2 situations
//  * 1. if it is the first time a user is being saved/created
//  * 2. user have updated/modified the existing password
let user = this;
if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log("BCRYPT HASH ERR ", err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});


userSchema.methods.comparePassword=function(password,next){
  bcrypt.compare(password,this.password, function(err, match) {
    if (err) {
      console.log("COMPARE PASSWORD ERR", err);
      return next (err,false)
    }
    // if no err, we get null
    console.log("Match Password",match)
    return next (null,match)
});
}


export default mongoose.model("User",userSchema);