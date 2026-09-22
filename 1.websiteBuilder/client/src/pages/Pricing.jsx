import { ArrowLeft, Check, Coins } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {serverUrl} from '../App.jsx'
import { useSelector } from 'react-redux'
import axios from 'axios'
    const plans=[{key:"free",
        name:"free",
        price:"$0",
    credits: 100,
descripsition:"Perfect to explore GenWeb.ai",
features:[
    "AI website generation ",
    "Responsive HTML output",
    "Basic animations",
],
popular:false,
button:"Get Started",
    },
{key:"pro",
        name:"Pro",
        price:"$5",
    credits:500,
descripition:"For serious creators & freelncers",
features:[
    "Everything in Free ",
    "Faster generation",
    "Edit & regenerate",
   
],
popular:true,
button:"Upgrade to Pro",
    },
{key:"enterprise",
        name:"Enterprise",
        price:"$15",
    credits:2000,
descripition:"For teams & power users",
features:[
    "Unlimited iterations ",
    "Highest priority",
    "Team collabrations",
    "Dedicated support"
],
popular:false,
button:"Contact sales",
    },]
    const Pricing = () => {
const [loading,setLoading]=useState(null)
    const navigate=useNavigate()
const{userData}=useSelector(state=>state.user)

    const handleBuy=async(planKey)=>{
if(!userData){
    navigate('/')
return;
}
if(planKey=="free"){
    navigate('/dashboard')
    return;
}
setLoading(planKey)
try {
    const result=await axios.post(`${serverUrl}/api/billing`,
        {planType:planKey},{withCredentials:true}
    )
    window.location.href=result.data.sessionUrl
} catch (error) {
  setLoading(null)
    console.log(error)
}
    }
  return (
    <div className='relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-16 pb-24'>
        <div className='absolute inset-0 pointer-events-none'>
            <div className='absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]'/>
        <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]'/>

        </div>
    <button onClick={()=>navigate("/")} className='relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition'>
        <ArrowLeft size={16}/>Back
    </button>
    <motion.div
    initial={{opacity:0, y:24}}
    animate={{opacity:0, y:0}}
    className='relative z-10 max-w-4xl mx-auto text-center mb-14'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>Simple, transparent pricing</h1>
        <p className='text-zinc-400 text-lg '>Buy credits once. build anytime.</p>
    </motion.div>
    <div className='relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        {plans.map((p,i)=>(
            <motion.div
            key={i}
            initial={{opacity:0,y:40}}
            whileInView={{opacity:1,y:0}}
            whileHover={{y:-14,scale:1.0}}
            transition={{delay: i *0.12}}
            className={`relative rounded-3xl p-8 border
             backdrop-blur-xl transition-all 
             ${p.popular ? "border-indigo-500  bg-gradient-to-b from-indigo-500/20 to-transparent   shadow-2xl shadow-indigo-500/30"
                :"border-white/10 bg-white/5 hover:border-indigo-400  hover:bg-white/50"}`}>
{p.popular&&(<span className='absolute top-5 right-5 px-3 py-1 text-xs rounded-full bg-indigo-500'>
    Most Popular</span>)}
    <h1 className='text-xl font-semibold mb-2'>{p.name}</h1>
    <p className='text-zinc-400 text-sm mb-6'>{p.descripition}</p>
    <div className='flex items-end gap-1 mb-4'>
        <span className='text-4xl font-bold ' >{p.price}</span>
        <span className='text-sm text-zinc-400  mb-1'></span>
    </div>
    <div className='flex items-center gap-2 mb-8 '>
        <Coins size={18} className='text-yellow-400' />
        <span className='font-semibold '>{p.credits}</span>
    </div>
  
        <ul className='space-y-3 mb-10'>
            {p.features.map((f)=>(
                <li key={f} className='flex items-center gap-2 text-zinc-300 '> <Check size={16} className='text-green-400'/>{f}</li>
            ))}
        </ul>
    <motion.button 
    whileTap={{scale:0.96}}
disabled={loading}
onClick={()=>handleBuy(p.key)}
    className={`w-fll py-3 rounded-xl font-semibold transition ${p.popular? "bg-indigo-500 hover:bg-indigo-600 ":"bg-white/10 hover:bg-white/20"}disabled:opacity-60`}>
      {loading===p.key?"Redirecting...": p.button }</motion.button>            </motion.div>
        ))}
    </div>
    </div>
  )
}

export default Pricing
