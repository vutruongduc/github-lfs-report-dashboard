import React, { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    ReferenceLine,
} from 'recharts';
import type { UsageRecord } from '../types/usage';
import { processCostAnomalies, formatCurrency } from '../utils/dataProcessing';

interface AnomalyCostChartProps {
    data: UsageRecord[];
}

const AnomalyCostChart: React.FC<AnomalyCostChartProps> = ({ data }) => {
    const anomalies = useMemo(() => processCostAnomalies(data, 1.5), [data]);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="glass-card p-4 !bg-white/95 border-red-100 shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <p className="font-bold text-slate-800">{data.date}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-slate-600">
                            Cost: <span className="font-mono font-bold text-red-600">{formatCurrency(data.totalCost)}</span>
                        </p>
                        <p className="text-xs text-slate-500">
                            Avg: {formatCurrency(data.averageCost)}
                        </p>
                        <p className="text-xs font-semibold text-red-500">
                            +{data.percentage.toFixed(1)}% above avg
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    if (anomalies.length === 0) {
        return (
            <div className="glass-card p-6 card-hover min-h-[300px] flex items-center justify-center">
                <div className="text-center text-slate-500">
                    <p className="mb-2">✨ No cost anomalies detected</p>
                    <p className="text-sm opacity-75">Costs are within expected ranges</p>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card p-6 card-hover border-l-4 border-l-red-500">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        Cost Anomalies
                        <span className="text-xs font-normal px-2 py-1 bg-red-100 text-red-700 rounded-full">
                            {anomalies.length} Detected
                        </span>
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">Days with unusually high spending (&gt;1.5x avg)</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-slate-600">Threshold</p>
                    <p className="text-xs text-slate-500 font-mono">{formatCurrency(anomalies[0].averageCost * 1.5)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={anomalies} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 11, fill: '#64748b' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: '#64748b' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(val) => `$${val}`}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#fef2f2' }} />
                            <ReferenceLine y={anomalies[0].averageCost} stroke="#94a3b8" strokeDasharray="3 3" label="Avg" />
                            <Bar dataKey="totalCost" radius={[4, 4, 0, 0]} maxBarSize={50}>
                                {anomalies.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.percentage > 100 ? '#ef4444' : '#f87171'}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-slate-50/50 rounded-xl p-4 overflow-y-auto max-h-[300px] border border-slate-100">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase font-medium border-b border-slate-200">
                            <tr>
                                <th className="pb-2">Date</th>
                                <th className="pb-2 text-right">Cost</th>
                                <th className="pb-2 text-right">Exc.</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {anomalies.map((item) => (
                                <tr key={item.date} className="group hover:bg-white transition-colors">
                                    <td className="py-2.5 text-slate-700 font-medium">{item.date}</td>
                                    <td className="py-2.5 text-right font-mono text-slate-900">
                                        {formatCurrency(item.totalCost)}
                                    </td>
                                    <td className="py-2.5 text-right text-red-600 font-medium">
                                        +{item.percentage.toFixed(0)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnomalyCostChart;
