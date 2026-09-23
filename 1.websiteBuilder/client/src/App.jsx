import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
export const serverUrl = 'https://showcase02.onrender.com'
import Generate from "./pages/Generate"
import Dashboard from './pages/Dashboard';
import { Navigate } from 'react-router-dom';
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux';
import WebsiteEditor from './pages/WebsiteEditor';
import { LiveSite } from './pages/LiveSite'; // Updated casing
import Pricing from './pages/Pricing';      // Updated casing
const App = () => {
  useGetCurrentUser()
  const { userData } = useSelector((state) => state.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={userData ? <Dashboard /> : <Home />}></Route>
      <Route path='/generate' element ={userData?<Generate/>:<Home/>}/>
    <Route path='/editor/:id' element ={userData?<WebsiteEditor/>:<Home/>}/>
        <Route path='/site/:id' element ={userData?<LiveSite/>:<Home/>}/>
              <Route path='/pricing' element ={userData?<Pricing/>:<Home/>}/>

        </Routes>
            </BrowserRouter>
           

    
  )
}

export default App
