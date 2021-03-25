import User from '../models/user'
import Stripe from 'stripe'
import express from 'express'
import querystring from 'query-string'

import user from '../models/user'
const stripe=Stripe("sk_test_51IVH8UHPnMVOzfCfYu59PU0oQ25nZ48XMfYfMy1bzG2xod6xYPlBwXO0ZBF6eeJ8Iv2XYDj7H8zVg8yltWd3UIKS00ymqsGBN9")

export const createConnectAccount=async(req,res)=>{
    
    //1.find user from database :
const user =await User.findById(req.user._id).exec();
console.log("user",user)


    //2.if user don't have stripe account_id ,create one :
    if (!user.stripe_account_id){
    const account = await stripe.accounts.create({
        type:"express",
      });
  
      console.log("ACCOUNT==>",account);
      user.stripe_account_id=account.id;
      user.save()
    }
// // //3.create login link : 
let accountLink = await stripe.accountLinks.create({
    account:user.stripe_account_id,
    refresh_url:process.env.STRIPE_REDIRECT_URL ,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: 'account_onboarding',
})
// // prefill any info such as email
accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });
  console.log('ACCOUNT LINK',accountLink)

//generate Link and send to front :
// returns a String that contains the URL query produced from the given object:
let link = `${accountLink.url}?${querystring.stringify(accountLink)}`
console.log('LOGIN LINK',link)
res.send (link)
}

//update delay days: 

const updateDelayDays = async (accountId)=>{
  const account = await stripe.accounts.update(accountId,{
    settings:{
      payouts:{
        schedule:{
          delay_days:7,
        }
      }
    }
  })
  return account;
}





//Update : 

export const getAccountStatus=async(req,res)=>{
// console.log("Get account status")
const user=await User.findById(req.user._id).exec();
//get account stripe:
const account=await stripe.accounts.retrieve(user.stripe_account_id);
//update delay days :
const updatedAccount = await updateDelayDays(account.id);
//update account and modify :
const updateUser=await User.findByIdAndUpdate(
  user._id,
  {
    //data want to update :
    stripe_seller:updatedAccount,
  },
  {
    //get updated informations:
    new:true
  }
).select("-password")
.exec()
//select everything except password 

res.json(updateUser)
}


//Pending balance :(money)
export const getAccountBalance=async(req,res)=>{
  const user=await User.findById(req.user._id).exec();
 try{
   const balance=await stripe.balance.retrieve({
    stripeAccount: user.stripe_account_id,
  })
  // console.log("BALANCE===>",balance);
res.json(balance)
}
  catch(err){
    console.log(err)
  }

}


export const payoutSetting=async(req,res)=>{

  try{
    const user=await User.findById(req.user._id).exec();
    const loginLink=await stripe.accounts.createLoginLink(user.stripe_account_id,{
      redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL
  })
  res.json(loginLink)
  }
  catch (err){
    console.log('Stripe settings err',err)
  }
}