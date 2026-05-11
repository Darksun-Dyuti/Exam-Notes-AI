import React from 'react'
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { LuChartBar } from 'react-icons/lu';

function RechartSetUp({ charts }) {
    if (!charts || charts.length === 0) return null;
    const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];
    return (
        <div className='space-y-8'>
            {charts.map((chart, index) => (
                <div key={index} className='border border-slate-200 dark:border-white/10 rounded-xl p-6 bg-slate-50 dark:bg-slate-800/50 shadow-sm'>

                    <h4 className='font-semibold text-slate-800 dark:text-gray-200 mb-6 flex items-center gap-2'>
                        <LuChartBar className="text-indigo-500" /> {chart.title}
                    </h4>
                    <div className='h-72'>

                        <ResponsiveContainer width="100%" height="100%">
                            {chart.type === "bar" && (
                                <BarChart data={chart.data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                        {chart.data.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}

                                    </Bar>
                                </BarChart>
                            )}

                            {chart.type === "line" && (
                                <LineChart data={chart.data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone"
                                        dataKey="value"
                                        stroke="#6366f1"
                                        strokeWidth={3} />
                                </LineChart>
                            )}

                            {chart.type === "pie" && (
                                <PieChart>
                                    <Tooltip />
                                    <Pie data={chart.data}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={100}
                                        label>
                                            {chart.data.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}

                                    </Pie>
                                </PieChart>

                            )}

                        </ResponsiveContainer>
                    </div>

                </div>
            ))}

        </div>
    )
}

export default RechartSetUp
