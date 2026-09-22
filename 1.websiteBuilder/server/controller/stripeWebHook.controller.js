import stripe from "../config/stripe.js";
import { User } from "../models/user.model.js";

export const stripeWebHook=async(req,res)=>{
   
   const sign=req.headers["stripe_signature"]
   let event;
    try {
        
event= stripe.webhooks.constructEvent(
    req.body,
    sign,
    process.env.STRIPE_WEHOOK_SECRET
)

    } catch (error) {
     console.log(error)
     return res.status(500).json({message:"webhook error"})   
    }
    if(event.type=="checkout.session.completed"){
        const session=event.data.object
        const userId=session.metadata.userId
        const credits=Number(session.metadata.credits)
        const plan=session.metadata.plan
        await User.findByIdAndUpdate(userId,{
            $inc:{credits},
            plan
        })
    }
    return res.json({recived:true})
}