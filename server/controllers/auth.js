import User from '../models/user'
import jwt from 'jsonwebtoken'

//Register const :
export const register =async (req,res)=>{
    console.log(req.body)
const {name,email,password}=req.body;

//validation :
if (!name) return res.status(400).send('Name is required')
if (!password ||password.length<6) return res
.status(400)
.send('Password is required and should be more than 6 ')
let userExist = await User.findOne({email}).exec();
if (userExist) return res.status(400).send('Email is taken')

//register:
const user = new User(req.body);
try {
  await user.save();
  console.log("USER CREATED", user);
  return res.json({ ok: true });
} catch (err) {
  console.log("CREATE USER FAILED", err);
  return res.status(400).send("Error. Try again.");
}
}   

//login const export :
export const login=async(req,res)=>{
  const {email,password}=req.body;

  try{
// check if user with that email exist:
  let user =await User.findOne({email}).exec();
  // console.log("User exist",user)
  if (!user) res.status(400).send ("user with that email don't exist ")
//compare password :
  user.comparePassword(password,(err,match)=>{
    console.log('COMPARE PASSWORD IN LOGIN ERR',err)
    if (!match || err) return res.status (400).send('wrong password')
    //generate token : 
    let token =jwt.sign({_id:user._id},process.env.JWT_SECRET,{
      expiresIn:"7d"
    });
    //response: send token and user without password :
   res.json({token,user:{
    _id: user._id,
     name:user.name,
     email:user.email,
     createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    stripe_account_id: user.stripe_account_id,
    stripe_seller: user.stripe_seller,
    stripeSession:user.stripeSession,
    }})
  })
  console.log("where is token")
  }
   catch (err){
     console.log("Login Error",err);
     res.status(400).send("signin failed")

   }

}