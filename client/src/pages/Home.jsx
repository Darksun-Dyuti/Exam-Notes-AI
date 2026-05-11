import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from "motion/react"
import img from "../assets/img1.png"
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { LuGift, LuBook, LuFolder, LuChartBar, LuDownload } from "react-icons/lu"

function Home() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors duration-300'>
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <Navbar />
      {/* top */}
      <section className='max-w-7xl mx-auto px-6 md:px-8 pt-16 md:pt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ rotateX: 6, rotateY: -6 }}
            className="transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight
              bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500
              dark:from-white dark:via-white dark:to-gray-400
              bg-clip-text text-transparent"
              whileHover={{ y: -4 }}
            >
              Create Smart <br /> AI Notes in Seconds


            </motion.h1>

            <motion.p whileHover={{ y: -2 }}
              className='mt-6 max-w-xl text-lg text-slate-600 dark:text-gray-400 font-light leading-relaxed'
            >
              Generate exam-focused notes, project documentation,
              flow diagrams and revision-ready content using AI —
              faster, cleaner and smarter.

            </motion.p>
            

          </motion.div>

          <motion.button
            onClick={()=>navigate("/notes")}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              
              className='mt-10 px-8 py-4 rounded-full
                          flex items-center gap-3
                          bg-gradient-to-r from-indigo-500 to-purple-600
                          text-white font-semibold text-lg
                          shadow-lg transition-all duration-300'>
              
              Get Started


            </motion.button>
        </div>


        <motion.div 
         initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{
            y: -10,
            scale: 1.02,
          }}
          className="relative"
        >
          <div className='overflow-hidden'>
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-2xl blur-2xl -z-10"></div>
            <img src={img} alt="img" className="rounded-2xl border border-white/10 shadow-2xl" />

          </div>

        </motion.div>

      </section>

      {/* bottom */}
      <section className='max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-32'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <Feature icon={<LuGift />} title="Free Credits" des="Start generating notes instantly without paying."/>
          <Feature icon={<LuBook />} title="Exam Notes" des="High-yield, revision-ready materials." />
          <Feature icon={<LuFolder />} title="Project Notes" des="Well-structured documentation." />
          <Feature icon={<LuChartBar />} title="Charts & Graphs" des="Auto-generated diagrams." />
          <Feature icon={<LuDownload />} title="PDF Download" des="Download printable PDFs instantly." />
        </div>
      </section>
      <Footer/>

    </div>
  )
}

function Feature({icon , title , des}){
    return(
        <motion.div 
        whileHover={{ y: -8, scale: 1.02 }}
       transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className='relative rounded-2xl p-8
        bg-white/60 dark:bg-slate-900/50
        backdrop-blur-xl
        border border-slate-200/50 dark:border-white/5
        shadow-xl
        hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors'
        >
         
            <div className='relative z-10'>
                 <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">{des}</p>

            </div>
          


        </motion.div>
    )
}

export default Home
