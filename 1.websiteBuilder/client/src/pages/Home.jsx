import React from 'react'
import { AnimatePresence, motion } from "motion/react"
import { useState } from 'react'
import { Coins } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import axios, { Axios } from 'axios'
import { useEffect } from 'react'
import LoginModel from '../components/LoginModel.jsx'
import { serverUrl } from '../App.jsx'
// import { set } from 'mongoose'
import { setUserData } from '../redux/userSlice.js'
import { Navigate, useNavigate } from 'react-router-dom'
const Home = () => {
    const highlights = [
        "AI Generrated Code",
        "Fully Responsive Layouts",
        "Production Ready Output",
    ]
const [websites,setWebsites]=useState(null)
    const [openLogin, setOpenLogin] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate=useNavigate();

    // const profileImage = userData?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.name || "User")}`

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            setOpenProfile(false)
        } catch (error) {
            if (error.response?.status !== 401) {
                console.error("Current user error:", error)
            }
        }
    }
 useEffect(()=>{
    if(!userData){
        return;
    }
    const handleGetAllWebsites=async()=>{
     
      try {
        const result=await axios.get(`${serverUrl}/api/website/get-all`,{withCredentials:true})
        console.log(result)
        setWebsites(result.data || [])
        
      } catch (error) {
      
        console.log(error)
      }
    } 
   handleGetAllWebsites();
  },[userData])
    return (
        <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden'>
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 ">
                <div className=' max-w-7xl mx-auto px-6 py-4 flex justify-between items-center '>
                    <div className='text-lg font-semibold'>GiveWeb.ai</div>
                    <div className='flex items-center gap-5'>
                        <div className='hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer'
                        onClick={()=>navigate("/pricing")}>
                            pricing
                        </div >
                        {userData && <div className='hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition'  onClick={()=>navigate("/pricing")}>
                            <Coins className="text-yellow-400" size={14} />
                            <span className='text-zinc-300  '
                            >credits</span>
                            <span>{userData.credits}</span>
                            <span className='font-semibold'>+</span>
                        </div>}
                        {!userData ?
                            (<button type="button" className='px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm' onClick={() => setOpenLogin(true)}>Get started</button>
                            ) : (<div className='relative'><button type="button" onClick={() => setOpenProfile(!openProfile)} className='flex items-center'>
                                <img className='w-9 h-9 rounded-full border border-white/20 object-cover' src={ userData.avatar || `https://ui-avatars.com/api?name=${userData.name}` } alt="" referrerPolicy='no-referrer' />
                            </button>
                                <AnimatePresence>
                                    {openProfile && (
                                        <motion.div
                                            initial={{ scale: 0.95, opacity: 0, y: -10 }}
                                            animate={{ scale: 1, opacity: 1, y: 0 }}
                                            exit={{ scale: 0.95, opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden">
                                            <div className='px-4 py-3 border-b border-white/10'>
                                                <p className='text-sm font-medium truncate'>{userData.name}</p>
                                                <p className='text-xs text-zinc-500 truncate'>{userData.email}</p>
                                            </div>
                                            <button  onClick={()=>navigate("/pricing")} type="button" className='md:hidden w-full px-4 py-4 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/15'>
                                                <Coins className="text-yellow-400" size={14} />
                                                <span className='text-zinc-300'>credits</span>
                                                <span>{userData.credits}</span>
                                                <span className='font-semibold'>+</span>
                                            </button>
                                            <button type="button"  onClick={()=>navigate("/dashboard")} className='w-full px-4 py-3 text-left text-sm hover:bg-white/5'>Dashboard</button>
                                            <button type="button" onClick={handleLogOut} className='w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5'>Logout</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <section className='pt-44 pb-32 px-6 text-center'>
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='text-5xl md:text-7xl font-bold tracking-tight'> Build Stunning Websites <br />
                    <span className='bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>With AI</span>
                </motion.h1>
                <motion.p
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg">
                    Describe your idea and let AI generate a Modern, responsive, production-ready website.
                </motion.p>

                <button type="button" className='px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition mt-12' onClick={()=>userData?navigate("/dashboard"):setOpenLogin(true)}>
                    {userData?"Go to dashboard":"Get Started"}
                </button>
            </section>
{!userData &&             <section className='max-w-7xl mx-auto px-6 pb-32'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                    {highlights.map((highlight, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className='rounded-2xl bg-white/5 border border-white/10 p-8'
                        >
                            <h1 className='text-xl font-semibold mb-3'>{highlight}</h1>
                            <p className='text-sm text-zinc-400'>
                                GenWeb.ai build real website -clean code,animation,reponsiveness and scalable structure.
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
}
{userData && websites?.length>0 && (
<section className='max-w-7xl mx-auto px-6 pb-32 '>
    <h3 className='text-2xl font-semibold mb-6'>Your Websites</h3>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {websites.slice(0,3).map((w,i)=>(
<motion.div 
key={w._id}
whileHover={{y:-6}}
onClick={()=>navigate(`/editor/${w._id}`)}
className='cursor-pointer rounded-2xl bg-white/5 border border-white/20 overflow-hidden'
>
    <div className='h-40 bg-black'>
        <iframe srcDoc={w.latestCode} className='w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white' />
    </div>
    <div className='p-4'><h3 className='text-base font-semibold line-clamp-2'>{w.title}</h3>
  <p className='text-xs text-zinc-400'>
    Last Updated  {""} {new Date(w.updatedAt).toLocaleDateString()}
  </p></div>

</motion.div>
        ))}
    </div>
</section>
)
}
            <footer className='border-t border-white/10 py-10 text-center text-sm text-zinc-500'>
                &copy; {new Date().getFullYear()} GenWeb.ai
            </footer>

            {openLogin && (
                <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />
            )}
        </div>
    )
}

export default Home;