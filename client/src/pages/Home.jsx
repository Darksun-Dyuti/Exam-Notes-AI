import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from "motion/react"
import img from "../assets/img1.png"
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen overflow-hidden bg-slate-950 text-white relative'>
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <Navbar />
      {/* top */}
      <section className='max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ rotateX: 6, rotateY: -6 }}
            className="transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight
              bg-gradient-to-br from-white via-white to-gray-400
              bg-clip-text text-transparent"
              whileHover={{ y: -4 }}
            >
              Create Smart <br /> AI Notes in Seconds


            </motion.h1>

            <motion.p whileHover={{ y: -2 }}
              className='mt-6 max-w-xl text-lg text-gray-400 font-light leading-relaxed'
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
      <section className='max-w-6xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-4 gap-10'>
        <Feature icon="📘" title="Exam Notes" des="High-yield exam-oriented notes with revision points."/>
        <Feature icon="📂" title="Project Notes" des="Well-structured content for assignments and projects." />
        <Feature icon="📊" title="Diagrams" des="Auto-generated visual diagrams for clarity." />
        <Feature icon="⬇️" title="PDF Download" des="Download clean, printable PDFs instantly." />

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
        bg-slate-900/50
        backdrop-blur-xl
        border border-white/5
        shadow-xl
        text-white
        hover:bg-slate-800/50 transition-colors'
        >
         
            <div className='relative z-10'>
                 <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{des}</p>

            </div>
          


        </motion.div>
    )
}

export default Home
