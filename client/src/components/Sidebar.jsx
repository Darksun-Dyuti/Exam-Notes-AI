import React from 'react'
import { LuPin, LuStar, LuFlame, LuCircleHelp } from "react-icons/lu";

function Sidebar({result}) {

    if(!result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long){
        return null;
    }
  return (
    <div className='bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm p-6 space-y-8 transition-colors duration-300'>
        <div className='flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-white/10'>
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              <LuPin className='text-xl' />
            </div>
            <h3 className='text-xl font-bold text-slate-800 dark:text-white tracking-tight'>
                Quick Exam View
            </h3>
        </div>

        <section>
            <div className='flex items-center gap-2 mb-4'>
                <LuStar className="text-slate-400 dark:text-slate-500" />
                <h4 className='text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                    Sub Topics
                </h4>
            </div>
            
            <div className="space-y-3">
            {
                Object.entries(result.subTopics).map(([star , topics])=>(
                    <div key={star} className='rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 p-4 transition-all hover:shadow-sm'>
                        <p className='text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2'>
                            <LuStar className="text-amber-500 fill-amber-500/20" /> {star} Priority
                        </p>
                        <ul className='list-disc ml-5 text-sm text-slate-600 dark:text-slate-400 space-y-1.5'>
                            {topics.map((t,i)=>(
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </div>
                ))
            }
            </div>
        </section>

        <section className='rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 border border-orange-200 dark:border-orange-500/20 p-5'>
            <div className='flex items-center gap-2 mb-2'>
                <LuFlame className="text-orange-500" />
                <h4 className='text-sm font-bold uppercase tracking-wider text-orange-800 dark:text-orange-500'>
                    Exam Importance
                </h4>
            </div>
            <p className='text-orange-900 dark:text-orange-200 font-medium text-sm leading-relaxed'>
                {result.importance}
            </p>
        </section>

        <section>
            <div className='flex items-center gap-2 mb-4 pt-4 border-t border-slate-200 dark:border-white/10'>
                <LuCircleHelp className="text-slate-400 dark:text-slate-500" />
                <h4 className='text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                    Important Questions
                </h4>
            </div>

            <div className='space-y-4'>
                <div className='rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 p-4'>
                    <p className='text-sm font-bold text-slate-700 dark:text-slate-200 mb-3 pb-2 border-b border-slate-100 dark:border-white/5'>
                        Short Questions
                    </p>
                    <ul className='list-disc ml-5 text-sm text-slate-600 dark:text-slate-400 space-y-1.5'>
                        {result.questions.short.map((t,i)=>(
                            <li key={i}>{t}</li>
                        ))}
                    </ul>
                </div>

                <div className='rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 p-4'>
                    <p className='text-sm font-bold text-slate-700 dark:text-slate-200 mb-3 pb-2 border-b border-slate-100 dark:border-white/5'>
                        Long Questions
                    </p>
                    <ul className='list-disc ml-5 text-sm text-slate-600 dark:text-slate-400 space-y-1.5'>
                        {result.questions.long.map((t,i)=>(
                            <li key={i}>{t}</li>
                        ))}
                    </ul>
                </div>

                <div className='rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-white/10 p-4'>
                    <p className='text-sm font-bold text-slate-700 dark:text-slate-200 mb-3'>
                        Diagram Question
                    </p>
                    <p className='text-sm text-slate-600 dark:text-slate-400 pl-3 border-l-2 border-indigo-500 py-0.5'>
                        {result.questions.diagram}
                    </p>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Sidebar
