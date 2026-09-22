import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { serverUrl } from "../App"
export const LiveSite = () => {
    const {id}=useParams()
    const [html,setHtml]=useState("")
    const [error,setError]=useState("")
        useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                
                const result = await axios.get(`${serverUrl}/api/website/get-by-slug/${id}`, { withCredentials: true })
                console.log(result)
          setHtml(result.data.latestCode)
            } catch (error) {
                console.log(error.response?.data || error.message)
          setError("site not found")
            }
        }


        handleGetWebsite()

    }, [id])
    if(error){
        return(
            <div className='h-screen flex items-center justify-center bg-black text-white'>{error}</div>
        )
    }

  return (
    <div className='h-screen flex items-center justify-center bg-black text-white'>
        <iframe  title="Live site" srcDoc={html} className='w-screen h-screen border-none' sandbox='allow-scripts allow-same-origin allow-forms'/>
      
    </div>
  )
}

