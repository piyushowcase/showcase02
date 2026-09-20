import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { serverUrl } from "../App.jsx"
import { setUserData } from '../redux/userSlice.js'

const useGetCurrentUser = () => {
  const dispatch = useDispatch()

  useEffect(() => {

    const getCurrentUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/me`, { withCredentials: true })
        dispatch(setUserData(result.data || null))
      } catch (error) {
        if (error.response?.status === 401) {
          dispatch(setUserData(null))
          return
        }

        console.error('Current user error:', error)
      }
    }

    getCurrentUser()
  }, [dispatch])
}

export default useGetCurrentUser
