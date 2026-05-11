import React from 'react'
import { motion } from "motion/react"
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='z-10 mt-24 border-t border-slate-200 dark:border-white/10 pt-10 pb-6 w-full max-w-7xl mx-auto px-6'
    >
      <div className='flex flex-col md:flex-row justify-between items-center md:items-start gap-8'>

        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="logo" className='h-7 w-7 object-contain' />
            <span className="text-md font-semibold text-slate-900 dark:text-white tracking-tight">
              NotecraftZ <span className="text-indigo-500 dark:text-indigo-400">AI</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-gray-400 max-w-xs text-center md:text-left">
            Generate exam-focused notes, diagrams, and PDFs using AI.
          </p>
        </div>

        <div className='flex gap-6 text-sm text-slate-500 dark:text-gray-400'>
          <span onClick={() => navigate("/notes")} className='hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer'>Notes</span>
          <span onClick={() => navigate("/history")} className='hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer'>History</span>
          <span onClick={() => navigate("/pricing")} className='hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer'>Credits</span>
          <a href="mailto:support@notecraftz.ai" className='hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer'>Support</a>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className='text-xs text-slate-400 dark:text-gray-500'>
          © {new Date().getFullYear()} NotecraftZ AI. All rights reserved.
        </p>
        <p className='text-xs font-mono font-medium text-slate-500 dark:text-gray-400 tracking-widest'>
          MADE BY DYUTIMOY
        </p>
      </div>
    </motion.footer>
  )
}

export default Footer
