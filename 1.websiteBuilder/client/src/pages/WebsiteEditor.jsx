import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import { AnimatePresence, motion } from 'motion/react'
import axios from 'axios'
import { Code2, MessageSquare, Monitor, Rocket, Send, X } from 'lucide-react'
import Editor from '@monaco-editor/react'

const WebsiteEditor = () => {
    const { id } = useParams()
    const [website, setWebsite] = useState(null)
    const [error, setError] = useState("")
    const iframeRef = useRef(null)
    const [code,setCode]=useState("")
    const [messages,setMessages]=useState([])
    const [showChat,setShowChat]=useState(false)
    const [showCode,setShowCode]=useState(false)
    const [showPreviewed,setShowPreviewed]=useState(false)
const [prompt ,setprompt]=useState("")
const[updateLoading,setUpdateLoading]=useState(false)
const [thinkingIndex,setThinkingIndex]=useState(0)
const thinkingSteps=["Undestanding your request",
    "Planing layout chnages",
    "Improving responsivenesss...",
    "Applying animations...","Finalizing update..."
]
const handleUpdate=async()=>{
    if(!prompt)return;
    setUpdateLoading(true)
    const text=prompt 
    setprompt('')
    setMessages((m)=>[...m,{role:"user",content:text}])
    try {
        const result =await axios.post(`${serverUrl}/api/website/update/${id}`,{ prompt },{withCredentials:true})
   
   console.log(result) 
setCode(result.data.code)
setUpdateLoading(false)
setMessages((m)=>[...m,{role:"ai",content:result.data.message}])

} catch (error) {
    setUpdateLoading(false)
    console.log(error)
        
    }
};
  const handleDeploy=async(id)=>{
    try{
      const result=await axios.get(`${serverUrl}/api/website/deploy/${id}`,{withCredentials:true})
      window.open(`${result.data.url}`,"_blank")
     
    } catch (error) {
      console.log(error)
    }
  }


useEffect(() => {
    if (!updateLoading) return;

    const i = setInterval(() => {
        setThinkingIndex((prev) => (prev + 1) % thinkingSteps.length);
    }, 1200);

    return () => clearInterval(i);
}, [updateLoading]);
    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-by-id/${id}`, { withCredentials: true })
                console.log(result)
                setWebsite(result.data)
                setCode(result.data.latestCode)
                setMessages(result.data.conversation)
            } catch (error) {
                console.log(error.response?.data || error.message)
                setError(error.response?.data?.message || "Unable to load this website.")
            }
        }


        handleGetWebsite()

    }, [id])
    useEffect(() => {
        if (!iframeRef.current || !code) return;

        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        iframeRef.current.src = url;

        return () => URL.revokeObjectURL(url);
    }, [code]);



    if (error) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-red-400'>
                {error}
            </div>
        )
    }

    if (!website) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-white'>
                Loading...
            </div>
        )
    }
    return (
        <div className='h-screen w-screen flex bg-black text-white overflow-hidden'>
            <aside className='hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80 '>
                <Header />
      <>
        <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
            {messages.map((m, i) => (
                <div
                    key={i}
                    className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"}`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-white text-black " : "bg-white/5 border border-white/10 text-zinc-200"}`}>
                        {m.content}
                    </div>
                </div>

            ))}
            {updateLoading && <div className='max-w-[85%] mr-auto'>
                <div className='px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic  '>{thinkingSteps[thinkingIndex]}</div></div>}
            
        </div>
        <div className=' p-3 boder-t border-white/10'>
            <div className='flex gap-2'>
                <input onChange={(e=>setprompt(e.target.value))} value={prompt}  placeholder='Describe Chnages...' className="flex-1 resize-none rouned-2xl px-4 py-3 bg-white/5 border borde-white/10 text-sm outline-none " name="" id="" />
                <button disabled={updateLoading} onClick={handleUpdate} className='py-3 px-4 rounded-2xl bg-white text-black'><Send size={14}/></button>
                </div></div></>
            </aside>
            <div className="flex-1 flex flex-col">
                <div className='h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80'>
                    <span className='text-sm text-zinc-400'>Line Preview</span>
                    <div className='flex items-center gap-2'>
                      {website.deployed? "": <button onClick={handleDeploy} className='flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition'>
                            <Rocket size={14} />Deploy
                        </button>}
                        <button className='p-2 lg:hidden' onClick={()=>setShowChat(true)}><MessageSquare/></button>
                        <button className='p-2' onClick={() => setShowCode(true)}><Code2 size={18} /></button>
                        <button className='p-2' onClick={() => setShowPreviewed(true)}><Monitor size={18} /></button>
                    </div>
                </div>
                <iframe ref={iframeRef} className="flex-1 w-full border-0" title="Website preview"  sandbox='allow-scripts allow-same-origin allow-forms' />
            </div>
            

            <AnimatePresence>
                {showCode && (
                    <motion.div
                    initial={{ x:'100%' }}
                animate={{ x:0}}
                exit={{x:"100%"}
            }
                className='fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-[#1e1e1e] flex flex-col'    >

<div className='h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]'>
    <span className='text-sm font-medium '>index.html</span>
    <button className='' onClick={()=>setShowCode(false)}><X size={18} /></button>

</div>
 <Editor theme='vs-dark' value={code}
 language='html'
 onChange={(v)=>setCode(v)}/>   
                </motion.div>
                )
                }
        </AnimatePresence>
                    <AnimatePresence>
                    {showPreviewed &&
                   (<motion.div
                    className='fixed inset-0 z-[9999] bg-black' >
                        <iframe className='w-full h-full bg-white' srcDoc={code}  sandbox='allow-scripts allow-same-origin allow-forms' />
                        <button className='absolute top-4 right-4 p-2 bg-black/70 rounded-lg' onClick={()=>setShowPreviewed(false)}><X/></button>
                        </motion.div>)}
                 </AnimatePresence>
        
        <AnimatePresence>
            {showChat &&
            <motion.div
                initial={{ y:'100%' }}
                animate={{ y:0}}
                exit={{y:"100%"}
            }
            className='fixed inset-0 z-[9999] bg-black flex flex-col'>
            <Header onclose={()=>setShowChat(false)} />
            <>
        <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
            {messages.map((m, i) => (
                <div
                    key={i}
                    className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"}`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-white text-black " : "bg-white/5 border border-white/10 text-zinc-200"}`}>
                        {m.content}
                    </div>
                </div>

            ))}
            {updateLoading && <div className='max-w-[85%] mr-auto'>
                <div className='px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic  '>{thinkingSteps[thinkingIndex]}</div></div>}
            
        </div>
        <div className=' p-3 boder-t border-white/10'>
            <div className='flex gap-2'>
                <input onChange={(e=>setprompt(e.target.value))} value={prompt}  placeholder='Describe Chnages...' className="flex-1 resize-none rouned-2xl px-4 py-3 bg-white/5 border borde-white/10 text-sm outline-none " name="" id="" />
                <button disabled={updateLoading} onClick={handleUpdate} className='py-3 px-4 rounded-2xl bg-white text-black'><Send size={14}/></button>
                </div></div></>
                </motion.div>
                }
        </AnimatePresence>
        </div>
    )

    function Header({onclose}) {
        return (
            <div className='h-14 px-4 flex items-center justify-between border-b border-white/10'>
                <span>{website.title}</span>
                {onclose&&
                <button onClick={onclose}><X size={18} color='white'/></button>}
            </div>
        )
    }

}
export default WebsiteEditor
