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
                    <ul className='space-y-3 text-sm'>
                        {result.questions.short.map((t,i) => {
                            const qText = typeof t === 'string' ? t : t.question;
                            const aText = typeof t === 'string' ? null : t.answer;
                            return (
                                <li key={i} className="flex flex-col gap-1">
                                    <div className="flex gap-2">
                                        <span className="font-semibold text-indigo-500 dark:text-indigo-400 min-w-4">Q:</span>
                                        <span className="text-slate-600 dark:text-slate-300">{qText}</span>
                                    </div>
                                    {aText && (
                                        <div className="flex gap-2 ml-6 border-l border-emerald-400/50 pl-2">
                                            <span className="font-semibold text-emerald-600 dark:text-emerald-400 min-w-4">A:</span>
                                            <span className="text-slate-500 dark:text-slate-400 text-xs">{aText}</span>
                                        </div>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className='rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 p-4'>
                    <p className='text-sm font-bold text-slate-700 dark:text-slate-200 mb-3 pb-2 border-b border-slate-100 dark:border-white/5'>
                        Long Questions
                    </p>
                    <ul className='space-y-3 text-sm'>
                        {result.questions.long.map((t,i) => {
                            const qText = typeof t === 'string' ? t : t.question;
                            const aText = typeof t === 'string' ? null : t.answer;
                            return (
                                <li key={i} className="flex flex-col gap-1">
                                    <div className="flex gap-2">
                                        <span className="font-semibold text-indigo-500 dark:text-indigo-400 min-w-4">Q:</span>
                                        <span className="text-slate-600 dark:text-slate-300">{qText}</span>
                                    </div>
                                    {aText && (
                                        <div className="flex gap-2 ml-6 border-l border-emerald-400/50 pl-2">
                                            <span className="font-semibold text-emerald-600 dark:text-emerald-400 min-w-4">A:</span>
                                            <span className="text-slate-500 dark:text-slate-400 text-xs">{aText}</span>
                                        </div>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className='rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-white/10 p-4'>
                    <p className='text-sm font-bold text-slate-700 dark:text-slate-200 mb-3'>
                        Diagram Question
                    </p>
                    <div className='text-sm space-y-2'>
                        {(() => {
                            const qText = typeof result.questions.diagram === 'string' ? result.questions.diagram : result.questions.diagram?.question;
                            const aText = typeof result.questions.diagram === 'string' ? null : result.questions.diagram?.answer;
                            return (
                                <>
                                    {qText && (
                                        <div className='text-slate-600 dark:text-slate-400 pl-3 border-l-2 border-indigo-500 py-0.5'>
                                            <span className="font-semibold mr-1">Q:</span>{qText}
                                        </div>
                                    )}
                                    {aText && (
                                        <div className='text-slate-500 dark:text-slate-500 text-xs pl-3 border-l-2 border-emerald-500/50 py-0.5 ml-2 mt-1'>
                                            <span className="font-semibold mr-1">A:</span>{aText}
                                        </div>
                                    )}
                                </>
                            )
                        })()}
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Sidebar
