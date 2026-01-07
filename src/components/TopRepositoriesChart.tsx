import React from 'react';
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
import { processRepositorySummary, formatNumber, formatCurrency } from '../utils/dataProcessing';

interface TopRepositoriesChartProps {
  data: UsageRecord[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#84cc16'];

const TopRepositoriesChart: React.FC<TopRepositoriesChartProps> = ({ data }) => {
  const repoData = processRepositorySummary(data);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{data.repository}</p>
          <p className="text-sm text-gray-600">
            Minutes: {formatNumber(data.totalMinutes)}
          </p>
          <p className="text-sm text-gray-600">
            Cost: {formatCurrency(data.totalCost)}
          </p>
          <p className="text-sm text-gray-600">
            Users: {data.userCount}
          </p>
        </div>
      );
    }
    return null;
  };

  return (

    <div className="glass-card p-6 card-hover">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Top Repositories</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={repoData} layout="vertical" margin={{ left: 120 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tick={{ fontSize: 12 }} stroke="#6b7280" />
          <YAxis
            type="category"
            dataKey="repository"
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
            width={100}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="totalMinutes" radius={[0, 8, 8, 0]}>
            {repoData.map((_item, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopRepositoriesChart;
