import React from 'react'
import { AnimatePresence, motion } from "motion/react"
import { useState } from 'react'
import { ArrowRight, ArrowUpRight, ChevronDown, Coins, Sparkles } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import axios, { Axios } from 'axios'
import { useEffect } from 'react'
import LoginModel from '../components/LoginModel.jsx'
import { serverUrl } from '../App.jsx'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';
// import { set } from 'mongoose'
// import { motion } from "motion/react"
//  import { FaGithub, FaInstagram } from 'react-icons/fa6';
// mport { Github, Linkedin, Instagram} from "lucide-react"

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
         <div className="relative min-h-screen w-full bg-[#050505] text-white flex flex-col justify-between overflow-hidden">
      
      {/* ---------------- BACKGROUND ANIMATIONS ---------------- */}
      {/* Glowing Orb 1 (Purple) */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.3, 0.55, 0.3],
          x: [-20, 20, -20],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-purple-600/40 via-indigo-600/30 to-blue-500/20 rounded-full blur-[130px] pointer-events-none z-0"
      />

      {/* Glowing Orb 2 (Cyan Accent) */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          y: [-30, 30, -30],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-blue-500/20 rounded-full blur-[110px] pointer-events-none z-0"
      />

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* ---------------- NAVBAR ---------------- */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="text-lg font-bold tracking-wide cursor-pointer flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">GiveWeb.ai</span>
          </div>

          <div className="flex items-center gap-5">
            <div
              className="hidden md:inline text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
              onClick={() => navigate('/pricing')}
            >
              pricing
            </div>

            {userData && (
              <div
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition-all hover:border-yellow-500/40"
                onClick={() => navigate('/pricing')}
              >
                <Coins className="text-yellow-400" size={14} />
                <span className="text-zinc-300">credits</span>
                <span className="font-medium">{userData.credits}</span>
                <span className="font-semibold text-yellow-400">+</span>
              </div>
            )}

            {!userData ? (
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 hover:border-white/40 text-sm transition-all"
                onClick={() => setOpenLogin(true)}
              >
                Get started
              </button>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenProfile(!openProfile)}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    className="w-9 h-9 rounded-full border border-white/20 object-cover hover:border-purple-400 transition"
                    src={userData.avatar || `https://ui-avatars.com/api?name=${encodeURIComponent(userData.name)}`}
                    alt="User avatar"
                    referrerPolicy="no-referrer"
                  />
                </button>

                <AnimatePresence>
                  {openProfile && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0, y: -10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.95, opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-medium truncate">{userData.name}</p>
                        <p className="text-xs text-zinc-500 truncate">{userData.email}</p>
                      </div>

                      <button
                        onClick={() => navigate('/pricing')}
                        type="button"
                        className="md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/10 transition"
                      >
                        <Coins className="text-yellow-400" size={14} />
                        <span className="text-zinc-300">credits</span>
                        <span>{userData.credits}</span>
                        <span className="font-semibold text-yellow-400">+</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-white/10 transition"
                      >
                        Dashboard
                      </button>

                      <button
                        type="button"
                        onClick={handleLogOut}
                        className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ---------------- HERO SECTION (FULL VIEWPORT) ---------------- */}
      <section className="relative z-10 my-auto pt-36 pb-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center justify-center">
        
        {/* Animated Feature Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 text-xs md:text-sm text-zinc-300 shadow-inner"
        >
          <Sparkles className="text-purple-400 animate-pulse" size={14} />
          <span>Next Generation AI Web Builder</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.15]"
        >
          Build Stunning Websites <br />
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
            With AI
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-2xl text-zinc-400 text-lg md:text-xl leading-relaxed"
        >
          Describe your idea and let AI generate a modern, responsive, production-ready website in seconds.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          <button
            type="button"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-semibold text-base shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
            onClick={() => (userData ? navigate('/dashboard') : setOpenLogin(true))}
          >
            <span>{userData ? 'Go to dashboard' : 'Get Started'}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* ---------------- SCROLL INDICATOR ----------------
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 bottom-6 left-0 right-0 flex justify-center items-center text-zinc-500 text-xs gap-1 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <span className="tracking-widest uppercase text-[10px]">Scroll</span>
          <ChevronDown size={14} />
        </motion.div>
      </motion.div> */}

    </div>
<div className="relative z-10">

      {/* ---------------- LOGGED OUT: HIGHLIGHT CARDS (NO NUMBERS, GROW & GLOW) ---------------- */}
      {!userData && (
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="relative group"
              >
                {/* ONE-TIME ENTRANCE GLOW */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 0.7, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 + 0.1, ease: 'easeOut' }}
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-600/50 via-indigo-500/40 to-blue-600/50 blur-3xl pointer-events-none group-hover:scale-110 group-hover:opacity-100 transition-all duration-500"
                />

                {/* Main Card */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="relative rounded-2xl bg-[#0d0d12]/90 border border-white/20 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.25)] group-hover:border-purple-400 group-hover:shadow-[0_0_70px_rgba(168,85,247,0.5)] transition-all duration-300"
                >
                  <h1 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                    {highlight}
                  </h1>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    GiveWeb.ai builds real websites—clean code, animation, responsiveness, and scalable structure.
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- LOGGED IN: WEBSITE CARDS (GROW & GLOW) ---------------- */}
      {userData && websites?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-white flex items-center justify-between"
          >
            <span className="bg-gradient-to-r from-white via-zinc-200 to-purple-300 bg-clip-text text-transparent">
              Your Websites
            </span>
            <span className="text-xs text-zinc-400 font-normal border border-white/10 px-3 py-1 rounded-full bg-white/5">
              Showing {Math.min(websites.length, 3)} of {websites.length}
            </span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {websites.slice(0,3).map((w, i) => (
              <motion.div
                key={w._id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="relative group"
              >
                {/* ONE-TIME ENTRANCE GLOW */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 0.75, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 + 0.1, ease: 'easeOut' }}
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-purple-600/60 via-indigo-500/50 to-blue-500/50 blur-3xl pointer-events-none group-hover:scale-110 group-hover:opacity-100 transition-all duration-500"
                />

                {/* Main Website Card */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  onClick={() => navigate(`/editor/${w._id}`)}
                  className="relative cursor-pointer rounded-2xl bg-[#09090d]/90 border border-white/20 overflow-hidden shadow-[0_0_35px_rgba(168,85,247,0.25)] group-hover:border-purple-400 group-hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-300"
                >
                  {/* Browser Header Bar */}
                  <div className="bg-black/90 px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] text-purple-300/80 font-mono tracking-wider">
                      LIVE PREVIEW
                    </span>
                  </div>

                  {/* Preview Container */}
                  <div className="h-48 bg-zinc-950 relative overflow-hidden">
                    <iframe
                      srcDoc={w.latestCode}
                      title={w.title}
                      className="w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white group-hover:scale-[0.78] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />
                  </div>

                  {/* Card Info */}
                  <div className="p-5 bg-black/60 border-t border-white/10">
                    <h3 className="text-lg font-bold line-clamp-1 text-white group-hover:text-purple-300 transition-colors">
                      {w.title || 'Untitled Website'}
                    </h3>
                    <div className="flex items-center justify-between mt-2 text-xs text-zinc-400">
                      <span>
                        Updated {new Date(w.updatedAt).toLocaleDateString()}
                      </span>
                      <span className="text-purple-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Edit →
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

    </div>
<footer className='border-t border-white/10 bg-[#070707] text-zinc-400 text-xs relative overflow-hidden'>
    {/* Ambient Glow Background Effect */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-blue-600/20 blur-3xl pointer-events-none rounded-full" />

    <div className='max-w-7xl mx-auto px-6 py-16 grid grid-cols-1  md:grid-cols-5 gap-10 relative z-10'>
        {/* Brand Info & Glowing Highlighted Brand Text */}
        <div className='md:col-span-2 space-y-4'>
            <div className='flex items-center gap-2 text-white font-semibold text-xl'>
                <Sparkles className="text-purple-400 animate-pulse " size={20} />
                <span className="relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]">
                    GiveWeb.ai
                </span>
            </div>
            
            {/* Glowing Highlighted Pill Text */}
            <p className='text-zinc-300 max-w-sm text-sm leading-relaxed'>
                Transform your ideas into{" "}
                <span className="relative inline-block font-medium text-white px-1">
                    <span className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded blur opacity-75 animate-pulse"></span>
                    <span className="relative px-2 py-0.5 bg-black rounded text-xs tracking-wide">PRODUCTION-READY</span>
                </span>
                {" "}websites in seconds with AI.
            </p>

            {/* Social Buttons with Framer Motion Animation & Gradient Glow */}
            <div className='flex items-center gap-4 pt-3'>
                {/* GitHub */}
                <motion.a 
                    href="https://github.com/your-username" 
                    target="_blank" 
                    rel="noreferrer" 
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className='relative group p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors duration-300'
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
<FaGithub size={24} className="relative z-10" />                </motion.a>

                {/* LinkedIn */}
                <motion.a 
                    href="https://linkedin.com/in/your-username" 
                    target="_blank" 
                    rel="noreferrer" 
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className='relative group p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors duration-300'
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
<FaLinkedin size={24} className="relative z-10"/>
                </motion.a>

                {/* Instagram */}
                <motion.a 
                    href="https://instagram.com/your-username" 
                    target="_blank" 
                    rel="noreferrer" 
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className='relative group p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors duration-300'
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-red-500 to-amber-400 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300 shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                    <FaInstagram size={24} />
                </motion.a>
            </div>
        </div>

        {/* Navigation Links - Product */}
        <div className='space-y-3'>
            <h4 className='text-white font-semibold text-xs tracking-wider uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'>
                Product
            </h4>
            <ul className='space-y-2.5 text-xs text-zinc-400'>
                <li><button onClick={() => navigate("/generate")} className='hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition'>AI Builder</button></li>
                <li><button onClick={() => navigate("/pricing")} className='hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition'>Pricing</button></li>
                <li><a href="#templates" className='hover:text-white transition'>Templates</a></li>
           <li><button onClick={() => navigate("/dashboard")} className='hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition'><>Showcase<ArrowUpRight size={12} /></></button></li>

   </ul>  
        </div>

        {/* Navigation Links - Resources */}
        <div className='space-y-3'>
            <h4 className='text-white font-semibold text-xs tracking-wider uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'>
                Resources
            </h4>
            <ul className='space-y-2.5 text-xs text-zinc-400'>
                <li><a href="#docs" className='hover:text-white transition'>Documentation</a></li>
                <li><a href="#tutorials" className='hover:text-white transition'>Tutorials</a></li>
                <li><a href="#blog" className='hover:text-white transition'>Blog</a></li>
                <li><a href="#api" className='hover:text-white transition'>API Status</a></li>
            </ul>
        </div>

        {/* Navigation Links - Company */}
        <div className='space-y-3'>
            <h4 className='text-white font-semibold text-xs tracking-wider uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'>
                Company
            </h4>
            <ul className='space-y-2.5 text-xs text-zinc-400'>
                <li><a href="#about" className='hover:text-white transition'>About Us</a></li>
                <li><a href="#privacy" className='hover:text-white transition'>Privacy Policy</a></li>
                <li><a href="#terms" className='hover:text-white transition'>Terms of Service</a></li>
                <li><a href="#contact" className='hover:text-white transition'>Contact Us</a></li>
            </ul>
        </div>
    </div>

    {/* Bottom Bar with Glowing Status Badge */}
    <div className='border-t border-white/10 py-6 px-6 relative z-10'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500'>
            <p>&copy; {new Date().getFullYear()} GiveWeb.ai. All rights reserved.</p>
            <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'>
                <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,1)]'></span>
                <span className='font-medium'>All systems operational</span>
            </div>
        </div>
    </div>
</footer>
            {openLogin && (
                <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />
            )}
        </div>
    )
}

export default Home;