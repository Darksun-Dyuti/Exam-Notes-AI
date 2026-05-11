import React, { useState } from 'react'
import { motion } from 'motion/react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import { updateUserProfile } from '../services/api'
import { setUserData } from '../redux/userSlice'
import { LuUser, LuMail, LuGraduationCap, LuTarget, LuBookOpen } from 'react-icons/lu'

function Profile() {
  const { userData } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  
  const [bio, setBio] = useState(userData?.bio || "")
  const [educationLevel, setEducationLevel] = useState(userData?.educationLevel || "")
  const [targetExam, setTargetExam] = useState(userData?.targetExam || "")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)
    try {
      const updatedUser = await updateUserProfile({ bio, educationLevel, targetExam })
      dispatch(setUserData(updatedUser))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError("Failed to update profile.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors duration-300'>
      <Navbar />

      <main className='max-w-3xl mx-auto px-6 py-12 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-xl p-8 md:p-12"
        >
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200 dark:border-white/10">
            <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl font-bold border border-indigo-200 dark:border-indigo-500/30">
              {userData?.name?.slice(0,1).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{userData?.name}</h1>
              <p className="text-slate-500 dark:text-gray-400 text-sm flex items-center gap-2 mt-1">
                <LuMail className="text-indigo-400" /> {userData?.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                <LuGraduationCap className="text-indigo-500" /> Education Level
              </label>
              <input
                type="text"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                placeholder="e.g. High School, College, Postgraduate"
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                <LuTarget className="text-indigo-500" /> Target Exam
              </label>
              <input
                type="text"
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                placeholder="e.g. CBSE, JEE, NEET, SAT"
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                <LuBookOpen className="text-indigo-500" /> Bio / Academic Goals
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us a bit about your studies..."
                rows="4"
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
              />
            </div>

            {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-600 dark:text-green-400 text-sm font-medium">Profile updated successfully!</p>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className={`w-full py-3 rounded-xl font-semibold transition-all shadow-md
                ${loading ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:shadow-lg'}
              `}
            >
              {loading ? "Saving..." : "Save Profile"}
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  )
}

export default Profile
