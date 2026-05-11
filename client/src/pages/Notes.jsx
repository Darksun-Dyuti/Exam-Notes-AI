import React, { useState } from 'react'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TopicForm from '../components/TopicForm'
import Sidebar from '../components/Sidebar'
import FinalResult from '../components/FinalResult'
import Navbar from '../components/Navbar'
import { LuBook } from "react-icons/lu"

function Notes() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const [loading,setLoading]= useState(false)
  const [result , setResult] = useState(null)
  const [error,setError] = useState("")

  return (
    <div className='min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors duration-300'>
      <Navbar />

      <main className='max-w-7xl mx-auto px-6 py-8 relative z-10 mt-6'>
          <motion.div className="mb-12">
            <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError}/>
          </motion.div>

          {loading && (
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="text-center font-medium mb-6 text-slate-600 dark:text-gray-300"
              >
                Generating exam-focused notes…
              </motion.div>
          )}

          {error && (
            <div className="mb-6 text-center text-red-500 dark:text-red-400 font-medium">
              {error}
            </div>
          )}

          {!result && !loading && (
            <motion.div whileHover={{ scale: 1.01 }}
              className="
                h-64
                rounded-2xl
                flex flex-col items-center justify-center
                bg-white/60 dark:bg-slate-900/50
                backdrop-blur-xl
                border border-dashed border-slate-300 dark:border-white/10
                text-slate-500 dark:text-gray-400
                shadow-sm
              ">
                <LuBook className="text-4xl mb-3 text-slate-400 dark:text-gray-500" />
              <p className="text-sm">
                Generated notes will appear here
              </p>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className='flex flex-col lg:grid lg:grid-cols-4 gap-6'
            >
              <div className='lg:col-span-1'>
                <Sidebar result={result}/>
              </div>

              <div className='lg:col-span-3
                rounded-2xl
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-white/10
                shadow-xl
                p-6 overflow-hidden'>
                <FinalResult result={result}/>
              </div>
            </motion.div>
          )}
      </main>
    </div>
  )
}

export default Notes
