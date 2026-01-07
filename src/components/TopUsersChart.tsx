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
import { processUserSummary, formatNumber, formatCurrency } from '../utils/dataProcessing';

interface TopUsersChartProps {
  data: UsageRecord[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#84cc16'];

const TopUsersChart: React.FC<TopUsersChartProps> = ({ data }) => {
  const userData = processUserSummary(data);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{data.username}</p>
          <p className="text-sm text-gray-600">
            Minutes: {formatNumber(data.totalMinutes)}
          </p>
          <p className="text-sm text-gray-600">
            Cost: {formatCurrency(data.totalCost)}
          </p>
          <p className="text-sm text-gray-600">
            Repositories: {data.repositoryCount}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 10 Users by Usage</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={userData} layout="vertical" margin={{ left: 120 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tick={{ fontSize: 12 }} stroke="#6b7280" />
          <YAxis
            type="category"
            dataKey="username"
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
            width={100}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="totalMinutes" radius={[0, 8, 8, 0]}>
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
