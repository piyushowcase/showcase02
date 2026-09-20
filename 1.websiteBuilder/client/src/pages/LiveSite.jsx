import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import axios from 'axios'
export const LiveSite = () => {
    const {id}=useParams()
    const [html,setHtml]=useState("")
    const [error,setError]=useState("")
        useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-by-id/${id}`, { withCredentials: true })
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
    <div>
        <iframe  title="Live site " src="" />
      
    </div>
  )
}

