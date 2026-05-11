import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import logo from "../assets/logo.png"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { LuCoins, LuPlus } from "react-icons/lu"

function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const credits = userData?.credits || 0
    const [showCredits,setShowCredits] = useState(false)
    const [showProfile,setShowProfile] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleSignOut = async () => {
        try {
            await axios.get(serverUrl+ "/api/auth/logout" , {withCredentials:true})
            dispatch(setUserData(null))
            navigate("/auth")
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='relative z-20 mx-4 md:mx-auto max-w-5xl mt-6
        rounded-full
        bg-white/60 dark:bg-slate-900/50
        backdrop-blur-xl
        border border-slate-200/50 dark:border-white/10
        shadow-lg
        flex items-center justify-between px-6 py-3'>

            <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate('/')}>
                <img src={logo} alt="notecraftz" className='w-9 h-9' />
                <span className='text-lg hidden md:block font-semibold text-slate-900 dark:text-white tracking-tight'>
                    NotecraftZ <span className='text-indigo-500 dark:text-indigo-400'>AI</span>
                </span>
            </div>

            <div className='flex items-center gap-4 relative'>
                <ThemeToggle />
                
                <div className='relative'>
                    <motion.div
                    onClick={()=>{setShowCredits(!showCredits);setShowProfile(false)}}
                     whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                     className='flex items-center justify-center gap-1
                px-3 py-1.5 rounded-full
                bg-slate-100 dark:bg-white/10
                border border-slate-200 dark:border-white/20
                text-slate-700 dark:text-white text-sm
                shadow-sm
                cursor-pointer transition-colors'>
                    <LuCoins className='text-xl text-indigo-500 dark:text-indigo-400' />
                    <span className='font-medium'>{credits}</span>
                    <motion.span whileHover={{scale:1.1}}
                    whileTap={{scale:0.9}}
                    className='ml-1 h-5 w-5 flex items-center justify-center
                  rounded-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-xs font-bold'
                    >
                        <LuPlus />
                    </motion.span>
                    </motion.div>
                    
                      <AnimatePresence>
                    {showCredits && 
                    <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 10, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                    className='absolute right-[-50px] mt-4 w-64 z-50
                    rounded-2xl
                    bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
                    border border-slate-200/50 dark:border-white/10
                    shadow-2xl
                    p-4 text-slate-900 dark:text-white'>
                        <h4 className='font-semibold mb-2'>Buy Credits</h4>
                        <p className='text-sm text-slate-600 dark:text-gray-300 mb-4'>Use credits to generate AI notes, diagrams & PDFs.</p>
                        <button onClick={()=>{setShowCredits(false);navigate("/pricing")}} className=' w-full py-2 rounded-lg
                      bg-gradient-to-r from-indigo-500 to-purple-600
                      text-white font-semibold
                      hover:opacity-90 transition-opacity'>Buy More Credits</button>
                    </motion.div>
                    }
                    </AnimatePresence>
                </div>

                 <div className='relative'>
                    <motion.div
                    onClick={()=>{setShowProfile(!showProfile);setShowCredits(false)}}
                     whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                     className='flex items-center justify-center h-9 w-9
                rounded-full
                bg-indigo-100 dark:bg-indigo-500/20
                border border-indigo-200 dark:border-indigo-500/30
                text-indigo-600 dark:text-indigo-300 font-semibold
                shadow-sm
                cursor-pointer transition-colors'>
                    <span className='text-lg'>{userData?.name?.slice(0,1).toUpperCase() || 'U'}</span>
                    </motion.div>
                    
                    <AnimatePresence>
                    {showProfile && 
                    <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 10, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                    className='absolute right-0 mt-4 w-52 z-50
                    rounded-2xl
                    bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
                    border border-slate-200/50 dark:border-white/10
                    shadow-2xl
                    p-3 text-slate-900 dark:text-white'>

                       <MenuItem text="Profile" onClick={()=>{setShowProfile(false);navigate("/profile")}}/>
                       <MenuItem text="History" onClick={()=>{setShowProfile(false);navigate("/history")}}/>
                       <div className="h-px bg-slate-200 dark:bg-white/10 mx-2 my-1" />
                       <MenuItem text="Sign Out" red onClick={handleSignOut}/>

                    </motion.div>
                    }
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}

function MenuItem ({onClick , text , red}){
    return(
        <div
        onClick={onClick} className={`
        w-full text-left px-4 py-2 text-sm font-medium
        transition-colors rounded-lg cursor-pointer
        ${
          red
            ? "text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
            : "text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10"
        }
      `}>
        {text}
        </div>
    )
}

export default Navbar
