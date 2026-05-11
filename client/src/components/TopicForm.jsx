import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { generateNotes } from '../services/api';
import { useDispatch } from 'react-redux';
import { updateCredits } from '../redux/userSlice';
function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter the topic")
      return;
    }
    setError("")
    setLoading(true)
    setResult(null)
    try {

      const result = await generateNotes({topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart})
        setResult(result.data)
        setLoading(false)
        setClassLevel("")
        setTopic("")
        setExamType("")
        setIncludeChart(false)
        setRevisionMode(false)
        setIncludeDiagram(false)

        if(typeof result.creditsLeft === "number"){
          dispatch(updateCredits(result.creditsLeft));

        }


    } catch (error) {
   console.log(error)
   setError("Failed to fetch notes from server");
      setLoading(false)
    }
  }

  useEffect(()=>{
  if(!loading){
    setProgress(0);
    setProgressText("")
    return;
  }
  let value = 0;

  const interval = setInterval(()=>{
    value += Math.random() * 8

     if (value >= 95) {
      value = 95;
      setProgressText("Almost done…");
      clearInterval(interval);
    } else if (value > 70) {
      setProgressText("Finalizing notes…");
    } else if (value > 40) {
      setProgressText("Processing content…");
    } else {
      setProgressText("Generating notes…");
    }

    setProgress(Math.floor(value))

  },700)

  return () => clearInterval(interval);


  },[loading])





  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-2xl
        bg-white/60 dark:bg-slate-900/50
        backdrop-blur-xl
        border border-slate-200/50 dark:border-white/10
        shadow-xl
        p-6 md:p-8
        space-y-6
        text-slate-900 dark:text-white
      ">

      <input type="text" className=' w-full p-3 rounded-xl
        bg-slate-50 dark:bg-slate-800/50 backdrop-blur-lg
        border border-slate-200 dark:border-white/10
        placeholder-slate-400 dark:placeholder-gray-500
        text-slate-900 dark:text-white
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50' placeholder='Enter topic (e.g. Web Development)'
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
      />
      <input type="text" className=' w-full p-3 rounded-xl
        bg-slate-50 dark:bg-slate-800/50 backdrop-blur-lg
        border border-slate-200 dark:border-white/10
        placeholder-slate-400 dark:placeholder-gray-500
        text-slate-900 dark:text-white
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50'
        placeholder='Class / Level (e.g. Class 10)'
        onChange={(e) => setClassLevel(e.target.value)}
        value={classLevel}
      />
      <input type="text" className=' w-full p-3 rounded-xl
        bg-slate-50 dark:bg-slate-800/50 backdrop-blur-lg
        border border-slate-200 dark:border-white/10
        placeholder-slate-400 dark:placeholder-gray-500
        text-slate-900 dark:text-white
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50'
        placeholder='Exam Type (e.g. CBSE, JEE, NEET)'
        onChange={(e) => setExamType(e.target.value)}
        value={examType}
      />

      <div className='flex flex-col md:flex-row gap-6'>
        <Toggle label="Exam Revision Mode" checked={revisionMode} onChange={() => setRevisionMode(!revisionMode)} />
        <Toggle
          label="Include Diagram"
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!includeDiagram)}
        />
        <Toggle
          label="Include Charts"
          checked={includeChart}
          onChange={() => setIncludeChart(!includeChart)}
        />
      </div>

      <motion.button
      onClick={handleSubmit}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
        disabled={loading}
        className={`
    w-full mt-4
    py-3 rounded-xl
    font-semibold
    flex items-center justify-center gap-3
    transition-all duration-300
    ${loading
            ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
            : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md hover:shadow-lg"
          }
  `}>
        {loading ? "Generating Notes..." : "Generate Notes"}

      </motion.button>


     { loading && 
     <div className='mt-4 space-y-2'>

      <div className='w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden'>
      <motion.div 
      initial={{width:0}}
      animate={{width : `${progress}%`}}
      transition={{ ease: "easeOut", duration: 0.6 }}
      className='h-full bg-indigo-500'>

      </motion.div>
      
      </div>

      <div className='flex justify-between text-xs text-slate-500 dark:text-gray-400'>
        <span>{progressText}</span>
        <span>{progress}%</span>
      </div>
      <p className='text-xs text-slate-400 dark:text-gray-500 text-center'>
         This may take up to 2–5 minutes. Please don’t close or refresh the page.
      </p>


      </div>}





    </motion.div>
  )
}


function Toggle({ label, checked, onChange }) {
  return (
    <div className='flex items-center gap-4 cursor-pointer select-none' onClick={onChange}>
      <motion.div
        animate={{
          backgroundColor: checked
            ? "rgb(99 102 241)"   // indigo-500
            : "rgba(148, 163, 184, 0.2)" // slate-400 with opacity
        }}
        transition={{ duration: 0.25 }}
        className='relative w-12 h-6 rounded-full
          border border-slate-300 dark:border-white/10
          backdrop-blur-lg'

      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className=' absolute top-0.5
            h-4 w-4 rounded-full
            bg-white
            shadow-sm'
          style={{
            left: checked ? "1.6rem" : "0.25rem",
          }}

        >


        </motion.div>
      </motion.div>

      <span className={`text-sm transition-colors ${checked ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-gray-400"
        }`}>{label}</span>

    </div>
  )
}




export default TopicForm
