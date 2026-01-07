import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { UsageRecord } from '../types/usage';
import { formatNumber, formatCurrency } from '../utils/dataProcessing';

interface TopUsersChartProps {
  data: UsageRecord[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#84cc16'];

const TopUsersChart: React.FC<TopUsersChartProps> = ({ data }) => {
  const [metric, setMetric] = useState<'minutes' | 'cost'>('cost');

  const userData = useMemo(() => {
    // Process summaries specifically for this chart to ensure we can sort by cost if needed
    // processUserSummary returns top 10 by minutes by default.
    // We re-aggregate here to allow switching metrics correctly across the full dataset.
    // For now, let's re-sort the returned top 10 or ideally, we should update the helper to support sorting key.
    // But since I can't easily change the helper signature without checking usage elsewhere, let's just re-sort the result for now.
    // Wait, if I only have top 10 by minutes, re-sorting by cost might miss someone who has high cost but low minutes (unlikely but possible with different SKUs).
    // Let's assume the correlation is high enough or accept this limitation for now, OR better, let's do a quick re-aggregation here if needed.
    // Actually, looking at processUserSummary, it limits to 10. To be accurate, I should re-implement the aggregation here or accept the limitation.
    // Let's stick to valid Top 10 by the selected metric. I'll modify the logic slightly to re-aggregate if needed, but since I don't want to duplicate code too much,
    // I will trust the user wants to see "Who costs the most" which implies I should sort by cost across ALL users.

    // Let's re-aggregate locally for 100% correctness.
    const userMap = new Map<string, { totalMinutes: number; totalCost: number; repositories: number }>();
    data.forEach(record => {
      const existing = userMap.get(record.username);
      if (existing) {
        existing.totalMinutes += record.quantity;
        existing.totalCost += record.gross_amount;
      } else {
        userMap.set(record.username, {
          totalMinutes: record.quantity,
          totalCost: record.gross_amount,
          repositories: 0 // Simplification: we don't count repos accurately here without Set, but for sorting it's irrelevant
        });
      }
    });

    return Array.from(userMap.entries())
      .map(([username, val]) => ({
        username,
        ...val,
        repositoryCount: 0 // Placeholder
      }))
      .sort((a, b) => metric === 'minutes' ? b.totalMinutes - a.totalMinutes : b.totalCost - a.totalCost)
      .slice(0, 10);

  }, [data, metric]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white/90 backdrop-blur-md p-4 border border-slate-200 rounded-xl shadow-xl">
          <p className="font-semibold text-slate-900 mb-2">{d.username}</p>
          <p className="text-sm text-slate-600">
            Minutes: <span className="font-mono font-medium text-slate-900">{formatNumber(d.totalMinutes)}</span>
          </p>
          <p className="text-sm text-slate-600">
            Cost: <span className="font-mono font-medium text-emerald-600">{formatCurrency(d.totalCost)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 card-hover">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Top Users</h3>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setMetric('minutes')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${metric === 'minutes' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            By Minutes
          </button>
          <button
            onClick={() => setMetric('cost')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${metric === 'cost' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            By Cost
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={userData} layout="vertical" margin={{ left: 100, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={true} horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => metric === 'cost' ? `$${value}` : value.toLocaleString()}
          />
          <YAxis
            type="category"
            dataKey="username"
            tick={{ fontSize: 11, fill: '#64748b', width: 90 }}
            width={100}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
          <Bar
            dataKey={metric === 'minutes' ? 'totalMinutes' : 'totalCost'}
            radius={[0, 4, 4, 0]}
            barSize={24}
          >
            {userData.map((_item, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopUsersChart;
