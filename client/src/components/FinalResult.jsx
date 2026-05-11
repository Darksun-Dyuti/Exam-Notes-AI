import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MermaidSetup from './MermaidSetup';
import RechartSetUp from './RechartSetUp';
import { downloadPdf } from '../services/api';
import { LuBookOpen, LuDownload, LuStar, LuFileText, LuZap, LuChartPie, LuChartLine, LuCircleHelp } from "react-icons/lu";

const markDownComponent = {
    h1: ({ children }) => (
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-4 pb-2 border-b border-slate-200 dark:border-white/10">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-xl font-bold text-slate-800 dark:text-gray-100 mt-6 mb-3">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-lg font-semibold text-slate-700 dark:text-gray-200 mt-5 mb-2">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className="list-disc ml-6 space-y-2 text-slate-600 dark:text-slate-300 mb-4">
            {children}
        </ul>
    ),
    li: ({ children }) => (
        <li className="marker:text-indigo-500 pl-1">{children}</li>
    ),
}

function FinalResult({ result }) {
    const [quickRevision, setQuickRevision] = useState(false);
    
    if (
        !result ||
        !result.subTopics ||
        !result.questions ||
        !result.questions.short ||
        !result.questions.long ||
        !result.revisionPoints
    ) {
        return null;
    }

    return (
        <div className='p-6 lg:p-8 space-y-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm transition-colors duration-300'>

            <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10'>
                <h2 className='text-3xl font-extrabold flex items-center gap-3 text-slate-900 dark:text-white'>
                    <LuBookOpen className="text-indigo-600 dark:text-indigo-400" />
                    <span>Generated Notes</span>
                </h2>

                <div className='flex flex-wrap gap-3'>
                    <button 
                        onClick={() => setQuickRevision(!quickRevision)} 
                        className={`
                            px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 border
                            ${quickRevision
                                ? "bg-emerald-500 dark:bg-emerald-600 text-white border-emerald-500 dark:border-emerald-600 shadow-md"
                                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400"}
                        `}
                    >  
                        <LuZap className={quickRevision ? "text-white" : "text-emerald-500"} />
                        {quickRevision ? "Exit Revision Mode" : "Quick Revision (5 min)"}
                    </button>
                    <button 
                        onClick={() => downloadPdf(result)}
                        className='px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-all duration-300 flex items-center gap-2 border border-transparent'
                    >
                        <LuDownload /> Download PDF
                    </button>
                </div>
            </div>

            {!quickRevision && (
                <section className="space-y-4">
                    <SectionHeader icon={<LuStar />} title="Sub Topics" color="indigo" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(result.subTopics).map(([star, topics]) => (
                            <div key={star} className='p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5'>
                                <p className='font-bold text-slate-800 dark:text-gray-200 mb-2 flex items-center gap-2'>
                                    <LuStar className="text-amber-500 fill-amber-500" /> {star} Priority
                                </p>
                                <ul className='list-disc ml-5 text-sm text-slate-600 dark:text-slate-400 space-y-1'>
                                    {topics.map((t, i) => (
                                        <li key={i}>{t}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {!quickRevision && (
                <section className="space-y-4">
                    <SectionHeader icon={<LuFileText />} title="Detailed Notes" color="slate" />
                    <div className='bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 lg:p-8 shadow-sm'>
                        <ReactMarkdown components={markDownComponent}>
                            {result.notes}
                        </ReactMarkdown>
                    </div>
                </section>
            )}

            {quickRevision && (
                <section className='rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-6 lg:p-8 shadow-sm'>
                    <h3 className='font-extrabold text-emerald-800 dark:text-emerald-400 mb-4 text-xl flex items-center gap-2'>
                        <LuZap className="text-emerald-600 dark:text-emerald-400" /> Exam Quick Revision Points
                    </h3>
                    <ul className='list-disc ml-6 space-y-2 text-emerald-900 dark:text-emerald-100/80'>
                        {result.revisionPoints.map((p, i) => (
                            <li key={i} className="pl-2">{p}</li>
                        ))}
                    </ul>
                </section>
            )}

            {result.diagram?.data && (
                <section className="space-y-4">
                    <SectionHeader icon={<LuChartPie />} title="Architecture & Flow Diagram" color="cyan" />
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-sm">
                        <MermaidSetup diagram={result.diagram?.data} />
                    </div>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <LuCircleHelp /> You can save this diagram by taking a screenshot for future reference.
                    </p>
                </section>
            )}

            {result.charts?.length > 0 && (
                <section className="space-y-4">
                    <SectionHeader icon={<LuChartLine />} title="Visual Analytics & Charts" color="indigo" />
                    <RechartSetUp charts={result.charts} />
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <LuCircleHelp /> You can save these charts by taking a screenshot for future reference.
                    </p>
                </section>
            )}

            {result.charts && result.charts.length === 0 && (
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <LuChartLine className="opacity-50" />
                    <span className="text-sm font-medium">No charts available for this specific topic.</span>
                </div>
            )}

            <section className="space-y-6">
                <SectionHeader icon={<LuCircleHelp />} title="Important Exam Questions" color="rose" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 shadow-sm">
                        <p className='font-bold text-slate-800 dark:text-gray-200 mb-3 pb-2 border-b border-slate-100 dark:border-white/5'>Short Answer Questions</p>
                        <ul className='list-disc ml-5 text-sm text-slate-600 dark:text-slate-300 space-y-2'>
                            {result.questions.short.map((q, i) => (
                                <li key={i}>{q}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-5 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 shadow-sm">
                        <p className='font-bold text-slate-800 dark:text-gray-200 mb-3 pb-2 border-b border-slate-100 dark:border-white/5'>Long Answer Questions</p>
                        <ul className='list-disc ml-5 text-sm text-slate-600 dark:text-slate-300 space-y-2'>
                            {result.questions.long.map((q, i) => (
                                <li key={i}>{q}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-white/10 shadow-sm">
                    <p className='font-bold text-slate-800 dark:text-gray-200 mb-2'>Diagram / Application Question</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 ml-2 border-l-2 border-indigo-500 pl-3 py-1">
                        {result.questions.diagram}
                    </p>
                </div>
            </section>
        </div>
    )
}

function SectionHeader({ icon, title, color }) {
    // Elegant, minimalist tech color mappings for the Section Headers
    const colors = {
        indigo: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20",
        slate: "text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700",
        cyan: "text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-100 dark:border-cyan-500/20",
        rose: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20",
    };
    
    return (
        <div className={`
            px-5 py-3 rounded-xl border flex items-center gap-3 font-bold text-lg
            ${colors[color] || colors.slate}
        `}>
            <span className="text-xl">{icon}</span>
            <span>{title}</span>
        </div>
    )
}

export default FinalResult
