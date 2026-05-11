import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { AnimatePresence, motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GiHamburgerMenu } from "react-icons/gi";
import FinalResult from '../components/FinalResult'
import Navbar from '../components/Navbar'
import { LuPlus, LuHistory, LuZap, LuChartPie, LuChartBar, LuArrowLeft } from "react-icons/lu";

function History() {
  const [topics, setTopics] = useState([])
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);

  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const myNotes = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/notes/getnotes", { withCredentials: true })
        setTopics(Array.isArray(res.data) ? res.data : [])
      } catch (error) {
        console.log(error)
      }
    }
    myNotes()
  }, [])

  const openNotes = async (noteId) => {
    setLoading(true)
    setActiveNoteId(noteId)
    try {
      const res = await axios.get(serverUrl + `/api/notes/${noteId}`, { withCredentials: true })
      setSelectedNote(res.data.content)
      setLoading(false)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false); // Close sidebar on mobile after selection
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true)
    }
  }, [])

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 flex flex-col'>
      
      {/* Top Navigation */}
      <div className="z-50">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className='flex-1 flex overflow-hidden'>
        
        {/* Mobile Toggle Button */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className='lg:hidden absolute bottom-6 right-6 z-40 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition'
          >
            <LuHistory className="text-2xl" />
          </button>
        )}

        <AnimatePresence>
          {isSidebarOpen && 
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className='fixed lg:static top-[72px] lg:top-0 left-0 z-40 lg:z-auto
                w-80 lg:w-80 h-[calc(100vh-72px)] lg:h-auto
                bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
                border-r border-slate-200 dark:border-white/10
                shadow-2xl lg:shadow-none
                flex flex-col'
            >
              <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                 <h2 className='text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-gray-200'>
                  <LuHistory className="text-indigo-500" /> Note History
                </h2>
                <button onClick={() => setIsSidebarOpen(false)} className='lg:hidden text-slate-500 hover:text-slate-800 dark:hover:text-white'>
                 <LuArrowLeft className="text-xl" />
                </button>
              </div>

              <div className='p-4 overflow-y-auto flex-1'>
                <button 
                  onClick={() => navigate("/notes")} 
                  className='w-full flex items-center justify-center gap-2 px-4 py-3 mb-6 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition'
                >
                  <LuPlus className="text-lg" /> Create New Note
                </button>

                {topics.length === 0 && (
                  <div className="text-center py-10 px-4">
                    <p className="text-sm text-slate-400 dark:text-slate-500">No notes created yet. Start generating!</p>
                  </div>
                )}

                <ul className='space-y-3'>
                  {topics.map((t, i) => (
                    <li key={i} onClick={() => openNotes(t._id)} className={`
                      cursor-pointer rounded-xl p-4 border transition-all duration-200
                      ${activeNoteId === t._id
                        ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-400/50 shadow-sm"
                        : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-md"
                      }
                    `}>
                      <p className='text-sm font-semibold text-slate-800 dark:text-gray-200 line-clamp-2'>{t.topic}</p>

                      <div className='flex flex-wrap gap-2 mt-3 text-[10px] uppercase font-bold tracking-wider'>
                        {t.classLevel && <span className='px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300'>{t.classLevel}</span>}
                        {t.examType && <span className='px-2 py-1 rounded bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300'>{t.examType}</span>}
                      </div>

                      <div className='flex gap-3 mt-3 text-xs font-medium text-slate-500 dark:text-slate-400'>
                        {t.revisionMode && <span className="flex items-center gap-1"><LuZap className="text-amber-500" /> Rev</span>} 
                        {t.includeDiagram && <span className="flex items-center gap-1"><LuChartPie className="text-cyan-500" /> Diag</span>} 
                        {t.includeChart && <span className="flex items-center gap-1"><LuChartBar className="text-rose-500" /> Chart</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          }
        </AnimatePresence>

        {/* Note Display Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }} 
          className='flex-1 p-6 lg:p-10 overflow-y-auto bg-slate-50 dark:bg-slate-950'
        >
           {loading && (
             <div className="h-full flex items-center justify-center">
               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
             </div>
           )}
           
          {!loading && !selectedNote && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
              <LuHistory className="text-6xl mb-4 opacity-20" />
              <p className="text-lg">Select a topic from the history sidebar</p>
            </div>
          )}

          {!loading && selectedNote && <FinalResult result={selectedNote}/>}

        </motion.div>
      </div>
    </div>
  )
}

export default History
