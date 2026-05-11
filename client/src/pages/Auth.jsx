import React from 'react'
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from "axios"
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';
import logo from "../assets/logo.png"
import { LuGift, LuBook, LuFolder, LuChartBar, LuDownload } from "react-icons/lu"

function Auth() {
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth,provider)
      const User = response.user
      const name = User.displayName
      const email = User.email
      const result = await axios.post(serverUrl + "/api/auth/google" , {name , email},{
        withCredentials:true
      })
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors duration-300'>
        {/* Background gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.header 
          initial={{opacity: 0, y: -15}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, ease: "easeOut"}}
          className="relative z-20 mx-4 md:mx-auto max-w-5xl mt-6
            rounded-full
            bg-white/60 dark:bg-slate-900/50
            backdrop-blur-xl
            border border-slate-200/50 dark:border-white/10
            shadow-lg
            flex items-center justify-between px-6 py-3"
        >
            <div className='flex items-center gap-3'>
                <img src={logo} alt="NotecraftZ AI" className='w-9 h-9' />
                <span className='text-lg hidden md:block font-semibold text-slate-900 dark:text-white tracking-tight'>
                    NotecraftZ <span className='text-indigo-500 dark:text-indigo-400'>AI</span>
                </span>
            </div>
            <div className="flex items-center gap-4">
                <p className='hidden sm:block text-sm text-slate-600 dark:text-gray-300'>AI-powered exam notes</p>
                <ThemeToggle />
            </div>
        </motion.header>

        <main className='relative z-10 max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center min-h-[70vh]'>
        
          {/* LEFT CONTENT */}
          <motion.div 
            initial={{opacity: 0, x: -60}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.7}}
          >
              <h1 className='text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight
                bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500 
                dark:from-white dark:via-white dark:to-gray-400
                bg-clip-text text-transparent'>
                  Unlock Smart <br /> AI Notes
              </h1>
              <motion.button
                onClick={handleGoogleAuth}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)"
                }}
                whileTap={{scale: 0.95}}
                className='mt-10 px-8 py-4 rounded-full
                flex items-center gap-3
                bg-white dark:bg-slate-800
                border border-slate-200 dark:border-white/10
                text-slate-900 dark:text-white font-semibold text-lg
                shadow-xl hover:shadow-2xl transition-all duration-300'
              >
                  <FcGoogle size={24}/>
                  Continue with Google
              </motion.button>

              <p className='mt-8 max-w-xl text-lg text-slate-600 dark:text-gray-400 font-light leading-relaxed'>
                  You get <span className="font-semibold text-indigo-600 dark:text-indigo-400">50 FREE credits</span> to create
                  exam notes, project notes, charts, graphs and
                  download clean PDFs — instantly using AI.
              </p>
              <p className='mt-4 text-sm text-slate-500 dark:text-gray-500'>
                  Start with 50 free credits • Upgrade anytime • Instant access
              </p>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div 
            initial={{opacity: 0, x: 60}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.7}}
            className='grid grid-cols-1 sm:grid-cols-2 gap-6'
          >
              <Feature icon={<LuGift />} title="50 Free Credits" des="Start generating notes without paying."/>
              <Feature icon={<LuBook />} title="Exam Notes" des="High-yield, revision-ready materials." />
              <Feature icon={<LuFolder />} title="Project Notes" des="Well-structured documentation." />
              <Feature icon={<LuChartBar />} title="Charts & Graphs" des="Auto-generated diagrams." />
              <Feature icon={<LuDownload />} title="PDF Download" des="Download printable PDFs instantly." />
          </motion.div>
        </main>
      
        <Footer />
    </div>
  )
}

function Feature({icon, title, des}) {
    return(
        <motion.div 
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className='relative rounded-2xl p-6
          bg-white/60 dark:bg-slate-900/50
          backdrop-blur-xl
          border border-slate-200/50 dark:border-white/5
          shadow-xl
          hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors'
        >
            <div className='relative z-10'>
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">{title}</h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{des}</p>
            </div>
        </motion.div>
    )
}

export default Auth
